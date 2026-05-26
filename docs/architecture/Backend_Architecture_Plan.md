# InjSight AI — Backend Architecture Plan

## 1. Backend Goal

The backend should provide a secure, modular, scalable API for wallet analysis, Injective data integration, AI-generated reports, user accounts, saved wallets, and future SaaS features.

The backend must be designed for a read-only crypto intelligence product. It should never require or store private keys in the MVP.

## 2. Recommended Backend Stack

### Core

- Python 3.11+
- Flask or FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Redis
- Celery or equivalent background worker
- JWT authentication
- Marshmallow or Pydantic validation
- Rate limiting
- Structured logging

### External Services

- Injective data provider or SDK
- AI model provider
- Optional object storage for generated reports
- Optional email provider for alerts and onboarding

## 3. Backend Responsibilities

The backend is responsible for:

- User authentication
- Wallet data ingestion
- Injective integration
- AI report generation
- Risk score calculation
- Saved wallet management
- Watchlist management
- Report persistence
- Alerts and notifications
- Rate limiting and abuse prevention
- SaaS plan enforcement later

## 4. Backend Module Structure

```txt
backend/
├── app/
│   ├── __init__.py
│   ├── extensions.py
│   ├── config.py
│   ├── auth/
│   ├── users/
│   ├── wallets/
│   ├── analysis/
│   ├── reports/
│   ├── alerts/
│   ├── billing/
│   ├── integrations/
│   │   └── injective/
│   └── models/
├── ai/
├── workers/
├── migrations/
├── tests/
├── run.py
├── requirements.txt
└── .env.example
```

## 5. Application Pattern

Use an application factory pattern.

Benefits:

- Cleaner testing
- Environment-specific configuration
- Modular blueprints or routers
- Easier scaling and deployment

Example conceptual structure:

```txt
create_app()
→ load config
→ initialize extensions
→ register auth routes
→ register wallet routes
→ register analysis routes
→ register report routes
→ register error handlers
```

## 6. Backend Modules

### 6.1 Auth Module

Responsibilities:

- Signup
- Login
- Logout
- Token refresh
- Current user profile
- Password hashing
- JWT management

Security requirements:

- bcrypt password hashing
- Strong password validation
- JWT access token expiration
- Refresh token rotation or revocation strategy
- Rate-limited login endpoint

### 6.2 Users Module

Responsibilities:

- User profile
- Plan information
- Account settings
- Notification preferences

### 6.3 Wallets Module

Responsibilities:

- Save wallet address
- Label wallet
- List saved wallets
- Delete saved wallet
- Re-analyze wallet
- Track last analysis timestamp

### 6.4 Injective Integration Module

Responsibilities:

- Validate Injective wallet address
- Fetch wallet balances
- Fetch token metadata
- Fetch transaction history if available
- Normalize raw Injective data into internal schema
- Handle provider errors and retries

Suggested internal files:

```txt
backend/app/integrations/injective/
├── client.py
├── schemas.py
├── normalizer.py
├── errors.py
└── service.py
```

### 6.5 Analysis Module

Responsibilities:

- Receive normalized wallet data
- Compute deterministic metrics
- Generate risk score
- Call AI model for narrative report
- Store analysis result
- Return structured analysis to frontend

Analysis should combine:

- Rule-based scoring
- AI-generated explanation
- Data validation
- Safety disclaimers

### 6.6 Reports Module

Responsibilities:

- Save AI reports
- List historical reports
- Export report as JSON, Markdown, or PDF later
- Generate shareable report links later

### 6.7 Alerts Module

Responsibilities:

- Store alerts
- Mark alerts as read
- Generate alert when wallet risk changes
- Future: email or Telegram notifications

### 6.8 Billing Module

MVP can be placeholder only.

Future responsibilities:

- Plan limits
- Subscription status
- Usage metering
- Stripe or crypto payment integration
- Team billing

## 7. AI Service Layer

The AI layer should be separated from route handlers.

Suggested files:

```txt
backend/ai/
├── wallet_prompt.py
├── wallet_report.py
├── risk_engine.py
├── safety.py
└── schemas.py
```

### AI Report Input

The AI should receive a clean, normalized object, not raw untrusted chain data.

Example:

```json
{
  "walletAddress": "inj...",
  "balances": [],
  "portfolioComposition": {},
  "recentActivity": [],
  "riskMetrics": {}
}
```

### AI Report Output

Return structured output:

```json
{
  "summary": "...",
  "riskScore": 72,
  "riskLevel": "Moderate",
  "concentrationAnalysis": "...",
  "notableObservations": [],
  "suggestedNextSteps": [],
  "disclaimer": "..."
}
```

## 8. Background Jobs

Use workers for tasks that may take longer than a normal request.

Potential jobs:

- Refresh saved wallet data
- Generate weekly AI report
- Monitor watchlist risk changes
- Send alerts
- Export reports
- Cache token prices

## 9. Caching Strategy

Use Redis for:

- Rate limiting
- Recently fetched wallet data
- Token metadata cache
- Market price cache
- Background job queue
- Optional token blocklist

Suggested cache TTLs:

- Token metadata: 24 hours
- Market prices: 1 to 5 minutes
- Wallet balances: 30 to 120 seconds
- AI report cache: configurable by user plan

## 10. Error Handling

The backend should return consistent errors.

Example:

```json
{
  "error": "INVALID_WALLET_ADDRESS",
  "message": "The provided Injective wallet address is not valid.",
  "statusCode": 400
}
```

Common error codes:

- `INVALID_WALLET_ADDRESS`
- `INJECTIVE_PROVIDER_ERROR`
- `AI_PROVIDER_ERROR`
- `RATE_LIMIT_EXCEEDED`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `RESOURCE_NOT_FOUND`
- `VALIDATION_ERROR`

## 11. Testing Strategy

Backend tests should cover:

- Authentication
- Wallet address validation
- Injective service mocking
- AI report generation mocking
- Risk score calculations
- Saved wallet CRUD
- Rate limits
- Authorization rules
- Error handling

## 12. Deployment Plan

### Development

- Local backend
- Local PostgreSQL
- Local Redis
- `.env` configuration

### Production

- Backend on Railway, Render, Fly.io, or AWS
- PostgreSQL managed database
- Redis managed service
- Secrets stored in platform environment variables
- HTTPS enforced

## 13. Backend Security Principles

- No private keys
- No seed phrases
- No custody
- Read-only wallet analysis
- Strict CORS
- Rate-limited public wallet analyzer
- JWT-protected user routes
- SQLAlchemy ORM for database access
- Validated input schemas
- Safe AI prompt construction
