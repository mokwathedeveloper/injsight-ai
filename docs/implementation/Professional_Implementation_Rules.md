# InjSight AI — Implementation Rules

## 1. Purpose

This document defines the engineering rules for building InjSight AI.

Every coding session should follow these rules to keep the project clean, secure, consistent, and production-ready.

---

## 2. General Rules

### 2.1 Full Implementation Only

Do not create placeholder features that appear functional but do not work.

Every feature should include:

- UI
- API connection where applicable
- validation
- loading state
- error state
- empty state
- success state
- basic tests or test plan

### 2.2 No Fake Production Data

Do not display fake traction, fake wallet performance, fake user counts, fake transaction history, or fake AI confidence as if it is real.

Demo data is allowed only if clearly labeled as:

```txt
Demo data
Sample wallet
Mock analysis
```

### 2.3 No Code Duplication

Extract shared logic into:

- frontend utility functions
- reusable UI components
- custom hooks
- backend services
- validation schemas
- shared constants

### 2.4 Security First

The MVP must remain:

- read-only
- non-custodial
- no private keys
- no seed phrases
- no trading execution
- no transaction signing required for analysis

---

## 3. Naming Conventions

| Layer | Convention | Example |
|---|---|---|
| TypeScript variables/functions | `camelCase` | `walletAddress`, `fetchWalletAnalysis()` |
| TypeScript components | `PascalCase` | `RiskScoreCard`, `AIReportPanel` |
| TypeScript component files | `PascalCase.tsx` | `WalletAddressForm.tsx` |
| TypeScript hooks/util files | `camelCase.ts` | `useWalletAnalysis.ts`, `api.ts` |
| Python files/functions | `snake_case` | `wallet_service.py`, `calculate_risk_score()` |
| Python classes | `PascalCase` | `WalletAnalysisService` |
| Database columns | `snake_case` | `wallet_address`, `created_at` |
| Environment variables | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `JWT_SECRET_KEY` |
| API routes | kebab-case or resource-based | `/api/analyze-wallet`, `/api/wallets/:id` |

---

## 4. Frontend Rules

### 4.1 Framework

Use:

```txt
Next.js 14+
TypeScript
App Router
Tailwind CSS
```

Do not use:

```txt
Pages Router
JavaScript files
CSS modules unless unavoidable
Inline styles for layout
Redux
Unvalidated forms
```

### 4.2 File Extensions

Use:

```txt
.tsx for pages and components
.ts for hooks, utilities, API clients, stores, and types
```

Do not use:

```txt
.js
.jsx
```

### 4.3 State Management

Use:

- TanStack Query for API/server state
- Zustand for global UI/client state
- React Hook Form + Zod for forms

Do not use plain `useEffect + useState` as the main API data-fetching pattern.

### 4.4 API Calls

All API calls must go through shared API modules.

Recommended:

```txt
frontend/lib/api/client.ts
frontend/lib/api/auth.ts
frontend/lib/api/analysis.ts
frontend/lib/api/wallets.ts
frontend/lib/api/reports.ts
```

Do not scatter raw API calls across components.

### 4.5 UI States

Every data screen must include:

- loading state
- empty state
- error state
- success state

### 4.6 Wallet Analyzer UX

The wallet analyzer must show:

- validation before submission
- loading state while fetching data
- provider error if Injective data fails
- AI error if report generation fails
- clear read-only message
- save/report CTA after successful analysis

---

## 5. Backend Rules

### 5.1 Backend Framework

Recommended:

```txt
Python 3.11+
FastAPI or Flask
PostgreSQL
SQLAlchemy
Alembic migrations
Redis
Celery or background worker
```

If using Flask, use:

- Application Factory
- Blueprints
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-Migrate
- Marshmallow

If using FastAPI, use:

- APIRouter modules
- Pydantic schemas
- SQLAlchemy
- Alembic
- dependency-based auth

### 5.2 Backend Module Structure

Do not put all logic in route files.

Use separate modules:

```txt
auth/
users/
wallets/
analysis/
reports/
alerts/
billing/
integrations/injective/
models/
services/
```

### 5.3 Validation

Every POST and PUT request must validate input before any business logic runs.

Validate:

- wallet address
- email
- password
- report export format
- pagination parameters
- API key names later
- billing webhook payloads later

### 5.4 API Response Format

Success:

```json
{
  "data": {},
  "message": "Action completed"
}
```

Error:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request data.",
  "statusCode": 422
}
```

### 5.5 External API Calls

All Injective and AI provider calls must be wrapped in service modules.

Rules:

- add timeouts
- handle provider failures
- normalize responses
- do not expose provider errors directly to users
- cache where useful
- rate-limit expensive operations

---

## 6. Database Rules

### 6.1 ORM First

Use ORM models as the source of database schema truth.

Do not manually edit production tables.

### 6.2 Migrations

All schema changes must go through migration tooling.

Rules:

- create migration
- review migration
- apply migration locally
- test migration
- apply in production

### 6.3 Data Privacy

Store only what is needed.

Do not store:

- private keys
- seed phrases
- raw user secrets
- unnecessary personally identifiable information
- payment card details

---

## 7. AI Rules

### 7.1 AI Is for Explanation, Not Execution

In the MVP, AI should:

- summarize wallet data
- explain risk
- identify concentration
- suggest non-custodial next steps
- generate reports

AI should not:

- execute trades
- give direct buy/sell orders
- guarantee outcomes
- predict prices with certainty
- request wallet secrets

### 7.2 Prompt Safety

Use fixed system prompts.

Do not allow user input to override system instructions.

Limit input size.

Validate AI output before display.

Never expose raw AI provider error output to the user.

### 7.3 Structured Output

Prefer structured AI output:

```json
{
  "summary": "",
  "riskLevel": "",
  "concentrationAnalysis": "",
  "notableObservations": [],
  "suggestedNextSteps": [],
  "disclaimer": ""
}
```

---

## 8. Injective Integration Rules

### 8.1 Read-Only First

The MVP should only read public wallet data.

### 8.2 Normalization

Raw Injective data should be converted into a clean internal format before storage or AI analysis.

### 8.3 Data Source Transparency

Show the user:

- wallet address analyzed
- last fetched time
- whether data is live, cached, or demo
- any missing data warnings

---

## 9. Testing Rules

### 9.1 Frontend

Run:

```bash
npm run build
npx tsc --noEmit
npm run lint
```

Test:

- wallet form validation
- analysis loading and error states
- AI report rendering
- risk score card
- auth pages
- saved wallet flow

### 9.2 Backend

Run:

```bash
pytest
```

Test:

- auth
- wallet validation
- public analysis rate limits
- Injective service mock
- AI provider mock
- risk score function
- saved wallet authorization
- report ownership

---

## 10. Git Rules

Use clear commits:

```txt
feat: add wallet analyzer page
feat: add Injective wallet balance service
fix: handle invalid wallet address response
docs: add frontend architecture plan
test: add wallet analysis service tests
```

Do not commit:

- `.env`
- secrets
- generated cache files
- local database files
- private keys

---

## 11. Production Readiness Rules

Before deployment:

- no TypeScript errors
- no backend test failures
- no hardcoded secrets
- no debug mode
- CORS restricted
- rate limits enabled
- environment variables set
- README updated
- demo wallet clearly labeled
- financial disclaimer visible
