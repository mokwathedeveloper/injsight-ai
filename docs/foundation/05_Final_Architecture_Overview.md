# InjSight AI — Final Architecture Overview

## 1. Purpose

This document gives the high-level architecture for InjSight AI.

It connects the frontend, backend, Injective integration, AI layer, database, cache, workers, and future SaaS services into one system view.

---

## 2. System Overview

```txt
User Browser
Next.js 14 + TypeScript + Tailwind
        ↓ HTTPS
Backend API
Python + FastAPI or Flask
        ↓
Service Layer
Wallet Analysis · Injective Integration · AI Reports · Risk Engine
        ↓
PostgreSQL + Redis
        ↓
Workers and Scheduled Jobs
        ↓
Reports · Alerts · Watchlists · Usage Tracking
```

---

## 3. Architecture Layers

## 3.1 Frontend Layer

Technology:

- Next.js 14+
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Recharts

Responsibilities:

- landing page
- wallet analyzer UI
- AI report display
- risk score display
- authentication pages
- dashboard
- saved wallets
- reports
- pricing page
- future alerts and team features

---

## 3.2 Backend API Layer

Recommended technology:

- Python 3.11+
- FastAPI or Flask
- SQLAlchemy
- PostgreSQL
- Redis
- JWT authentication
- validation schemas
- rate limiting

Responsibilities:

- auth
- wallet analysis requests
- saved wallet CRUD
- AI report generation
- risk score calculation
- report storage
- usage limits
- alerts
- billing later

---

## 3.3 Injective Integration Layer

Responsibilities:

- validate Injective wallet addresses
- fetch wallet balances
- fetch token metadata
- fetch recent transactions later
- fetch token price context later
- normalize raw provider data
- cache external responses
- handle provider errors safely

Internal module:

```txt
backend/app/integrations/injective/
├── client.py
├── service.py
├── normalizer.py
├── schemas.py
└── errors.py
```

---

## 3.4 AI Layer

Responsibilities:

- create safe AI prompts
- receive normalized wallet data
- generate structured wallet reports
- explain risk in plain English
- summarize concentration
- generate suggested next steps
- validate AI output before returning to frontend

Internal module:

```txt
backend/ai/
├── wallet_prompt.py
├── wallet_report.py
├── risk_engine.py
├── safety.py
└── schemas.py
```

---

## 3.5 Risk Engine Layer

The risk engine should combine deterministic rules with AI explanation.

Deterministic risk factors:

- asset concentration
- stablecoin buffer
- diversification
- recent activity
- volatility exposure
- unknown token exposure

The deterministic score should be calculated before AI narrative generation.

AI should explain the score; AI should not invent the score.

---

## 3.6 Database Layer

Technology:

- PostgreSQL
- SQLAlchemy
- Alembic migrations

Core tables:

- users
- wallets
- wallet_analysis_runs
- ai_reports
- risk_scores
- alerts
- usage_events
- teams later
- subscriptions later

---

## 3.7 Cache and Worker Layer

Technology:

- Redis
- Celery or equivalent worker

Use Redis for:

- rate limits
- token metadata cache
- wallet balance cache
- price cache
- background job queue
- token/session blocklist if needed

Workers handle:

- report generation
- saved wallet refresh
- watchlist monitoring
- alert generation
- export generation
- future weekly reports

---

## 4. MVP Data Flow

```txt
1. User enters Injective wallet address
2. Frontend validates address
3. Frontend sends POST /api/public/analyze-wallet
4. Backend validates request and rate limit
5. Backend fetches Injective wallet data
6. Backend normalizes balances and token metadata
7. Backend computes deterministic risk metrics
8. Backend sends normalized data to AI layer
9. AI returns structured report
10. Backend validates AI output
11. Backend returns wallet data, risk score, and report
12. Frontend renders dashboard-style analysis
```

---

## 5. Authenticated Data Flow

```txt
1. User signs up or logs in
2. Backend issues access token
3. User saves wallet
4. Backend stores wallet linked to user
5. User re-analyzes wallet later
6. Analysis run and report are stored
7. Dashboard shows saved wallets and report history
```

---

## 6. Report Generation Flow

```txt
Analysis run created
↓
Wallet data normalized
↓
Risk score calculated
↓
AI report generated
↓
Report saved to database
↓
User views report
↓
User exports report later
```

---

## 7. Future Alert Flow

```txt
Worker refreshes saved wallet
↓
New risk score calculated
↓
Compare with previous score
↓
If threshold crossed, create alert
↓
User sees alert in dashboard
↓
Future: push notification or email
```

---

## 8. Deployment Architecture

Recommended MVP deployment:

```txt
Frontend: Vercel
Backend: Railway or Render
Database: Supabase or Neon PostgreSQL
Redis: Upstash
AI Provider: environment-configured
Injective Provider: backend-only integration
```

---

## 9. Security Architecture

Core principles:

- read-only wallet analysis
- no private keys
- no seed phrases
- no transaction execution
- no wallet custody
- strict input validation
- rate-limited public endpoints
- AI output validation
- CORS restricted to frontend domains
- backend secrets never exposed to frontend

---

## 10. Future Architecture Expansion

Later additions:

- team workspaces
- shared watchlists
- billing
- API keys
- real-time alerts
- weekly reports
- wallet behavior segmentation
- protocol intelligence dashboard
- multi-chain intelligence layer

---

## 11. Architecture Decision

InjSight AI should not begin as a trading execution product.

It should begin as:

```txt
AI wallet intelligence
read-only analysis
Injective-focused
risk reporting
SaaS-ready
non-custodial
```

This keeps the product safer, clearer, easier to launch, and more credible.
