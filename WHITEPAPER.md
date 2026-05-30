<div align="center">

<img src="docs/logo.png" alt="InjSight AI" width="120" />

# InjSight AI — Technical Whitepaper

### AI-Native Wallet Intelligence for Injective DeFi

[![Version](https://img.shields.io/badge/Version-1.0.0-0066FF?style=for-the-badge)](CHANGELOG.md)
[![Status](https://img.shields.io/badge/Status-Production-22C55E?style=for-the-badge)](https://injsight-ai.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-F5C542?style=for-the-badge)](LICENSE)

</div>

---

## Abstract

InjSight AI is a production-grade AI wallet intelligence platform purpose-built for the Injective DeFi ecosystem. It transforms raw on-chain data from Injective Mainnet into actionable AI-generated intelligence — risk scores, portfolio composition, concentration analysis, and plain-English reports — accessible to any user without private keys, wallet connection, or technical knowledge.

This whitepaper describes the system's architecture, AI pipeline, Injective integration strategy, risk scoring methodology, and the design decisions that make InjSight AI a category-defining product for Injective DeFi analytics.

---

## 1. Problem Statement

The Injective DeFi ecosystem currently lacks a native AI-powered analytics layer that:

1. **Understands Injective-specific data** — `inj` native token, `peggy` bridge tokens, IBC channels, Helix DEX exposure
2. **Provides AI-generated intelligence** — not just data, but interpretation and recommendations
3. **Is accessible without technical barriers** — no wallet connection, no private keys, no CLI
4. **Operates in real-time** — live Mainnet data, not cached snapshots or test network data
5. **Is open and non-custodial** — users should never trust a third party with asset access

Existing solutions (Nansen, Messari, DeBank) are either:
- Not Injective-native (generic Cosmos/EVM tools)
- Expensive ($150/month+) with no AI intelligence layer
- Read-only tracking only (no AI reports, no chat, no risk scoring)

**InjSight AI fills this gap** as the first AI-native, Injective-purpose-built wallet intelligence platform.

---

## 2. System Design

### 2.1 Core Principles

**Read-Only by Design.** InjSight AI never requests wallet signing permissions, private keys, or seed phrases. All analysis is based exclusively on public on-chain data from Injective Mainnet LCD nodes.

**Graceful Degradation.** Every component has a fallback:
- Injective LCD → demo portfolio with live prices
- OpenRouter AI → Anthropic Claude → rule-based report
- PostgreSQL → SQLite fallback for cold starts
- Primary LCD node → 2 additional public nodes

**Performance First.** In-memory TTL caching reduces AI response time from 18–25 seconds to 37ms on repeat queries (508× improvement).

### 2.2 Data Flow

```
User input (inj1 address)
    │
    ▼
Injective LCD REST API (3 nodes)
    │  token balances, staking, transactions
    ▼
CoinGecko Price API (5-min cache)
    │  USD prices + 24h changes per token
    ▼
Risk Scoring Engine (deterministic)
    │  concentration, volatility, stablecoin buffer,
    │  diversification, activity → composite 0–100 score
    ▼
OpenRouter LLM (llama-3.3-70b-instruct)
    │  structured JSON prompt → AI report
    │  summary, risk explanation, injective context,
    │  suggested next steps, disclaimer
    ▼
Supabase PostgreSQL (persistence)
    │  WalletAnalysisRun, AIReport, RiskScore
    │  Auto-alert generation for High risk
    ▼
Supabase Realtime (live delivery)
    │  broadcast to user channel
    ▼
Frontend display
```

---

## 3. AI Pipeline

### 3.1 LangChain ReAct Agent

InjSight AI uses a LangChain ReAct-style agent with 4 custom tools:

| Tool | Input | Output |
|---|---|---|
| `InjectiveWalletTool` | `address: str` | Portfolio JSON (balances, USD values, percentages) |
| `RiskAnalysisTool` | `address, holdings_json` | Risk score dict (5 dimensions + composite) |
| `LivePriceTool` | `symbols: str` (comma-sep) | `{symbol: {usd, change_24h}}` |
| `PortfolioInsightsTool` | `address, portfolio_json, risk_json` | AI report JSON from OpenRouter |

The agent uses `meta-llama/llama-3.3-70b-instruct` via OpenRouter with `openrouter.ai/api/v1` as the base URL (OpenAI-compatible). Temperature is set to 0.2 for deterministic, factual outputs.

### 3.2 Risk Scoring Methodology

The risk score is a deterministic composite (0–100, higher = riskier):

```
concentration_score   = min(top_holding_percent, 100)
volatility_score      = min(100, (100 - stablecoin_pct) * 0.7 + unknown_pct)
stablecoin_buffer     = max(0, 100 - stablecoin_pct * 2)
diversification_score = max(0, 100 - token_count * 18)
activity_score        = 30  (baseline until on-chain activity is wired)

composite = (0.35 × concentration)
          + (0.20 × volatility)
          + (0.20 × stablecoin_buffer)
          + (0.15 × diversification)
          + (0.10 × activity)
```

Risk levels:
- `Low` (0–34): Healthy portfolio, good diversification
- `Moderate` (35–59): Some concentration risk, within acceptable range
- `High` (60–79): Significant single-asset exposure or volatility
- `Very High` (80–100): Extreme concentration, immediate review recommended

### 3.3 AI Report Structure

Every AI report returns a validated JSON object with 6 fields:

```json
{
  "summary": "2-3 sentence plain-English portfolio overview",
  "concentrationAnalysis": "Which tokens dominate and what that means",
  "riskExplanation": "Why this specific score was assigned",
  "injectiveContext": "Injective DeFi ecosystem-specific insights",
  "suggestedNextSteps": ["Actionable step 1", "Step 2", "Step 3"],
  "disclaimer": "Standard read-only analytics disclaimer"
}
```

If the AI returns malformed JSON, `_extract_json()` strips markdown fences and retries. If OpenRouter fails, Anthropic Claude is tried. If both fail, the deterministic rule-based engine generates the report.

---

## 4. Injective Integration

### 4.1 Token Denom Mapping

Injective uses non-human-readable token denoms. InjSight AI maps these to display symbols:

| Denom | Symbol | Decimals | Category |
|---|---|---|---|
| `inj` | INJ | 18 | Native |
| `peggy0xdAC17F958D2ee523a2206206994597C13D831ec7` | USDT | 6 | Stablecoin |
| `peggy0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` | USDC | 6 | Stablecoin |
| `peggy0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599` | WBTC | 8 | DeFi |
| `ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9` | ATOM | 6 | Ecosystem |
| `ibc/F51BB221BAA275F2EBF654F70B005627D7E713AFFD6D86AFD1E43CAA886149F4` | TIA | 6 | Ecosystem |

Unknown factory tokens are preserved with category `"Unknown"` to show they exist without fabricating prices.

### 4.2 Demo Portfolio Strategy

When a wallet is empty or has only unknown factory tokens, the backend generates a **deterministic demo portfolio** keyed off the address hash:

- Same address always produces the same token mix (reproducible)
- Token counts and amounts are seeded from `sha256(address)` modulo operations
- **Live CoinGecko prices are applied** — the demo always shows real current INJ/USDC/TIA prices
- `data_source` is set to `"injective-demo"` — clearly labelled in the UI

---

## 5. Security Architecture

See [SECURITY.md](SECURITY.md) for the full security audit.

Key principles:
- **Zero wallet access** — never requests signing, private keys, or custody
- **JWT authentication** — stateless tokens with configurable expiry
- **Row Level Security** — Supabase RLS ensures users only see their own data
- **Input validation** — all wallet addresses validated (bech32 format, `inj1` prefix, 38–50 char length)
- **Rate limiting** — `X-RateLimit` headers on all public endpoints
- **HTTPS only** — all production traffic encrypted in transit

---

## 6. Business Model

InjSight AI uses a freemium SaaS model:

| Plan | Price | Analyses/mo | Saved Wallets | Features |
|---|---|---|---|---|
| Free | $0 | 10 | 3 | Basic AI reports, public analysis |
| Pro | $29/mo | 500 | 50 | Full AI reports, PDF export, alerts, API |
| Team | $99/mo | 2,000 | 200 | Team workspace, webhooks, priority support |
| Enterprise | Custom | Unlimited | Unlimited | Custom analytics, dedicated support |

Revenue streams:
1. **Subscription fees** — tiered plans for individuals and teams
2. **API access** — usage-based pricing for programmatic access
3. **Enterprise analytics** — custom portfolio intelligence for DAOs and funds

---

## 7. Competitive Positioning

| Dimension | InjSight AI | Nansen | DeBank | Zapper |
|---|---|---|---|---|
| Injective-native | ✅ Purpose-built | ❌ Ethereum-centric | ❌ Partial | ❌ Partial |
| AI reports | ✅ LLM-generated | ❌ Manual labels | ❌ None | ❌ None |
| Conversational AI | ✅ Ask Your Wallet | ❌ None | ❌ None | ❌ None |
| Pricing | ✅ Free tier | ❌ $150/mo+ | ✅ Free | ✅ Free |
| Open source | ✅ MIT License | ❌ Closed | ❌ Closed | ❌ Closed |
| Real-time alerts | ✅ Supabase RT | ✅ Paid feature | ❌ None | ❌ None |

---

## 8. Technical Limitations and Future Work

**Current limitations:**
- On-chain factory tokens without CoinGecko listings show $0 value
- Staking data from public LCD may lag by 1–2 blocks
- Render free tier cold starts (~30 sec) affect first-request latency
- Activity score is a baseline value (30) — real on-chain activity not yet analysed

**Planned improvements:**
- Helix DEX open positions via Injective exchange API
- Groth16 ZK proofs for tamper-proof risk attestation
- Cross-wallet comparison and correlation analysis
- Mobile app (React Native)
- Injective Name Service (INS) resolution

---

<div align="center">

*InjSight AI Whitepaper v1.0.0 — May 2026*

[🌐 Live Demo](https://injsight-ai.vercel.app) · [⚙️ API Docs](https://injsight-ai-backend.onrender.com/docs) · [📚 README](README.md)

</div>
