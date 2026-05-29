<div align="center">

# InjSight AI

### The AI-Native Wallet Intelligence Platform for Injective DeFi

**Understand any Injective wallet in seconds. No private keys. No wallet connection.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?logo=fastapi)](https://fastapi.tiangolo.com)
[![Injective](https://img.shields.io/badge/Injective-Mainnet-0066FF)](https://injective.com)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter%20%2B%20LangChain-orange)](https://openrouter.ai)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E)](https://supabase.com)

[**Live Demo**](https://injsight-ai.vercel.app) · [**API Docs**](https://injsight-ai.railway.app/docs) · [**Twitter**](https://twitter.com/injsightai)

</div>

---

## The Problem

The Injective DeFi ecosystem has **$2B+ in on-chain activity**, yet there is no native AI-powered tool that lets a user understand a wallet's risk profile in plain English. 

Existing solutions:
- **Nansen / Messari** — expensive ($150/mo+), not Injective-native, no AI chat
- **DeBank** — portfolio tracking only, no risk intelligence, no AI
- **Injective Explorer** — raw data, no insights, not usable by non-technical users

**InjSight AI fills this gap** — the first AI-native wallet intelligence platform purpose-built for Injective.

---

## The Solution

Paste any `inj1...` wallet address. Get a complete AI intelligence report in under 10 seconds.

```
inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh
         ↓  (10 seconds)
✅ Portfolio: $12,450 across 3 tokens
✅ Risk Score: 53/100 — Moderate Risk
✅ AI Summary: "INJ at 64% is elevated. Stablecoin buffer of 24% is healthy..."
✅ Next Steps: ["Reduce INJ below 50%", "Consider ATOM for diversification"]
✅ Chat: "Why is INJ risky?" → AI answers in context
```

**No wallet connection. No private keys. 100% read-only.**

---

## How AI Powers InjSight

### Layer 1 — LangChain ReAct Agent

A multi-step reasoning agent that autonomously:
1. Fetches live on-chain data via `InjectiveWalletTool`
2. Computes risk via `RiskAnalysisTool` (concentration, volatility, stablecoin buffer, diversification)
3. Gets live prices via `LivePriceTool` (CoinGecko)
4. Generates intelligence via `PortfolioInsightsTool` (OpenRouter LLM)

### Layer 2 — OpenRouter AI (Production LLM)

- **Primary model:** `meta-llama/llama-3.3-70b-instruct`
- **Fallback:** `openai/gpt-4o-mini`
- **Output:** Structured JSON report — summary, risk explanation, Injective context, next steps
- **Graceful degradation:** deterministic rule-based engine when AI is unavailable

### Layer 3 — Ask Your Wallet (Conversational AI)

Real-time Q&A about any wallet. AI has full context: portfolio value, risk score, every token holding.

```
User: "Why is this wallet considered high risk?"
AI:   "The 64% INJ concentration is the primary factor. A 20% INJ price drop 
       would reduce the portfolio by $1,590. The stablecoin buffer of 24% 
       partially hedges this — but single-asset dominance creates elevated risk."
```

---

## Injective Integration

InjSight is purpose-built for Injective — not a generic portfolio tool retrofitted:

| Integration | Details |
|---|---|
| **Injective LCD REST API** | Live token balances from `lcd.injective.network` (3 fallback nodes) |
| **INJ Risk Model** | INJ-specific concentration thresholds based on ecosystem volatility |
| **Peggy Token Support** | USDT, USDC, WBTC via Injective's Ethereum bridge |
| **IBC Ecosystem** | ATOM, TIA, and all IBC tokens with correct decimals |
| **Helix DEX Context** | AI reports include Injective DEX exposure analysis |
| **Staking Awareness** | Detects staked INJ positions via LCD staking endpoints |
| **Injective AI Context** | Every report has an `injectiveContext` field — ecosystem-specific guidance |

---

## Features

<table>
<tr>
<td>

**Core Intelligence**
- 🔍 Real-time wallet analysis
- 📊 Multi-factor risk scoring (0–100)
- 🤖 AI-generated reports (OpenRouter)
- 💬 Ask Your Wallet chat
- 📈 Portfolio composition charts
- 🔄 Live CoinGecko prices

</td>
<td>

**Platform**
- 💾 Save & monitor wallets
- 🚨 Risk change alerts
- ⭐ Watchlist tracking
- 📋 Analysis history
- 📄 Weekly AI digest reports
- 🏦 Treasury monitoring

</td>
<td>

**Enterprise**
- 👥 Team workspaces
- 🔑 REST API access
- 🪝 Webhook alerts
- 📊 Admin analytics
- 🔐 JWT authentication
- ☁️ Supabase realtime

</td>
</tr>
</table>

---

## Architecture

```
                        ┌─────────────────────────────────┐
                        │         InjSight AI              │
                        └─────────────────────────────────┘
                                       │
               ┌───────────────────────┼───────────────────────┐
               ▼                       ▼                       ▼
    ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
    │  Next.js 14 App  │   │   FastAPI Server  │   │   AI Layer       │
    │                  │   │                  │   │                  │
    │  TypeScript      │◄──│  SQLAlchemy ORM  │   │  LangChain Agent │
    │  TanStack Query  │   │  PostgreSQL       │   │  4 Custom Tools  │
    │  Zustand Auth    │   │  JWT Auth         │   │  OpenRouter LLM  │
    │  Supabase RT     │   │  Alembic Migrate  │   │  Rule Fallback   │
    └──────────────────┘   └──────────────────┘   └──────────────────┘
             │                      │                       │
             ▼                      ▼                       ▼
    ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
    │ Vercel (Frontend)│   │ Railway (Backend) │   │  Injective LCD   │
    │ Supabase (DB/RT) │   │ Supabase (Postgres│   │  CoinGecko API   │
    └──────────────────┘   └──────────────────┘   └──────────────────┘
```

---

## Quick Start

### Option A — Docker (Recommended, 1 command)

```bash
git clone https://github.com/mokwathedeveloper/injsight-ai.git
cd injsight-ai && git checkout trunc

# Add your OpenRouter API key
echo "OPENROUTER_API_KEY=sk-or-v1-your-key-here" >> backend/.env

docker-compose up --build
# → Frontend: http://localhost:3000
# → Backend:  http://localhost:8000/docs
```

### Option B — Manual

**Backend**
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # edit: add OPENROUTER_API_KEY, DATABASE_URL
alembic upgrade head
uvicorn app.main:app --port 8000
```

**Frontend**
```bash
cd app
npm install
cp .env.example .env.local    # edit: set NEXT_PUBLIC_API_URL
npm run dev
# → http://localhost:3000
```

---

## API Reference

Base URL: `https://injsight-ai.railway.app/api`  
Interactive docs: `/docs`

```bash
# Analyze any wallet (no auth required)
curl -X POST /public/analyze-wallet \
  -d '{"walletAddress": "inj1qg5ega..."}'

# AI Chat about a wallet
curl -X POST /v1/ai/chat \
  -d '{"address": "inj1...", "question": "What is the biggest risk?"}'

# Get saved wallets (auth required)
curl -H "Authorization: Bearer {token}" /wallets
```

---

## Why InjSight AI Wins

| Metric | Competitors | InjSight AI |
|---|---|---|
| **Injective-native** | ❌ Generic tools | ✅ Built for Injective |
| **AI Reports** | ❌ Raw data only | ✅ Plain-English AI |
| **AI Chat** | ❌ None | ✅ Ask Your Wallet |
| **LangChain Agent** | ❌ None | ✅ Multi-tool pipeline |
| **No wallet needed** | ❌ MetaMask required | ✅ Paste address only |
| **Real-time alerts** | ❌ Manual check | ✅ Supabase Realtime |
| **Open Source** | ❌ Closed | ✅ MIT License |
| **API access** | ❌ Expensive tiers | ✅ Free tier included |
| **Deployment** | ❌ Complex setup | ✅ One docker-compose |

---

## Roadmap

- [x] Real-time Injective LCD data
- [x] OpenRouter AI reports  
- [x] LangChain agent pipeline
- [x] Ask Your Wallet chat
- [x] Supabase realtime alerts
- [x] Team workspaces
- [x] REST API + Webhooks
- [ ] Injective transaction history analysis
- [ ] DeFi protocol position tracking (Helix, Mito, Astroport)
- [ ] Cross-chain wallet comparison (Cosmos ecosystem)
- [ ] AI-powered market context (INJ price impact analysis)
- [ ] Mobile app (React Native)
- [ ] Injective Name Service (INS) resolution

---

## Security & Trust

- **100% Read-Only** — Zero write access to any blockchain
- **Non-Custodial** — Never requests private keys, seed phrases, or signing
- **Data Minimization** — Only public on-chain data processed
- **Row Level Security** — Supabase RLS: users only see their own data
- **JWT Auth** — Secure stateless authentication
- **Open Source** — All code auditable on GitHub

> InjSight AI is an informational analytics tool. It does not provide financial advice. Always do your own research.

---

## Built For

**Injective Solo AI Builder Sprint** | May 11–31, 2026  
Category: Consumer AI App + Autonomous Agent  
Blockchain: Injective Mainnet

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) © 2026 InjSight AI
