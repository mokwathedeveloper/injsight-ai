# InjSight AI — Full Project Folder Structure

## Purpose

This document defines the full recommended project folder structure for InjSight AI. It should be used as the reference when creating the GitHub repository from scratch.

---

## Repository Name

```txt
injsight-ai
```

---

## Top-Level Structure

```txt
injsight-ai/
├── README.md               # Root Project README
├── LICENSE                 # Project License
├── .gitignore              # Git Ignore Rules
├── .env.example            # Environment Variable Template
├── docker-compose.yml      # Production Docker Orchestration
├── docker-compose.dev.yml  # Development Docker Orchestration
├── package.json            # Workspace Configuration
├── pnpm-workspace.yaml     # PNPM Monorepo Config
├── frontend/               # Next.js 14+ TypeScript frontend
├── backend/                # Python API backend
├── docs/                   # Project documentation
├── design/                 # Design & Brand Assets
├── prompts/                # AI Implementation Prompts
├── scripts/                # Local setup and utility scripts
└── .github/                # GitHub Actions workflows
```

---

## Frontend Structure

```txt
frontend/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing page
│   │
│   ├── analyze/
│   │   └── page.tsx                  # Public wallet analyzer
│   │
│   ├── demo/
│   │   └── page.tsx                  # Demo wallet analysis page
│   │
│   ├── pricing/
│   │   └── page.tsx                  # Pricing page
│   │
│   ├── login/
│   │   └── page.tsx                  # Login page
│   │
│   ├── signup/
│   │   └── page.tsx                  # Signup page
│   │
│   └── dashboard/
│       ├── layout.tsx                # Protected dashboard layout
│       ├── page.tsx                  # Main dashboard
│       │
│       ├── wallets/
│       │   ├── page.tsx              # Saved wallets list
│       │   └── [id]/
│       │       └── page.tsx          # Wallet detail page
│       │
│       ├── reports/
│       │   ├── page.tsx              # Reports list
│       │   └── [id]/
│       │       └── page.tsx          # Report detail page
│       │
│       ├── alerts/
│       │   └── page.tsx              # Future alerts center
│       │
│       ├── settings/
│       │   └── page.tsx              # User settings
│       │
│       └── billing/
│           └── page.tsx              # Billing and plan page
│
├── components/
│   ├── ui/                           # Generic reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Spinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Alert.tsx
│   │   └── Tooltip.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── DashboardTopbar.tsx
│   │   ├── PageHeader.tsx
│   │   └── Providers.tsx
│   │
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── FeatureSection.tsx
│   │   ├── InjectiveSection.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── PricingPreview.tsx
│   │   └── FAQSection.tsx
│   │
│   ├── analyzer/
│   │   ├── WalletAddressForm.tsx
│   │   ├── WalletAnalyzerShell.tsx
│   │   ├── WalletDataSummary.tsx
│   │   ├── TokenBalanceTable.tsx
│   │   ├── PortfolioCompositionCard.tsx
│   │   ├── WalletAnalysisLoadingState.tsx
│   │   ├── WalletAnalysisErrorState.tsx
│   │   ├── DemoWalletBanner.tsx
│   │   └── SaveReportCTA.tsx
│   │
│   ├── risk/
│   │   ├── RiskScoreCard.tsx
│   │   ├── RiskLevelBadge.tsx
│   │   ├── RiskBreakdownList.tsx
│   │   ├── ConcentrationRiskPanel.tsx
│   │   ├── VolatilityRiskPanel.tsx
│   │   └── StablecoinBufferPanel.tsx
│   │
│   ├── reports/
│   │   ├── AIReportPanel.tsx
│   │   ├── AIReportSection.tsx
│   │   ├── AIObservationList.tsx
│   │   ├── SuggestedNextSteps.tsx
│   │   ├── DisclaimerBox.tsx
│   │   └── ExportReportButton.tsx
│   │
│   ├── wallet/
│   │   ├── SavedWalletCard.tsx
│   │   ├── SavedWalletTable.tsx
│   │   ├── AddWalletModal.tsx
│   │   └── WalletDetailHeader.tsx
│   │
│   ├── dashboard/
│   │   ├── DashboardKpiCard.tsx
│   │   ├── RecentAnalysisTable.tsx
│   │   ├── UsageMeter.tsx
│   │   └── UpgradeCard.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthLayout.tsx
│   │
│   └── pricing/
│       ├── PricingCard.tsx
│       ├── PricingTable.tsx
│       └── PlanLimitList.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useWalletAnalysis.ts
│   ├── useSavedWallets.ts
│   ├── useReports.ts
│   ├── useAlerts.ts
│   └── useUsage.ts
│
├── lib/
│   ├── api/
│   │   ├── client.ts                 # API client
│   │   ├── auth.ts                   # Auth API functions
│   │   ├── analysis.ts               # Wallet analysis API functions
│   │   ├── wallets.ts                # Saved wallet API functions
│   │   ├── reports.ts                # Report API functions
│   │   ├── alerts.ts                 # Alert API functions
│   │   └── billing.ts                # Billing API functions
│   │
│   ├── auth.ts                       # Frontend auth helpers
│   ├── validators.ts                 # Zod validation schemas
│   ├── constants.ts                  # Frontend constants
│   ├── formatting.ts                 # Formatting helpers
│   ├── queryClient.ts                # TanStack Query client
│   └── utils.ts
│
├── store/
│   ├── authStore.ts
│   ├── analysisStore.ts
│   ├── alertStore.ts
│   └── uiStore.ts
│
├── types/
│   ├── user.ts
│   ├── wallet.ts
│   ├── analysis.ts
│   ├── report.ts
│   ├── alert.ts
│   ├── billing.ts
│   └── api.ts
│
├── public/
│   ├── logo.png
│   ├── logo-horizontal.png
│   └── assets/
│
├── tests/
│   ├── components/
│   └── e2e/
│
├── .env.local
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Backend Structure

```txt
backend/
│
├── app/
│   ├── __init__.py                   # create_app() or app initialization
│   ├── extensions.py                 # db, jwt, cors, limiter, cache, etc.
│   ├── config.py                     # Development, production, testing config
│   │
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── routes.py                 # signup, login, logout, refresh, me
│   │   ├── schemas.py                # auth request/response validation
│   │   ├── service.py                # auth business logic
│   │   └── utils.py                  # password hashing, token helpers
│   │
│   ├── users/
│   │   ├── __init__.py
│   │   ├── routes.py                 # user profile and settings
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── wallets/
│   │   ├── __init__.py
│   │   ├── routes.py                 # saved wallet CRUD
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── analysis/
│   │   ├── __init__.py
│   │   ├── routes.py                 # analyze wallet endpoints
│   │   ├── schemas.py
│   │   ├── service.py                # orchestrates wallet analysis
│   │   └── formatter.py              # formats analysis response
│   │
│   ├── reports/
│   │   ├── __init__.py
│   │   ├── routes.py                 # report list/detail/export
│   │   ├── schemas.py
│   │   ├── service.py
│   │   └── exporter.py               # Markdown/PDF/JSON export later
│   │
│   ├── alerts/
│   │   ├── __init__.py
│   │   ├── routes.py                 # alert endpoints
│   │   ├── schemas.py
│   │   ├── service.py
│   │   └── emitter.py                # future real-time events
│   │
│   ├── billing/
│   │   ├── __init__.py
│   │   ├── routes.py                 # plan, usage, checkout later
│   │   ├── schemas.py
│   │   └── service.py
│   │
│   ├── integrations/
│   │   └── injective/
│   │       ├── __init__.py
│   │       ├── client.py             # Injective API/SDK client
│   │       ├── service.py            # Injective data operations
│   │       ├── normalizer.py         # raw data to internal format
│   │       ├── schemas.py
│   │       └── errors.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── wallet.py
│   │   ├── wallet_analysis_run.py
│   │   ├── ai_report.py
│   │   ├── risk_score.py
│   │   ├── alert.py
│   │   ├── usage_event.py
│   │   ├── team.py                  # future
│   │   ├── team_member.py           # future
│   │   └── subscription.py          # future
│   │
│   └── common/
│       ├── errors.py
│       ├── responses.py
│       ├── pagination.py
│       ├── rate_limits.py
│       └── security.py
│
├── ai/
│   ├── __init__.py
│   ├── wallet_prompt.py              # prompt templates
│   ├── wallet_report.py              # AI report generation
│   ├── risk_engine.py                # deterministic risk scoring
│   ├── safety.py                     # AI safety and validation
│   └── schemas.py                    # AI output schemas
│
├── workers/
│   ├── __init__.py
│   ├── celery_app.py                 # worker app setup
│   ├── refresh_wallets.py            # future scheduled wallet refresh
│   ├── generate_reports.py           # async report generation
│   └── send_alerts.py                # future notifications
│
├── migrations/
│   └── versions/
│
├── tests/
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_wallet_validation.py
│   ├── test_public_analysis.py
│   ├── test_saved_wallets.py
│   ├── test_reports.py
│   ├── test_risk_engine.py
│   ├── test_injective_service.py
│   └── test_ai_report.py
│
├── run.py
├── requirements.txt
├── .env
├── .env.example
└── README.md
```

---

## Documentation Structure

```txt
docs/
├── 00_Documentation_Index.md
├── foundation/
│   ├── 00_Project_Name_and_Brand.md
│   ├── 01_Problem_Statement.md
│   ├── 02_Project_Foundation_Document.md
│   ├── 03_MVP_Feature_List.md
│   ├── 04_Complete_User_Journey.md
│   └── 05_Final_Architecture_Overview.md
├── architecture/
│   ├── Frontend_Architecture_Plan.md
│   ├── Backend_Architecture_Plan.md
│   ├── Database_Design_Plan.md
│   ├── API_Endpoint_Plan.md
│   └── Security_Checklist.md
├── ux-ui/
│   ├── InjSight_AI_UX_UI_Implementation_Guide.md
│   ├── Design_System.md
│   └── feature-specs/
├── product/
│   └── Pricing_and_Billing_Plan.md
├── implementation/
│   ├── Development_Roadmap.md
│   ├── Professional_Implementation_Rules.md
│   ├── QA_and_Security_Audit_Checklist.md
│   └── Full_Project_Folder_Structure.md
└── archive/
    └── previous-reference-docs/
```

---

## Scripts Structure

```txt
scripts/
├── setup_frontend.sh
├── setup_backend.sh
├── run_dev.sh
├── run_tests.sh
└── seed_demo_data.py
```

---

## GitHub Workflows Structure

```txt
.github/
└── workflows/
    ├── frontend.yml                  # lint, typecheck, build, test
    ├── backend.yml                   # pytest, lint
    └── security.yml                  # dependency/security checks
```
