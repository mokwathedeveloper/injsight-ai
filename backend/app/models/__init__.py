"""SQLAlchemy ORM models for InjSight AI.

All models are defined here so Alembic's autogenerate and Base.metadata
see them via a single import (`from app import models`).
"""
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from app.common.types import GUID, new_uuid


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    name: Mapped[str | None] = mapped_column(String(120))
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    plan: Mapped[str] = mapped_column(String(50), default="free", nullable=False)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, onupdate=_utcnow)

    wallets: Mapped[list["Wallet"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    analyses: Mapped[list["WalletAnalysisRun"]] = relationship(back_populates="user")
    alerts: Mapped[list["Alert"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class Wallet(Base):
    __tablename__ = "wallets"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(GUID, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    address: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    chain: Mapped[str] = mapped_column(String(50), default="injective")
    label: Mapped[str | None] = mapped_column(String(120))
    is_demo: Mapped[bool] = mapped_column(Boolean, default=False)
    last_analyzed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow, onupdate=_utcnow)

    user: Mapped["User"] = relationship(back_populates="wallets")


class WalletAnalysisRun(Base):
    __tablename__ = "wallet_analysis_runs"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    user_id: Mapped[str | None] = mapped_column(GUID, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    wallet_id: Mapped[str | None] = mapped_column(GUID, ForeignKey("wallets.id", ondelete="SET NULL"), nullable=True)
    wallet_address: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    chain: Mapped[str] = mapped_column(String(50), default="injective")
    status: Mapped[str] = mapped_column(String(30), default="pending")
    data_source: Mapped[str | None] = mapped_column(String(120))
    normalized_data: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User | None"] = relationship(back_populates="analyses")
    report: Mapped["AIReport | None"] = relationship(back_populates="analysis_run", cascade="all, delete-orphan", uselist=False)
    risk_score: Mapped["RiskScore | None"] = relationship(back_populates="analysis_run", cascade="all, delete-orphan", uselist=False)


class AIReport(Base):
    __tablename__ = "ai_reports"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    analysis_run_id: Mapped[str] = mapped_column(GUID, ForeignKey("wallet_analysis_runs.id", ondelete="CASCADE"))
    user_id: Mapped[str | None] = mapped_column(GUID, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    wallet_address: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    summary: Mapped[str | None] = mapped_column(Text)
    concentration_analysis: Mapped[str | None] = mapped_column(Text)
    risk_explanation: Mapped[str | None] = mapped_column(Text)
    injective_context: Mapped[str | None] = mapped_column(Text)
    suggested_next_steps: Mapped[list | None] = mapped_column(JSON)
    full_report: Mapped[dict | None] = mapped_column(JSON)
    model_name: Mapped[str | None] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)

    analysis_run: Mapped["WalletAnalysisRun"] = relationship(back_populates="report")


class RiskScore(Base):
    __tablename__ = "risk_scores"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    analysis_run_id: Mapped[str] = mapped_column(GUID, ForeignKey("wallet_analysis_runs.id", ondelete="CASCADE"))
    wallet_address: Mapped[str] = mapped_column(String(128), nullable=False, index=True)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    risk_level: Mapped[str] = mapped_column(String(30), nullable=False)
    concentration_score: Mapped[int | None] = mapped_column(Integer)
    volatility_score: Mapped[int | None] = mapped_column(Integer)
    stablecoin_buffer_score: Mapped[int | None] = mapped_column(Integer)
    activity_score: Mapped[int | None] = mapped_column(Integer)
    diversification_score: Mapped[int | None] = mapped_column(Integer)
    methodology_version: Mapped[str | None] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)

    analysis_run: Mapped["WalletAnalysisRun"] = relationship(back_populates="risk_score")


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    user_id: Mapped[str] = mapped_column(GUID, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    wallet_address: Mapped[str | None] = mapped_column(String(128))
    type: Mapped[str] = mapped_column(String(50), default="info")
    severity: Mapped[str] = mapped_column(String(30), default="low")
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str | None] = mapped_column(Text)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)

    user: Mapped["User"] = relationship(back_populates="alerts")


class UsageEvent(Base):
    __tablename__ = "usage_events"

    id: Mapped[str] = mapped_column(GUID, primary_key=True, default=new_uuid)
    user_id: Mapped[str | None] = mapped_column(GUID, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    event_type: Mapped[str] = mapped_column(String(60), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_utcnow)


__all__ = ["User", "Wallet", "WalletAnalysisRun", "AIReport", "RiskScore", "Alert", "UsageEvent"]
