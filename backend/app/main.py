"""FastAPI application factory for InjSight AI."""
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app import models  # noqa: F401  (ensures models are registered on Base)
from app.alerts.router import router as alerts_router
from app.analysis.router import public_router, router as analysis_router
from app.auth.router import router as auth_router
from app.admin.router import router as admin_router
from app.billing.router import router as billing_router
from app.common.responses import APIError, api_error_handler, ok
from app.config import settings
from app.db import Base, engine, get_db
from app.developer.router import api_keys_router, webhooks_router
from app.reports.router import router as reports_router
from app.teams.router import router as teams_router
from app.treasury.router import router as treasury_router
from app.users.router import router as users_router
from app.wallets.router import router as wallets_router


def create_app() -> FastAPI:
    app = FastAPI(title="InjSight AI API", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_exception_handler(APIError, api_error_handler)

    @app.on_event("startup")
    def _startup() -> None:
        # For SQLite/dev convenience, ensure tables exist. Production uses Alembic.
        if settings.database_url.startswith("sqlite"):
            Base.metadata.create_all(bind=engine)

    @app.get("/api/health", tags=["public"])
    def health():
        return {"status": "ok", "service": settings.service_name}

    # ------------------------------------------------------------------
    # AI Chat — "Ask Your Wallet"
    # ------------------------------------------------------------------

    class ChatRequest(BaseModel):
        address: str = Field(min_length=4, max_length=128)
        question: str = Field(min_length=1, max_length=1000)
        history: list[dict] = Field(default_factory=list)

    @app.post("/api/v1/ai/chat", tags=["ai"])
    def ai_chat(body: ChatRequest):
        """Answer a natural-language question about a wallet using Claude AI."""
        from app.ai.chat import ask_wallet
        answer = ask_wallet(body.address, body.question, body.history)
        return ok({"answer": answer, "address": body.address})

    # ------------------------------------------------------------------
    # Dashboard summary
    # ------------------------------------------------------------------

    @app.get("/api/v1/dashboard/summary", tags=["dashboard"])
    def dashboard_summary(db: Session = Depends(get_db)):
        """Return aggregate statistics for the dashboard."""
        from app.models import WalletAnalysisRun, RiskScore, Wallet, Alert

        total_analyses = db.query(WalletAnalysisRun).count()

        avg_risk_raw = (
            db.query(RiskScore)
            .with_entities(RiskScore.score)
            .all()
        )
        avg_risk_score = (
            round(sum(r.score for r in avg_risk_raw) / len(avg_risk_raw), 1)
            if avg_risk_raw
            else 0
        )

        saved_wallets = db.query(Wallet).count()
        active_alerts = db.query(Alert).filter(Alert.is_read.is_(False)).count()

        recent_runs = (
            db.query(WalletAnalysisRun)
            .filter(WalletAnalysisRun.status == "completed")
            .order_by(WalletAnalysisRun.created_at.desc())
            .limit(5)
            .all()
        )

        recent_analyses = [
            {
                "id": str(r.id),
                "walletAddress": r.wallet_address,
                "chain": r.chain,
                "createdAt": r.created_at,
                "totalValueUsd": (r.normalized_data or {}).get("total_value_usd"),
            }
            for r in recent_runs
        ]

        return ok(
            {
                "total_analyses": total_analyses,
                "avg_risk_score": avg_risk_score,
                "saved_wallets": saved_wallets,
                "active_alerts": active_alerts,
                "recent_analyses": recent_analyses,
            }
        )

    # ------------------------------------------------------------------
    # Existing routers
    # ------------------------------------------------------------------

    app.include_router(auth_router)
    app.include_router(users_router)
    app.include_router(public_router)
    app.include_router(analysis_router)
    app.include_router(wallets_router)
    app.include_router(reports_router)
    app.include_router(alerts_router)
    app.include_router(billing_router)
    app.include_router(teams_router)
    app.include_router(treasury_router)
    app.include_router(api_keys_router)
    app.include_router(webhooks_router)
    app.include_router(admin_router)

    return app


app = create_app()
