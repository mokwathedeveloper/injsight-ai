# InjSight AI — Documentation Index

## Purpose

This documentation set defines the professional foundation for building InjSight AI from scratch.

InjSight AI is an AI wallet intelligence platform for Injective DeFi. It helps users understand wallet balances, portfolio exposure, risk signals, and on-chain activity through AI-generated reports and risk scores.

---

## Recommended Reading Order

### 1. Product and Scope

| File | Purpose |
|---|---|
| [Project Foundation Document](foundation/02_Project_Foundation_Document.md) | Product identity, vision, problem, solution, users, stack, and SaaS direction |
| [MVP Feature List](foundation/03_MVP_Feature_List.md) | Clear list of what belongs in the MVP and what should wait |

### 2. Architecture

| File | Purpose |
|---|---|
| [Final Architecture Overview](foundation/05_Final_Architecture_Overview.md) | High-level system architecture and data flow |
| [Frontend Architecture Plan](architecture/Frontend_Architecture_Plan.md) | Frontend pages, components, state, validation, and UX structure |
| [Backend Architecture Plan](architecture/Backend_Architecture_Plan.md) | Backend modules, services, AI layer, Injective integration, and workers |
| [Database Design Plan](architecture/Database_Design_Plan.md) | PostgreSQL schema, data model, retention, privacy, and future billing tables |
| [API Endpoint Plan](architecture/API_Endpoint_Plan.md) | Public, authenticated, analysis, wallet, report, alert, and billing endpoints |

### 3. Execution

| File | Purpose |
|---|---|
| [Development Roadmap](implementation/Development_Roadmap.md) | Phased implementation plan from setup to deployment |
| [Full Project Folder Structure](implementation/Full_Project_Folder_Structure.md) | Complete frontend, backend, docs, scripts, workflows, and test folder structure |
| [Professional Implementation Rules](implementation/Professional_Implementation_Rules.md) | Strict coding, naming, migration, testing, and security rules |
| [AI Implementation Prompts](../prompts/implementation/) | Prompts to use before every AI-assisted coding session |

### 4. User Experience and Product Flow

| File | Purpose |
|---|---|
| [Complete User Journey](foundation/04_Complete_User_Journey.md) | End-to-end user journey from public analysis to saved reports and SaaS expansion |
| [UX/UI Implementation Guide](ux-ui/InjSight_AI_UX_UI_Implementation_Guide.md) | Professional UX/UI direction and implementation guidance |
| [Design System](ux-ui/Design_System.md) | Visual consistency, brand guidelines, and design rules |
| [Feature Specifications](ux-ui/feature-specs/) | Detailed specs for 53 individual features |
| [Visual Mockups](../design/mockups/) | High-fidelity design previews and screenshots |

### 5. Security, QA, and Commercial Model

| File | Purpose |
|---|---|
| [Security Checklist](architecture/Security_Checklist.md) | Core product security checklist |
| [QA and Security Audit Checklist](implementation/QA_and_Security_Audit_Checklist.md) | Deeper QA and security audit checklist for frontend, backend, AI, and API abuse prevention |
| [Pricing and Billing Plan](product/Pricing_and_Billing_Plan.md) | Pricing, plan limits, billing states, payment roadmap, and future monetization |

---

## Authoritative Decision Rule

If documents conflict, use this order of authority:

1. `foundation/02_Project_Foundation_Document.md`
2. `foundation/05_Final_Architecture_Overview.md`
3. `implementation/Professional_Implementation_Rules.md`
4. Specific architecture files: frontend, backend, database, API
5. Roadmap and UX direction documents

---

## Current Strategic Direction

```txt
Product Name: InjSight AI
Repo Name: injsight-ai
Subtitle: AI Wallet Intelligence for Injective DeFi
MVP: Read-only Injective wallet analyzer with AI report and risk score
Primary Users: Injective traders and DeFi users
Future Users: DeFi teams, DAOs, protocols, analysts, and small funds
Security Posture: Read-only, non-custodial, no private keys, no trading execution in MVP
```

---

## Development Philosophy

Build a narrow but polished MVP first.

The product should begin with:

```txt
Landing page
↓
Wallet analyzer
↓
Injective wallet data fetch
↓
AI-generated wallet report
↓
Risk score
↓
Save report after signup
```

Only after this vertical slice works should the product expand into:

```txt
Saved wallets
Watchlists
Alerts
Reports history
Billing
Team dashboards
API access
```

---
*Note: Original source folders and a full backup in `_backup_before_restructure/` have been preserved for safety.*
