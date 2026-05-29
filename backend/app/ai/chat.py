"""AI chat endpoint for Ask Your Wallet feature.

Provides a stateless Q&A interface over a wallet's live on-chain data.
Requires ANTHROPIC_API_KEY to be set in the environment; returns a friendly
error message when the key is absent.
"""
from __future__ import annotations

import logging
import os

from app.ai.service import compute_risk
from app.integrations.injective.service import fetch_wallet_data

logger = logging.getLogger(__name__)

_MAX_HISTORY = 6  # last N turns kept for context


def ask_wallet(address: str, question: str, conversation_history: list[dict]) -> str:
    """Answer a natural-language question about *address* using Claude.

    Parameters
    ----------
    address:
        Injective wallet address (inj1…).
    question:
        The user's question string.
    conversation_history:
        List of ``{"role": "user"|"assistant", "content": "…"}`` dicts from
        previous turns. Only the last ``_MAX_HISTORY`` turns are forwarded to
        keep token usage low.

    Returns
    -------
    str
        Claude's answer, or a fallback message if the API is unavailable.
    """
    api_key = os.getenv("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        return (
            "The AI chat feature requires an Anthropic API key. "
            "Please set ANTHROPIC_API_KEY in your environment and restart the server."
        )

    try:
        import anthropic

        # Fetch live wallet context
        wallet_data = fetch_wallet_data(address)
        risk = compute_risk(wallet_data)

        holdings_summary = ", ".join(
            f"{h['symbol']} {h['percent']}%"
            for h in wallet_data["holdings"][:5]
        ) or "No holdings found"

        context = (
            f"Wallet: {address}\n"
            f"Total Value: ${wallet_data['total_value_usd']:,.2f}\n"
            f"Risk Score: {risk['score']}/100 ({risk['risk_level']})\n"
            f"Token Count: {wallet_data['token_count']}\n"
            f"Holdings: {holdings_summary}"
        )

        system = (
            "You are InjSight AI, an expert Injective DeFi wallet analyst.\n"
            "You are answering questions about a specific wallet.\n\n"
            f"WALLET CONTEXT:\n{context}\n\n"
            "Rules:\n"
            "- Be concise and specific\n"
            "- Reference actual wallet data in answers\n"
            "- Never provide financial advice or trading recommendations\n"
            "- Always note you are read-only and non-custodial\n"
            "- Keep responses under 150 words"
        )

        # Trim history and append the new user turn
        trimmed_history = conversation_history[-_MAX_HISTORY:]
        messages = trimmed_history + [{"role": "user", "content": question}]

        client = anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            system=system,
            messages=messages,
        )
        return response.content[0].text

    except Exception as exc:
        logger.warning("ask_wallet failed for %s: %s", address, exc)
        return (
            "I encountered an error while fetching wallet data or contacting the AI service. "
            "Please try again in a moment."
        )
