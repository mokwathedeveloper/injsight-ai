"""
Risk scoring engine.
Entry point for risk computation; delegates to app.ai.service.
"""
from app.ai.service import compute_risk as _compute_risk
from app.ai.service import METHODOLOGY_VERSION


def score_wallet(normalized: dict) -> dict:
    """
    Compute a deterministic risk score for a normalised wallet portfolio.

    Returns:
        score           0-100 integer (higher = riskier)
        risk_level      "Low" | "Moderate" | "High" | "Very High"
        concentration_score, volatility_score, stablecoin_buffer_score,
        activity_score, diversification_score  (each 0-100)
        methodology_version
    """
    return _compute_risk(normalized)


__all__ = ["score_wallet", "METHODOLOGY_VERSION"]
