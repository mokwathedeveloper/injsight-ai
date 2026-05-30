<div align="center">

<img src="docs/logo.png" alt="InjSight AI" width="90" />

# Changelog

[![Latest](https://img.shields.io/badge/Latest-v1.3.0-10b981?style=for-the-badge)](https://github.com/mokwathedeveloper/injsight-ai)
[![Chain](https://img.shields.io/badge/Injective-Mainnet-0066FF?style=for-the-badge)](https://injective.com)
[![Hackathon](https://img.shields.io/badge/Injective_AI_Builder_Sprint-May_2026-7C3AED?style=for-the-badge)](https://injective.com)

All notable changes to **InjSight AI** are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

</div>

---

## ![v1.3.0](https://img.shields.io/badge/v1.3.0-10b981?style=flat-square) — 2026-05-30 · Production Polish + Professional Documentation

### ✨ Added
- `WHITEPAPER.md` — 8-section technical whitepaper (problem, system design, AI pipeline, Injective integration, security, business model, competitive positioning, limitations)
- `SECURITY.md` — security policy with ISA-001 to ISA-005 audit findings table, responsible disclosure, supported versions
- `docs/architecture/ARCHITECTURE.md` — full ASCII system architecture diagram + design decisions
- `docs/performance/BENCHMARKS.md` — 508× cache benchmark, asset size comparison, build output
- `docs/submission/SUBMISSION_CHECKLIST.md` — complete hackathon guide, 4 Twitter scripts, demo video script
- Auth-aware home page — Navbar and Hero show different UI for logged-in vs logged-out users
- "Welcome back, {name}!" banner for returning users on landing page
- `/forgot-password` page (was linked from LoginForm but didn't exist)
- All 7 footer pages with professional content: `/changelog`, `/docs`, `/api`, `/blog`, `/about`, `/privacy`, `/terms`
- Real brand logo (transparent PNG) used across all MD files

### 🔄 Changed
- README.md fully rewritten — SmartChain-Hub professional standard with competitive table, ASCII diagrams, tech badges, language bar chart, API reference tables
- Navbar `Reports` link fixed → `/docs` (was pointing to non-existent `/reports`, caused 404 prefetch noise)
- Navbar About link changed from `/#about` anchor to `/about` full page
- Demo wallet address updated to `inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqku` (valid bech32 checksum)

### 🐛 Fixed
- `contentscript.js` errors: confirmed MetaMask/Keplr browser extension — not InjSight AI code
- Render build failure: `PYTHON_VERSION=3.11.0` enforced (Python 3.14 default caused pydantic-core Rust compilation failure)
- Logo asset: `866KB PNG` replaced with `705B SVG` (1,229× smaller) for web performance

---

## ![v1.2.0](https://img.shields.io/badge/v1.2.0-6366f1?style=flat-square) — 2026-05-30 · Deployment + Performance

### ✨ Added
- Frontend deployed to Vercel: `injsight-ai.vercel.app`
- Backend deployed to Render: `injsight-ai-backend.onrender.com`
- In-memory TTL cache — prices (5 min), balances (2 min), analysis (3 min) → **508× speed improvement**
- Mobile sidebar drawer with backdrop overlay (hamburger menu for mobile)
- `docker-compose.yml` for one-command local deployment
- `backend/Dockerfile` and `app/Dockerfile` for containerized builds
- `render.yaml` + `backend/Procfile` for Render deployment config
- `backend/build.sh` — smart build script (detects PostgreSQL vs SQLite, runs correct migrations)

### 🔄 Changed
- `db.py` now accepts SQLite fallback when PostgreSQL not configured (critical for Render free tier cold starts)
- `next.config.mjs` fully configured: SWC minify, AVIF/WebP images, code splitting, 1-year cache headers
- `app/.eslintrc.json` fixed — removed `@typescript-eslint` rules that required uninstalled plugin
- `app/src/app/analyze/page.tsx` wrapped in `<Suspense>` (required for `useSearchParams()` in Next.js 14)

### 🐛 Fixed
- Vercel build failure: lodash → lodash-es alias broke recharts (uses CommonJS `lodash/isEqual`)
- Vercel build failure: `experimental.optimizeCss` requires `critters` package
- Render build failure: Python 3.14 used by default, no pre-built pydantic-core wheel

---

## ![v1.1.0](https://img.shields.io/badge/v1.1.0-f59e0b?style=flat-square) — 2026-05-29 · Full Real Integration

### ✨ Added
- OpenRouter AI: `meta-llama/llama-3.3-70b-instruct` primary model via LangChain
- LangChain ReAct agent with 4 tools: `InjectiveWalletTool`, `RiskAnalysisTool`, `LivePriceTool`, `PortfolioInsightsTool`
- Supabase cloud database: PostgreSQL 15 with Row Level Security
- `backend/app/core/cache.py` — thread-safe in-memory TTL cache
- `backend/app/services/supabase_client.py` — Realtime broadcast helpers
- `backend/app/ai/openrouter_service.py` — OpenRouter LLM service
- `backend/app/ai/langchain_agent.py` — ReAct agent orchestration
- `backend/app/insights/router.py` — AI insight generation from saved wallets
- Deep Injective integration: staking, transactions, ecosystem exposure, market context
- `/dashboard/injective` hub with 4 sub-pages: ecosystem, market, staking, transactions
- TanStack Query hooks for all API endpoints — zero mock data in any view
- Zustand auth store with JWT persistence (`onRehydrateStorage` sync)
- Supabase Realtime hook (`useRealtimeAlerts`) — live alert delivery

### 🔄 Changed
- `SavedWalletsView`, `AlertsView`, `HistoryView`, `ReportsView`, `WatchlistView` — all mock data replaced with real API hooks
- Wallet detail page `[id]` — fetches real wallet + latest analysis from DB
- Report detail page `[id]` — fetches real report data
- `apiClient.ts` — reads token from both `injsight_token` and Zustand `injsight-auth` (fixes page-reload token loss)
- Dashboard Overview — real stats from `/api/v1/dashboard/summary`
- `LoginForm.tsx` — uses real `useAuthStore().login()` (was mock `setTimeout` → `router.push`)
- `SignUpForm.tsx` — uses real `useAuthStore().register()` (was mock `setTimeout` → `router.push`)

### 🐛 Fixed
- Login redirect loop: `LoginForm` was mocked — fixed to call real auth API
- Token disappears on page refresh: fixed by reading from Zustand persist key as fallback
- 401 interceptor too aggressive: now only redirects from protected paths
- `SignupRequest.name` required field caused 422: made `Optional[str]`
- FastAPI Pydantic 422 error rendered as React child (crash): fixed with `extractErrorMsg()` helper
- Duplicate key `"/api/wallets"` in `ApiAccessView` endpoints table

---

## ![v1.0.0](https://img.shields.io/badge/v1.0.0-0ea5e9?style=flat-square) — 2026-05-26 · Hackathon Foundation

### ✨ Added
- Next.js 14 + TypeScript + Tailwind CSS dark fintech design system
- FastAPI backend + PostgreSQL + Alembic migrations
- 53 routes matching professional UI mockups — all 200 OK
- JWT authentication: register, login, token pair (access + refresh)
- Injective Mainnet LCD integration — real token balances (3-node fallback)
- CoinGecko live prices with correct decimal handling per token denom
- Deterministic multi-factor risk scoring: concentration, volatility, stablecoin buffer, diversification, activity
- Rule-based AI report generation (fallback when LLM unavailable)
- Saved wallets CRUD with `last_analyzed_at` tracking
- Auto-alert generation: creates `Alert` records on High/Very High risk analyses
- Supabase Realtime subscriptions for live alert delivery
- Dashboard: Overview, Wallets, Alerts, History, Reports, Watchlist, Insights, Chat
- Treasury monitoring, team workspaces, API key management, webhooks
- Admin dashboard with usage analytics
- `docker-compose.yml` for one-command local deployment
- `render.yaml` + Vercel deployment configs

### Security
- 100% read-only — zero blockchain write access, zero custody
- Non-custodial — private keys and seed phrases never requested
- Row Level Security — Supabase RLS per user
- JWT stateless auth — no session cookies

---

<div align="center">

[🌐 Live Demo](https://injsight-ai.vercel.app) · [📚 README](README.md) · [🔐 Security](SECURITY.md)

</div>
