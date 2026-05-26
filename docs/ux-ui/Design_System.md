# InjSight AI — UX/UI Audit and Design Direction

## 1. Purpose

This document defines the professional user experience and design direction for InjSight AI.

The goal is to make the product feel credible, premium, useful, and SaaS-ready while staying simple enough for the MVP.

---

## 2. Brand Identity Rules

Use one product name everywhere:

```txt
InjSight AI
```

Do not display:

```txt
injsight-ai
InjSight-AI-SaaS
Injective Wallet Analyst
ChainLens
```

The repo name is:

```txt
injsight-ai
```

The user-facing product name is:

```txt
InjSight AI
```

---

## 3. Product Positioning

Use this positioning:

```txt
AI Wallet Intelligence for Injective DeFi
```

Hero headline:

```txt
Understand Injective wallets in seconds with AI.
```

Subheadline:

```txt
InjSight AI turns wallet balances, portfolio exposure, and on-chain activity into clear AI-generated insights, risk scores, and reports for traders and DeFi teams.
```

---

## 4. Design Personality

The product should feel:

- premium
- modern
- trustworthy
- intelligent
- clean
- fintech-grade
- AI-native
- DeFi-focused

Avoid:

- gimmicky crypto visuals
- fake hologram overload
- cluttered dashboards
- generic SaaS copy
- fake user metrics
- overpromising financial outcomes

---

## 5. Visual Direction

Recommended style:

```txt
Dark fintech theme
Deep navy background
Cyan and electric blue highlights
Subtle violet accents
Rounded cards
Clean charts
Readable tables
Minimal motion
High contrast text
```

Core UI principles:

- clear hierarchy
- strong spacing
- simple navigation
- readable data
- obvious CTAs
- strong empty/error states

---

## 6. Landing Page Direction

### Required Sections

1. Navigation
2. Hero
3. Problem
4. How it works
5. Features
6. Built for Injective
7. Security/read-only notice
8. Pricing preview
9. FAQ
10. Footer

### Hero

Primary CTA:

```txt
Analyze Wallet
```

Secondary CTA:

```txt
View Demo
```

### Trust Copy

Use honest proof points:

```txt
Read-only wallet analysis
Built for Injective DeFi
AI-generated risk reports
No private keys required
```

Avoid fake claims:

```txt
25,000+ users
$2.4B analyzed
Trusted by institutions
Guaranteed risk reduction
```

Unless these are real and verifiable.

---

## 7. Wallet Analyzer UX

The analyzer is the core MVP screen.

It should be extremely clear.

### Required Elements

- wallet address input
- analyze button
- demo wallet button
- read-only safety note
- loading state
- invalid wallet error
- rate limit error
- provider unavailable error
- results dashboard

### Suggested Layout

```txt
Left/Top:
Wallet input and explanation

Main:
Wallet overview
Token balances
Portfolio composition

Right/Bottom:
Risk score
AI report
Suggested next steps
```

### Read-Only Notice

Use copy like:

```txt
InjSight AI only reads public wallet data. It never asks for private keys, seed phrases, or permission to move funds.
```

---

## 8. Risk Score UX

The risk score should be memorable and explainable.

Display:

```txt
Risk Score: 72 / 100
Moderate Risk
```

Breakdown:

- concentration risk
- volatility exposure
- stablecoin buffer
- activity risk
- diversification

Do not show a score without explaining it.

Do not imply the score is investment advice.

---

## 9. AI Report UX

The AI report should not be one long block of text.

Use sections:

```txt
Wallet Summary
Portfolio Exposure
Concentration Risk
Notable Observations
Injective Context
Suggested Next Steps
Disclaimer
```

Each section should be scannable.

Use cards, bullets, and labels.

---

## 10. Dashboard UX

The authenticated dashboard should answer:

```txt
What wallets am I watching?
What changed recently?
Which wallets have the highest risk?
What reports are ready?
What should I do next?
```

Dashboard cards:

- saved wallets
- recent analyses
- highest risk wallet
- usage meter
- latest reports
- upgrade CTA

---

## 11. Reports UX

Reports should feel exportable and professional.

Report detail page should include:

- report title
- wallet address
- generated date
- risk score
- summary
- detailed analysis sections
- suggested next steps
- export button
- disclaimer

---

## 12. Alerts UX

Future alert center should include:

- unread count
- severity labels
- wallet address
- what changed
- why it matters
- next action

Good alert:

```txt
Risk score increased from 48 to 71 because INJ concentration rose above 70% of the visible portfolio.
```

Weak alert:

```txt
Risk changed.
```

---

## 13. Empty States

Empty states should be helpful.

Examples:

### No Saved Wallets

```txt
You have not saved any wallets yet.
Analyze an Injective wallet and save it to monitor future reports.
[Analyze Wallet]
```

### No Reports

```txt
No reports yet.
Run your first wallet analysis to generate an AI-powered report.
[Create Report]
```

### No Alerts

```txt
No alerts yet.
Alerts will appear here when saved wallets show meaningful changes.
```

---

## 14. Error States

Errors should be specific and actionable.

Examples:

### Invalid Wallet

```txt
This does not look like a valid Injective wallet address. Please check the address and try again.
```

### Provider Error

```txt
We could not fetch Injective wallet data right now. Please try again shortly.
```

### AI Error

```txt
Wallet data was fetched successfully, but the AI report could not be generated. You can retry report generation.
```

---

## 15. Mobile UX

The MVP should work on mobile.

Requirements:

- wallet input full width
- results stacked vertically
- tables become cards or horizontally scroll
- risk score visible near top
- CTA buttons easy to tap
- no tiny text for wallet addresses
- copy buttons for long addresses

---

## 16. Accessibility

Requirements:

- semantic headings
- form labels
- keyboard navigation
- visible focus states
- sufficient contrast
- readable error messages
- no color-only risk meaning
- aria labels for icon buttons

---

## 17. UX Priorities for MVP

Build polish in this order:

1. Landing page clarity
2. Wallet analyzer simplicity
3. Risk score readability
4. AI report structure
5. Loading/error states
6. Mobile responsiveness
7. Dashboard shell
8. Pricing page
9. Saved wallet flow
10. Reports page

---

## 18. Final Design Rule

The product should not feel like:

```txt
a crypto dashboard with AI added
```

It should feel like:

```txt
an AI-native intelligence layer that explains Injective wallet data clearly
```
