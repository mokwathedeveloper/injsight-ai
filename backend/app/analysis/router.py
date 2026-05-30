"""Public and authenticated analysis endpoints."""
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.analysis.service import run_analysis, serialize_analysis
from app.auth.dependencies import current_user, optional_current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User, WalletAnalysisRun

public_router = APIRouter(prefix="/api/public", tags=["public"])
router = APIRouter(prefix="/api/analysis", tags=["analysis"])

DEMO_ADDRESS = "inj1demo0wallet0showcase0portfolio0analysis00x1"


class AnalyzeRequest(BaseModel):
    walletAddress: str = Field(min_length=4, max_length=128)
    chain: str = "injective"
    saveResult: bool = False


@public_router.post("/analyze-wallet")
def public_analyze(
    body: AnalyzeRequest,
    db: Session = Depends(get_db),
    user: User | None = Depends(optional_current_user),
):
    """Public analysis with caching — same address returns cached result for 3 min."""
    from app.core.cache import get as cache_get, set as cache_set, ANALYSIS_TTL

    cache_key = f"analysis:{body.walletAddress.lower()}"
    cached = cache_get(cache_key)
    if cached is not None:
        # Still persist for authenticated users if not already saved
        return ok(cached, "Wallet analysis complete (cached).")

    persist = user is not None
    user_id = str(user.id) if user else None
    run     = run_analysis(db, body.walletAddress, user_id=user_id, persist=persist, create_alert=persist)
    result  = serialize_analysis(run)
    # Cache only completed analyses (not failures)
    if result.get("status") == "completed":
        cache_set(cache_key, result, ANALYSIS_TTL)
    return ok(result, "Wallet analysis complete.")


@public_router.get("/demo-wallet")
def demo_wallet(db: Session = Depends(get_db)):
    run = run_analysis(db, DEMO_ADDRESS, persist=False)
    return ok(serialize_analysis(run), "Demo wallet analysis.")


@router.post("")
def create_analysis(
    body: AnalyzeRequest,
    db: Session = Depends(get_db),
    user: User | None = Depends(optional_current_user),
):
    persist = bool(user) and body.saveResult
    run = run_analysis(
        db,
        body.walletAddress,
        user_id=str(user.id) if user else None,
        persist=persist,
    )
    return ok(serialize_analysis(run), "Analysis complete.")


@router.get("")
def list_analyses(db: Session = Depends(get_db), user: User = Depends(current_user)):
    runs = (
        db.query(WalletAnalysisRun)
        .filter(WalletAnalysisRun.user_id == str(user.id))
        .order_by(WalletAnalysisRun.created_at.desc())
        .all()
    )
    return ok([serialize_analysis(r) for r in runs])


@router.get("/{analysis_id}")
def get_analysis(analysis_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    run = db.get(WalletAnalysisRun, analysis_id)
    if not run or str(run.user_id) != str(user.id):
        raise APIError("NOT_FOUND", "Analysis not found.", 404)
    return ok(serialize_analysis(run))


@router.delete("/{analysis_id}")
def delete_analysis(analysis_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    run = db.get(WalletAnalysisRun, analysis_id)
    if not run or str(run.user_id) != str(user.id):
        raise APIError("NOT_FOUND", "Analysis not found.", 404)
    db.delete(run)
    db.commit()
    return ok(None, "Analysis deleted.")
