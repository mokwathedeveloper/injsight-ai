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
