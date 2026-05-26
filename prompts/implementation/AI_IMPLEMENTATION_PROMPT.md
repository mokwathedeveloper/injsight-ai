# AI Implementation Prompt — InjSight AI

## Purpose

This document instructs an AI agent or AI coding assistant to implement InjSight AI exactly from the completed planning, architecture, UX/UI, and feature documentation.

It should be used when starting or continuing implementation work.

---

Absolutely. Use this prompt to instruct an AI agent or AI coding assistant to implement the project **exactly from your completed planning and UX/UI documents**, without improvising or skipping details.

Copy this and save it as:

```txt
AI_IMPLEMENTATION_PROMPT.md
```

---

```txt
You are an expert senior full-stack software engineer and AI implementation agent.

Your job is to implement this project exactly according to the project documents I provide.

Project Name:
InjSight AI

Subtitle:
AI Wallet Intelligence for Injective DeFi

Core Product Purpose:
InjSight AI helps Injective DeFi users understand wallet and portfolio data by turning raw on-chain activity into AI-generated insights, wallet risk scores, portfolio composition summaries, concentration risk analysis, and plain-English reports.

IMPORTANT RULE:
Do not invent a new design.
Do not change the architecture.
Do not rename features unless the documents require it.
Do not skip UI states.
Do not skip folder structure.
Do not simplify the implementation without explaining why.
Use the provided Markdown files as the source of truth.

You must implement the project based on the completed documentation and reference files.

Reference Files to Use

Use these files as implementation references:

1. README.md
2. PROJECT_FOUNDATION.md or 01-project-foundation.md
3. MVP_FEATURE_LIST.md or 02-mvp-feature-list.md
4. BACKEND_ARCHITECTURE_PLAN.md or 03-backend-architecture-plan.md
5. DATABASE_DESIGN_PLAN.md or 04-database-design-plan.md
6. API_ENDPOINT_PLAN.md or 05-api-endpoint-plan.md
7. DEVELOPMENT_ROADMAP.md or 06-development-roadmap.md
8. SECURITY_CHECKLIST.md or 07-security-checklist.md
9. InjSight_AI_UX_UI_Implementation_Guide.md

Also use the previous UX/UI reference files only as benchmark references, not as files to copy directly:

- 00_Design_System.md
- 01_Landing_Page.md
- 02_Login_Page.md
- 03_SignUp_Page.md
- 04_Onboarding_Flow.md
- 05_Dashboard.md
- 06_Mandate_Editor.md
- 07_Agent_Monitoring.md
- 08_OnChain_Audit_Viewer.md
- 09_Real_Time_Alerts.md
- 10_Reports_Exporting.md

The uploaded UX/UI reference files define professional design system rules, screen layouts, spacing, typography, components, states, responsive behavior, alerts, tables, dashboards, and accessibility patterns. Use them only to maintain the same level of implementation quality and clarity, but adapt everything to InjSight AI. The design system reference includes exact rules for colors, typography, spacing, components, navigation, tables, animation, and accessibility. The page references include detailed layouts for landing, login, signup, onboarding, dashboard, alerts, and reports.

Implementation Goal

Build the InjSight AI MVP as a professional SaaS frontend and backend-ready application.

The MVP should include:

1. Landing Page
2. Wallet Analyzer Page
3. Demo Wallet Mode
4. AI Wallet Report Page
5. Risk Score Breakdown Page
6. Portfolio Composition Page
7. Pricing Preview Page
8. Login Page
9. Sign-Up Page
10. User Dashboard
11. Saved Wallets Page
12. Analysis History Page
13. Reports Page
14. Alerts Page
15. Settings Page

Frontend Stack

Use:

- Next.js 14+
- TypeScript
- App Router
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Recharts
- Lucide React
- Framer Motion only for light UI animations

Backend Target Stack

Prepare the frontend to connect later to:

- FastAPI
- Python 3.11+
- PostgreSQL
- SQLAlchemy
- Alembic
- Redis
- AI wallet analysis service
- Injective wallet data service

For now, if the backend is not ready, use clean mock data and service abstraction files. Do not hardcode mock data directly inside page components.

Core InjSight AI Concepts

Use these product concepts everywhere:

- Injective wallet analysis
- Wallet address input
- Demo wallet mode
- Portfolio composition
- AI-generated wallet report
- AI wallet risk score
- Concentration risk analysis
- Wallet behavior insights
- Suggested next steps
- Saved wallets
- Wallet watchlists
- Analysis history
- Risk alerts
- Reports and exports
- Pricing plans

Do NOT include old project concepts such as:

- MantleMandate
- Mantle Network
- Trading mandates
- AI agents executing trades
- On-chain policy hashes
- Agent deployment
- Trade execution monitoring

Those were only reference concepts from the previous hackathon files.

Implementation Rules

Follow these rules strictly:

1. Read the documentation first before creating files.
2. Use the documentation as the source of truth.
3. Implement the folder structure exactly as defined in the UX/UI implementation guide.
4. Configure Tailwind design tokens before building pages.
5. Build reusable components before building full pages.
6. Do not duplicate UI patterns.
7. Use TypeScript interfaces and types.
8. Use Zod schemas for forms and validation.
9. Use mock data files for placeholder data.
10. Use service files for future API integration.
11. Every data-driven page must include loading, error, and empty states.
12. Every form must include validation and error states.
13. Every interactive component must include hover, focus, active, disabled, and loading states where applicable.
14. Every page must be responsive.
15. Use semantic HTML.
16. Use accessible labels, focus rings, and keyboard-friendly interactions.
17. Keep UI spacing consistent with the design system.
18. Do not randomly choose Tailwind classes outside the design system.
19. Do not skip mobile behavior.
20. Do not skip implementation notes from the Markdown guide.

Required Folder Structure

Create a professional Next.js frontend structure similar to this:

injsight-ai/
├── README.md
├── package.json
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.js
├── .env.example
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── analyzer/
│   │   └── page.tsx
│   ├── demo/
│   │   └── page.tsx
│   ├── report/
│   │   └── page.tsx
│   ├── risk/
│   │   └── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── dashboard/
│       ├── page.tsx
│       ├── saved-wallets/
│       │   └── page.tsx
│       ├── history/
│       │   └── page.tsx
│       ├── reports/
│       │   └── page.tsx
│       ├── alerts/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── AlertBanner.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopNavigation.tsx
│   │   ├── PageHeader.tsx
│   │   └── SectionHeader.tsx
│   ├── wallet/
│   │   ├── WalletAddressInput.tsx
│   │   ├── WalletSummaryCard.tsx
│   │   ├── PortfolioCompositionCard.tsx
│   │   ├── RiskScoreCard.tsx
│   │   ├── ConcentrationRiskCard.tsx
│   │   └── WalletActivityTable.tsx
│   ├── report/
│   │   ├── AIReportCard.tsx
│   │   ├── WalletInsightPanel.tsx
│   │   └── ReportTable.tsx
│   ├── pricing/
│   │   └── PricingCard.tsx
│   ├── alerts/
│   │   └── AlertList.tsx
│   └── dashboard/
│       ├── DashboardStats.tsx
│       ├── SavedWalletsTable.tsx
│       └── AnalysisHistoryTable.tsx
│
├── hooks/
│   ├── useWalletAnalysis.ts
│   ├── useSavedWallets.ts
│   └── useAlerts.ts
│
├── lib/
│   ├── utils.ts
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
│
├── services/
│   ├── wallet.service.ts
│   ├── report.service.ts
│   ├── alert.service.ts
│   └── auth.service.ts
│
├── stores/
│   ├── wallet.store.ts
│   ├── user.store.ts
│   └── ui.store.ts
│
├── schemas/
│   ├── wallet.schema.ts
│   ├── auth.schema.ts
│   └── report.schema.ts
│
├── types/
│   ├── wallet.ts
│   ├── report.ts
│   ├── alert.ts
│   └── user.ts
│
├── data/
│   ├── mock-wallets.ts
│   ├── mock-portfolio.ts
│   ├── mock-reports.ts
│   ├── mock-alerts.ts
│   └── pricing-plans.ts
│
└── docs/
    └── implementation-notes.md

Implementation Order

Build in this exact order.

Phase 1: Project Setup

1. Create Next.js project structure.
2. Install required dependencies.
3. Configure TypeScript.
4. Configure Tailwind CSS.
5. Add global styles.
6. Add design tokens.
7. Create .env.example.
8. Create README setup instructions.

Phase 2: Design System and Base Components

Create and test these first:

1. Button
2. Card
3. Input
4. Textarea
5. Select
6. Badge
7. AlertBanner
8. EmptyState
9. LoadingState
10. ErrorState

Each base component must support variants, sizes, disabled states, focus states, and responsive usage.

Phase 3: Layout Components

Create:

1. AppShell
2. Sidebar
3. TopNavigation
4. PageHeader
5. SectionHeader

The logged-in dashboard pages must use AppShell.
Public pages should not use the full dashboard sidebar unless specified.

Phase 4: Wallet Intelligence Components

Create:

1. WalletAddressInput
2. WalletSummaryCard
3. RiskScoreCard
4. PortfolioCompositionCard
5. ConcentrationRiskCard
6. AIReportCard
7. WalletInsightPanel
8. WalletActivityTable

Use mock data first.

Phase 5: Public Pages

Implement:

1. Landing Page
2. Wallet Analyzer Page
3. Demo Wallet Mode
4. AI Wallet Report Page
5. Risk Score Breakdown Page
6. Portfolio Composition Page
7. Pricing Preview Page

The Wallet Analyzer Page is the core MVP conversion page. It must be polished and clear.

Phase 6: Auth Pages

Implement:

1. Login Page
2. Sign-Up Page

No real authentication is required at first, but forms must have validation, loading states, and future service abstraction.

Phase 7: Dashboard Pages

Implement:

1. User Dashboard
2. Saved Wallets Page
3. Analysis History Page
4. Reports Page
5. Alerts Page
6. Settings Page

Use mock data through service files.

Phase 8: Polish

1. Add responsive behavior.
2. Add empty states.
3. Add loading skeletons.
4. Add error states.
5. Add hover and focus states.
6. Add light animations with Framer Motion only where appropriate.
7. Check accessibility.
8. Check consistency with the UX/UI guide.

Design Requirements

The UI must feel:

- Professional
- Dark SaaS style
- Clean
- Trustworthy
- Crypto-native but not noisy
- Suitable for DeFi users and analysts
- Easy to understand for non-technical users

Use a dark interface with clear visual hierarchy.

Wallet risk score must be visually clear:
- Low risk: green
- Medium risk: yellow
- High risk: red

AI-generated text must be displayed in clear report cards with:
- Source context
- Plain-English explanation
- Suggested next steps
- Timestamp or generated date
- Optional confidence indicator if available

Wallet addresses must use monospace font and truncation.

Tables must support:
- Hover states
- Empty states
- Responsive overflow
- Clear actions

Forms must support:
- Labels
- Placeholder text
- Validation errors
- Disabled states
- Loading states

Required Mock Data

Create placeholder mock data for:

1. Demo Injective wallet
2. Wallet portfolio assets
3. Portfolio composition
4. Wallet risk score
5. AI-generated insights
6. Concentration risk
7. Saved wallets
8. Analysis history
9. Reports
10. Alerts
11. Pricing plans
12. User profile

Do not put this mock data inside page components.
Place mock data inside the data/ folder.

Required Services

Create service files that simulate API calls for now:

- wallet.service.ts
- report.service.ts
- alert.service.ts
- auth.service.ts

Each service should return mock data using async functions, so replacing mock data with real API calls later will be easy.

Required Validation

Use Zod for:

1. Wallet address input
2. Login form
3. Sign-up form
4. Report export form
5. Settings form

Required States

Every major page must include:

1. Default state
2. Loading state
3. Error state
4. Empty state
5. Success state where applicable

Required Pages Detail

Landing Page

Must include:

- Navigation
- Hero section
- Wallet analyzer preview
- Trust bar
- Features
- How it works
- AI report preview
- Risk score preview
- Pricing preview
- CTA
- Footer

Main message:
“Understand Any Injective Wallet in Seconds.”

Wallet Analyzer Page

Must include:

- Wallet address input
- Injective wallet validation
- Demo wallet button
- Analyze button
- Loading analysis state
- Error state for invalid wallet
- Portfolio summary preview
- Risk score preview
- AI insights preview
- Suggested next steps

Demo Wallet Mode

Must show a fully populated example wallet analysis using mock data.

AI Wallet Report Page

Must include:

- Wallet summary
- Portfolio overview
- Risk score
- Concentration risk
- Wallet behavior insights
- AI-generated explanation
- Suggested next steps
- Export report button
- Save report button placeholder

Dashboard

Must include:

- Saved wallets summary
- Recent analyses
- Average risk score
- Reports generated
- Alerts summary
- CTA to analyze new wallet

Saved Wallets Page

Must include:

- Wallet labels
- Wallet addresses
- Risk score
- Portfolio value
- Last analyzed time
- Watchlist status
- Actions

Analysis History Page

Must include:

- Wallet address
- Date analyzed
- Risk score
- Report status
- Actions

Reports Page

Must include:

- Report table
- Filters
- Export modal placeholder
- Empty state
- Mock report data

Alerts Page

Must include:

- Alert banner
- Alert list
- Severity filters
- Alert types:
  - Risk score changed
  - High concentration detected
  - Large wallet movement detected
  - New asset exposure detected
  - Report ready
  - Watchlist wallet updated
  - Analysis failed

Settings Page

Must include:

- Profile settings
- Notification preferences
- API access placeholder
- Billing placeholder
- Security settings placeholder

Output Requirements

When implementing, provide:

1. Files created
2. Summary of what was implemented
3. How to run the project
4. What pages are available
5. What is still using mock data
6. Next recommended step

Do not just describe what should be done.
Actually create the files and implementation.

Do not skip anything from the documentation.

If something is unclear:
1. Check the Markdown documents first.
2. Make the most reasonable professional decision.
3. Explain the decision briefly.
4. Continue implementation.

Final instruction:
Implement InjSight AI exactly according to the completed documentation and UX/UI guide. Treat the guide as the source of truth. Build step by step, professionally, and do not shortcut the design, architecture, folder structure, reusable components, states, or responsive behavior.
```

Also keep this shorter command for later when you are continuing the build:

```txt
Continue implementing InjSight AI using the existing documentation and codebase as the source of truth.

Before coding, review:
1. README.md
2. InjSight_AI_UX_UI_Implementation_Guide.md
3. Development roadmap
4. Current folder structure
5. Existing components

Then continue from the next unfinished phase.

Do not redesign.
Do not rename features.
Do not skip states.
Do not duplicate components.
Do not hardcode repeated UI.
Use the existing patterns and continue professionally.
```

Your earlier UX/UI reference files are useful because they already define a professional design system, page specifications, interaction states, responsive behavior, alerts, reports, and implementation patterns that should guide the InjSight AI implementation.