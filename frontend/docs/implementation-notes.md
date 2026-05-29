# InjSight AI — Frontend Implementation Notes

## Current Status

This document captures key implementation decisions, architecture notes, and deferred items for the InjSight AI frontend.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.3 |
| Styling | Tailwind CSS 3.4 (dark design system) |
| Server state | TanStack Query v5 |
| Client state | Zustand v4 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Animations | Framer Motion (light use only) |

---

## Folder Structure Decisions

### `store/` vs `stores/`

The implementation uses `store/` (singular) for Zustand stores. The prompt spec names `stores/` (plural). Both are present — `stores/*.store.ts` re-exports from `store/*.ts` for spec compatibility without breaking existing imports.

### `services/` abstraction layer

All API calls go through `services/` → `lib/api/endpoints.ts` → `lib/api/client.ts`. Services return domain types; the `lib/api/adapters.ts` file maps backend DTOs to UI shapes. Swap backend by changing `lib/api/client.ts` alone.

### Mock data fallback

Every service function falls back to `data/*-mock.ts` when the API is unreachable. This ensures the frontend is always demoable without a running backend.

---

## Backend Integration

The FastAPI backend runs on `http://localhost:8000` by default. Set `NEXT_PUBLIC_API_URL` in `.env.local` to change.

JWT tokens are persisted via the `useAuthStore` (zustand-persist → `localStorage`). The `QueryProvider` calls `persist.rehydrate()` on client mount so returning users' authenticated queries fire immediately.

---

## Key Deferred Items

| Item | Status | Notes |
|---|---|---|
| Real Injective SDK integration | Deferred | Currently uses deterministic mock data keyed to address; swap `app/integrations/injective/service.py` for real SDK |
| Redis + background workers | Deferred | DB-backed analysis is synchronous in MVP; Celery workers needed for async at scale |
| Stripe / crypto billing | Deferred | Checkout UI present; payment provider not wired |
| Social OAuth (Google/Injective) | Deferred | Buttons present in auth forms; no provider configured |
| Team / org management (DB-backed) | Deferred | Teams use in-memory store; no DB tables yet |
| Admin role guard | Deferred | `/admin` routes visible to any authenticated user in MVP |

---

## Read-Only Safety

Every wallet analysis flow includes the `ReadOnlySafetyNotice` / `TrustSafetyBanner` component. The following are never requested or stored:

- Private keys
- Seed phrases
- Wallet signatures for analysis
- Custody permissions

All AI-generated content includes a `DisclaimerBox` (Feature 51). Risk scores and reports are informational only; no buy/sell instructions.

---

## Testing

No automated test suite is wired yet. Recommended next steps:

1. Unit tests for `lib/validators.ts` and `lib/formatters.ts` with Vitest.
2. Component tests for `WalletAnalyzerForm`, `AuthLayout`, and `AppShell` with Testing Library.
3. E2E tests for the analyze flow with Playwright (scripts in `/scripts/`).

---

## Running the Project

```bash
# Frontend
cd frontend
cp .env.local.example .env.local    # set NEXT_PUBLIC_API_URL
npm install
npm run dev                          # http://localhost:3000

# Backend
cd backend
python3 -m venv --without-pip .venv
.venv/bin/python /tmp/get-pip.py    # bootstrap pip
.venv/bin/pip install -r requirements.txt
cp .env.example .env
alembic upgrade head                 # or let SQLite auto-create on first start
uvicorn app.main:app --reload        # http://localhost:8000

# Interactive API docs
open http://localhost:8000/docs
```

---

## Git Workflow Note

The project was built in a single session on `main` due to hackathon constraints. Future development should follow the branch-per-feature workflow defined in `prompts/implementation/InjSight_AI_Master_Implementation_Prompts.md`.
