"""AI chat endpoint — Ask Your Wallet feature.

Provider priority:
1. OpenRouter (primary — uses sk-or-v1-... key)
2. Anthropic Claude (secondary fallback)
3. Friendly error message (no AI configured)
"""
from __future__ import annotations

import logging
import os

from app.ai.service import compute_risk
from app.integrations.injective.service import fetch_wallet_data

logger = logging.getLogger(__name__)

_MAX_HISTORY = 6


def ask_wallet(address: str, question: str, conversation_history: list[dict]) -> str:
    """Answer a natural-language question about *address* using the best available AI.

    Tries OpenRouter first, then Anthropic, then returns a friendly error.
    """
    # Fetch live wallet context for both providers
    try:
        wallet_data = fetch_wallet_data(address)
        risk        = compute_risk(wallet_data)
    except Exception as exc:
        logger.warning("ask_wallet data fetch failed for %s: %s", address, exc)
        return "I couldn't fetch data for this wallet right now. Please try again."

    holdings_summary = ", ".join(
        f"{h['symbol']} {h['percent']:.0f}%"
        for h in wallet_data["holdings"][:5]
    ) or "No holdings found"

    wallet_context = {
        "portfolio": {
            "totalValueUsd": wallet_data["total_value_usd"],
            "tokenCount":    wallet_data["token_count"],
            "holdings":      wallet_data["holdings"],
            "dataSource":    wallet_data.get("data_source", "unknown"),
        },
        "risk": {
            "score": risk["score"],
            "level": risk["risk_level"],
        },
    }

    # 1. Try OpenRouter
    from app.config import settings
    openrouter_key = (settings.openrouter_api_key or os.getenv("OPENROUTER_API_KEY", "")).strip()
    if openrouter_key:
        try:
            from app.ai.openrouter_service import ask_wallet_openrouter
            answer = ask_wallet_openrouter(
                address=address,
                question=question,
                wallet_context=wallet_context,
                conversation_history=conversation_history[-_MAX_HISTORY:],
            )
            if answer and not answer.startswith("AI chat is not available"):
                return answer
        except Exception as exc:
            logger.warning("OpenRouter chat failed: %s", exc)

    # 2. Try Anthropic Claude
    anthropic_key = (settings.anthropic_api_key or os.getenv("ANTHROPIC_API_KEY", "")).strip()
    if anthropic_key:
        try:
            import anthropic

            system = (
                "You are InjSight AI, an expert Injective DeFi wallet analyst.\n"
                "You are answering questions about a specific wallet.\n\n"
                f"WALLET CONTEXT:\n"
                f"Address: {address}\n"
                f"Total Value: ${wallet_data['total_value_usd']:,.2f}\n"
                f"Risk Score: {risk['score']}/100 ({risk['risk_level']})\n"
                f"Holdings: {holdings_summary}\n\n"
                "Rules:\n"
                "- Be concise and reference actual data\n"
                "- Keep responses under 150 words\n"
                "- Never give financial advice\n"
                "- Read-only, non-custodial platform"
            )
            trimmed = conversation_history[-_MAX_HISTORY:]
            messages = trimmed + [{"role": "user", "content": question}]

            client = anthropic.Anthropic(api_key=anthropic_key)
            response = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=300,
                system=system,
                messages=messages,
            )
            return response.content[0].text
        except Exception as exc:
            logger.warning("Anthropic chat fallback failed: %s", exc)

    # 3. No AI configured
    return (
        "AI chat requires an API key. Please set OPENROUTER_API_KEY "
        "(or ANTHROPIC_API_KEY) in your environment and restart the server."
    )
