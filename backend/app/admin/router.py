"""Admin endpoints — platform-level stats for internal operations dashboard."""
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User, WalletAnalysisRun, UsageEvent

router = APIRouter(prefix="/api/admin", tags=["admin"])


def _require_admin(user: User) -> User:
    # In production gate this on an `is_admin` flag or separate role.
    # For the MVP any authenticated user can view their own instance stats.
    return user


@router.get("/stats")
def admin_stats(db: Session = Depends(get_db), user: User = Depends(current_user)):
    _require_admin(user)
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_analyses = db.query(func.count(WalletAnalysisRun.id)).scalar() or 0
    failed = db.query(func.count(WalletAnalysisRun.id)).filter(
        WalletAnalysisRun.status == "failed"
    ).scalar() or 0
    error_rate = round((failed / total_analyses * 100) if total_analyses else 0, 2)

    return ok({
        "totalUsers": total_users,
        "activeToday": total_users,          # Stub – would filter by last_active in production
        "analysesToday": total_analyses,
        "aiCostUsd": round(total_analyses * 0.029, 2),   # $0.029 per analysis stub
        "errorRatePct": error_rate,
    })


@router.get("/users")
def admin_users(db: Session = Depends(get_db), user: User = Depends(current_user)):
    _require_admin(user)
    users = db.query(User).order_by(User.created_at.desc()).limit(50).all()
    analyses_by_user = {
        uid: count for uid, count in
        db.query(UsageEvent.user_id, func.count(UsageEvent.id))
        .filter(UsageEvent.event_type == "analysis")
        .group_by(UsageEvent.user_id)
        .all()
    }
    return ok([
        {
            "id": str(u.id),
            "email": u.email,
            "plan": u.plan,
            "status": "active",
            "analyses": analyses_by_user.get(str(u.id), 0),
            "joined": u.created_at.strftime("%b %Y") if u.created_at else "—",
        }
        for u in users
    ])
