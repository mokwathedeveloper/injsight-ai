"""User profile and usage endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user, serialize_user
from app.auth.schemas import ChangePasswordRequest, UpdateProfileRequest
from app.auth.security import hash_password, verify_password
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User, UsageEvent

router = APIRouter(prefix="/api/users", tags=["users"])

# Wallet + monthly analysis limits per plan.
PLAN_LIMITS = {
    "free": {"wallets": 5, "analysesPerMonth": 20},
    "pro": {"wallets": 50, "analysesPerMonth": 1000},
    "team": {"wallets": 250, "analysesPerMonth": 10000},
    "enterprise": {"wallets": -1, "analysesPerMonth": -1},
}


@router.get("/me")
def get_me(user: User = Depends(current_user)):
    return ok(serialize_user(user))


@router.put("/me")
def update_me(body: UpdateProfileRequest, db: Session = Depends(get_db), user: User = Depends(current_user)):
    if body.name is not None:
        user.name = body.name
    db.commit()
    db.refresh(user)
    return ok(serialize_user(user), "Profile updated.")


@router.put("/password")
def change_password(body: ChangePasswordRequest, db: Session = Depends(get_db), user: User = Depends(current_user)):
    if not verify_password(body.currentPassword, user.password_hash):
        raise APIError("INVALID_PASSWORD", "Current password is incorrect.", 400)
    user.password_hash = hash_password(body.newPassword)
    db.commit()
    return ok(None, "Password changed.")


@router.get("/usage")
def get_usage(db: Session = Depends(get_db), user: User = Depends(current_user)):
    limits = PLAN_LIMITS.get(user.plan, PLAN_LIMITS["free"])
    analyses_used = db.query(UsageEvent).filter(
        UsageEvent.user_id == str(user.id), UsageEvent.event_type == "analysis"
    ).count()
    wallets_used = len(user.wallets)
    return ok({
        "plan": user.plan,
        "limits": limits,
        "usage": {"wallets": wallets_used, "analyses": analyses_used},
    })
