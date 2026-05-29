"""AI report endpoints."""
import json

from fastapi import APIRouter, Depends
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import AIReport, User

router = APIRouter(prefix="/api/reports", tags=["reports"])


def serialize_report(r: AIReport) -> dict:
    return {
        "id": str(r.id),
        "analysisRunId": str(r.analysis_run_id),
        "walletAddress": r.wallet_address,
        "summary": r.summary,
        "concentrationAnalysis": r.concentration_analysis,
        "riskExplanation": r.risk_explanation,
        "injectiveContext": r.injective_context,
        "suggestedNextSteps": r.suggested_next_steps or [],
        "modelName": r.model_name,
        "createdAt": r.created_at,
    }


def _owned(db: Session, report_id: str, user: User) -> AIReport:
    report = db.get(AIReport, report_id)
    if not report or str(report.user_id) != str(user.id):
        raise APIError("NOT_FOUND", "Report not found.", 404)
    return report


@router.get("")
def list_reports(db: Session = Depends(get_db), user: User = Depends(current_user)):
    reports = db.query(AIReport).filter(AIReport.user_id == str(user.id)).order_by(AIReport.created_at.desc()).all()
    return ok([serialize_report(r) for r in reports])


@router.get("/{report_id}")
def get_report(report_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    return ok(serialize_report(_owned(db, report_id, user)))


@router.post("/{report_id}/export")
def export_report(report_id: str, format: str = "json", db: Session = Depends(get_db), user: User = Depends(current_user)):
    report = _owned(db, report_id, user)
    if format == "markdown":
        md = (
            f"# InjSight AI Wallet Report\n\n**Wallet:** `{report.wallet_address}`\n\n"
            f"## Summary\n{report.summary}\n\n## Concentration\n{report.concentration_analysis}\n\n"
            f"## Risk\n{report.risk_explanation}\n\n## Injective Context\n{report.injective_context}\n\n"
            "## Suggested Next Steps\n" + "\n".join(f"- {s}" for s in (report.suggested_next_steps or [])) +
            "\n\n_Informational only — not financial advice._\n"
        )
        return PlainTextResponse(md, media_type="text/markdown")
    return PlainTextResponse(
        json.dumps(report.full_report or serialize_report(report), indent=2, default=str),
        media_type="application/json",
    )


@router.delete("/{report_id}")
def delete_report(report_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    report = _owned(db, report_id, user)
    db.delete(report)
    db.commit()
    return ok(None, "Report deleted.")
