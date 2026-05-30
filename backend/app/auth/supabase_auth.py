"""Supabase-backed user storage helpers.

Separate module to avoid circular import between router.py and dependencies.py.
Both can safely import from here.
"""
from __future__ import annotations

import logging
import uuid
from datetime import datetime, timezone

logger = logging.getLogger(__name__)


def get_sb():
    """Return Supabase client or None."""
    try:
        from app.services.supabase_client import get_supabase
        return get_supabase()
    except Exception:
        return None


def sb_get_user_by_email(email: str) -> dict | None:
    sb = get_sb()
    if sb is None:
        return None
    try:
        res = sb.table("users").select("*").eq("email", email.lower()).limit(1).execute()
        rows = res.data if hasattr(res, "data") else res
        return rows[0] if rows else None
    except Exception as exc:
        logger.warning("sb_get_user_by_email failed: %s", exc)
        return None


def sb_get_user_by_id(user_id: str) -> dict | None:
    sb = get_sb()
    if sb is None:
        return None
    try:
        res = sb.table("users").select("*").eq("id", user_id).limit(1).execute()
        rows = res.data if hasattr(res, "data") else res
        return rows[0] if rows else None
    except Exception as exc:
        logger.warning("sb_get_user_by_id failed: %s", exc)
        return None


def sb_create_user(email: str, password_hash: str, name: str | None = None) -> dict | None:
    sb = get_sb()
    if sb is None:
        return None
    try:
        now = datetime.now(timezone.utc).isoformat()
        row = {
            "id":            str(uuid.uuid4()),
            "email":         email.lower(),
            "password_hash": password_hash,
            "name":          name,
            "plan":          "free",
            "email_verified": False,
            "created_at":    now,
            "updated_at":    now,
        }
        res = sb.table("users").insert(row).execute()
        rows = res.data if hasattr(res, "data") else res
        return rows[0] if rows else None
    except Exception as exc:
        logger.warning("sb_create_user failed: %s", exc)
        return None


def sb_count_wallets(user_id: str) -> int:
    """Count saved wallets for a user from Supabase."""
    sb = get_sb()
    if sb is None:
        return 0
    try:
        res = sb.table("wallets").select("id", count="exact").eq("user_id", user_id).execute()
        return res.count if hasattr(res, "count") and res.count is not None else len(res.data or [])
    except Exception as exc:
        logger.warning("sb_count_wallets failed: %s", exc)
        return 0


class SbUser:
    """Duck-type User compatible with serialize_user and billing/router.py."""

    def __init__(self, row: dict) -> None:
        self.id             = row.get("id", "")
        self.email          = row.get("email", "")
        self.name           = row.get("name")
        self.plan           = row.get("plan", "free")
        self.email_verified = row.get("email_verified", False)
        self.created_at     = row.get("created_at", "")
        self.password_hash  = row.get("password_hash", "")
        self._user_id       = str(self.id)

    @property
    def wallets(self) -> list:
        """Fetch wallets from Supabase on demand (compatible with len(user.wallets))."""
        sb = get_sb()
        if sb is None:
            return []
        try:
            res = sb.table("wallets").select("id").eq("user_id", self._user_id).execute()
            return res.data or []
        except Exception:
            return []


def row_to_sb_user(row: dict) -> SbUser:
    return SbUser(row)
