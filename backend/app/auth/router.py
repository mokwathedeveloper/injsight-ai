"""Authentication endpoints."""
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

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _tokens(user: User) -> dict:
    return {
        "accessToken": create_access_token(str(user.id)),
        "refreshToken": create_refresh_token(str(user.id)),
        "tokenType": "bearer",
    }


@router.post("/signup")
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == body.email.lower()).first()
    if existing:
        raise APIError("EMAIL_TAKEN", "An account with this email already exists.", 409)
    user = User(email=body.email.lower(), name=body.name, password_hash=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return ok({"user": serialize_user(user), "tokens": _tokens(user)}, "Account created.")


@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email.lower()).first()
    if not user or not verify_password(body.password, user.password_hash):
        raise APIError("INVALID_CREDENTIALS", "Invalid email or password.", 401)
    return ok({"user": serialize_user(user), "tokens": _tokens(user)}, "Logged in.")


@router.post("/refresh")
def refresh(body: RefreshRequest, db: Session = Depends(get_db)):
    payload = decode_token(body.refreshToken)
    if not payload or payload.get("type") != "refresh":
        raise APIError("INVALID_TOKEN", "Invalid refresh token.", 401)
    user = db.get(User, payload["sub"])
    if not user:
        raise APIError("UNAUTHORIZED", "User no longer exists.", 401)
    return ok({"tokens": _tokens(user)}, "Token refreshed.")


@router.post("/logout")
def logout(user: User = Depends(current_user)):
    # Stateless JWT: client discards tokens. Endpoint exists for symmetry.
    return ok(None, "Logged out.")


@router.get("/me")
def me(user: User = Depends(current_user)):
    return ok(serialize_user(user))
