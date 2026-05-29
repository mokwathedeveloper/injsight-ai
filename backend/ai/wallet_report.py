"""
AI wallet report generation.
This module is the entry point for AI-related report logic.
Delegates to app.ai.service for the current rule-based implementation;
swap for a real model provider call here without touching callers.
"""
from app.ai.service import generate_report as _generate

def generate_wallet_report(normalized: dict, risk: dict) -> dict:
    """
    Generate a plain-English AI wallet report from normalised portfolio data
    and a computed risk score.

    Returns the same structure as app.ai.service.generate_report.
    Callers should never depend on the underlying model choice.
    """
    return _generate(normalized, risk)
