# InjSight AI — API Endpoint Plan

## 1. API Design Goal

The API should support a clean SaaS foundation for public wallet analysis, authenticated user accounts, saved wallets, AI reports, alerts, and future billing or team features.

The MVP API should be simple but designed so it can scale into a professional product.

## 2. API Base Path

```txt
/api
```

Recommended response format:

```json
{
  "data": {},
  "message": "Success"
}
```

Recommended error format:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid request data.",
  "statusCode": 422
}
```

## 3. Public Endpoints

### 3.1 Health Check

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | No | Backend health check |

Response:

```json
{
  "status": "ok",
  "service": "injsight-ai-api"
}
```

### 3.2 Public Wallet Analysis

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/public/analyze-wallet` | No | Analyze one wallet without account |

Request:

```json
{
  "walletAddress": "inj...",
  "chain": "injective"
}
```

Response:

```json
{
  "data": {
    "walletAddress": "inj...",
    "balances": [],
    "riskScore": {},
    "aiReport": {}
  }
}
```

Notes:

- Strong rate limiting required.
- Anonymous usage may be limited.
- Demo mode can use this endpoint with sample data.

### 3.3 Demo Wallet

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/public/demo-wallet` | No | Return demo wallet analysis |

## 4. Authentication Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Register user |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/logout` | Yes | Logout |
| POST | `/api/auth/refresh` | Refresh token | Refresh access token |
| GET | `/api/auth/me` | Yes | Current user profile |

### Signup Request

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Login Request

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

## 5. User Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/users/me` | Yes | Get user profile |
| PUT | `/api/users/me` | Yes | Update profile |
| PUT | `/api/users/password` | Yes | Change password |
| GET | `/api/users/usage` | Yes | Get current usage limits |

## 6. Wallet Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/wallets` | Yes | List saved wallets |
| POST | `/api/wallets` | Yes | Save wallet |
| GET | `/api/wallets/:id` | Yes | Get wallet detail |
| PUT | `/api/wallets/:id` | Yes | Update wallet label |
| DELETE | `/api/wallets/:id` | Yes | Delete saved wallet |
| POST | `/api/wallets/:id/analyze` | Yes | Re-analyze saved wallet |

### Save Wallet Request

```json
{
  "walletAddress": "inj...",
  "label": "Main Injective Wallet",
  "chain": "injective"
}
```

## 7. Injective Data Endpoints

These can be internal or protected depending on architecture.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/injective/wallet/:address/balances` | Optional | Fetch wallet balances |
| GET | `/api/injective/wallet/:address/transactions` | Optional | Fetch recent transactions |
| GET | `/api/injective/tokens` | Optional | Fetch token metadata |
| GET | `/api/injective/prices` | Optional | Fetch supported token prices |

Recommendation:

- Keep raw provider endpoints internal first.
- Expose only normalized analysis endpoints publicly.

## 8. Analysis Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/analysis` | Optional | Create wallet analysis |
| GET | `/api/analysis/:id` | Yes | Get analysis result |
| GET | `/api/analysis` | Yes | List user analysis history |
| DELETE | `/api/analysis/:id` | Yes | Delete analysis result |

### Create Analysis Request

```json
{
  "walletAddress": "inj...",
  "chain": "injective",
  "saveResult": true
}
```

### Analysis Response

```json
{
  "data": {
    "id": "uuid",
    "walletAddress": "inj...",
    "status": "completed",
    "balances": [],
    "riskScore": {
      "score": 72,
      "level": "Moderate",
      "dimensions": {}
    },
    "aiReport": {
      "summary": "...",
      "concentrationAnalysis": "...",
      "riskExplanation": "...",
      "suggestedNextSteps": []
    }
  }
}
```

## 9. Report Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/reports` | Yes | List reports |
| GET | `/api/reports/:id` | Yes | Get report |
| POST | `/api/reports/:id/export` | Yes | Export report |
| DELETE | `/api/reports/:id` | Yes | Delete report |

Export formats:

- JSON
- Markdown
- PDF later

## 10. Alert Endpoints

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/alerts` | Yes | List alerts |
| PUT | `/api/alerts/:id/read` | Yes | Mark alert as read |
| PUT | `/api/alerts/read-all` | Yes | Mark all alerts as read |
| DELETE | `/api/alerts/:id` | Yes | Delete alert |

## 11. Watchlist Endpoints

Build after saved wallets.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/watchlists` | Yes | List watchlists |
| POST | `/api/watchlists` | Yes | Create watchlist |
| GET | `/api/watchlists/:id` | Yes | Get watchlist |
| POST | `/api/watchlists/:id/wallets` | Yes | Add wallet |
| DELETE | `/api/watchlists/:id/wallets/:walletId` | Yes | Remove wallet |

## 12. Billing Endpoints

Placeholder for SaaS expansion.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/billing/plan` | Yes | Get current plan |
| GET | `/api/billing/usage` | Yes | Get usage limits |
| POST | `/api/billing/checkout` | Yes | Create checkout session |
| POST | `/api/billing/webhook` | Provider | Payment webhook |

## 13. Admin/Internal Endpoints

Optional later.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/admin/users` | Admin | List users |
| GET | `/api/admin/usage` | Admin | Usage analytics |
| GET | `/api/admin/errors` | Admin | Error monitoring |

## 14. Rate Limiting Rules

Suggested limits:

```txt
POST /api/public/analyze-wallet: 5 requests per minute per IP
POST /api/auth/login: 5 attempts per minute per IP
POST /api/analysis: plan-based
GET /api/injective/*: cached and rate-limited
```

## 15. API Versioning

Start simple:

```txt
/api
```

When external customers or API access is added, introduce:

```txt
/api/v1
```

## 16. Endpoint Build Order

Build in this order:

1. `/api/health`
2. `/api/public/demo-wallet`
3. `/api/public/analyze-wallet`
4. `/api/auth/signup`
5. `/api/auth/login`
6. `/api/auth/me`
7. `/api/wallets`
8. `/api/analysis`
9. `/api/reports`
10. `/api/alerts`
11. `/api/billing`
