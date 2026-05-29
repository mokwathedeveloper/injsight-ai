"""Orchestrates a full wallet analysis: fetch -> risk -> AI report -> persist."""
from datetime import datetime, timezone

from sqlalchemy.orm import Session

from app.ai.service import compute_risk, generate_report
from app.common.responses import APIError
from app.integrations.injective.service import fetch_wallet_data, is_valid_injective_address
from app.models import AIReport, RiskScore, UsageEvent, WalletAnalysisRun


def run_analysis(
    db: Session,
    address: str,
    *,
    user_id: str | None = None,
    wallet_id: str | None = None,
    persist: bool = True,
) -> WalletAnalysisRun:
    if not is_valid_injective_address(address):
        raise APIError(
            "INVALID_WALLET",
            "This does not look like a valid Injective wallet address.",
            422,
        )

    run = WalletAnalysisRun(
        user_id=user_id,
        wallet_id=wallet_id,
        wallet_address=address,
        chain="injective",
        status="processing",
    )

    try:
        normalized = fetch_wallet_data(address)
        risk = compute_risk(normalized)
        report = generate_report(normalized, risk)
    except APIError:
        raise
    except Exception as exc:  # pragma: no cover - defensive
        raise APIError("ANALYSIS_FAILED", f"Analysis failed: {exc}", 502)

    run.data_source = normalized["data_source"]
    run.normalized_data = normalized
    run.status = "completed"
    run.completed_at = datetime.now(timezone.utc)
    run.risk_score = RiskScore(wallet_address=address, **risk)
    run.report = AIReport(wallet_address=address, user_id=user_id, **report)

    if persist:
        db.add(run)
        if user_id:
            db.add(UsageEvent(user_id=user_id, event_type="analysis"))
        db.commit()
        db.refresh(run)
    return run


def serialize_analysis(run: WalletAnalysisRun) -> dict:
    risk = run.risk_score
    report = run.report
    normalized = run.normalized_data or {}
    return {
        "id": str(run.id),
        "walletAddress": run.wallet_address,
        "chain": run.chain,
        "status": run.status,
        "dataSource": run.data_source,
        "createdAt": run.created_at,
        "completedAt": run.completed_at,
        "portfolio": {
            "totalValueUsd": normalized.get("total_value_usd"),
            "tokenCount": normalized.get("token_count"),
            "holdings": normalized.get("holdings", []),
        },
        "riskScore": None
        if risk is None
        else {
            "score": risk.score,
            "level": risk.risk_level,
            "dimensions": {
                "concentration": risk.concentration_score,
                "volatility": risk.volatility_score,
                "stablecoinBuffer": risk.stablecoin_buffer_score,
                "activity": risk.activity_score,
                "diversification": risk.diversification_score,
            },
            "methodologyVersion": risk.methodology_version,
        },
        "aiReport": None
        if report is None
        else {
            "summary": report.summary,
            "concentrationAnalysis": report.concentration_analysis,
            "riskExplanation": report.risk_explanation,
            "injectiveContext": report.injective_context,
            "suggestedNextSteps": report.suggested_next_steps or [],
            "modelName": report.model_name,
        },
    }
