"""Auth dependencies: resolve the current user from a bearer token."""
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.auth.security import decode_token
from app.common.responses import APIError
from app.db import get_db
from app.models import User

bearer_scheme = HTTPBearer(auto_error=False)


def current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if creds is None:
        raise APIError("UNAUTHORIZED", "Authentication required.", 401)
    payload = decode_token(creds.credentials)
    if not payload or payload.get("type") != "access":
        raise APIError("UNAUTHORIZED", "Invalid or expired token.", 401)
    user = db.get(User, payload["sub"])
    if user is None:
        raise APIError("UNAUTHORIZED", "User no longer exists.", 401)
    return user


def optional_current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User | None:
    if creds is None:
        return None
    payload = decode_token(creds.credentials)
    if not payload or payload.get("type") != "access":
        return None
    return db.get(User, payload["sub"])


def serialize_user(user: User) -> dict:
    return {
        "id": str(user.id),
        "email": user.email,
        "name": user.name,
        "plan": user.plan,
        "emailVerified": user.email_verified,
        "createdAt": user.created_at,
    }
