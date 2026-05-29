"""Pydantic request/response schemas for analysis endpoints."""
from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    walletAddress: str = Field(min_length=4, max_length=128)
    chain: str = "injective"
    saveResult: bool = False


class RiskScoreOut(BaseModel):
    score: int
    level: str
    dimensions: dict
    methodologyVersion: str


class PortfolioOut(BaseModel):
    totalValueUsd: float
    tokenCount: int
    holdings: list


class AIReportOut(BaseModel):
    summary: str | None
    concentrationAnalysis: str | None
    riskExplanation: str | None
    injectiveContext: str | None
    suggestedNextSteps: list[str]
    modelName: str | None


class AnalysisOut(BaseModel):
    id: str
    walletAddress: str
    chain: str
    status: str
    dataSource: str | None
    portfolio: PortfolioOut
    riskScore: RiskScoreOut | None
    aiReport: AIReportOut | None
