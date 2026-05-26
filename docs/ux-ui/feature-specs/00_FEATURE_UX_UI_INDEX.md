# InjSight AI — Feature-by-Feature UX/UI Documentation Index

## Purpose

This folder contains a separate professional UX/UI Markdown specification for every major InjSight AI feature.

These files are designed for:

- human frontend developers
- UX/UI designers
- AI coding assistants
- technical founders
- product managers

Each feature document includes:

- feature purpose
- user goals
- layout requirements
- design system rules
- components
- states
- responsive behavior
- accessibility
- AI output rules
- security and trust rules
- implementation guidance
- QA checklist

## Product

```txt
Product Name: InjSight AI
Subtitle: AI Wallet Intelligence for Injective DeFi
Core Principle: Read-only, non-custodial wallet intelligence
```

## Recommended MVP Feature Set

- Landing Page
- Wallet Analyzer
- Demo Wallet Mode
- Portfolio Summary
- Token Balance Table
- Portfolio Composition
- AI Wallet Report
- Wallet Risk Score
- Suggested Next Steps
- Read-Only Safety Messaging
- Sign-Up Page
- Login Page
- User Dashboard
- Saved Wallets
- Wallet Detail Page
- Analysis History
- Reports Page
- Settings Page

## Phase 2 Features

- Alerts Page
- Alert Banner
- Watchlist
- Risk Change Alerts
- Report Detail Page
- Export Reports
- Shareable Report Link
- Pricing Page
- Plan Limits
- Billing Page
- Subscription Payments

## Phase 3 / Advanced Features

- Team Workspace
- Team Member Roles
- Shared Watchlists
- Treasury Monitoring
- API Access
- API Integration Page
- Webhook Alerts
- Injective Wallet Data Fetching
- Injective Transaction Activity
- Injective Market Context
- Injective Ecosystem Exposure
- AI Wallet Summary
- AI Risk Explanation
- AI Concentration Analysis
- AI Suggested Next Steps
- Ask Your Wallet Chat
- Weekly AI Reports
- Admin Dashboard
- Error Monitoring Dashboard
- Usage Analytics
- Security Section
- Financial Disclaimer
- Rate Limiting
- Data Privacy Controls

## Full Feature Document List

| # | Feature Document | Category | Route / Placement |
|---|---|---|---|
| 01 | [Landing Page](01_landing_page.md) | Public marketing page | `/` |
| 02 | [Wallet Analyzer](02_wallet_analyzer.md) | Core public product feature | `/analyze` |
| 03 | [Demo Wallet Mode](03_demo_wallet_mode.md) | Demo experience | `/demo` |
| 04 | [Portfolio Summary](04_portfolio_summary.md) | Wallet overview | `/analyze or /dashboard/wallets/[id]` |
| 05 | [Token Balance Table](05_token_balance_table.md) | Asset table | `Reusable component` |
| 06 | [Portfolio Composition](06_portfolio_composition.md) | Asset allocation view | `/portfolio/[id]` |
| 07 | [AI Wallet Report](07_ai_wallet_report.md) | Core AI output | `/report/[id]` |
| 08 | [Wallet Risk Score](08_wallet_risk_score.md) | Risk scoring UI | `/risk/[id]` |
| 09 | [Suggested Next Steps](09_suggested_next_steps.md) | Action guidance | `Reusable component` |
| 10 | [Read-Only Safety Messaging](10_read_only_safety_messaging.md) | Trust and safety copy | `Global UI pattern` |
| 11 | [Sign-Up Page](11_sign_up_page.md) | Auth conversion | `/signup` |
| 12 | [Login Page](12_login_page.md) | Returning user auth | `/login` |
| 13 | [User Dashboard](13_user_dashboard.md) | Logged-in command center | `/dashboard` |
| 14 | [Saved Wallets](14_saved_wallets.md) | Wallet management | `/dashboard/wallets` |
| 15 | [Wallet Detail Page](15_wallet_detail_page.md) | Single-wallet intelligence view | `/dashboard/wallets/[id]` |
| 16 | [Analysis History](16_analysis_history.md) | Historical analysis records | `/dashboard/history` |
| 17 | [Reports Page](17_reports_page.md) | Report management | `/dashboard/reports` |
| 18 | [Settings Page](18_settings_page.md) | Account settings | `/dashboard/settings` |
| 19 | [Alerts Page](19_alerts_page.md) | Alert history and management | `/dashboard/alerts` |
| 20 | [Alert Banner](20_alert_banner.md) | High-priority notification | `Global component` |
| 21 | [Watchlist](21_watchlist.md) | Wallet monitoring | `/dashboard/watchlist` |
| 22 | [Risk Change Alerts](22_risk_change_alerts.md) | Risk monitoring events | `/dashboard/alerts` |
| 23 | [Report Detail Page](23_report_detail_page.md) | Full report view | `/dashboard/reports/[id]` |
| 24 | [Export Reports](24_export_reports.md) | Report download | `Modal workflow` |
| 25 | [Shareable Report Link](25_shareable_report_link.md) | Public report sharing | `Future workflow` |
| 26 | [Pricing Page](26_pricing_page.md) | SaaS pricing | `/pricing` |
| 27 | [Plan Limits](27_plan_limits.md) | Usage restrictions | `/dashboard/billing` |
| 28 | [Billing Page](28_billing_page.md) | Subscription management | `/dashboard/billing` |
| 29 | [Subscription Payments](29_subscription_payments.md) | Payment flow | `Future payment flow` |
| 30 | [Team Workspace](30_team_workspace.md) | Team SaaS | `/dashboard/team` |
| 31 | [Team Member Roles](31_team_member_roles.md) | Access control UI | `/dashboard/team/members` |
| 32 | [Shared Watchlists](32_shared_watchlists.md) | Team monitoring | `/dashboard/team/watchlists` |
| 33 | [Treasury Monitoring](33_treasury_monitoring.md) | DAO/protocol wallet monitoring | `/dashboard/treasury` |
| 34 | [API Access](34_api_access.md) | Developer platform | `/dashboard/api` |
| 35 | [API Integration Page](35_api_integration_page.md) | Technical integration dashboard | `/dashboard/api` |
| 36 | [Webhook Alerts](36_webhook_alerts.md) | External notification integration | `/dashboard/webhooks` |
| 37 | [Injective Wallet Data Fetching](37_injective_wallet_data_fetching.md) | Core chain integration | `Backend-supported UI` |
| 38 | [Injective Transaction Activity](38_injective_transaction_activity.md) | Activity timeline | `/dashboard/wallets/[id]/activity` |
| 39 | [Injective Market Context](39_injective_market_context.md) | Price and market context | `Reusable section` |
| 40 | [Injective Ecosystem Exposure](40_injective_ecosystem_exposure.md) | Ecosystem analysis | `Reusable section` |
| 41 | [AI Wallet Summary](41_ai_wallet_summary.md) | AI summary | `AI report section` |
| 42 | [AI Risk Explanation](42_ai_risk_explanation.md) | AI risk narrative | `AI report section` |
| 43 | [AI Concentration Analysis](43_ai_concentration_analysis.md) | AI concentration narrative | `AI report section` |
| 44 | [AI Suggested Next Steps](44_ai_suggested_next_steps.md) | AI guidance | `AI report section` |
| 45 | [Ask Your Wallet Chat](45_ask_your_wallet_chat.md) | Future AI chat | `/dashboard/wallets/[id]/ask` |
| 46 | [Weekly AI Reports](46_weekly_ai_reports.md) | Recurring intelligence | `/dashboard/reports/weekly` |
| 47 | [Admin Dashboard](47_admin_dashboard.md) | Internal operations | `/admin` |
| 48 | [Error Monitoring Dashboard](48_error_monitoring_dashboard.md) | Internal reliability | `/admin/errors` |
| 49 | [Usage Analytics](49_usage_analytics.md) | Product analytics | `/admin/analytics` |
| 50 | [Security Section](50_security_section.md) | Trust section | `/security or landing section` |
| 51 | [Financial Disclaimer](51_financial_disclaimer.md) | Compliance copy | `Global component` |
| 52 | [Rate Limiting](52_rate_limiting.md) | Abuse prevention UX | `Global/API error state` |
| 53 | [Data Privacy Controls](53_data_privacy_controls.md) | User data control | `/dashboard/settings/privacy` |

## Implementation Recommendation

Start with these feature specs first:

1. `01_landing_page.md`
2. `02_wallet_analyzer.md`
3. `03_demo_wallet_mode.md`
4. `04_portfolio_summary.md`
5. `08_wallet_risk_score.md`
6. `07_ai_wallet_report.md`
7. `11_sign_up_page.md`
8. `12_login_page.md`
9. `13_user_dashboard.md`

After those are complete, implement saved wallets, analysis history, reports, alerts, and pricing.
