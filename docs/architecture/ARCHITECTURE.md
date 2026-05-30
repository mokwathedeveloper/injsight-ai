<div align="center">

<img src="../logo.png" alt="InjSight AI" width="80" />

[![Docs](https://img.shields.io/badge/Architecture-System_Design-0066FF?style=for-the-badge)](../architecture/ARCHITECTURE.md)

</div>

---

# System Architecture — InjSight AI

## Overview

InjSight AI is a three-layer system: **Next.js frontend** on Vercel, **FastAPI backend** on Render, and a **Supabase PostgreSQL** database. The AI pipeline runs entirely on the backend.

---

## Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
│  Next.js 14 (TypeScript, Tailwind, TanStack Query, Zustand)     │
│  Vercel Global CDN — Static + Server Rendering                   │
└─────────────────────────┬───────────────────────────────────────┘
                          │  HTTPS + Bearer JWT
                          │  axios + interceptors
┌─────────────────────────▼───────────────────────────────────────┐
│                      FASTAPI SERVER                              │
│  Render — Python 3.11 — uvicorn                                  │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Auth      │  │  Analysis   │  │      AI Layer            │  │
│  │  JWT Tokens │  │  Caching    │  │  LangChain ReAct Agent   │  │
│  │  bcrypt     │  │  Scoring    │  │  OpenRouter LLM          │  │
│  └─────────────┘  └─────────────┘  │  4 Custom Tools          │  │
│                                    │  Rule Fallback            │  │
│  ┌─────────────┐  ┌─────────────┐  └─────────────────────────┘  │
│  │  Wallets    │  │  Alerts     │                                 │
│  │  CRUD       │  │  Auto-gen   │  ┌─────────────────────────┐  │
│  └─────────────┘  └─────────────┘  │  Injective Integration   │  │
│                                    │  LCD REST API             │  │
│  ┌─────────────────────────────┐   │  3-node fallback         │  │
│  │     In-Memory Cache         │   │  Denom mapping           │  │
│  │  prices(5m) balances(2m)    │   └─────────────────────────┘  │
│  │  analysis(3m) staking(5m)   │                                 │
│  └─────────────────────────────┘                                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │  SQLAlchemy ORM
┌─────────────────────────▼───────────────────────────────────────┐
│                    SUPABASE POSTGRESQL 15                         │
│                                                                  │
│  users · wallets · wallet_analysis_runs · ai_reports             │
│  risk_scores · alerts · usage_events                             │
│                                                                  │
│  Row Level Security enabled on all tables                        │
│  Realtime enabled — broadcast per user channel                   │
└─────────────────────────────────────────────────────────────────┘

          ┌──────────────────┐    ┌──────────────────┐
          │  Injective LCD   │    │  CoinGecko API   │
          │  3 public nodes  │    │  Price data      │
          │  Real Mainnet    │    │  24h changes     │
          └──────────────────┘    └──────────────────┘

          ┌──────────────────┐    ┌──────────────────┐
          │  OpenRouter API  │    │  Supabase RT     │
          │  llama-3.3-70b   │    │  Broadcast       │
          │  Fallback: Claude│    │  Live alerts     │
          └──────────────────┘    └──────────────────┘
```

---

## Key Design Decisions

### Why Render (not Railway or Fly.io)?
Render has a `render.yaml` IaC file, GitHub auto-deploy, and environment variable management that matches our deployment model. Free tier works for hackathon demo. `PYTHON_VERSION=3.11.0` enforced to avoid pydantic-core compilation issues on Python 3.14.

### Why SQLite fallback?
Render free tier can't have two persistent services. SQLite fallback lets the backend deploy and work without a PostgreSQL connection — critical for cold-start reliability. Supabase is the production database.

### Why in-memory cache instead of Redis?
Redis requires a separate paid service. Our TTL cache using Python dicts + threading.Lock delivers 508× improvement with zero infrastructure cost. For multi-instance deployments, Redis would be the upgrade path.

### Why LangChain agent + OpenRouter instead of direct API calls?
The agent pattern allows tool composition — the model can decide to call wallet data, then prices, then generate the report in sequence. Direct API calls would require hardcoded orchestration. OpenRouter gives access to 100+ models via one API key.

---

## Data Models

```
User ────────┬──── Wallet ─────────── WalletAnalysisRun ──┬── AIReport
             │                                              └── RiskScore
             ├──── Alert
             └──── UsageEvent
```

All `id` fields are UUID v4. All timestamps are `TIMESTAMPTZ` (timezone-aware).

---

*InjSight AI Architecture v1.0 — May 2026*
