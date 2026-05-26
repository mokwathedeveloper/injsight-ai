# InjSight AI — Frontend Architecture Plan

## 1. Frontend Goal

The frontend for InjSight AI should feel like a professional SaaS product from day one. It should make complex Injective wallet and portfolio data easy to understand through a clean interface, clear data visualization, AI-generated explanations, and a smooth wallet analysis flow.

The first version should focus on a strong public wallet analyzer, then expand into authenticated dashboards, saved wallets, reports, alerts, and team features.

---

## 2. Recommended Frontend Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14+ | SaaS-ready React framework with App Router |
| Language | TypeScript | Type safety across components, API calls, and data models |
| Styling | Tailwind CSS | Fast, consistent, responsive UI development |
| Server State | TanStack Query | API data fetching, caching, refetching, loading states |
| Client State | Zustand | Lightweight global state for auth, UI, alerts, and wallet analysis state |
| Forms | React Hook Form | Performant form handling |
| Validation | Zod | Type-safe validation for wallet inputs, login, signup, and settings |
| Charts | Recharts | Portfolio breakdowns, risk visuals, and future history charts |
| Icons | Lucide React | Clean professional UI icons |
| HTTP Client | Axios or Fetch wrapper | Typed backend API communication |
| Testing | Jest + React Testing Library | Component and UI behavior tests |
| E2E Testing | Playwright or Cypress | Critical user journey testing |
| Deployment | Vercel | Fast frontend deployment and preview URLs |

---

## 3. Frontend Product Principles

### 3.1 Clarity First

The interface should explain wallet intelligence clearly. Users should not need deep technical knowledge to understand the output.

### 3.2 SaaS-Ready Layout

Even the MVP should look like the beginning of a real SaaS platform, not a one-page demo.

### 3.3 Public First, Account Later

The wallet analyzer should be usable without login. Login should unlock saved wallets, reports, history, and alerts.

### 3.4 AI Output Must Be Structured

AI-generated insights should be displayed in clear sections, not as one long paragraph.

### 3.5 Read-Only Trust

The frontend should repeatedly make clear that the MVP is read-only and does not move funds.

---

## 4. Recommended Frontend Folder Structure

```txt
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── analyze/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── demo/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── wallets/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── reports/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── alerts/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── billing/
│   │       └── page.tsx
│   │
├── components/
│   ├── ui/
│   ├── layout/
│   ├── landing/
│   ├── analyzer/
│   ├── wallet/
│   ├── reports/
│   ├── risk/
│   ├── charts/
│   ├── auth/
│   └── pricing/
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
│   ├── api.ts
│   ├── auth.ts
│   ├── validators.ts
│   ├── constants.ts
│   ├── formatting.ts
│   └── queryClient.ts
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
│   └── api.ts
│
├── public/
│   ├── logo.png
│   └── assets/
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Page Architecture

## 5.1 Public Pages

### `/`

Landing page.

Main sections:

- Navigation
- Hero section
- Wallet analyzer CTA
- Problem section
- How InjSight AI works
- Feature highlights
- Built for Injective section
- Security/read-only notice
- Pricing preview
- Footer

Primary CTA:

```txt
Analyze Wallet
```

Secondary CTA:

```txt
View Demo
```

---

### `/analyze`

Public wallet analyzer page.

User actions:

1. Enter Injective wallet address.
2. Click analyze.
3. View loading state.
4. See wallet balances.
5. See AI report.
6. See risk score.
7. Optionally sign up to save report.

Key components:

- `WalletAddressForm`
- `WalletDataSummary`
- `TokenBalanceTable`
- `RiskScoreCard`
- `AIReportPanel`
- `SuggestedNextSteps`
- `SaveReportCTA`

---

### `/demo`

Demo wallet page.

Purpose:

- Allows judges, investors, and users to see the product immediately.
- Uses sample Injective wallet data.
- Clearly labels the data as demo/sample data.

Key components:

- `DemoWalletBanner`
- `WalletDataSummary`
- `AIReportPanel`
- `RiskScoreCard`

---

### `/pricing`

Pricing preview page.

Plans:

- Free
- Pro
- Team
- Enterprise

MVP note:

Payments do not need to work immediately. The page should communicate the SaaS direction.

---

### `/login`

Login page.

Fields:

- Email
- Password

Actions:

- Sign in
- Forgot password placeholder
- Link to signup

---

### `/signup`

Signup page.

Fields:

- Name
- Email
- Password
- Confirm password

Actions:

- Create account
- Link to login

---

## 5.2 Authenticated Pages

### `/dashboard`

Main user dashboard.

Content:

- Saved wallet count
- Recent analyses
- Latest risk scores
- Usage summary
- CTA to analyze new wallet
- Upgrade CTA if free plan

---

### `/dashboard/wallets`

Saved wallets page.

Content:

- Wallet table
- Wallet labels
- Last analyzed date
- Latest risk score
- Re-analyze button
- Delete button

---

### `/dashboard/wallets/[id]`

Wallet detail page.

Content:

- Wallet overview
- Latest balances
- Risk score history
- AI report history
- Recent observations
- Suggested next steps

---

### `/dashboard/reports`

Reports list page.

Content:

- Past AI reports
- Wallet address
- Risk level
- Created date
- Export action

---

### `/dashboard/reports/[id]`

Report detail page.

Content:

- Full AI report
- Risk breakdown
- Portfolio composition
- Suggested actions
- Export/share options

---

### `/dashboard/alerts`

Future alert center.

Content:

- Risk score changes
- New wallet activity
- Large balance movement
- Report ready notices

---

### `/dashboard/settings`

User settings.

Content:

- Profile
- Password
- Notification preferences
- Delete account option later

---

### `/dashboard/billing`

Billing and plan page.

MVP content:

- Current plan
- Usage
- Upgrade CTA
- Payment placeholder

---

## 6. Component Architecture

## 6.1 UI Components

Reusable primitives:

```txt
Button
Input
Textarea
Card
Badge
Modal
Table
Tabs
Alert
Spinner
Skeleton
Dropdown
Tooltip
Progress
```

These components should be generic and not tied to wallet logic.

---

## 6.2 Layout Components

```txt
Navbar
Footer
DashboardSidebar
DashboardTopbar
PageHeader
SectionContainer
AuthLayout
DashboardLayout
```

---

## 6.3 Analyzer Components

```txt
WalletAddressForm
AnalyzeWalletButton
WalletAnalyzerShell
WalletDataSummary
TokenBalanceTable
PortfolioCompositionCard
WalletAnalysisLoadingState
WalletAnalysisErrorState
DemoWalletBanner
SaveWalletCTA
```

---

## 6.4 Risk Components

```txt
RiskScoreCard
RiskLevelBadge
RiskBreakdownList
ConcentrationRiskPanel
VolatilityRiskPanel
StablecoinBufferPanel
```

---

## 6.5 AI Report Components

```txt
AIReportPanel
AIReportSection
AIObservationList
SuggestedNextSteps
DisclaimerBox
ExportReportButton
```

---

## 6.6 Dashboard Components

```txt
DashboardKpiCard
RecentAnalysisTable
SavedWalletCard
UsageMeter
UpgradeCard
```

---

## 7. State Management Plan

## 7.1 Server State: TanStack Query

Use TanStack Query for:

- Wallet analysis requests
- Saved wallets
- Reports
- Alerts
- User profile
- Usage limits

Example query keys:

```txt
['wallet-analysis', walletAddress]
['saved-wallets']
['wallet', walletId]
['reports']
['report', reportId]
['alerts']
['me']
['usage']
```

---

## 7.2 Client State: Zustand

Use Zustand for:

- Auth user state
- Sidebar collapsed state
- Theme preference
- Temporary wallet analysis state
- Alert count
- Modal state

Suggested stores:

```txt
authStore
analysisStore
alertStore
uiStore
```

---

## 8. API Client Plan

Create a typed API wrapper in:

```txt
frontend/lib/api.ts
```

Responsibilities:

- Set base API URL
- Attach auth token where needed
- Handle unauthorized responses
- Normalize API errors
- Support public and authenticated requests

Suggested API modules:

```txt
frontend/lib/api/
├── client.ts
├── auth.ts
├── analysis.ts
├── wallets.ts
├── reports.ts
├── alerts.ts
└── billing.ts
```

---

## 9. TypeScript Type Plan

Core types should live in `frontend/types/`.

### 9.1 User Type

```ts
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'team' | 'enterprise';
  createdAt: string;
}
```

### 9.2 Wallet Type

```ts
export interface Wallet {
  id: string;
  address: string;
  chain: 'injective';
  label?: string;
  lastAnalyzedAt?: string;
  createdAt: string;
}
```

### 9.3 Wallet Analysis Type

```ts
export interface WalletAnalysis {
  id: string;
  walletAddress: string;
  chain: 'injective';
  balances: TokenBalance[];
  riskScore: RiskScore;
  aiReport: AIReport;
  createdAt: string;
}
```

### 9.4 Token Balance Type

```ts
export interface TokenBalance {
  denom: string;
  symbol: string;
  amount: string;
  usdValue?: number;
  percentageOfPortfolio?: number;
}
```

### 9.5 Risk Score Type

```ts
export interface RiskScore {
  score: number;
  level: 'Low' | 'Moderate' | 'High' | 'Very High';
  dimensions: {
    concentrationRisk: number;
    volatilityExposure: number;
    stablecoinBuffer: number;
    activityRisk: number;
    diversification: number;
  };
}
```

### 9.6 AI Report Type

```ts
export interface AIReport {
  summary: string;
  concentrationAnalysis: string;
  riskExplanation: string;
  injectiveContext?: string;
  notableObservations: string[];
  suggestedNextSteps: string[];
  disclaimer: string;
}
```

---

## 10. Form Validation Plan

Use Zod for validation.

### Wallet Address Validation

```ts
const walletAddressSchema = z.object({
  walletAddress: z
    .string()
    .min(10, 'Wallet address is too short')
    .regex(/^inj[a-zA-Z0-9]+$/, 'Enter a valid Injective wallet address'),
});
```

### Signup Validation

```ts
const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
```

---

## 11. UI/UX Flow for Wallet Analysis

```txt
User opens /analyze
↓
User enters Injective wallet address
↓
Frontend validates address
↓
POST /api/public/analyze-wallet
↓
Show loading state
↓
Render wallet balances
↓
Render risk score
↓
Render AI report
↓
Show CTA: Save this report
↓
If not logged in, prompt signup
```

---

## 12. Loading, Empty, and Error States

Every major page should include:

### Loading State

- Skeleton cards
- Spinner for analyze button
- Text: `Analyzing wallet data...`

### Empty State

- No saved wallets
- No reports yet
- No alerts yet

### Error State

- Invalid wallet address
- Wallet not found
- Injective provider unavailable
- AI report failed
- Rate limit exceeded

Errors should be user-friendly and not expose backend internals.

---

## 13. Design Direction

The UI should feel:

- Premium
- Clean
- Technical but accessible
- SaaS-ready
- Trustworthy
- AI-native
- DeFi-focused

Suggested visual style:

- Dark fintech theme
- Deep navy background
- Cyan and blue highlights
- Subtle violet accents
- Rounded cards
- Clean data tables
- Clear risk badges
- Minimal animations

---

## 14. Accessibility Requirements

- Use semantic HTML.
- Ensure keyboard navigation works.
- Add labels to form fields.
- Use accessible contrast ratios.
- Provide focus states.
- Do not rely only on color for risk levels.
- Add aria labels where needed.
- Make tables readable on mobile.

---

## 15. Performance Requirements

- Keep landing page fast.
- Use server components where useful.
- Use client components only where interactivity is required.
- Cache API responses with TanStack Query.
- Lazy-load heavy chart components.
- Avoid unnecessary re-renders.
- Use image optimization for brand assets.

---

## 16. Security Requirements

- Never expose backend secrets in frontend environment variables.
- Only use `NEXT_PUBLIC_` for safe public values.
- Do not store refresh tokens in localStorage.
- Clear access tokens on logout.
- Protect dashboard routes.
- Never ask users for private keys or seed phrases.
- Display read-only safety notice near wallet analysis.
- Avoid rendering raw AI output as unsafe HTML.

---

## 17. Testing Plan

### Component Tests

Test:

- Wallet address form validation
- Risk score card rendering
- AI report panel rendering
- Token balance table
- Login and signup forms
- Empty states
- Error states

### E2E Tests

Critical flows:

1. User opens landing page.
2. User goes to analyzer.
3. User runs demo wallet.
4. User sees risk score and AI report.
5. User signs up.
6. User saves wallet.
7. User views saved wallet in dashboard.

---

## 18. Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```

Do not expose:

```txt
AI API keys
database credentials
JWT secrets
Injective provider private credentials
payment secrets
```

---

## 19. MVP Frontend Build Order

Build in this order:

1. App layout and Tailwind setup
2. Landing page
3. Wallet analyzer page
4. Demo wallet mode
5. API client
6. Wallet analysis result UI
7. Risk score card
8. AI report panel
9. Pricing page
10. Login page
11. Signup page
12. Dashboard shell
13. Saved wallets page
14. Reports page
15. Settings page

---

## 20. Frontend Completion Checklist

- [ ] Next.js project initialized
- [ ] TypeScript configured
- [ ] Tailwind configured
- [ ] Landing page complete
- [ ] Analyzer page complete
- [ ] Wallet address validation added
- [ ] Demo wallet flow complete
- [ ] API client connected
- [ ] Wallet balances displayed
- [ ] Risk score displayed
- [ ] AI report displayed
- [ ] Pricing page added
- [ ] Login page added
- [ ] Signup page added
- [ ] Dashboard shell added
- [ ] Saved wallets page added
- [ ] Reports page added
- [ ] Responsive design complete
- [ ] Error states complete
- [ ] Loading states complete
- [ ] Accessibility checks complete
- [ ] Frontend deployed to Vercel
