"""AI insights endpoint — generates intelligence from saved wallets."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import ok
from app.db import get_db
from app.models import Alert, RiskScore, User, Wallet, WalletAnalysisRun

router = APIRouter(prefix="/api/insights", tags=["insights"])


def _days_ago(d: datetime | None, n: int) -> bool:
    if d is None:
        return False
    now = datetime.now(timezone.utc)
    target = d if d.tzinfo else d.replace(tzinfo=timezone.utc)
    return (now - target).days <= n


def _generate_insights(wallets: list[Wallet], db: Session) -> list[dict]:
    """
    Generate actionable insights from each wallet's latest analysis.
    Returns a list of insight dicts sorted by severity (critical first).
    """
    severity_order = {"critical": 0, "high": 1, "medium": 2, "low": 3, "info": 4}
    results: list[dict] = []

    for wallet in wallets:
        # Latest completed analysis for this wallet (by wallet_id OR address)
        run = (
            db.query(WalletAnalysisRun)
            .filter(
                WalletAnalysisRun.status == "completed",
                (
                    (WalletAnalysisRun.wallet_id == str(wallet.id))
                    | (WalletAnalysisRun.wallet_address == wallet.address)
                ),
            )
            .order_by(WalletAnalysisRun.created_at.desc())
            .first()
        )
        if not run:
            continue

        risk = db.query(RiskScore).filter(
            RiskScore.analysis_run_id == str(run.id)
        ).first()
        if not risk:
            continue

        normalized  = run.normalized_data or {}
        holdings    = normalized.get("holdings", [])
        total_value = normalized.get("total_value_usd", 0)
        label       = wallet.label or f"{wallet.address[:8]}…{wallet.address[-4:]}"
        short_addr  = f"{wallet.address[:10]}…{wallet.address[-4:]}"
        analyzed_at = run.completed_at

        # ── Rule 1: Critical concentration ──────────────────────────────────
        if holdings:
            top = holdings[0]
            if top.get("percent", 0) >= 75:
                results.append({
                    "id":           str(uuid.uuid4()),
                    "type":         "concentration",
                    "severity":     "critical",
                    "severityLabel": "Critical",
                    "title":        f"Extreme Concentration — {top['symbol']}",
                    "description":  (
                        f"{top['symbol']} represents {top['percent']}% of {label}. "
                        f"A 20% drop in {top['symbol']} would reduce portfolio value by "
                        f"~${(top.get('value_usd', 0) * 0.20):,.0f}. "
                        "Diversify to reduce single-asset risk."
                    ),
                    "wallet":       short_addr,
                    "walletLabel":  label,
                    "walletId":     str(wallet.id),
                    "riskScore":    risk.score,
                    "analyzedAt":   analyzed_at,
                    "isNew":        _days_ago(analyzed_at, 1),
                })
            elif top.get("percent", 0) >= 60:
                results.append({
                    "id":           str(uuid.uuid4()),
                    "type":         "concentration",
                    "severity":     "high",
                    "severityLabel": "High",
                    "title":        f"High Concentration — {top['symbol']}",
                    "description":  (
                        f"{top['symbol']} is {top['percent']}% of {label}. "
                        "Consider reducing below 50% for better diversification."
                    ),
                    "wallet":       short_addr,
                    "walletLabel":  label,
                    "walletId":     str(wallet.id),
                    "riskScore":    risk.score,
                    "analyzedAt":   analyzed_at,
                    "isNew":        _days_ago(analyzed_at, 1),
                })

        # ── Rule 2: Low stablecoin buffer ───────────────────────────────────
        stable_pct = sum(
            h.get("percent", 0)
            for h in holdings
            if h.get("category") == "Stablecoin"
        )
        if stable_pct < 10:
            results.append({
                "id":           str(uuid.uuid4()),
                "type":         "stablecoin",
                "severity":     "high",
                "severityLabel": "High Risk",
                "title":        "Stablecoin Buffer Critical",
                "description":  (
                    f"Only {stable_pct:.1f}% stablecoin allocation in {label}. "
                    "A minimum 15–20% buffer provides protection during downturns. "
                    "Consider adding USDT or USDC."
                ),
                "wallet":       short_addr,
                "walletLabel":  label,
                "walletId":     str(wallet.id),
                "riskScore":    risk.score,
                "analyzedAt":   analyzed_at,
                "isNew":        _days_ago(analyzed_at, 1),
            })
        elif stable_pct < 20:
            results.append({
                "id":           str(uuid.uuid4()),
                "type":         "stablecoin",
                "severity":     "medium",
                "severityLabel": "Warning",
                "title":        "Stablecoin Buffer Low",
                "description":  (
                    f"Stablecoin allocation is {stable_pct:.1f}% in {label}. "
                    "Target 20%+ for adequate downside protection."
                ),
                "wallet":       short_addr,
                "walletLabel":  label,
                "walletId":     str(wallet.id),
                "riskScore":    risk.score,
                "analyzedAt":   analyzed_at,
                "isNew":        _days_ago(analyzed_at, 3),
            })

        # ── Rule 3: Overall high risk ───────────────────────────────────────
        if risk.score >= 80:
            results.append({
                "id":           str(uuid.uuid4()),
                "type":         "risk",
                "severity":     "critical",
                "severityLabel": "Critical",
                "title":        "Very High Risk Portfolio",
                "description":  (
                    f"{label} scored {risk.score}/100 — Very High Risk. "
                    "Immediate review recommended. "
                    f"Concentration: {risk.concentration_score}/100, "
                    f"Volatility: {risk.volatility_score}/100."
                ),
                "wallet":       short_addr,
                "walletLabel":  label,
                "walletId":     str(wallet.id),
                "riskScore":    risk.score,
                "analyzedAt":   analyzed_at,
                "isNew":        _days_ago(analyzed_at, 1),
            })
        elif risk.score >= 60:
            results.append({
                "id":           str(uuid.uuid4()),
                "type":         "risk",
                "severity":     "high",
                "severityLabel": "High",
                "title":        "High Risk Wallet",
                "description":  (
                    f"{label} is rated High Risk ({risk.score}/100). "
                    "Review concentration and diversification to improve the score."
                ),
                "wallet":       short_addr,
                "walletLabel":  label,
                "walletId":     str(wallet.id),
                "riskScore":    risk.score,
                "analyzedAt":   analyzed_at,
                "isNew":        _days_ago(analyzed_at, 3),
            })

        # ── Rule 4: Well diversified (positive insight) ─────────────────────
        if risk.score < 35 and len(holdings) >= 4:
            results.append({
                "id":           str(uuid.uuid4()),
                "type":         "positive",
                "severity":     "low",
                "severityLabel": "Healthy",
                "title":        "Well-Diversified Portfolio",
                "description":  (
                    f"{label} has a healthy risk score of {risk.score}/100 "
                    f"with {len(holdings)} tokens and good diversification. "
                    "Keep monitoring for new token additions."
                ),
                "wallet":       short_addr,
                "walletLabel":  label,
                "walletId":     str(wallet.id),
                "riskScore":    risk.score,
                "analyzedAt":   analyzed_at,
                "isNew":        _days_ago(analyzed_at, 7),
            })

        # ── Rule 5: Many tokens (potential unknown exposure) ────────────────
        if len(holdings) > 10:
            unknown = [h for h in holdings if h.get("category") == "Unknown"]
            if unknown:
                results.append({
                    "id":           str(uuid.uuid4()),
                    "type":         "exposure",
                    "severity":     "medium",
                    "severityLabel": "Info",
                    "title":        f"{len(unknown)} Unverified Token(s) Detected",
                    "description":  (
                        f"{label} holds {len(unknown)} token(s) with unknown or unverified "
                        "on-chain history. Review these positions before relying on their valuations."
                    ),
                    "wallet":       short_addr,
                    "walletLabel":  label,
                    "walletId":     str(wallet.id),
                    "riskScore":    risk.score,
                    "analyzedAt":   analyzed_at,
                    "isNew":        _days_ago(analyzed_at, 7),
                })

    # Sort: critical → high → medium → low → info
    results.sort(key=lambda x: severity_order.get(x["severity"], 99))
    return results


@router.get("")
def list_insights(db: Session = Depends(get_db), user: User = Depends(current_user)):
    """Return AI-generated insights from the user's saved wallets."""
    wallets = (
        db.query(Wallet)
        .filter(Wallet.user_id == str(user.id))
        .order_by(Wallet.created_at.desc())
        .all()
    )

    insights = _generate_insights(wallets, db)

    # Stats
    one_week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    recent_runs  = (
        db.query(WalletAnalysisRun)
        .filter(
            WalletAnalysisRun.user_id == str(user.id),
            WalletAnalysisRun.status  == "completed",
            WalletAnalysisRun.completed_at >= one_week_ago,
        )
        .count()
    )

    all_risk = (
        db.query(RiskScore)
        .join(WalletAnalysisRun, WalletAnalysisRun.id == RiskScore.analysis_run_id)
        .filter(WalletAnalysisRun.user_id == str(user.id))
        .all()
    )
    avg_risk = (
        round(sum(r.score for r in all_risk) / len(all_risk))
        if all_risk else 0
    )

    critical_count = sum(1 for i in insights if i["severity"] in ("critical", "high"))

    return ok({
        "insights": insights,
        "stats": {
            "total":       len(insights),
            "highPriority": critical_count,
            "thisWeek":     recent_runs,
            "avgRiskScore": avg_risk,
        },
    })


@router.post("/generate")
def generate_insights(db: Session = Depends(get_db), user: User = Depends(current_user)):
    """Trigger fresh insight generation (same as GET but explicit re-compute)."""
    return list_insights(db=db, user=user)
