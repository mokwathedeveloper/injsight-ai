"""Billing & plan endpoints (read-only summary, mock payment history for MVP)."""
from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import ok
from app.db import get_db
from app.models import User, UsageEvent
from app.users.router import PLAN_LIMITS

router = APIRouter(prefix="/api/billing", tags=["billing"])

_PLAN_PRICES = {"free": 0, "pro": 19, "team": 79, "enterprise": 299}


def _usage(db: Session, user: User) -> dict:
    from app.models import AIReport, WalletAnalysisRun
    analyses = db.query(UsageEvent).filter(
        UsageEvent.user_id == str(user.id), UsageEvent.event_type == "analysis"
    ).count()
    reports = db.query(AIReport).filter(AIReport.user_id == str(user.id)).count()
    limits = PLAN_LIMITS.get(user.plan, PLAN_LIMITS["free"])
    return {
        "wallets":  {"used": len(user.wallets), "limit": limits["wallets"]},
        "analyses": {"used": analyses,          "limit": limits["analysesPerMonth"]},
        "reports":  {"used": reports,            "limit": -1},
    }


@router.get("/summary")
def get_summary(db: Session = Depends(get_db), user: User = Depends(current_user)):
    usage = _usage(db, user)
    return ok({
        "plan":              user.plan,
        "priceUsd":          _PLAN_PRICES.get(user.plan, 0),
        "billingCycle":      "monthly",
        "nextBillingDate":   None,
        "usage":             usage,
        # Flat convenience fields used by the frontend BillingView
        "total_analyses":    usage["analyses"]["used"],
        "saved_wallets":     usage["wallets"]["used"],
        "total_reports":     usage["reports"]["used"],
        "invoices":          [],
    })
