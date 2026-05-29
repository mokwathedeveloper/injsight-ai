"""FastAPI application factory for InjSight AI."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401  (ensures models are registered on Base)
from app.alerts.router import router as alerts_router
from app.analysis.router import public_router, router as analysis_router
from app.auth.router import router as auth_router
from app.admin.router import router as admin_router
from app.billing.router import router as billing_router
from app.common.responses import APIError, api_error_handler, ok
from app.config import settings
from app.db import Base, engine
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
