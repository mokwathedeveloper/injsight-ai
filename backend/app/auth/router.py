"""Authentication endpoints — uses Supabase REST API for user persistence.

Users are stored in Supabase PostgreSQL (via service_role key + PostgREST).
This means accounts survive Render restarts regardless of local SQLite state.
JWT tokens are generated locally and remain stateless.
"""
from __future__ import annotations

import logging
import uuid
from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user, serialize_user
from app.auth.schemas import LoginRequest, RefreshRequest, SignupRequest
from app.auth.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["auth"])


# ── Supabase REST helpers ─────────────────────────────────────────────────────

def _get_sb():
    """Return Supabase client or None."""
    try:
        from app.services.supabase_client import get_supabase
        return get_supabase()
    except Exception:
        return None


def _sb_get_user(email: str) -> dict | None:
    """Fetch a user from Supabase by email. Returns None if not found."""
    sb = _get_sb()
    if sb is None:
        return None
    try:
        res = sb.table("users").select("*").eq("email", email.lower()).limit(1).execute()
        rows = res.data if hasattr(res, "data") else res
        return rows[0] if rows else None
    except Exception as exc:
        logger.warning("Supabase get_user failed: %s", exc)
        return None


def _sb_get_user_by_id(user_id: str) -> dict | None:
    """Fetch a user from Supabase by ID."""
    sb = _get_sb()
    if sb is None:
        return None
    try:
        res = sb.table("users").select("*").eq("id", user_id).limit(1).execute()
        rows = res.data if hasattr(res, "data") else res
        return rows[0] if rows else None
    except Exception as exc:
        logger.warning("Supabase get_user_by_id failed: %s", exc)
        return None


def _sb_create_user(email: str, password_hash: str, name: str | None = None) -> dict | None:
    """Insert a new user into Supabase. Returns the created row or None."""
    sb = _get_sb()
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
        logger.warning("Supabase create_user failed: %s", exc)
        return None


def _sb_to_user_obj(row: dict) -> object:
    """Convert a Supabase dict row to a duck-type object compatible with serialize_user."""
    class _U:
        pass
    u = _U()
    u.id            = row.get("id", "")
    u.email         = row.get("email", "")
    u.name          = row.get("name")
    u.plan          = row.get("plan", "free")
    u.email_verified = row.get("email_verified", False)
    u.created_at    = row.get("created_at", "")
    u.password_hash = row.get("password_hash", "")
    return u


def _tokens_from_id(user_id: str) -> dict:
    return {
        "accessToken":  create_access_token(user_id),
        "refreshToken": create_refresh_token(user_id),
        "tokenType":    "bearer",
    }


def _tokens(user: Any) -> dict:
    return _tokens_from_id(str(user.id))


# ── Endpoints ──────────────────────────────────────────────────────────────────

@router.post("/signup")
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    """Register a new user.

    Tries Supabase REST API first (persistent across Render restarts),
    falls back to SQLAlchemy / local DB if Supabase is unavailable.
    """
    pw_hash = hash_password(body.password)

    # ── Supabase path (preferred — persists across restarts) ──────────────
    sb_existing = _sb_get_user(body.email)
    if sb_existing is not None:
        raise APIError("EMAIL_TAKEN", "An account with this email already exists.", 409)

    sb_user = _sb_create_user(body.email, pw_hash, body.name)
    if sb_user:
        u = _sb_to_user_obj(sb_user)
        return ok({"user": serialize_user(u), "tokens": _tokens(u)}, "Account created.")

    # ── SQLAlchemy fallback ───────────────────────────────────────────────
    logger.info("Supabase unavailable — falling back to local DB for signup")
    existing = db.query(User).filter(User.email == body.email.lower()).first()
    if existing:
        raise APIError("EMAIL_TAKEN", "An account with this email already exists.", 409)
    user = User(email=body.email.lower(), name=body.name, password_hash=pw_hash)
    db.add(user)
    db.commit()
    db.refresh(user)
    return ok({"user": serialize_user(user), "tokens": _tokens(user)}, "Account created.")


@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    """Log in with email + password.

    Tries Supabase REST API first (authoritative — never wiped),
    falls back to local DB if Supabase is unavailable.
    """
    # ── Supabase path ─────────────────────────────────────────────────────
    sb_user = _sb_get_user(body.email)
    if sb_user is not None:
        if not verify_password(body.password, sb_user.get("password_hash", "")):
            raise APIError("INVALID_CREDENTIALS", "Invalid email or password.", 401)
        u = _sb_to_user_obj(sb_user)
        return ok({"user": serialize_user(u), "tokens": _tokens(u)}, "Logged in.")

    # ── SQLAlchemy fallback ───────────────────────────────────────────────
    logger.info("User not found in Supabase — checking local DB")
    user = db.query(User).filter(User.email == body.email.lower()).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise APIError("INVALID_CREDENTIALS", "Invalid email or password.", 401)
    return ok({"user": serialize_user(user), "tokens": _tokens(user)}, "Logged in.")


@router.post("/refresh")
def refresh(body: RefreshRequest, db: Session = Depends(get_db)):
    payload = decode_token(body.refreshToken)
    if not payload or payload.get("type") != "refresh":
        raise APIError("INVALID_TOKEN", "Invalid refresh token.", 401)

    user_id = payload["sub"]

    # Try Supabase first
    sb_user = _sb_get_user_by_id(user_id)
    if sb_user:
        return ok({"tokens": _tokens_from_id(user_id)}, "Token refreshed.")

    # Fallback to local DB
    user = db.get(User, user_id)
    if not user:
        raise APIError("UNAUTHORIZED", "User no longer exists.", 401)
    return ok({"tokens": _tokens(user)}, "Token refreshed.")


@router.post("/logout")
def logout(user: User = Depends(current_user)):
    return ok(None, "Logged out.")


@router.get("/me")
def me(user: User = Depends(current_user)):
    # Try Supabase for fresh data
    sb_user = _sb_get_user_by_id(str(user.id))
    if sb_user:
        return ok(serialize_user(_sb_to_user_obj(sb_user)))
    return ok(serialize_user(user))
