"""
OpenRouter AI service for InjSight AI.

Uses OpenRouter's OpenAI-compatible API to generate:
- Wallet intelligence reports
- Risk explanations
- Portfolio insights
- Conversational wallet Q&A

OpenRouter gives access to 100+ models from one API key.
We default to a fast, cost-effective model and allow override.
"""
from __future__ import annotations

import json
import logging
import os
import re
from typing import Any

logger = logging.getLogger(__name__)

# ── Model configuration ───────────────────────────────────────────────────────
# Primary: fast + cheap for wallet analysis
DEFAULT_MODEL        = "meta-llama/llama-3.3-70b-instruct"
# Fallback: reliable OpenAI
FALLBACK_MODEL       = "openai/gpt-4o-mini"
# Premium: for detailed reports
PREMIUM_MODEL        = "anthropic/claude-3.5-haiku"

OPENROUTER_BASE_URL  = "https://openrouter.ai/api/v1"
SITE_URL             = "https://injsight.ai"
SITE_NAME            = "InjSight AI"

# ── JSON schema the AI must return ───────────────────────────────────────────
REPORT_JSON_SCHEMA = {
    "type": "object",
    "required": ["summary", "concentrationAnalysis", "riskExplanation",
                 "injectiveContext", "suggestedNextSteps", "disclaimer"],
    "properties": {
        "summary":               {"type": "string"},
        "concentrationAnalysis": {"type": "string"},
        "riskExplanation":       {"type": "string"},
        "injectiveContext":      {"type": "string"},
        "suggestedNextSteps":    {"type": "array", "items": {"type": "string"}},
        "disclaimer":            {"type": "string"},
    },
}


def _make_client() -> "Any | None":
    """Create OpenAI client pointed at OpenRouter. Returns None if not configured."""
    try:
        from openai import OpenAI  # type: ignore[import-untyped]
    except ImportError:
        logger.warning("openai package not installed")
        return None

    from app.config import settings
    api_key = settings.openrouter_api_key or os.getenv("OPENROUTER_API_KEY", "")
    if not api_key:
        logger.info("OPENROUTER_API_KEY not set — OpenRouter disabled")
        return None

    return OpenAI(
        base_url=OPENROUTER_BASE_URL,
        api_key=api_key,
        default_headers={
            "HTTP-Referer": SITE_URL,
            "X-Title":      SITE_NAME,
        },
    )


def _extract_json(text: str) -> dict | None:
    """Extract JSON from LLM output that may include markdown fences."""
    # Strip ```json ... ``` fences
    clean = re.sub(r"```(?:json)?\s*", "", text).strip().rstrip("`").strip()
    # Find first { ... }
    start = clean.find("{")
    end   = clean.rfind("}") + 1
    if start == -1 or end == 0:
        return None
    try:
        return json.loads(clean[start:end])
    except json.JSONDecodeError:
        return None


def generate_wallet_report(
    normalized: dict,
    risk: dict,
    model: str = DEFAULT_MODEL,
) -> dict | None:
    """
    Generate an AI wallet intelligence report via OpenRouter.

    Returns the parsed JSON dict or None on failure.
    Callers must fall back to rule-based generation if None is returned.
    """
    client = _make_client()
    if client is None:
        return None

    holdings = normalized.get("holdings", [])
    top5 = holdings[:5]
    holdings_text = "\n".join(
        f"  - {h['symbol']}: {h['percent']:.1f}% (${h['value_usd']:,.2f})"
        for h in top5
    )

    prompt = f"""You are InjSight AI, a professional Injective DeFi wallet intelligence analyst.

Analyze the following wallet and produce a structured JSON report.

WALLET DATA:
- Address: {normalized.get('address', 'unknown')}
- Total Portfolio Value: ${normalized.get('total_value_usd', 0):,.2f}
- Token Count: {normalized.get('token_count', 0)}
- Data Source: {normalized.get('data_source', 'unknown')}

TOP HOLDINGS:
{holdings_text}

RISK ASSESSMENT:
- Overall Score: {risk.get('score', 0)}/100
- Risk Level: {risk.get('risk_level', 'Unknown')}
- Concentration Score: {risk.get('concentration_score', 0)}/100
- Volatility Score: {risk.get('volatility_score', 0)}/100
- Stablecoin Buffer Score: {risk.get('stablecoin_buffer_score', 0)}/100
- Diversification Score: {risk.get('diversification_score', 0)}/100

INSTRUCTIONS:
Return ONLY valid JSON matching this exact structure. No markdown, no extra text:
{{
  "summary": "2-3 sentence plain-English overview of the wallet and its risk profile",
  "concentrationAnalysis": "Analysis of asset concentration — which tokens dominate and what that means",
  "riskExplanation": "Clear explanation of why this wallet received this specific risk score",
  "injectiveContext": "Injective DeFi specific insights — INJ staking, Helix DEX exposure, ecosystem position",
  "suggestedNextSteps": ["Actionable step 1", "Actionable step 2", "Actionable step 3"],
  "disclaimer": "Standard read-only analytics disclaimer"
}}"""

    for attempt_model in [model, FALLBACK_MODEL]:
        try:
            response = client.chat.completions.create(
                model=attempt_model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000,
                temperature=0.3,
            )
            text = response.choices[0].message.content or ""
            result = _extract_json(text)
            if result and "summary" in result:
                logger.info("OpenRouter report generated via %s", attempt_model)
                return result
            logger.warning("OpenRouter %s returned non-JSON: %s", attempt_model, text[:200])
        except Exception as exc:
            logger.warning("OpenRouter %s failed: %s", attempt_model, exc)

    return None


def ask_wallet_openrouter(
    address: str,
    question: str,
    wallet_context: dict,
    conversation_history: list[dict],
    model: str = DEFAULT_MODEL,
) -> str:
    """
    Answer a user question about a wallet using OpenRouter.
    Returns the AI response text or a friendly error message.
    """
    client = _make_client()
    if client is None:
        return "AI chat is not available — OPENROUTER_API_KEY is not configured."

    risk  = wallet_context.get("risk", {})
    port  = wallet_context.get("portfolio", {})
    holdings = port.get("holdings", [])
    holdings_text = ", ".join(
        f"{h['symbol']} {h['percent']:.0f}%" for h in holdings[:5]
    )

    system = f"""You are InjSight AI, an expert Injective DeFi wallet analyst. You are answering questions about a specific wallet.

WALLET CONTEXT:
- Address: {address}
- Portfolio Value: ${port.get('totalValueUsd', 0):,.2f}
- Risk Score: {risk.get('score', 'N/A')}/100 ({risk.get('level', 'Unknown')})
- Top Holdings: {holdings_text}
- Data Source: {port.get('dataSource', 'unknown')}

RULES:
- Be specific and reference actual wallet data
- Keep responses under 120 words
- Never give financial advice or trading recommendations
- Always mention this is read-only, non-custodial analytics
- If asked about private keys or trading, politely decline"""

    # Last 6 turns only to stay within context limits
    messages = [{"role": "system", "content": system}]
    messages.extend(conversation_history[-6:])
    messages.append({"role": "user", "content": question})

    for attempt_model in [model, FALLBACK_MODEL]:
        try:
            response = client.chat.completions.create(
                model=attempt_model,
                messages=messages,
                max_tokens=250,
                temperature=0.5,
            )
            return response.choices[0].message.content or "No response generated."
        except Exception as exc:
            logger.warning("OpenRouter chat %s failed: %s", attempt_model, exc)

    return "I'm having trouble connecting to the AI right now. Please try again in a moment."
