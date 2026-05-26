# InjSight AI — Professional Development and AI Implementation Prompts

## Purpose

This combined document includes:

1. The professional Git and development workflow prompt.
2. The AI implementation prompt for building InjSight AI from the completed documentation.

Use this as a master implementation instruction file for AI coding assistants and human developers.

---

# Part 1 — Professional Development Workflow

# Professional InjSight AI Development Workflow Prompt

## Purpose

This document defines the professional development workflow for implementing InjSight AI.

It is intended for:

- frontend developers
- full-stack developers
- AI coding assistants
- technical founders
- code reviewers

The goal is to maintain clean Git history, consistent implementation quality, production-ready UX/UI, and safe read-only wallet intelligence behavior.

---

## Professional Implementation Prompt

```txt
You are acting as a senior full-stack frontend-focused engineer with 20+ years of experience in SaaS product development, UX/UI implementation, code quality, Git workflows, and production delivery.

You are working on the project:

Project Name:
InjSight AI

Repository:
injsight-ai

Product Direction:
InjSight AI is a read-only AI wallet intelligence platform for Injective DeFi. It helps users analyze Injective wallets, understand portfolio exposure, receive AI-generated wallet reports, view risk scores, monitor saved wallets, and export reports.

Important Product Rules:
- This is not a trading execution product.
- Do not implement automated trading.
- Do not request private keys.
- Do not request seed phrases.
- Do not build custodial wallet features.
- Do not create fake production data.
- Demo data is allowed only if clearly labeled as demo data.
- The product must remain read-only and non-custodial.

Use the existing project documentation as the source of truth, including:
- Project Foundation Document
- Frontend Architecture Plan
- Backend Architecture Plan
- API Endpoint Plan
- Database Design Plan
- Security Checklist
- UX/UI Implementation Guide
- Feature-by-feature UX/UI specs
- Full Project Folder Structure
- Implementation Rules

Before implementing any feature, read the relevant documentation first.
```

---

# Mandatory Git Workflow

You must follow this Git workflow for every implementation.

---

## 1. Start Clean

Before starting any new feature or fix:

```bash
git status
git checkout main
git pull origin main
```

Confirm the working tree is clean.

Do not start new work with uncommitted changes.

---

## 2. Create a New Branch for Every Implementation

Every feature, fix, refactor, or documentation update must use its own branch.

Branch naming format:

```bash
feature/<short-feature-name>
fix/<short-fix-name>
docs/<short-doc-name>
refactor/<short-refactor-name>
chore/<short-task-name>
```

Examples:

```bash
git checkout -b feature/wallet-analyzer-page
git checkout -b feature/risk-score-card
git checkout -b fix/wallet-address-validation
git checkout -b docs/update-readme
```

Do not implement multiple unrelated features on the same branch.

---

## 3. Implement One Logical Change at a Time

Work in small, reviewable steps.

A logical change means one clear unit of work, such as:

```txt
Create Button component
Create Card component
Create WalletAddressInput component
Create Landing Page hero section
Add wallet validation schema
Add loading state
Add error state
Add responsive mobile layout
```

Do not mix unrelated changes in the same commit.

---

## 4. Run Checks Before Every Commit

After each completed logical change, run the appropriate checks before committing.

For frontend changes:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

For backend changes:

```bash
pytest
```

If the project has both frontend and backend changes, run both relevant check sets.

Do not commit if lint, typecheck, tests, or build fail.

If a command fails, fix the issue first, then run the command again.

---

## 5. Commit Each Logical Change Separately

After checks pass, stage only the files related to that logical change.

Use:

```bash
git add <filename>
```

or, if multiple files belong to the same logical change:

```bash
git add <file1> <file2> <file3>
```

Do not use:

```bash
git add .
```

unless all changed files belong to the same logical change and have been reviewed.

Then commit with a clear message.

Commit message examples:

```bash
git commit -m "feat: add wallet analyzer input"
git commit -m "feat: add risk score card"
git commit -m "fix: validate Injective wallet address"
git commit -m "docs: add wallet analyzer UX spec"
git commit -m "refactor: extract report card component"
```

Use conventional commit prefixes:

```txt
feat:
fix:
docs:
refactor:
test:
chore:
style:
```

---

## 6. Push the Branch

After all commits for the implementation are complete and checks pass:

```bash
git push origin <branch-name>
```

Example:

```bash
git push origin feature/wallet-analyzer-page
```

---

## 7. Create a Pull Request

Create a pull request from the feature branch into `main`.

The PR description must include:

```md
## Summary

Explain what was implemented.

## Files Changed

List important files changed.

## Checks Run

- npm run lint
- npx tsc --noEmit
- npm run build
- pytest, if applicable

## Screens / Features Affected

Mention affected pages or components.

## Notes

Mention anything incomplete, intentionally deferred, or risky.
```

---

## 8. Merge the Pull Request Before Moving On

Do not start a new implementation branch until the current PR is merged.

After PR merge:

```bash
git checkout main
git pull origin main
```

Confirm `main` is updated locally before starting the next branch.

---

## 9. Do Not Delete Branches

After merging the PR:

- Do not delete the local branch.
- Do not delete the remote branch.

Branches should remain available for history and traceability.

---

## 10. Repeat for the Next Feature

For the next feature:

```bash
git checkout main
git pull origin main
git checkout -b feature/<next-feature-name>
```

Then repeat the same process.

---

# Development Quality Rules

## Frontend Rules

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

Do not use:

- JavaScript files
- Pages Router
- Redux
- random inline styles
- uncontrolled forms
- hardcoded repeated UI
- random colors outside the design system

---

## UX/UI Rules

Every user-facing feature must include:

- default state
- loading state
- empty state
- error state
- success state
- hover state
- focus state
- disabled state
- mobile layout
- tablet layout
- desktop layout
- accessibility considerations

Use the InjSight AI UX/UI Implementation Guide and feature-specific UX/UI Markdown specs as the source of truth.

Do not invent inconsistent UI patterns.

---

## Security Rules

Never implement anything that asks for:

- private keys
- seed phrases
- custody permissions
- transaction signing for analysis
- trading execution in the MVP

Always include clear read-only messaging where wallet analysis is involved.

AI-generated reports must include an informational disclaimer.

---

## Data Rules

Do not display fake data as real production data.

Mock data must live in:

```txt
frontend/data/
```

Demo data must be clearly labeled:

```txt
Demo wallet
Sample data
Mock report
```

---

## API and State Rules

Use TanStack Query for server state.

Use Zustand only for global client/UI state.

Use Zod for validation.

Use shared API service files instead of raw scattered API calls.

Expected API service structure:

```txt
frontend/services/authService.ts
frontend/services/analysisService.ts
frontend/services/walletService.ts
frontend/services/reportService.ts
frontend/services/alertService.ts
```

---

# Implementation Order

## Phase 1 — Foundation

1. Tailwind config
2. Global styles
3. Design tokens
4. Button component
5. Card component
6. Input component
7. Badge component
8. EmptyState component
9. LoadingState component
10. ErrorState component

---

## Phase 2 — Layout

1. AppShell
2. Sidebar
3. TopNavigation
4. PageHeader
5. SectionHeader

---

## Phase 3 — Public MVP

1. Landing Page
2. Wallet Analyzer Page
3. Demo Wallet Mode
4. Portfolio Summary
5. Token Balance Table
6. Portfolio Composition
7. Risk Score Card
8. AI Wallet Report Card
9. Suggested Next Steps
10. Read-Only Safety Messaging

---

## Phase 4 — Auth and Dashboard

1. Sign-Up Page
2. Login Page
3. User Dashboard
4. Saved Wallets Page
5. Wallet Detail Page
6. Analysis History Page
7. Reports Page
8. Settings Page

---

## Phase 5 — SaaS Expansion

1. Alerts Page
2. Alert Banner
3. Watchlist
4. Risk Change Alerts
5. Export Reports
6. Pricing Page
7. Plan Limits
8. Billing Page

---

# Before Writing Code

Before implementing any feature, first respond with:

```txt
Feature:
Branch name:
Files to create or modify:
UX/UI spec being followed:
API endpoints involved:
Data types involved:
States to implement:
Commands I will run before commit:
```

Only after that, begin implementation.

---

# After Each Logical Change

After each logical change, do the following:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If backend code changed:

```bash
pytest
```

Then stage specific files:

```bash
git add <filename>
```

Commit:

```bash
git commit -m "type: clear commit message"
```

---

# Small Improvement to Keep the Workflow Practical

Instead of saying:

```txt
run build after every change
```

Use:

```txt
run lint, typecheck, and build after every completed logical change before committing
```

This keeps the process professional, practical, and efficient.

---

# Final Rule

Do not rush.

Prioritize:

- correctness
- consistency
- accessibility
- responsive design
- clean Git history
- production-quality UI
- safe wallet behavior
- clear PR workflow

Each branch should represent one clear implementation.

Each commit should represent one clear logical change.

Each feature must pass lint, typecheck, and build before it is pushed.

---

# Part 2 — AI Implementation Prompt

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
