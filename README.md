# InjSight AI — Injective Wallet Intelligence Platform

> **AI-powered wallet analysis for the Injective DeFi ecosystem.**  
> Understand any Injective wallet in seconds — risk scores, portfolio composition, AI reports, and real-time alerts.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)](https://fastapi.tiangolo.com)
[![Injective](https://img.shields.io/badge/Injective-Mainnet-blue)](https://injective.com)

---

## What Is InjSight AI?

InjSight AI is a **read-only, non-custodial wallet intelligence platform** for Injective DeFi users. Paste any Injective wallet address and receive:

- **AI-generated risk report** — plain-English analysis of portfolio health
- **Live risk score (0–100)** — concentration, volatility, stablecoin buffer, diversification
- **Real portfolio composition** — live token balances with CoinGecko USD prices
- **Ask Your Wallet chat** — converse with AI about any wallet in natural language
- **Smart alerts** — risk change notifications and large movement detection
- **Watchlist monitoring** — track multiple wallets continuously

No private keys. No seed phrases. No wallet connection required.

---

## How AI Is Used

InjSight AI uses AI at every layer of the analysis pipeline:

### 1. OpenRouter AI (Primary — via LangChain)
- **Model:** `meta-llama/llama-3.3-70b-instruct` (with `gpt-4o-mini` fallback)
- **Used for:** Generating structured JSON wallet intelligence reports
- **Output:** `summary`, `concentrationAnalysis`, `riskExplanation`, `injectiveContext`, `suggestedNextSteps`, `disclaimer`

### 2. LangChain Agent (ReAct-style)
A multi-step reasoning agent with 4 custom tools:

| Tool | Purpose |
|---|---|
| `InjectiveWalletTool` | Fetches real on-chain token balances from Injective LCD |
| `RiskAnalysisTool` | Computes multi-dimensional risk scores |
| `LivePriceTool` | Gets real-time USD prices from CoinGecko |
| `PortfolioInsightsTool` | Generates structured AI portfolio insights |

### 3. Ask Your Wallet (Conversational AI)
- Users can ask questions like *"Why is this wallet high risk?"* or *"What are the top assets?"*
- Full conversation history maintained per session
- AI has real-time wallet context injected into every response

### 4. Rule-Based Fallback
- If AI providers are unavailable, a deterministic risk engine still provides accurate scores
- Ensures 100% uptime regardless of AI provider status

---

## How Injective Is Integrated

InjSight AI is purpose-built for the **Injective blockchain**:

### On-Chain Data
- **Injective LCD REST API** (`https://lcd.injective.network`) — real-time token balances
- Three fallback public nodes for 99.9% data availability
- Native INJ token and all Injective ecosystem tokens (USDT peggy, IBC ATOM, TIA, etc.)
- Denom-to-symbol mapping for all major Injective assets

### Injective-Specific Intelligence
- INJ concentration risk detection (Injective's native volatile asset)
- Helix DEX exposure analysis
- IBC asset categorization (Cosmos ecosystem tokens)
- Peggy bridge token identification (USDT, USDC, WBTC)
- Staking position detection via LCD staking endpoints

### Ecosystem Context
Every AI report includes an **Injective Context** section covering:
- INJ staking recommendations
- Helix DEX opportunities
- Ecosystem diversification guidance
- Injective-native DeFi protocol exposure

---

## Features

| Feature | Description |
|---|---|
| Wallet Analyzer | Real-time analysis of any inj1... address |
| Portfolio Summary | Live token balances + USD values |
| Risk Score | Multi-factor 0–100 risk assessment |
| AI Report | OpenRouter LLM-generated intelligence |
| Ask Your Wallet | Conversational AI about any wallet |
| Saved Wallets | Persist and monitor wallets |
| Analysis History | Full audit trail of all analyses |
| Alerts | Risk change + large transfer notifications |
| Watchlist | Monitor wallets without saving |
| Weekly AI Reports | Scheduled digest of portfolio changes |
| Treasury Monitoring | Multi-wallet treasury dashboard |
| Team Workspace | Shared wallets and analysis for teams |
| API Access | REST API for programmatic access |
| Admin Dashboard | Usage analytics and system health |

---

## Tech Stack

### Frontend
- **Next.js 14** — App Router, TypeScript, Server Components
- **Tailwind CSS** — Design system with dark fintech theme
- **TanStack Query** — Real-time data fetching with caching
- **Zustand** — Auth state management with persistence
- **Recharts** — Portfolio and risk visualizations
- **Supabase Realtime** — Live alert subscriptions

### Backend
- **FastAPI** — High-performance Python API
- **PostgreSQL** (Supabase) — Production database
- **SQLAlchemy + Alembic** — ORM and migrations
- **LangChain** — AI agent framework with custom tools
- **OpenRouter API** — Multi-model AI access (Llama, GPT-4, Claude)

### AI / Blockchain
- **OpenRouter** (`meta-llama/llama-3.3-70b-instruct`) — Primary AI
- **LangChain ReAct Agent** — Multi-step reasoning pipeline
- **Injective LCD API** — Real-time on-chain data
- **CoinGecko API** — Live token prices

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL (or Supabase account)

### 1. Clone the repository
```bash
git clone https://github.com/mokwathedeveloper/injsight-ai.git
cd injsight-ai
git checkout trunc
```

### 2. Backend setup
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Create .env from example
cp .env.example .env
# Edit .env — add your OPENROUTER_API_KEY and DATABASE_URL

# Run migrations
alembic upgrade head

# Start backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 3. Frontend setup
```bash
cd app
npm install

# Create .env.local from example
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Start frontend
npm run dev
```

### 4. Open the app
```
http://localhost:3000
```

### 5. Analyze a wallet
1. Navigate to `/analyze`
2. Paste any Injective wallet address (e.g. `inj1...`)
3. Click **Analyze Wallet** — or click **Try Demo Wallet** to see it immediately

---

## Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://...          # PostgreSQL connection string
OPENROUTER_API_KEY=sk-or-v1-...        # OpenRouter API key (required for AI)
SUPABASE_URL=https://...supabase.co    # Supabase project URL
SUPABASE_SERVICE_KEY=eyJ...            # Supabase service_role key
JWT_SECRET=your-secret-here            # JWT signing secret
```

### Frontend (`app/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     InjSight AI                          │
├─────────────┬───────────────────────┬───────────────────┤
│  Frontend   │      Backend          │    AI Layer        │
│  Next.js 14 │      FastAPI          │   LangChain Agent  │
│  TanStack Q │      SQLAlchemy       │   ┌─────────────┐  │
│  Zustand    │      PostgreSQL       │   │ Wallet Tool │  │
│  Recharts   │      JWT Auth         │   │ Risk Tool   │  │
│  Supabase   │      ────────────     │   │ Price Tool  │  │
│  Realtime   │      Injective LCD ──►│   │ Report Tool │  │
│             │      CoinGecko API    │   └─────────────┘  │
│             │                       │   OpenRouter LLM   │
└─────────────┴───────────────────────┴───────────────────┘
```

---

## Security

- **Read-only** — No wallet connections, no private keys, no transactions
- **Non-custodial** — Zero fund access, zero signing permissions
- **Data minimization** — Only public on-chain data processed
- **JWT authentication** — Secure user sessions
- **Row Level Security** — Supabase RLS policies per user

---

## Demo

> **Live demo:** [Coming soon — deploying to Vercel + Railway]

To try locally with demo data:
1. Start both servers (see Getting Started above)
2. Go to `http://localhost:3000/analyze?demo=true`
3. Explore the full AI analysis with live CoinGecko prices

---

## Project Structure

```
injsight-ai/
├── app/                    # Next.js 14 frontend
│   ├── src/
│   │   ├── app/            # App Router pages (53 routes)
│   │   ├── components/     # UI, layout, wallet, dashboard components
│   │   ├── hooks/          # TanStack Query data hooks
│   │   ├── store/          # Zustand auth store
│   │   └── lib/            # API client, utilities
│   └── public/             # Static assets
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── ai/             # OpenRouter + LangChain agent
│   │   ├── analysis/       # Wallet analysis service
│   │   ├── auth/           # JWT authentication
│   │   ├── integrations/   # Injective LCD integration
│   │   ├── models/         # SQLAlchemy ORM models
│   │   └── services/       # Supabase realtime client
│   └── migrations/         # Alembic database migrations
├── design/                 # UI mockups (53 PNG screens)
└── docs/                   # Architecture and implementation docs
```

---

## Built For

**Injective Solo AI Builder Sprint** — AI Coding Bounty  
Dates: 11/05/2026 – 31/05/2026

Built with ❤️ for the Injective DeFi community.

---

## License

MIT License — see [LICENSE](LICENSE) for details.
