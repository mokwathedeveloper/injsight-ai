"""API keys and webhook endpoints for developer platform features."""
import hashlib
import secrets
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User

api_keys_router = APIRouter(prefix="/api/developer/keys", tags=["developer"])
webhooks_router = APIRouter(prefix="/api/developer/webhooks", tags=["developer"])

# In-memory per-user stores (same swap-out path as teams)
_KEYS: dict[str, list] = {}
_WEBHOOKS: dict[str, list] = {}

# Stub request log used for all users (read-only)
_REQUEST_LOG = [
    {"id": "r-1", "time": "23:54:01", "method": "GET", "endpoint": "/v1/wallets/{addr}/risk", "statusCode": 200, "statusClass": "success", "latencyMs": 142},
    {"id": "r-2", "time": "23:53:47", "method": "POST", "endpoint": "/v1/wallets/{addr}/report", "statusCode": 200, "statusClass": "success", "latencyMs": 2380},
    {"id": "r-3", "time": "23:52:10", "method": "GET", "endpoint": "/v1/wallets/badaddr", "statusCode": 422, "statusClass": "client_error", "latencyMs": 38},
    {"id": "r-4", "time": "23:50:55", "method": "GET", "endpoint": "/v1/wallets/{addr}/activity", "statusCode": 200, "statusClass": "success", "latencyMs": 201},
    {"id": "r-5", "time": "23:49:02", "method": "GET", "endpoint": "/v1/wallets/{addr}/risk", "statusCode": 429, "statusClass": "client_error", "latencyMs": 12},
]


# ── API Keys ──────────────────────────────────────────────────────────────────

def _default_keys(user: User) -> list:
    prefix = hashlib.md5(user.id.encode() if isinstance(user.id, str) else str(user.id).encode()).hexdigest()[:8]
    return [{
        "id": "k-default",
        "name": "Default key",
        "prefix": f"injsk_live_{prefix}…",
        "created": "Today",
        "lastUsed": "Never",
        "status": "active",
    }]


class CreateKeyRequest(BaseModel):
    name: str = Field(min_length=1, max_length=80)


@api_keys_router.get("")
def list_keys(user: User = Depends(current_user)):
    return ok(_KEYS.get(str(user.id)) or _default_keys(user))


@api_keys_router.post("")
def create_key(body: CreateKeyRequest, user: User = Depends(current_user)):
    uid = str(user.id)
    if uid not in _KEYS:
        _KEYS[uid] = list(_default_keys(user))
    raw = f"injsk_live_{secrets.token_hex(16)}"
    new_key = {
        "id": f"k-{secrets.token_hex(4)}",
        "name": body.name,
        "prefix": raw[:20] + "…",
        "secret": raw,   # returned ONCE on creation
        "created": "Just now",
        "lastUsed": "Never",
        "status": "active",
    }
    _KEYS[uid].insert(0, new_key)
    return ok(new_key, "API key created. Copy the secret — it will not be shown again.")


@api_keys_router.delete("/{key_id}")
def revoke_key(key_id: str, user: User = Depends(current_user)):
    keys = _KEYS.get(str(user.id)) or _default_keys(user)
    key = next((k for k in keys if k["id"] == key_id), None)
    if not key:
        raise APIError("NOT_FOUND", "API key not found.", 404)
    key["status"] = "revoked"
    return ok(None, "Key revoked.")


@api_keys_router.get("/usage")
def key_usage(_: User = Depends(current_user)):
    return ok({"limit": 1000, "used": 642, "window": "per hour", "resetsIn": "18 min", "log": _REQUEST_LOG})


# ── Webhooks ──────────────────────────────────────────────────────────────────

class CreateWebhookRequest(BaseModel):
    url: str = Field(min_length=8, max_length=500)
    events: list[str]


_DELIVERY_LOG = [
    {"id": f"d-{i}", "time": f"23:{50 + i}:00", "event": ["risk.changed", "wallet.large_movement"][i % 2], "statusCode": 200 if i % 3 != 0 else 500, "success": i % 3 != 0}
    for i in range(5)
]


@webhooks_router.get("")
def list_webhooks(user: User = Depends(current_user)):
    return ok(_WEBHOOKS.get(str(user.id), []))


@webhooks_router.post("")
def create_webhook(body: CreateWebhookRequest, user: User = Depends(current_user)):
    if not body.url.startswith("https://"):
        raise APIError("INVALID_URL", "Webhook URL must use HTTPS.", 422)
    uid = str(user.id)
    new_hook = {
        "id": f"wh-{secrets.token_hex(4)}",
        "url": body.url,
        "events": body.events,
        "status": "active",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    _WEBHOOKS.setdefault(uid, []).insert(0, new_hook)
    return ok(new_hook, "Webhook created.")


@webhooks_router.delete("/{hook_id}")
def delete_webhook(hook_id: str, user: User = Depends(current_user)):
    hooks = _WEBHOOKS.get(str(user.id), [])
    if not any(h["id"] == hook_id for h in hooks):
        raise APIError("NOT_FOUND", "Webhook not found.", 404)
    _WEBHOOKS[str(user.id)] = [h for h in hooks if h["id"] != hook_id]
    return ok(None, "Webhook deleted.")


@webhooks_router.get("/deliveries")
def delivery_log(_: User = Depends(current_user)):
    return ok(_DELIVERY_LOG)
