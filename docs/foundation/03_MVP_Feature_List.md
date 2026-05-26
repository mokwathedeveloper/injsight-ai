# InjSight AI — MVP Feature List

## 1. MVP Goal

The MVP goal is to deliver a working, professional, read-only Injective wallet intelligence product that demonstrates real usefulness, clear AI value, and strong SaaS potential.

The MVP should be simple enough to build quickly but complete enough to impress hackathon judges, early users, and future investors.

## 2. Core MVP Features

### 2.1 Landing Page

Purpose: Explain the product clearly and convert users into wallet analysis.

Required sections:

- Hero section
- Product value proposition
- How it works
- Key features
- Built for Injective
- Pricing preview
- Security note
- CTA to analyze a wallet

Recommended headline:

```txt
Understand Injective wallets in seconds with AI.
```

### 2.2 Wallet Address Input

Purpose: Allow users to analyze an Injective wallet without creating an account.

Requirements:

- Input field for Injective wallet address
- Basic validation
- Error state for invalid address
- Loading state while fetching data
- CTA button: `Analyze Wallet`

### 2.3 Injective Wallet Data Fetch

Purpose: Prove real Injective integration.

MVP data should include:

- Wallet address
- Token balances
- Token symbols and denoms where available
- Basic portfolio composition
- Optional recent transactions if available within integration timeline

Recommended MVP data priority:

1. Wallet balances
2. Token metadata
3. Market price context
4. Recent transaction summary

### 2.4 Wallet Summary Dashboard

Purpose: Display wallet data before AI analysis.

Required UI blocks:

- Wallet address display
- Total visible token count
- Token balance table
- Portfolio composition card
- Data source label
- Last fetched timestamp

### 2.5 AI Wallet Report

Purpose: Convert raw wallet data into clear intelligence.

The AI report should include:

- Plain-English wallet summary
- Portfolio concentration analysis
- Risk explanation
- Notable wallet observations
- Suggested next steps
- Injective ecosystem relevance

AI report should avoid:

- Financial guarantees
- Direct buy/sell instructions
- Overconfident predictions
- Unsafe investment advice

### 2.6 AI Wallet Risk Score

Purpose: Make the product memorable and demo-friendly.

Risk score output:

```txt
Risk Score: 72 / 100
```

Suggested risk dimensions:

- Concentration risk
- Volatility exposure
- Stablecoin buffer
- Recent activity risk
- DeFi interaction risk
- Wallet diversification

MVP risk labels:

- Low Risk
- Moderate Risk
- High Risk
- Very High Risk

### 2.7 Suggested Next Steps

Purpose: Give users practical, non-custodial guidance.

Examples:

- Review concentration in top assets
- Monitor recent wallet changes
- Track stablecoin exposure
- Save this wallet for future monitoring
- Generate a report before making portfolio decisions

### 2.8 Demo Wallet Mode

Purpose: Make the product easy to demonstrate even if users do not have an Injective wallet.

Requirements:

- Button: `Try Demo Wallet`
- Loads sample wallet data
- Generates sample AI report
- Clearly labels demo data as sample data

### 2.9 Basic Authentication

Purpose: Prepare SaaS foundation.

MVP optional but recommended:

- Sign up
- Login
- Logout
- Current user profile
- Save analyzed wallet after login

Authentication can be implemented after the public wallet analyzer works.

### 2.10 Saved Wallets

Purpose: Start the transition from one-time tool to SaaS product.

Requirements:

- Save wallet address
- Add label or nickname
- List saved wallets
- Re-run analysis
- Delete saved wallet

### 2.11 Pricing Preview

Purpose: Communicate business model early.

Suggested plans:

#### Free

- Limited wallet analyses
- Basic AI summary
- Basic risk score

#### Pro

- Unlimited wallet analyses
- Saved wallets
- Watchlists
- Advanced AI reports

#### Team

- Shared watchlists
- Team dashboard
- Exportable reports
- Wallet monitoring

#### Enterprise

- Custom analytics
- API access
- Protocol intelligence
- Dedicated support

Payment integration is not required for the first MVP.

## 3. MVP User Journey

1. User visits landing page.
2. User enters Injective wallet address.
3. App validates address.
4. Backend fetches Injective wallet data.
5. Dashboard displays wallet balances.
6. AI generates wallet report.
7. User reviews risk score and summary.
8. User can sign up to save the wallet.
9. User can return later and re-analyze saved wallets.

## 4. MVP Screens

### Public Screens

- Landing page
- Wallet analyzer page
- Demo wallet report page
- Pricing page
- Login page
- Signup page

### Authenticated Screens

- Dashboard
- Saved wallets
- Wallet detail page
- Reports
- Settings

## 5. Success Criteria

The MVP is successful if:

- A user can analyze an Injective wallet without help.
- The app fetches real or clearly documented Injective wallet data.
- The AI report is understandable and useful.
- The risk score is clear and explainable.
- The UI feels professional and SaaS-ready.
- The README clearly explains AI usage and Injective integration.
- The demo can be completed in under 2 minutes.

## 6. Features to Avoid in MVP

Do not build these first:

- Automated trading
- Transaction signing
- Wallet custody
- Private key storage
- Complex tax reports
- Multi-chain analytics
- Enterprise segmentation
- API billing
- Advanced team permissions
- AI agent execution
