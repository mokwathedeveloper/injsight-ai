# InjSight AI — Complete User Journey

## 1. Purpose

This document maps the end-to-end user journey for InjSight AI.

It connects product experience, frontend screens, backend actions, AI analysis, and SaaS expansion paths.

---

## 2. Journey Overview

The ideal MVP journey:

```txt
Visitor lands on homepage
↓
Visitor analyzes an Injective wallet
↓
Backend fetches wallet data
↓
AI generates wallet report
↓
Risk score is displayed
↓
Visitor signs up to save wallet/report
↓
User returns to dashboard
↓
User monitors saved wallets and reports
```

---

## 3. Public Visitor Journey

### Step 1 — Landing Page

Route:

```txt
/
```

User sees:

- clear product headline
- short explanation of Injective wallet intelligence
- CTA to analyze wallet
- CTA to view demo
- security/read-only statement
- pricing preview

Primary CTA:

```txt
Analyze Wallet
```

Secondary CTA:

```txt
View Demo
```

Backend action:

None required.

---

### Step 2 — Wallet Analyzer

Route:

```txt
/analyze
```

User enters:

```txt
inj...
```

Frontend actions:

- validate wallet format
- show inline validation errors
- disable submit while invalid
- show read-only notice

Backend action:

```txt
POST /api/public/analyze-wallet
```

---

### Step 3 — Wallet Data Fetch

Backend flow:

```txt
Receive wallet address
↓
Validate address
↓
Check rate limit
↓
Fetch Injective wallet data
↓
Normalize balances and token metadata
↓
Calculate portfolio composition
↓
Return wallet data or continue into AI analysis
```

Possible outcomes:

- success
- invalid wallet
- provider unavailable
- rate limit exceeded
- no visible balances found

Frontend should display a clear message for each case.

---

### Step 4 — AI Report Generation

Backend flow:

```txt
Normalized wallet data
↓
Risk metrics calculation
↓
AI prompt construction
↓
AI model call
↓
AI output validation
↓
Structured report returned
```

AI report sections:

- wallet summary
- risk score
- concentration analysis
- notable observations
- Injective ecosystem context
- suggested next steps
- disclaimer

---

### Step 5 — Analysis Results Page

User sees:

- wallet address
- last fetched timestamp
- token balances
- portfolio composition
- risk score
- AI report
- suggested next steps
- save report CTA

If the user is not logged in:

```txt
Create a free account to save this report and monitor wallets over time.
```

---

## 4. Demo Journey

Route:

```txt
/demo
```

Purpose:

Let judges, users, and investors experience the product without needing a real wallet.

Frontend actions:

- load sample wallet data
- clearly show demo banner
- display AI report and risk score

Important rule:

Demo results must be clearly labeled as sample data.

---

## 5. Signup Journey

Route:

```txt
/signup
```

User enters:

- name
- email
- password
- confirm password

Backend action:

```txt
POST /api/auth/signup
```

Backend flow:

```txt
Validate input
↓
Check duplicate email
↓
Hash password
↓
Create user
↓
Return access token and user profile
```

After signup:

- redirect to dashboard
- optionally save the wallet/report that triggered signup

---

## 6. Login Journey

Route:

```txt
/login
```

User enters:

- email
- password

Backend action:

```txt
POST /api/auth/login
```

After login:

- redirect to dashboard
- restore saved wallets and recent reports

---

## 7. Dashboard Journey

Route:

```txt
/dashboard
```

User sees:

- saved wallet count
- recent reports
- latest risk scores
- usage meter
- analyze new wallet CTA
- upgrade CTA if free plan

Backend calls:

```txt
GET /api/auth/me
GET /api/wallets
GET /api/reports
GET /api/users/usage
```

---

## 8. Saved Wallet Journey

Route:

```txt
/dashboard/wallets
```

User can:

- view saved wallets
- add label
- re-analyze wallet
- delete wallet
- open wallet detail page

Backend calls:

```txt
GET /api/wallets
POST /api/wallets
PUT /api/wallets/:id
DELETE /api/wallets/:id
POST /api/wallets/:id/analyze
```

---

## 9. Wallet Detail Journey

Route:

```txt
/dashboard/wallets/:id
```

User sees:

- wallet overview
- latest balances
- latest risk score
- past reports
- re-analyze CTA
- future risk history chart

Backend calls:

```txt
GET /api/wallets/:id
GET /api/analysis?walletId=:id
GET /api/reports?walletId=:id
```

---

## 10. Reports Journey

Route:

```txt
/dashboard/reports
```

User sees:

- report list
- wallet address
- risk level
- date created
- export action

Backend calls:

```txt
GET /api/reports
```

Route:

```txt
/dashboard/reports/:id
```

User sees:

- full AI report
- risk breakdown
- portfolio composition
- suggested next steps
- export button

Backend calls:

```txt
GET /api/reports/:id
POST /api/reports/:id/export
```

---

## 11. Alerts Journey

Future route:

```txt
/dashboard/alerts
```

User sees:

- risk score changes
- large wallet movement alerts
- report ready alerts
- watchlist alerts

Backend calls:

```txt
GET /api/alerts
PUT /api/alerts/:id/read
PUT /api/alerts/read-all
```

MVP note:

Alerts are optional for the first MVP. They become important for retention.

---

## 12. Pricing and Upgrade Journey

Route:

```txt
/pricing
```

User sees:

- Free
- Pro
- Team
- Enterprise

If logged in, user can click upgrade.

Future backend calls:

```txt
GET /api/billing/plan
POST /api/billing/checkout
```

MVP note:

Pricing page can be static first.

---

## 13. Settings Journey

Route:

```txt
/dashboard/settings
```

User can:

- update name
- change password
- manage notifications later
- delete account later

Backend calls:

```txt
GET /api/users/me
PUT /api/users/me
PUT /api/users/password
```

---

## 14. Logout Journey

User clicks logout.

Frontend actions:

```txt
Clear local user state
Clear access token
Redirect to /login
```

Backend action:

```txt
POST /api/auth/logout
```

---

## 15. Future Team Journey

Later, team users can:

- create workspace
- invite members
- assign roles
- share wallet watchlists
- monitor treasury wallets
- export team reports

Future routes:

```txt
/dashboard/team
/dashboard/team/members
/dashboard/team/watchlists
```

---

## 16. User Journey Success Criteria

The journey is successful if:

- a visitor understands the product within 10 seconds
- a visitor can analyze a wallet without login
- results are clear and useful
- the AI report feels structured and trustworthy
- signup has a clear purpose
- dashboard gives users a reason to return
- the product feels read-only and safe
