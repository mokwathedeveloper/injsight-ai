# InjSight AI — Project Foundation Document

## 1. Product Identity

**Product Name:** InjSight AI  
**Repository Name:** `i
`  
**Product Subtitle:** AI Wallet Intelligence for Injective DeFi  
**Category:** AI Wallet Intelligence / DeFi Analytics / On-Chain Risk Intelligence  

## 2. Product Vision

InjSight AI is an AI-powered wallet intelligence platform that helps Injective traders, DeFi users, and future protocol teams understand wallet behavior, portfolio exposure, and on-chain risk in plain English.

The product begins as a read-only Injective wallet analyzer and grows into a SaaS intelligence layer for DeFi wallets, watchlists, reports, alerts, and protocol-level monitoring.

## 3. Core Problem

DeFi ecosystems like Injective generate rich wallet and on-chain data, but most of that data remains raw, fragmented, and difficult to interpret. Traders, power users, DAOs, and protocol teams can access balances, transactions, and activity records, but they often lack a simple way to understand portfolio exposure, concentration risk, wallet behavior, and meaningful changes over time.

This creates a gap between data availability and decision-ready intelligence.

## 4. Core Solution

InjSight AI transforms Injective wallet data into clear AI-generated insights, risk scores, alerts, and plain-English reports.

Instead of showing users only balances and transaction records, InjSight AI explains what the wallet data means, what risks may deserve attention, and what changed across portfolio activity.

## 5. Target Users

### Primary MVP Users

- Injective traders
- DeFi users
- Crypto portfolio holders
- Power users monitoring one or more wallets

### Future SaaS Users

- DeFi teams
- DAOs
- Protocol teams
- Crypto research teams
- Small funds and analysts
- Community managers monitoring treasury or whale behavior

## 6. MVP Scope

The first version should remain focused and read-only.

The MVP will allow a user to:

1. Enter an Injective wallet address.
2. Fetch wallet-related Injective data.
3. View balances and wallet summary.
4. Generate an AI-powered wallet report.
5. Receive a risk score.
6. Understand concentration risk.
7. See suggested next steps.
8. Optionally sign up later to save wallet analyses.

## 7. Non-Goals for MVP

The MVP should not include:

- Private key handling
- Trading execution
- Custodial wallet features
- Automated transactions
- Tax calculations
- Complex multi-chain analytics
- Enterprise dashboards
- Full billing automation
- Advanced portfolio rebalancing

## 8. Product Principles

### Read-Only First

The platform should analyze wallet data, not move funds.

### Explain, Do Not Overwhelm

The product should convert technical on-chain data into plain-English intelligence.

### AI Should Be Core, Not Decorative

AI must be part of the actual user value: analysis, summarization, risk interpretation, and reporting.

### Start Narrow, Expand Carefully

Begin with Injective wallet intelligence. Expand later to team dashboards, alerts, APIs, and potentially other chains.

### Security by Design

No private keys, no custody, no unsafe transaction signing in the MVP.

## 9. Recommended Tech Stack

### Frontend

- Next.js 14+
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Recharts

### Backend

- Python backend using Flask or FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Redis
- Celery or background worker system
- JWT authentication
- Rate limiting
- Structured validation

### Integrations

- Injective wallet and chain data APIs
- Injective SDK or official data infrastructure where appropriate
- AI model provider for wallet analysis and report generation

### Deployment

- Frontend: Vercel
- Backend: Railway, Render, Fly.io, or AWS
- Database: Supabase, Neon, Railway PostgreSQL, or AWS RDS
- Redis: Upstash, Railway Redis, or managed Redis

## 10. Repository Structure

```txt
injsight-ai/
├── frontend/
├── backend/
├── docs/
├── scripts/
├── .github/
│   └── workflows/
├── docker-compose.yml
├── README.md
├── .gitignore
└── LICENSE
```

## 11. Documentation Structure

```txt
docs/
├── 01_Project_Foundation_Document.md
├── 02_MVP_Feature_List.md
├── 03_Backend_Architecture_Plan.md
├── 04_Database_Design_Plan.md
├── 05_API_Endpoint_Plan.md
├── 06_Development_Roadmap.md
└── 07_Security_Checklist.md
```

## 12. Official Product One-Liner

InjSight AI is an AI wallet intelligence platform that helps Injective traders and DeFi teams understand portfolio exposure, wallet behavior, and on-chain risk in plain English.

## 13. Website Hero Copy

**Headline:** Understand Injective wallets in seconds with AI.

**Subheadline:** InjSight AI turns wallet balances, portfolio exposure, and on-chain activity into clear AI-generated insights, risk scores, alerts, and reports for traders and DeFi teams.

**Primary CTA:** Analyze Wallet  
**Secondary CTA:** View Demo

## 14. SaaS Expansion Path

### Stage 1: Free Wallet Analyzer

- Public wallet analysis
- AI wallet summary
- Basic risk score

### Stage 2: Pro User Dashboard

- User accounts
- Saved wallets
- Watchlists
- Advanced reports
- AI alerts

### Stage 3: Team Dashboard

- Multi-user workspace
- Shared watchlists
- Treasury monitoring
- Whale tracking
- Exportable reports

### Stage 4: API and Protocol Intelligence

- API access
- Protocol analytics
- Custom alerts
- Advanced wallet segmentation
