"""Pydantic schemas for wallet endpoints."""
from pydantic import BaseModel, Field


class SaveWalletRequest(BaseModel):
    walletAddress: str = Field(min_length=4, max_length=128)
    label: str | None = Field(default=None, max_length=120)
    chain: str = "injective"


class UpdateWalletRequest(BaseModel):
    label: str = Field(max_length=120)


class WalletOut(BaseModel):
    id: str
    address: str
    chain: str
    label: str | None
    isDemo: bool
    lastAnalyzedAt: str | None
    createdAt: str
    riskScore: int | None
    riskLevel: str | None
    totalValueUsd: float | None
