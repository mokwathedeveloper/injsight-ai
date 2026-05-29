"""Risk scoring + AI report generation.

Risk scoring is deterministic and rule-based (auditable). The "AI report" is
templated narrative derived from the same signals. Swap `generate_report` for a
real model provider call without changing callers; keep the deterministic risk
score as the source of truth for the displayed number.
"""
MODEL_NAME = "injsight-rules-v1"
METHODOLOGY_VERSION = "v1"


def _level(score: int) -> str:
    if score < 35:
        return "Low"
    if score < 60:
        return "Moderate"
    if score < 80:
        return "High"
    return "Very High"


def compute_risk(normalized: dict) -> dict:
    holdings = normalized["holdings"]
    top = holdings[0] if holdings else None
    top_pct = top["percent"] if top else 0
    stable_pct = sum(h["percent"] for h in holdings if h["category"] == "Stablecoin")
    unknown_pct = sum(h["percent"] for h in holdings if h["category"] not in ("Native", "Stablecoin", "Ecosystem"))
    token_count = len(holdings)

    # Sub-scores (0-100, higher = riskier)
    concentration_score = min(int(top_pct), 100)
    diversification_score = max(0, 100 - token_count * 18)
    stablecoin_buffer_score = max(0, 100 - int(stable_pct) * 2)
    volatility_score = min(100, int((100 - stable_pct) * 0.7) + int(unknown_pct))
    activity_score = 30  # placeholder until on-chain activity is wired

    score = int(
        0.35 * concentration_score
        + 0.20 * volatility_score
        + 0.20 * stablecoin_buffer_score
        + 0.15 * diversification_score
        + 0.10 * activity_score
    )
    score = max(0, min(100, score))

    return {
        "score": score,
        "risk_level": _level(score),
        "concentration_score": concentration_score,
        "volatility_score": volatility_score,
        "stablecoin_buffer_score": stablecoin_buffer_score,
        "activity_score": activity_score,
        "diversification_score": diversification_score,
        "methodology_version": METHODOLOGY_VERSION,
    }


def generate_report(normalized: dict, risk: dict) -> dict:
    holdings = normalized["holdings"]
    top = holdings[0] if holdings else None
    stable_pct = sum(h["percent"] for h in holdings if h["category"] == "Stablecoin")
    top3 = sum(h["percent"] for h in holdings[:3])

    summary = (
        f"This wallet holds {normalized['token_count']} assets worth approximately "
        f"${normalized['total_value_usd']:,.0f}. "
        + (f"Its largest position is {top['symbol']} at {top['percent']}% of the portfolio. " if top else "")
        + "It is an active participant in the Injective ecosystem."
    )
    concentration_analysis = (
        f"The top 3 assets account for {top3:.0f}% of total value. "
        + ("This is a highly concentrated portfolio; a single-asset shock would move it significantly. "
           if top3 >= 80 else "Concentration is within a moderate range. ")
        + f"Stablecoins make up {stable_pct:.0f}%, providing a downside buffer."
    )
    risk_explanation = (
        f"Overall risk is {risk['risk_level']} ({risk['score']}/100). "
        f"The dominant factor is asset concentration ({risk['concentration_score']}/100), "
        f"followed by volatility exposure ({risk['volatility_score']}/100). "
        "No custodial or signing access is involved in this analysis."
    )
    injective_context = (
        "Pricing and categorization use Injective ecosystem references. Native INJ exposure is treated as "
        "medium-volatility; stablecoins as low-volatility; unverified tokens raise the risk profile."
    )
    next_steps = []
    if risk["concentration_score"] >= 50:
        next_steps.append("Consider reducing single-asset concentration to lower volatility risk.")
    if stable_pct < 15:
        next_steps.append("A larger stablecoin buffer could cushion market downturns.")
    next_steps.append("Set up risk-change alerts to monitor this wallet over time.")
    next_steps.append("Review any unverified tokens before relying on their valuations.")

    full = {
        "summary": summary,
        "concentrationAnalysis": concentration_analysis,
        "riskExplanation": risk_explanation,
        "injectiveContext": injective_context,
        "suggestedNextSteps": next_steps,
        "disclaimer": "Informational only — not financial advice. InjSight AI is read-only and non-custodial.",
    }
    return {
        "summary": summary,
        "concentration_analysis": concentration_analysis,
        "risk_explanation": risk_explanation,
        "injective_context": injective_context,
        "suggested_next_steps": next_steps,
        "full_report": full,
        "model_name": MODEL_NAME,
    }
