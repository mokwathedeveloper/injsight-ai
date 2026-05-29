# Changelog

All notable changes to InjSight AI are documented here.

## [1.0.0] — 2026-05-29 (Hackathon Release)

### Added — Full-Stack AI Platform
- **Next.js 14** frontend with 53 routes matching professional UI mockups
- **FastAPI** backend with PostgreSQL (Supabase) and full auth
- **OpenRouter AI** integration — `meta-llama/llama-3.3-70b-instruct` primary model
- **LangChain ReAct Agent** with 4 Injective-specific tools
- **Ask Your Wallet** — conversational AI chat about any wallet
- **Injective LCD integration** — real on-chain balances (3-node fallback)
- **CoinGecko live prices** — real USD values for all tokens
- **Risk scoring engine** — multi-factor 0–100 deterministic risk scores
- **Supabase Realtime** — live alert subscriptions via broadcast
- **JWT auth** — register, login, token refresh
- **Saved wallets** — persist and monitor wallets
- **Alerts system** — risk change notifications
- **Treasury monitoring** — multi-wallet portfolio dashboard
- **Team workspaces** — shared analysis for organizations
- **REST API** — programmatic access with API keys
- **Webhooks** — real-time event delivery
- **Admin dashboard** — usage analytics and system health
- **Docker Compose** — one-command local deployment

### Security
- 100% read-only — zero blockchain write access
- Non-custodial — no private keys, no seed phrases
- Row Level Security — Supabase RLS per user
- No mock data — all real on-chain + live AI

### AI Provider Hierarchy
1. OpenRouter (primary)
2. Anthropic Claude (secondary fallback)
3. Deterministic rule-based (always-available fallback)
