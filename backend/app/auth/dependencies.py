"""Auth dependencies — resolve current user from Bearer token."""
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from app.auth.security import decode_token
from app.auth.supabase_auth import sb_get_user_by_id, row_to_sb_user
from app.common.responses import APIError
from app.db import get_db
from app.models import User

bearer_scheme = HTTPBearer(auto_error=False)


def _resolve_user(user_id: str, db: Session):
    """Try Supabase first (persistent), fall back to local DB."""
    sb_row = sb_get_user_by_id(user_id)
    if sb_row:
        return row_to_sb_user(sb_row)
    return db.get(User, user_id)


def current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    if creds is None:
        raise APIError("UNAUTHORIZED", "Authentication required.", 401)
    payload = decode_token(creds.credentials)
    if not payload or payload.get("type") != "access":
        raise APIError("UNAUTHORIZED", "Invalid or expired token.", 401)
    user = _resolve_user(payload["sub"], db)
    if user is None:
        raise APIError("UNAUTHORIZED", "User no longer exists.", 401)
    return user


def optional_current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
):
    if creds is None:
        return None
    payload = decode_token(creds.credentials)
    if not payload or payload.get("type") != "access":
        return None
    return _resolve_user(payload["sub"], db)


def serialize_user(user) -> dict:
    return {
        "id":           str(user.id),
        "email":        user.email,
        "name":         user.name,
        "plan":         user.plan,
        "emailVerified": user.email_verified,
        "createdAt":    user.created_at,
    }
