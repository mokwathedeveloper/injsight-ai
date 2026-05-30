"""Authentication endpoints — Supabase-backed user persistence."""
from __future__ import annotations
import logging
from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import current_user, serialize_user
from app.auth.schemas import LoginRequest, RefreshRequest, SignupRequest
from app.auth.security import create_access_token, create_refresh_token, decode_token, hash_password, verify_password
from app.auth.supabase_auth import row_to_sb_user, sb_create_user, sb_get_user_by_email, sb_get_user_by_id
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["auth"])

def _tokens_from_id(uid: str) -> dict:
    return {"accessToken": create_access_token(uid), "refreshToken": create_refresh_token(uid), "tokenType": "bearer"}

def _tokens(user: Any) -> dict:
    return _tokens_from_id(str(user.id))

@router.post("/signup")
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    pw = hash_password(body.password)
    if sb_get_user_by_email(body.email) is not None:
        raise APIError("EMAIL_TAKEN", "An account with this email already exists.", 409)
    sb_row = sb_create_user(body.email, pw, body.name)
    if sb_row:
        u = row_to_sb_user(sb_row)
        return ok({"user": serialize_user(u), "tokens": _tokens(u)}, "Account created.")
    # SQLAlchemy fallback
    if db.query(User).filter(User.email == body.email.lower()).first():
        raise APIError("EMAIL_TAKEN", "An account with this email already exists.", 409)
    user = User(email=body.email.lower(), name=body.name, password_hash=pw)
    db.add(user); db.commit(); db.refresh(user)
    return ok({"user": serialize_user(user), "tokens": _tokens(user)}, "Account created.")

@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    sb_row = sb_get_user_by_email(body.email)
    if sb_row is not None:
        if not verify_password(body.password, sb_row.get("password_hash", "")):
            raise APIError("INVALID_CREDENTIALS", "Invalid email or password.", 401)
        u = row_to_sb_user(sb_row)
        return ok({"user": serialize_user(u), "tokens": _tokens(u)}, "Logged in.")
    user = db.query(User).filter(User.email == body.email.lower()).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise APIError("INVALID_CREDENTIALS", "Invalid email or password.", 401)
    return ok({"user": serialize_user(user), "tokens": _tokens(user)}, "Logged in.")

@router.post("/refresh")
def refresh(body: RefreshRequest, db: Session = Depends(get_db)):
    payload = decode_token(body.refreshToken)
    if not payload or payload.get("type") != "refresh":
        raise APIError("INVALID_TOKEN", "Invalid refresh token.", 401)
    uid = payload["sub"]
    if sb_get_user_by_id(uid):
        return ok({"tokens": _tokens_from_id(uid)}, "Token refreshed.")
    user = db.get(User, uid)
    if not user:
        raise APIError("UNAUTHORIZED", "User no longer exists.", 401)
    return ok({"tokens": _tokens(user)}, "Token refreshed.")

@router.post("/logout")
def logout(user: User = Depends(current_user)):
    return ok(None, "Logged out.")

@router.get("/me")
def me(user: User = Depends(current_user)):
    sb_row = sb_get_user_by_id(str(user.id))
    if sb_row:
        return ok(serialize_user(row_to_sb_user(sb_row)))
    return ok(serialize_user(user))
