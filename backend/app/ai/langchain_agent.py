"""
LangChain agent for InjSight AI.

Implements a ReAct-style agent that uses tools to:
1. Fetch real Injective wallet data
2. Compute risk scores
3. Get live token prices
4. Generate structured AI analysis
5. Provide multi-step reasoning for complex queries

The agent uses OpenRouter (OpenAI-compatible) as the LLM backend.
"""
from __future__ import annotations

import json
import logging
import os
from typing import Any, Type

logger = logging.getLogger(__name__)

try:
    from langchain.tools import BaseTool
    from langchain_openai import ChatOpenAI
    from langchain.agents import AgentExecutor, create_openai_tools_agent
    from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
    from langchain_core.messages import AIMessage, HumanMessage
    from pydantic import BaseModel, Field
    _LANGCHAIN_AVAILABLE = True
except ImportError:
    _LANGCHAIN_AVAILABLE = False
    logger.warning("LangChain not installed — agent features disabled")


# ── Tool input schemas ────────────────────────────────────────────────────────

if _LANGCHAIN_AVAILABLE:
    class WalletDataInput(BaseModel):
        address: str = Field(description="Injective wallet address starting with inj1")

    class RiskInput(BaseModel):
        address: str        = Field(description="Injective wallet address")
        holdings_json: str  = Field(description="JSON array of token holdings from wallet fetch")

    class PriceInput(BaseModel):
        symbols: str = Field(description="Comma-separated token symbols e.g. INJ,ATOM,TIA")

    class AnalysisSummaryInput(BaseModel):
        address:        str = Field(description="Wallet address")
        portfolio_json: str = Field(description="Portfolio JSON from wallet fetch tool")
        risk_json:      str = Field(description="Risk JSON from risk analysis tool")


# ── Tools ─────────────────────────────────────────────────────────────────────

if _LANGCHAIN_AVAILABLE:
    class InjectiveWalletTool(BaseTool):
        name:        str = "fetch_injective_wallet"
        description: str = (
            "Fetch real on-chain token balances for an Injective wallet address. "
            "Returns portfolio composition with live USD values. "
            "Use this first for any wallet analysis."
        )
        args_schema: Type[BaseModel] = WalletDataInput

        def _run(self, address: str) -> str:
            try:
                from app.integrations.injective.service import fetch_wallet_data
                data = fetch_wallet_data(address)
                return json.dumps(data, indent=2)
            except Exception as exc:
                return json.dumps({"error": str(exc)})

        async def _arun(self, address: str) -> str:
            return self._run(address)

    class RiskAnalysisTool(BaseTool):
        name:        str = "compute_risk_score"
        description: str = (
            "Compute a detailed risk score for a wallet portfolio. "
            "Analyzes concentration, volatility, stablecoin buffer, "
            "diversification, and activity risk. Returns score 0-100."
        )
        args_schema: Type[BaseModel] = RiskInput

        def _run(self, address: str, holdings_json: str) -> str:
            try:
                holdings = json.loads(holdings_json)
                normalized = {
                    "address":          address,
                    "holdings":         holdings,
                    "token_count":      len(holdings),
                    "total_value_usd":  sum(h.get("value_usd", 0) for h in holdings),
                }
                from app.ai.service import compute_risk
                risk = compute_risk(normalized)
                return json.dumps(risk, indent=2)
            except Exception as exc:
                return json.dumps({"error": str(exc)})

        async def _arun(self, address: str, holdings_json: str) -> str:
            return self._run(address, holdings_json)

    class LivePriceTool(BaseTool):
        name:        str = "get_live_prices"
        description: str = (
            "Get real-time USD prices for Injective ecosystem tokens from CoinGecko. "
            "Use to verify current values or explain price impact."
        )
        args_schema: Type[BaseModel] = PriceInput

        def _run(self, symbols: str) -> str:
            symbol_map = {
                "INJ":  "injective-protocol",
                "ATOM": "cosmos",
                "TIA":  "celestia",
                "ETH":  "ethereum",
                "BTC":  "bitcoin",
                "USDT": "tether",
                "USDC": "usd-coin",
            }
            requested = [s.strip().upper() for s in symbols.split(",")]
            ids = ",".join(
                symbol_map[s] for s in requested if s in symbol_map
            )
            if not ids:
                return json.dumps({"error": "No recognised symbols"})

            try:
                import httpx
                r = httpx.get(
                    "https://api.coingecko.com/api/v3/simple/price",
                    params={"ids": ids, "vs_currencies": "usd", "include_24hr_change": "true"},
                    timeout=10,
                )
                r.raise_for_status()
                data = r.json()
                result = {}
                for sym in requested:
                    cg_id = symbol_map.get(sym)
                    if cg_id and cg_id in data:
                        result[sym] = {
                            "usd":        data[cg_id].get("usd", 0),
                            "change_24h": data[cg_id].get("usd_24h_change", 0),
                        }
                return json.dumps(result, indent=2)
            except Exception as exc:
                return json.dumps({"error": str(exc)})

        async def _arun(self, symbols: str) -> str:
            return self._run(symbols)

    class PortfolioInsightsTool(BaseTool):
        name:        str = "generate_portfolio_insights"
        description: str = (
            "Generate structured AI portfolio insights after all data has been fetched. "
            "Produces: summary, concentration analysis, risk explanation, next steps."
        )
        args_schema: Type[BaseModel] = AnalysisSummaryInput

        def _run(self, address: str, portfolio_json: str, risk_json: str) -> str:
            try:
                portfolio = json.loads(portfolio_json)
                risk      = json.loads(risk_json)
                from app.ai.openrouter_service import generate_wallet_report
                result = generate_wallet_report(portfolio, risk)
                if result:
                    return json.dumps(result, indent=2)
                # Fallback to rule-based
                from app.ai.service import generate_report
                fallback = generate_report(portfolio, risk)
                return json.dumps(fallback.get("full_report", fallback), indent=2)
            except Exception as exc:
                return json.dumps({"error": str(exc)})

        async def _arun(self, address: str, portfolio_json: str, risk_json: str) -> str:
            return self._run(address, portfolio_json, risk_json)


# ── Agent factory ─────────────────────────────────────────────────────────────

def _make_llm(model: str = "meta-llama/llama-3.3-70b-instruct") -> "ChatOpenAI | None":
    if not _LANGCHAIN_AVAILABLE:
        return None
    from app.config import settings
    api_key = settings.openrouter_api_key or os.getenv("OPENROUTER_API_KEY", "")
    if not api_key:
        return None
    try:
        return ChatOpenAI(
            model=model,
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
            temperature=0.2,
            max_tokens=2000,
            default_headers={
                "HTTP-Referer": "https://injsight.ai",
                "X-Title":      "InjSight AI",
            },
        )
    except Exception as exc:
        logger.warning("Failed to create LangChain LLM: %s", exc)
        return None


def get_analysis_agent() -> "AgentExecutor | None":
    """Return a LangChain agent with all wallet analysis tools."""
    if not _LANGCHAIN_AVAILABLE:
        return None

    llm = _make_llm()
    if llm is None:
        return None

    tools = [
        InjectiveWalletTool(),
        RiskAnalysisTool(),
        LivePriceTool(),
        PortfolioInsightsTool(),
    ]

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are InjSight AI, a professional Injective DeFi wallet intelligence system.

Your job is to analyze Injective wallets completely and accurately using the provided tools.

WORKFLOW for wallet analysis:
1. Use `fetch_injective_wallet` to get on-chain balances
2. Use `compute_risk_score` with the holdings data
3. Use `get_live_prices` if you need current token prices
4. Use `generate_portfolio_insights` with portfolio + risk data to create the final report

RULES:
- Always fetch real data before generating insights
- Never invent token balances or prices
- Be specific — reference actual holdings and percentages
- Keep analysis factual and professional
- InjSight is read-only — never suggest or execute trades
- All responses must be grounded in real on-chain data"""),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])

    try:
        agent = create_openai_tools_agent(llm, tools, prompt)
        return AgentExecutor(
            agent=agent,
            tools=tools,
            verbose=False,
            max_iterations=6,
            handle_parsing_errors=True,
            return_intermediate_steps=False,
        )
    except Exception as exc:
        logger.error("Failed to create agent: %s", exc)
        return None


def run_wallet_analysis_agent(address: str) -> dict:
    """
    Run the full LangChain agent workflow for wallet analysis.
    Falls back to direct service calls if agent is unavailable.
    """
    agent = get_analysis_agent()
    if agent is None:
        logger.info("Agent unavailable — using direct service calls")
        return _direct_analysis(address)

    try:
        result = agent.invoke({
            "input": f"""Perform a complete analysis of Injective wallet: {address}

Use the tools to:
1. Fetch the wallet's on-chain token balances
2. Compute its risk score
3. Generate portfolio insights and a structured report

Return a summary of your findings.""",
            "chat_history": [],
        })
        output = result.get("output", "")
        logger.info("Agent analysis complete for %s", address)
        # Still run direct analysis for structured data — agent is advisory
        return _direct_analysis(address)
    except Exception as exc:
        logger.warning("Agent failed for %s: %s — falling back to direct", address, exc)
        return _direct_analysis(address)


def _direct_analysis(address: str) -> dict:
    """Direct analysis without agent (always available)."""
    from app.integrations.injective.service import fetch_wallet_data
    from app.ai.service import compute_risk, generate_report
    from app.ai.openrouter_service import generate_wallet_report

    normalized = fetch_wallet_data(address)
    risk       = compute_risk(normalized)

    ai_report  = generate_wallet_report(normalized, risk)
    if ai_report is None:
        fallback   = generate_report(normalized, risk)
        ai_report  = fallback.get("full_report", {})

    return {
        "normalized": normalized,
        "risk":       risk,
        "ai_report":  ai_report,
    }
