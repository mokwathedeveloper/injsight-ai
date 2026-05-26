# InjSight AI UX/UI Implementation Guide

## Purpose of This Guide

This document is the UX/UI implementation source of truth for **InjSight AI**.

It is written for:

1. Human frontend developers
2. AI coding assistants
3. Product designers
4. Full-stack engineers implementing the user interface

The uploaded MantleMandate UX/UI files are used only as professional benchmarks for design system quality, layout discipline, component planning, interaction states, responsive behavior, and implementation detail.

This guide is fully adapted for **InjSight AI** and must not copy the previous product directly.

---

# Reference Analysis Before Implementation

## 1. Design System Ideas to Reuse

The uploaded design system provides a strong professional foundation: clear brand identity, dark fintech visual language, color tokens, typography, spacing, grid rules, component specifications, icon rules, animation limits, and accessibility requirements.

For InjSight AI, reuse the following ideas:

- Dark SaaS interface with strong contrast
- Tokenized color system instead of random colors
- Inter as the primary UI font
- JetBrains Mono only for technical data like wallet addresses, hashes, JSON, and API keys
- 4px spacing scale
- 12-column grid
- Reusable UI primitives
- Structured status colors
- Minimal, purposeful motion
- WCAG-aware accessibility rules
- Every page must support loading, error, empty, and success states

## 2. Layout Patterns to Adapt

The uploaded screen references provide useful patterns:

- Sticky landing page navigation
- Strong hero section with clear CTA
- Trust bar below the hero
- 2x2 feature card grids
- Three-step “How It Works” section
- Split-screen login and signup pages
- Focused onboarding flow after signup
- Sidebar-based dashboard layout
- KPI cards across the top of app pages
- Right-side alert panels
- Table + filter patterns for history and reports
- Export modal pattern
- Pricing cards with a highlighted middle plan

For InjSight AI, adapt these patterns to wallet intelligence:

- Replace trading mandates with wallet analysis
- Replace AI agents with saved wallets and watchlists
- Replace trades with wallet analyses and reports
- Replace on-chain audit trail with wallet activity and analysis history
- Replace risk engine controls with wallet risk score breakdown
- Replace protocol execution with Injective data sources and integrations

## 3. Component Patterns to Reuse

The reference files define reusable component patterns that should be kept:

- Button variants: primary, secondary, ghost, danger, icon
- Cards: standard card, KPI card, dashboard card
- Status badges: success, warning, error, inactive
- Alert banners with action buttons
- Sidebar navigation
- Tables with hover states
- Filter bars
- Modal dialogs
- Empty states
- Loading skeletons
- Error cards
- Responsive card grids
- Pricing cards
- Export controls

For InjSight AI, extend these with:

- WalletAddressInput
- RiskScoreCard
- WalletSummaryCard
- PortfolioCompositionCard
- AIReportCard
- WalletInsightPanel
- ConcentrationRiskCard
- WalletActivityTable
- ReportTable
- SavedWalletCard

## 4. Interaction States to Reuse

The reference UX files consistently define important interaction states. InjSight AI must include:

- Hover
- Focus
- Active
- Disabled
- Loading
- Success
- Error
- Empty
- Skeleton loading
- Toast notifications
- Inline validation
- Dismissible alert banners
- Modal open/close
- Mobile drawer behavior
- Table row hover
- Copy-to-clipboard feedback

## 5. What Must Change for InjSight AI

InjSight AI is not an AI trading mandate product.

Remove or replace:

- AI trading agents
- mandate creation
- trade execution
- deployed agents
- on-chain trading records
- policy hashes
- autonomous execution
- protocol routing for trades
- private key execution logic
- “agent P&L” as a primary concept

Replace with:

- Injective wallet analysis
- portfolio composition
- token balances
- wallet risk score
- concentration risk
- AI-generated wallet reports
- saved wallets
- watchlists
- analysis history
- wallet activity alerts
- report exporting
- read-only safety messaging

---

# 1. Product UI Overview

## Product Name

**InjSight AI**

## Subtitle

**AI Wallet Intelligence for Injective DeFi**

## Product Purpose

InjSight AI helps Injective DeFi users understand wallet and portfolio data by turning raw on-chain activity into:

- AI-generated insights
- wallet risk scores
- portfolio composition summaries
- concentration risk analysis
- plain-English wallet reports
- suggested next steps
- future watchlist alerts

## Target Users

### MVP Users

- Injective traders
- DeFi users
- crypto portfolio holders
- power users monitoring wallets

### Future SaaS Users

- DeFi teams
- DAOs
- protocol teams
- crypto research teams
- analysts
- small funds

## Core User Journey

```txt
Visitor lands on homepage
↓
Visitor pastes an Injective wallet address
↓
InjSight AI validates the address
↓
Backend fetches wallet data
↓
AI generates wallet insights
↓
User sees risk score, portfolio composition, and AI report
↓
User signs up to save wallet/report
↓
User returns to dashboard for saved wallets, reports, alerts, and history
```

## Interface Goals

The UI should communicate:

- wallet intelligence
- Injective DeFi analysis
- AI-generated insights
- portfolio visibility
- risk awareness
- professional SaaS quality
- trust and clarity
- read-only safety

---

# 2. Design System Foundation

## 2.1 Brand Identity

| Item | Definition |
|---|---|
| Product name | InjSight AI |
| Monogram | IS or IA |
| Product category | AI Wallet Intelligence |
| Subtitle | AI Wallet Intelligence for Injective DeFi |
| Voice | Clear, precise, technical, trustworthy |
| Style | Premium fintech, AI-native, DeFi-focused |

## 2.2 Tone of Voice

Use:

- direct
- calm
- clear
- specific
- trustworthy
- practical

Avoid:

- hype
- vague claims
- fake traction
- unrealistic financial promises
- “guaranteed returns”
- aggressive trading language

Good copy:

```txt
Analyze wallet exposure in plain English.
```

Bad copy:

```txt
Become rich with AI trading instantly.
```

## 2.3 Color Tokens

### Core Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#0066FF` | Primary buttons, active links, focus rings |
| `primary-hover` | `#0052CC` | Primary hover |
| `accent` | `#00C2FF` | AI highlights, chart accents, glows |
| `violet` | `#7C3AED` | Subtle AI accent |
| `success` | `#22C55E` | Positive status, low risk, success |
| `success-bg` | `#0D2818` | Success alert background |
| `error` | `#EF4444` | Errors, high risk, destructive actions |
| `error-bg` | `#2D0F0F` | Error alert background |
| `warning` | `#F5C542` | Warnings, medium risk |
| `warning-bg` | `#2A2000` | Warning alert background |
| `info` | `#58A6FF` | Informational links and low-severity alerts |

### Background Palette

| Token | Hex | Usage |
|---|---|---|
| `bg-page` | `#0D1117` | Main app background |
| `bg-card` | `#161B22` | Cards, panels, modals |
| `bg-card-hover` | `#1C2128` | Hover card background |
| `bg-input` | `#0D1117` | Input background |
| `border` | `#21262D` | Default border |
| `border-strong` | `#30363D` | Hover/focus border |
| `border-focus` | `#0066FF` | Input focus border |

### Text Palette

| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#F0F6FC` | Headings, main text |
| `text-secondary` | `#8B949E` | Descriptions, labels |
| `text-disabled` | `#484F58` | Disabled text, placeholders |
| `text-link` | `#58A6FF` | Links |
| `text-link-hover` | `#79B8FF` | Link hover |
| `text-inverse` | `#0D1117` | Text on light backgrounds |

## 2.4 Status Colors

| Status | Color | Usage |
|---|---|---|
| Low risk | `#22C55E` | Healthy wallet risk |
| Moderate risk | `#F5C542` | Caution |
| High risk | `#EF4444` | High wallet risk |
| Info | `#58A6FF` | Neutral informational state |
| Disabled | `#484F58` | Disabled or unavailable |

Risk colors must always include text labels. Do not rely on color alone.

## 2.5 Typography

### Font Families

```txt
Primary: Inter
Monospace: JetBrains Mono
```

Use JetBrains Mono only for:

- wallet addresses
- transaction hashes
- API keys
- JSON snippets
- block numbers
- chain identifiers

### Type Scale

| Role | Font | Weight | Size | Line Height |
|---|---|---:|---:|---:|
| Display | Inter | 900 | 64px | 72px |
| H1 | Inter | 700 | 40px | 48px |
| H2 | Inter | 600 | 28px | 36px |
| H3 | Inter | 600 | 20px | 28px |
| H4 | Inter | 600 | 16px | 24px |
| Body Large | Inter | 400 | 16px | 24px |
| Body | Inter | 400 | 14px | 20px |
| Body Small | Inter | 400 | 12px | 16px |
| Label | Inter | 500 | 12px | 16px |
| Label Caps | Inter | 600 | 11px | 16px |
| Code | JetBrains Mono | 400 | 13px | 20px |

## 2.6 Spacing System

Base unit: **4px**

| Token | Value | Usage |
|---|---:|---|
| `space-1` | 4px | Tight icon gap |
| `space-2` | 8px | Badge padding |
| `space-3` | 12px | Compact row padding |
| `space-4` | 16px | Standard gaps |
| `space-5` | 20px | Compact card padding |
| `space-6` | 24px | Standard card padding |
| `space-8` | 32px | Internal section spacing |
| `space-10` | 40px | Large section gaps |
| `space-12` | 48px | Hero spacing |
| `space-16` | 64px | Landing page section spacing |

## 2.7 Layout Grid

| Area | Rule |
|---|---|
| App interior | 12-column grid, 16px gutters, max-width 1440px |
| Landing page | 12-column grid, 24px gutters, max-width 1280px |
| Sidebar | 240px desktop, 64px tablet, drawer on mobile |
| Top nav | 64px |
| Page content padding | 24px horizontal, 32px top |

## 2.8 Border Radius

| Token | Value | Usage |
|---|---:|---|
| `radius-sm` | 4px | Small badges |
| `radius-md` | 6px | Buttons, inputs |
| `radius-lg` | 8px | Cards |
| `radius-xl` | 12px | Large panels |
| `radius-2xl` | 16px | Hero preview cards |

## 2.9 Shadows

The UI should mostly be flat. Use shadows sparingly.

| Token | Usage |
|---|---|
| `shadow-soft` | Floating modals and dropdowns |
| `shadow-glow` | Focused AI/wallet analyzer card only |

## 2.10 Icon Rules

Library:

```txt
Lucide React
```

Rules:

- outlined icons only
- 2px stroke
- 16px inline
- 20px nav
- 24px feature cards
- 32px hero/empty states
- icons inherit text color unless status-specific

Suggested icon mappings:

| Concept | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Wallet | `Wallet` |
| Risk | `Gauge` |
| Reports | `BarChart2` |
| Alerts | `Bell` |
| AI insights | `Sparkles` |
| Portfolio | `PieChart` |
| Activity | `Activity` |
| Security | `Shield` |
| Settings | `Settings` |
| Copy | `Copy` |
| External link | `ExternalLink` |

## 2.11 Animation Rules

Use Framer Motion only for light UI transitions.

Allowed:

- fade in page content
- slide in alert banner
- subtle card hover
- skeleton shimmer
- number count-up for risk score
- report section reveal

Avoid:

- heavy parallax
- 3D effects
- constant motion
- distracting animations
- scroll-jacking

## 2.12 Accessibility Rules

- All interactive elements must have visible focus states.
- Form inputs must have labels.
- Risk levels must use text and icon, not color only.
- Minimum mobile touch target: 44px.
- Tables must be readable on mobile.
- Error messages must explain how to fix the issue.
- Use semantic HTML: `main`, `section`, `nav`, `header`, `footer`.
- Buttons must not be replaced with clickable divs.

---

# 3. Tailwind CSS Integration

## 3.1 Strategy

Tailwind should use the design system tokens. Developers should avoid random colors and one-off spacing values.

Use custom tokens for:

- colors
- spacing
- border radius
- font family
- font sizes
- animation durations

## 3.2 Sample `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066FF",
          hover: "#0052CC",
        },
        accent: "#00C2FF",
        violet: "#7C3AED",
        success: {
          DEFAULT: "#22C55E",
          bg: "#0D2818",
        },
        error: {
          DEFAULT: "#EF4444",
          bg: "#2D0F0F",
        },
        warning: {
          DEFAULT: "#F5C542",
          bg: "#2A2000",
        },
        info: "#58A6FF",
        bg: {
          page: "#0D1117",
          card: "#161B22",
          hover: "#1C2128",
          input: "#0D1117",
        },
        border: {
          DEFAULT: "#21262D",
          strong: "#30363D",
          focus: "#0066FF",
        },
        text: {
          primary: "#F0F6FC",
          secondary: "#8B949E",
          disabled: "#484F58",
          link: "#58A6FF",
          linkHover: "#79B8FF",
          inverse: "#0D1117",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 12px 32px rgba(0, 0, 0, 0.35)",
        glow: "0 0 0 3px rgba(0,102,255,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
```

## 3.3 Global Styles

Use `styles/globals.css` or `app/globals.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  background: #0D1117;
}

body {
  background: #0D1117;
  color: #F0F6FC;
  font-family: Inter, sans-serif;
}

::selection {
  background: rgba(0, 102, 255, 0.35);
}
```

## 3.4 Reusable Class Patterns

Use utility composition carefully.

Example base card class:

```txt
rounded-lg border border-border bg-bg-card p-6
```

Example input class:

```txt
h-10 rounded-md border border-border bg-bg-input px-3 text-sm text-text-primary placeholder:text-text-disabled focus:border-border-focus focus:outline-none
```

Do not create new spacing or color values unless they become design tokens.

---

# 4. Frontend Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 14+ | App Router, routing, layouts, SSR-ready SaaS frontend |
| TypeScript | Type safety across UI, API, state, and data models |
| Tailwind CSS | Design-system-based styling |
| TanStack Query | API data fetching, caching, loading/error states |
| Zustand | Lightweight global UI/auth state |
| React Hook Form | Fast, maintainable forms |
| Zod | Schema validation for forms and API inputs |
| Recharts | Portfolio and risk visualizations |
| Lucide React | Professional icon system |
| Framer Motion | Light page/card/alert animations only |

---

# 5. Professional Folder Structure

```txt
frontend/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── analyze/page.tsx
│   ├── demo/page.tsx
│   ├── report/[id]/page.tsx
│   ├── risk/[id]/page.tsx
│   ├── portfolio/[id]/page.tsx
│   ├── pricing/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── wallets/page.tsx
│       ├── history/page.tsx
│       ├── reports/page.tsx
│       ├── alerts/page.tsx
│       ├── settings/page.tsx
│       └── billing/page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── wallet/
│   ├── report/
│   ├── dashboard/
│   ├── pricing/
│   ├── alerts/
│   ├── charts/
│   └── auth/
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
│   ├── apiClient.ts
│   ├── formatting.ts
│   ├── queryClient.ts
│   └── utils.ts
│
├── services/
│   ├── authService.ts
│   ├── analysisService.ts
│   ├── walletService.ts
│   ├── reportService.ts
│   └── alertService.ts
│
├── stores/
│   ├── authStore.ts
│   ├── uiStore.ts
│   └── analysisStore.ts
│
├── schemas/
│   ├── auth.schema.ts
│   ├── wallet.schema.ts
│   └── report.schema.ts
│
├── types/
│   ├── user.ts
│   ├── wallet.ts
│   ├── analysis.ts
│   ├── report.ts
│   ├── alert.ts
│   └── pricing.ts
│
├── constants/
│   ├── routes.ts
│   ├── plans.ts
│   └── navigation.ts
│
├── data/
│   ├── demoWallet.ts
│   ├── mockReports.ts
│   ├── mockAlerts.ts
│   ├── mockPricing.ts
│   └── mockHistory.ts
│
├── styles/
│   └── tokens.css
│
├── public/
│   ├── logo.svg
│   └── images/
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

# 6. Reusable Component Library

## Button

Purpose: Standardize all clickable actions.

Props:

```ts
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}
```

Visual style:

- Primary: blue fill, white text
- Secondary: transparent with border
- Ghost: transparent, hover card background
- Danger: red fill
- Link: text only

States:

- hover
- focus
- active
- disabled
- loading

Accessibility:

- use `<button>`
- disabled state must be real `disabled`
- loading state should set `aria-busy`

## Card

Purpose: Base container for panels, reports, stat cards, and dashboards.

Props:

```ts
interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}
```

Style:

```txt
rounded-lg border border-border bg-bg-card p-6
```

States:

- default
- hover
- selected
- error
- warning

## Input

Purpose: Standard text entry.

Props:

```ts
interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

Accessibility:

- label must connect to input
- errors must use `aria-describedby`

## Textarea

Used for notes, report comments, and future AI queries.

## Select

Used for filters, plans, export formats, and risk categories.

## Badge

Purpose: Status labels.

Variants:

```txt
success
warning
error
info
neutral
risk-low
risk-medium
risk-high
```

## AlertBanner

Purpose: High-visibility alert at top of dashboard or analyzer.

Supports:

- success
- warning
- error
- info
- action button
- dismiss button

## EmptyState

Purpose: Explain what to do when there is no data.

Must include:

- icon
- title
- body
- optional CTA

## LoadingState

Purpose: Avoid blank screens.

Variants:

- page
- card
- table
- report
- analysis

## ErrorState

Purpose: Explain what failed and how to recover.

Must include:

- error title
- human-readable message
- retry action where possible

## AppShell

Purpose: Main authenticated layout.

Includes:

- sidebar
- top navigation
- main content area
- optional alert banner

## Sidebar

Purpose: Dashboard navigation.

Items:

- Dashboard
- Analyze Wallet
- Saved Wallets
- Analysis History
- Reports
- Alerts
- Pricing/Billing
- Settings

## TopNavigation

Purpose: Page-level actions and user menu.

## PageHeader

Purpose: Standard page heading, subheading, and actions.

## SectionHeader

Purpose: Standard section heading inside pages.

## StatCard

Purpose: Display metrics such as saved wallets, average risk, reports, alerts.

## RiskScoreCard

Purpose: Display wallet risk score.

Props:

```ts
interface RiskScoreCardProps {
  score: number;
  level: "Low" | "Moderate" | "High" | "Very High";
  dimensions?: RiskDimension[];
}
```

## WalletAddressInput

Purpose: Validate and submit Injective wallet address.

Features:

- `inj...` validation
- demo wallet CTA
- invalid address error
- submit loading state

## WalletSummaryCard

Purpose: Display high-level wallet details.

Data:

- wallet address
- token count
- visible portfolio value
- last analyzed
- data source

## PortfolioCompositionCard

Purpose: Show asset allocation.

Includes:

- pie/donut chart
- token list
- top concentration warning

## AIReportCard

Purpose: Render structured AI insight output.

Sections:

- summary
- risk explanation
- concentration risk
- notable observations
- suggested next steps
- disclaimer

## InsightPanel

Purpose: Short AI insight cards.

## ConcentrationRiskCard

Purpose: Highlight top-asset concentration.

## WalletActivityTable

Purpose: Display wallet activity or recent analysis events.

## ReportTable

Purpose: List historical reports.

## PricingCard

Purpose: Display plan details.

## SettingsSection

Purpose: Group settings controls.

---

# 7. Starter Component Skeletons

## 7.1 AppShell

```tsx
interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg-page text-text-primary">
      {/* Sidebar collapses on tablet and becomes drawer on mobile */}
      <Sidebar />

      <div className="lg:pl-60">
        <TopNavigation />
        <main className="px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## 7.2 Sidebar

```tsx
interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const items: SidebarItem[] = [
    // Dashboard, Analyze Wallet, Saved Wallets, History, Reports, Alerts, Settings
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-60 border-r border-border bg-bg-page lg:block">
      <div className="flex h-16 items-center border-b border-border px-5">
        {/* InjSight AI logo */}
      </div>

      <nav className="space-y-1 px-3 py-4">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex h-10 items-center gap-3 rounded-md px-3 text-sm text-text-secondary hover:bg-bg-card hover:text-text-primary"
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
```

## 7.3 TopNavigation

```tsx
export function TopNavigation() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-bg-page/90 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        {/* Page context or search */}
        {/* User menu */}
      </div>
    </header>
  );
}
```

## 7.4 Button

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
```

## 7.5 Card

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-lg border border-border bg-bg-card p-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}
```

## 7.6 Input

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({ label, error, helperText, id, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        className="h-10 w-full rounded-md border border-border bg-bg-input px-3 text-sm text-text-primary placeholder:text-text-disabled focus:border-border-focus focus:outline-none"
        aria-invalid={!!error}
        {...props}
      />
      {error ? (
        <p className="text-xs text-error">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
}
```

## 7.7 Badge

```tsx
interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
}

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-wide">
      {children}
    </span>
  );
}
```

## 7.8 WalletAddressInput

```tsx
interface WalletAddressInputProps {
  onAnalyze: (address: string) => void;
  onDemo?: () => void;
  isLoading?: boolean;
}

export function WalletAddressInput({ onAnalyze, onDemo, isLoading }: WalletAddressInputProps) {
  // Use React Hook Form + Zod in production
  return (
    <form className="rounded-xl border border-border bg-bg-card p-6">
      <label className="text-sm font-medium text-text-secondary">
        Injective wallet address
      </label>

      <div className="mt-2 flex flex-col gap-3 md:flex-row">
        <input
          placeholder="inj..."
          className="h-12 flex-1 rounded-md border border-border bg-bg-input px-4 font-mono text-sm text-text-primary placeholder:text-text-disabled focus:border-primary focus:outline-none"
        />
        <Button isLoading={isLoading}>Analyze Wallet</Button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-text-secondary">
          Read-only analysis. No private keys or seed phrases required.
        </p>
        {onDemo && (
          <button type="button" onClick={onDemo} className="text-text-link hover:text-text-linkHover">
            Try demo wallet
          </button>
        )}
      </div>
    </form>
  );
}
```

## 7.9 RiskScoreCard

```tsx
interface RiskScoreCardProps {
  score: number;
  level: "Low" | "Moderate" | "High" | "Very High";
}

export function RiskScoreCard({ score, level }: RiskScoreCardProps) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        Wallet Risk Score
      </p>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-5xl font-bold text-text-primary">{score}</span>
        <span className="pb-2 text-text-secondary">/ 100</span>
      </div>
      <Badge variant={level === "Low" ? "success" : level === "Moderate" ? "warning" : "error"}>
        {level} Risk
      </Badge>
      {/* Add dimension breakdown bars here */}
    </Card>
  );
}
```

## 7.10 PortfolioSummaryCard

```tsx
interface PortfolioSummaryCardProps {
  tokenCount: number;
  estimatedValue?: number;
  topAsset?: string;
  lastAnalyzedAt: string;
}

export function PortfolioSummaryCard(props: PortfolioSummaryCardProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">Portfolio Summary</h3>
      {/* Render token count, estimated value, top asset, last analyzed */}
    </Card>
  );
}
```

## 7.11 AIReportCard

```tsx
interface AIReportCardProps {
  summary: string;
  concentrationAnalysis: string;
  notableObservations: string[];
  suggestedNextSteps: string[];
  disclaimer: string;
}

export function AIReportCard({
  summary,
  concentrationAnalysis,
  notableObservations,
  suggestedNextSteps,
  disclaimer,
}: AIReportCardProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">AI Wallet Report</h3>

      <section className="mt-4">
        <h4 className="text-sm font-semibold text-text-primary">Summary</h4>
        <p className="mt-2 text-sm text-text-secondary">{summary}</p>
      </section>

      {/* Render concentration, observations, next steps, disclaimer */}
    </Card>
  );
}
```

## 7.12 WalletInsightPanel

```tsx
interface WalletInsightPanelProps {
  title: string;
  description: string;
  severity?: "low" | "medium" | "high" | "info";
}

export function WalletInsightPanel({ title, description, severity = "info" }: WalletInsightPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-4">
      <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
      <p className="mt-1 text-sm text-text-secondary">{description}</p>
    </div>
  );
}
```

## 7.13 AlertBanner

```tsx
interface AlertBannerProps {
  variant: "success" | "warning" | "error" | "info";
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export function AlertBanner(props: AlertBannerProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-bg-card p-3">
      <div>
        <p className="text-sm font-semibold">{props.title}</p>
        {props.message && <p className="text-sm text-text-secondary">{props.message}</p>}
      </div>
      {/* Render action and dismiss */}
    </div>
  );
}
```

## 7.14 EmptyState

```tsx
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-bg-card p-10 text-center">
      {icon}
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
```

## 7.15 LoadingState

```tsx
export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-card p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-1/3 rounded bg-border" />
        <div className="h-8 w-2/3 rounded bg-border" />
        <div className="h-24 rounded bg-border" />
      </div>
      <p className="sr-only">{label}</p>
    </div>
  );
}
```

## 7.16 ErrorState

```tsx
interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-error bg-error-bg p-6">
      <h3 className="text-base font-semibold text-error">{title}</h3>
      <p className="mt-2 text-sm text-error">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 text-sm font-semibold text-error">
          Try again
        </button>
      )}
    </div>
  );
}
```

## 7.17 PricingCard

```tsx
interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export function PricingCard({ name, price, description, features, highlighted }: PricingCardProps) {
  return (
    <Card className={highlighted ? "border-primary" : ""}>
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
      <p className="mt-6 text-4xl font-bold">{price}</p>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="text-sm text-text-secondary">
            ✓ {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
```

## 7.18 ReportTable

```tsx
interface ReportTableProps {
  reports: Array<{
    id: string;
    walletAddress: string;
    riskLevel: string;
    createdAt: string;
    status: string;
  }>;
}

export function ReportTable({ reports }: ReportTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-bg-page text-xs uppercase tracking-wide text-text-secondary">
          <tr>
            <th className="px-4 py-3 text-left">Wallet</th>
            <th className="px-4 py-3 text-left">Risk</th>
            <th className="px-4 py-3 text-left">Created</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-t border-border hover:bg-bg-hover">
              <td className="px-4 py-3 font-mono">{report.walletAddress}</td>
              <td className="px-4 py-3">{report.riskLevel}</td>
              <td className="px-4 py-3">{report.createdAt}</td>
              <td className="px-4 py-3">{report.status}</td>
              <td className="px-4 py-3 text-right">View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

# 8. Page-by-Page UI Specification

## 8.1 Landing Page

Purpose: Communicate value in under 5 seconds.

User goal: Understand InjSight AI and start wallet analysis.

Layout:

1. Sticky navigation
2. Hero section
3. Wallet analyzer preview
4. Trust bar
5. Feature section
6. How it works
7. AI report preview
8. Risk score preview
9. Pricing preview
10. CTA section
11. Footer

Components:

- Navbar
- HeroSection
- WalletAnalyzerPreview
- TrustBar
- FeatureCard
- HowItWorksStep
- AIReportPreview
- RiskScoreCard
- PricingCard
- Footer

Data needed:

- static marketing copy
- pricing plans
- feature list

States:

- mobile menu open/closed
- CTA hover/focus
- optional demo analyzer loading

Mobile:

- single-column hero
- hide complex illustration
- feature cards stacked
- pricing cards stacked or horizontal snap scroll

## 8.2 Wallet Analyzer Page

Purpose: Core MVP conversion page.

User goal: Paste an Injective wallet and get insights.

Layout:

1. Page header
2. Wallet input card
3. Read-only safety notice
4. Empty state before analysis
5. Loading state while analyzing
6. Results grid after success

Main sections:

- WalletAddressInput
- PortfolioSummaryCard
- TokenBalanceTable
- PortfolioCompositionCard
- RiskScoreCard
- AIReportCard
- SuggestedNextSteps
- SaveReportCTA

Data needed:

- wallet address
- token balances
- token metadata
- risk score
- AI report

States:

- empty
- validating
- loading
- invalid wallet
- provider error
- AI report error
- success

Mobile:

- input full width
- cards stacked
- table horizontally scrolls or becomes card list

## 8.3 Demo Wallet Mode

Purpose: Let anyone see the product instantly.

User goal: View sample report without real wallet.

Rules:

- demo banner always visible
- no fake data presented as real
- sample wallet clearly labeled

Components:

- DemoWalletBanner
- PortfolioSummaryCard
- RiskScoreCard
- AIReportCard

## 8.4 AI Wallet Report Page

Purpose: Show full structured AI analysis.

Sections:

- Report header
- Wallet summary
- Portfolio overview
- Risk score
- Concentration risk
- Notable wallet behavior
- Asset exposure
- AI-generated explanation
- Suggested next steps
- Export report button
- Save report button

AI text display rules:

- break into sections
- avoid giant paragraphs
- use cards and lists
- include disclaimer
- show generation timestamp

## 8.5 Risk Score Breakdown Page

Purpose: Explain why a wallet received a risk score.

Sections:

- Overall score
- Risk level
- Concentration risk
- Stablecoin buffer
- Volatility exposure
- Activity risk
- Diversification
- Methodology note

## 8.6 Portfolio Composition Page

Purpose: Show asset allocation.

Components:

- donut chart
- token list
- top holdings
- concentration warning
- stablecoin percentage
- unknown token section

## 8.7 Pricing Preview Page

Plans:

- Free
- Pro
- Team
- Enterprise

Compare:

- wallet analyses
- saved wallets
- report exports
- watchlist alerts
- team access
- API access

## 8.8 Login Page

Purpose: Returning users access saved wallets and reports.

Layout:

- split screen desktop
- form-only mobile
- left side product trust message
- right side login form

Copy adapted for InjSight AI:

```txt
Welcome back
Sign in to view saved wallets, AI reports, and wallet alerts.
```

## 8.9 Sign-Up Page

Purpose: Convert user after analysis or from landing page.

Copy:

```txt
Start analyzing wallets for free.
No wallet connection required. No credit card required.
```

After signup:

- if user came from analysis, offer to save report
- otherwise send to onboarding or dashboard

## 8.10 User Dashboard

Purpose: User command center.

Display:

- saved wallets
- recent analyses
- average wallet risk score
- high-risk wallet count
- reports generated
- recent alerts
- CTA to analyze a new wallet

Do not show:

- trading agents
- trade execution
- mandate P&L

## 8.11 Saved Wallets Page

Columns:

- label
- wallet address
- risk score
- last analyzed
- estimated value
- watchlist status
- actions

Actions:

- view
- re-analyze
- remove

## 8.12 Analysis History Page

Columns:

- wallet address
- date analyzed
- risk score
- report status
- data source
- actions

Actions:

- view report
- export
- delete

## 8.13 Reports Page

Report types:

- Wallet Intelligence
- Portfolio Risk
- Watchlist
- Team

Export formats:

- PDF
- CSV
- JSON

## 8.14 Alerts Page

Alert types:

- Risk score changed
- High concentration detected
- Large wallet movement detected
- New asset exposure detected
- Report ready
- Watchlist wallet updated
- Analysis failed

Severity:

- High
- Medium
- Low

## 8.15 Settings Page

Sections:

- Profile
- Password
- Notification preferences
- API access later
- Billing later
- Danger zone later

---

# 9. Landing Page Specification

## Headline

```txt
Understand Any Injective Wallet in Seconds.
```

## Subheadline

```txt
Paste a wallet address and get AI-generated portfolio insights, risk scores, concentration analysis, and plain-English reports.
```

## Navigation

Links:

```txt
Platform
How It Works
Pricing
Docs
Security
```

Right actions:

```txt
Sign In
Analyze Wallet
```

## Hero Layout

Desktop:

- left: copy and CTA
- right: wallet intelligence preview card

Mobile:

- single column
- preview below CTA

## Wallet Analyzer Preview

Small preview of input and result:

```txt
inj1...
Risk Score: 68 / 100
Top Exposure: INJ
AI Insight: This wallet is highly concentrated in INJ...
```

## Trust Bar

Items:

```txt
Read-only wallet analysis
No private keys required
Built for Injective DeFi
AI-generated risk reports
```

## Feature Cards

1. Wallet Intelligence
2. Portfolio Risk Scores
3. AI Reports
4. Saved Wallets and Watchlists

## How It Works

1. Paste wallet address
2. InjSight AI analyzes wallet data
3. Get AI insights and risk score

## CTA Section

```txt
Ready to understand your Injective wallet?
[Analyze Wallet]
```

---

# 10. Wallet Analyzer Page

## Core Requirements

- Injective wallet address input
- Injective address validation
- demo wallet option
- analyze wallet button
- loading analysis state
- portfolio summary result
- risk score result
- AI insight preview
- suggested next steps
- invalid wallet handling
- empty state before analysis

## Empty State

```txt
Paste an Injective wallet address to generate your first AI wallet report.
```

## Loading State

```txt
Fetching Injective wallet data...
Calculating risk score...
Generating AI report...
```

Use staged loading messages.

## Error States

Invalid wallet:

```txt
This does not look like a valid Injective wallet address. Please check the address and try again.
```

Provider error:

```txt
We could not fetch Injective wallet data right now. Please try again shortly.
```

AI error:

```txt
Wallet data was fetched, but the AI report could not be generated. Retry report generation.
```

---

# 11. AI Wallet Report Page

## Report Structure

1. Report header
2. Wallet address
3. Generated date
4. Risk score
5. Wallet summary
6. Portfolio overview
7. Concentration risk
8. Notable wallet behavior
9. Asset exposure
10. Suggested next steps
11. Export/save actions
12. Disclaimer

## AI Text Display Rules

- structured sections
- short paragraphs
- bullet lists for observations
- confidence wording should be careful
- no financial guarantees
- no direct trading orders

---

# 12. Dashboard Page

## Dashboard KPIs

- Saved wallets
- Recent analyses
- Average risk score
- High-risk wallets
- Reports generated

## Main Areas

Left:

- saved wallet overview
- risk distribution
- recent analysis chart

Right:

- recent alerts
- upgrade card
- quick analyze card

## Empty Dashboard

```txt
Your wallet intelligence dashboard is ready.
Analyze your first Injective wallet to see saved reports, risk scores, and insights here.
[Analyze Wallet]
```

---

# 13. Saved Wallets Page

Table columns:

- Wallet label
- Address
- Risk score
- Last analyzed
- Portfolio value
- Watchlist status
- Actions

Actions:

- View
- Re-analyze
- Rename
- Remove

Empty state:

```txt
No saved wallets yet. Analyze a wallet and save it to monitor over time.
```

---

# 14. Analysis History Page

Purpose: Show every wallet analysis run.

Columns:

- Date
- Wallet
- Risk score
- Report status
- Data source
- Actions

Filters:

- date range
- risk level
- wallet
- report status

---

# 15. Alerts Page

## Alert Types

| Alert | Severity |
|---|---|
| Risk score changed | Medium |
| High concentration detected | High |
| Large wallet movement detected | High |
| New asset exposure detected | Medium |
| Report ready | Low |
| Watchlist wallet updated | Low |
| Analysis failed | Medium |

## Alert Banner

Only show the most important alert.

Example:

```txt
High concentration detected — INJ now represents 82% of visible wallet exposure. [View Report]
```

## Alert List

Each item includes:

- severity dot
- title
- wallet
- timestamp
- action button

---

# 16. Reports Page

## Report Types

- Wallet Intelligence Report
- Portfolio Risk Report
- Watchlist Report
- Team Report later

## Export Formats

- PDF
- CSV
- JSON

## Report Table Columns

- Report name
- Wallet address
- Type
- Risk level
- Created
- Actions

## Empty State

```txt
No reports yet.
Run a wallet analysis to generate your first AI-powered wallet report.
```

---

# 17. Pricing Page / Pricing Preview

## Plans

### Free

- 3 wallet analyses/month
- basic AI summary
- basic risk score

### Pro

- more wallet analyses
- saved wallets
- report history
- exports
- watchlists

### Team

- shared wallets
- team dashboard
- alerts
- team reports

### Enterprise

- custom analytics
- API access
- protocol intelligence
- dedicated support

## Pricing CTA

```txt
Start free with wallet analysis.
```

---

# 18. Login and Sign-Up Pages

## Login

Left panel copy:

```txt
Your wallet intelligence is waiting.
Sign in to view saved wallets, AI reports, watchlists, and risk alerts.
```

Right form:

- email
- password
- remember me
- forgot password
- sign in button

## Signup

Left panel copy:

```txt
Start understanding Injective wallets in minutes.
No wallet connection required. No credit card required.
```

Fields:

- full name
- email
- password
- confirm password
- terms checkbox

After signup:

- save current analysis if user came from report
- otherwise redirect to onboarding or dashboard

---

# 19. Responsive Design Rules

## Mobile

- one column
- sidebar becomes drawer
- tables become horizontal scroll or stacked cards
- wallet input full width
- CTAs full width
- report sections stacked

## Tablet

- sidebar icon-only
- KPI cards wrap
- report layout becomes two columns
- tables remain scrollable

## Desktop

- full sidebar
- multi-column cards
- right alert panel optional
- max-width content

## Wide Desktop

- max content width
- do not stretch tables excessively
- keep reading width comfortable for AI reports

---

# 20. Interaction States

## Hover

- buttons darken or lighten
- cards change border to `border-strong`
- table rows use `bg-hover`

## Focus

- visible focus ring
- primary focus color: `#0066FF`

## Active

- active nav item uses blue left border
- active tab uses blue text and underline

## Disabled

- lower opacity
- no pointer events
- clear disabled reason where needed

## Loading

- skeletons for cards
- spinner for buttons
- staged loading for wallet analysis

## Success

- green status
- clear confirmation
- toast where appropriate

## Error

- red border/background
- actionable message
- retry button where possible

## Empty

- icon
- headline
- useful explanation
- CTA

## Toasts

Use for:

- copied wallet address
- report exported
- wallet saved
- alert marked read
- retry succeeded

---

# 21. Placeholder Data Strategy

Mock data lives in:

```txt
frontend/data/
```

Files:

```txt
demoWallet.ts
mockAssets.ts
mockRiskScores.ts
mockInsights.ts
mockReports.ts
mockAlerts.ts
mockSavedWallets.ts
mockHistory.ts
mockPricing.ts
```

## Demo Wallet Example

```ts
export const demoWallet = {
  address: "inj1demo...",
  label: "Demo Injective Wallet",
  tokenCount: 5,
  estimatedValue: 12450.75,
  topAsset: "INJ",
  riskScore: 72,
  riskLevel: "Moderate",
};
```

## Mock Risk Score

```ts
export const mockRiskScore = {
  score: 72,
  level: "Moderate",
  dimensions: {
    concentrationRisk: 80,
    volatilityExposure: 65,
    stablecoinBuffer: 30,
    activityRisk: 45,
    diversification: 40,
  },
};
```

## Mock AI Insight

```ts
export const mockAIReport = {
  summary: "This wallet is primarily exposed to INJ and has moderate concentration risk.",
  concentrationAnalysis: "INJ represents a large share of the visible portfolio.",
  notableObservations: [
    "The wallet has limited stablecoin buffer.",
    "The portfolio is concentrated in a small number of assets.",
  ],
  suggestedNextSteps: [
    "Monitor INJ exposure.",
    "Review stablecoin allocation.",
    "Re-analyze after major balance changes.",
  ],
  disclaimer: "This report is informational only and is not financial advice.",
};
```

---

# 22. Developer Implementation Rules

- Use the design tokens.
- Do not create random colors.
- Do not create random spacing.
- Use reusable components.
- Keep page files clean.
- Keep mock data separate from UI.
- Use TypeScript interfaces.
- Use Zod for forms.
- Use TanStack Query for server data.
- Use Zustand for global UI state.
- Add loading, error, empty, and success states.
- Use semantic HTML.
- Make layouts responsive from the start.
- Do not render unsafe AI HTML.
- Do not request private keys or seed phrases.
- Clearly label demo data.

---

# 23. AI Coding Assistant Instructions

## How AI Should Use This Guide

Before coding, the AI assistant must:

1. Read this guide.
2. Identify the exact page or component to build.
3. Check the component specs.
4. Create only the files required.
5. Use the folder structure.
6. Use the design tokens.
7. Add all required states.
8. Avoid inventing new design patterns.

## Files to Create First

1. `tailwind.config.ts`
2. `app/globals.css`
3. `components/ui/Button.tsx`
4. `components/ui/Card.tsx`
5. `components/ui/Input.tsx`
6. `components/ui/Badge.tsx`
7. `components/layout/AppShell.tsx`
8. `components/layout/Sidebar.tsx`
9. `components/wallet/WalletAddressInput.tsx`
10. `data/demoWallet.ts`

## Avoiding UI Inconsistency

- Do not style each page independently.
- Use shared components.
- Use shared constants.
- Use shared spacing.
- Do not copy-paste large blocks of class names repeatedly.
- Extract repeated patterns into components.

## Build Page by Page

Recommended:

1. Landing Page
2. Wallet Analyzer
3. Demo Wallet
4. Report Page
5. Dashboard
6. Saved Wallets
7. Reports
8. Alerts
9. Settings

---

# 24. Implementation Order

## Phase 1 — Design Foundation

- Tailwind config
- global styles
- design tokens
- base layout
- Button
- Card
- Input
- Badge

## Phase 2 — App Layout

- AppShell
- Sidebar
- TopNavigation
- PageHeader
- SectionHeader

## Phase 3 — Public MVP Pages

- Landing Page
- Wallet Analyzer Page
- Demo Wallet Mode

## Phase 4 — Analysis and Report Experience

- AI Wallet Report Page
- Risk Score Page
- Portfolio Composition Page

## Phase 5 — Logged-In Dashboard

- Dashboard
- Saved Wallets
- Analysis History

## Phase 6 — SaaS Pages

- Reports
- Alerts
- Settings
- Pricing

## Phase 7 — Polish

- accessibility
- responsive fixes
- loading states
- empty states
- error states
- copy polish
- animation polish

---

# 25. Final Checklist

## Design System

- [ ] Color tokens configured
- [ ] Typography configured
- [ ] Spacing system followed
- [ ] Border radius standardized
- [ ] Icon rules followed
- [ ] Accessibility rules followed

## Components

- [ ] Button created
- [ ] Card created
- [ ] Input created
- [ ] Badge created
- [ ] AlertBanner created
- [ ] EmptyState created
- [ ] LoadingState created
- [ ] ErrorState created
- [ ] WalletAddressInput created
- [ ] RiskScoreCard created
- [ ] AIReportCard created
- [ ] PricingCard created
- [ ] ReportTable created

## Pages

- [ ] Landing Page implemented
- [ ] Wallet Analyzer Page implemented
- [ ] Demo Wallet Mode implemented
- [ ] AI Wallet Report Page implemented
- [ ] Risk Score Page implemented
- [ ] Portfolio Composition Page implemented
- [ ] Pricing Page implemented
- [ ] Login Page implemented
- [ ] Sign-Up Page implemented
- [ ] Dashboard implemented
- [ ] Saved Wallets implemented
- [ ] Analysis History implemented
- [ ] Reports implemented
- [ ] Alerts implemented
- [ ] Settings implemented

## States

- [ ] Loading states added
- [ ] Empty states added
- [ ] Error states added
- [ ] Success states added
- [ ] Hover states added
- [ ] Focus states added
- [ ] Disabled states added
- [ ] Toasts added where useful

## Responsive

- [ ] Mobile tested
- [ ] Tablet tested
- [ ] Desktop tested
- [ ] Wide desktop tested
- [ ] Tables handled on mobile
- [ ] Sidebar collapse/drawer works

## Product Safety

- [ ] Demo data labeled
- [ ] Read-only wallet analysis stated
- [ ] No private key language
- [ ] No trading execution claims
- [ ] AI report disclaimer included
- [ ] No fake traction metrics

---

# Final Implementation Rule

Build the UI so that InjSight AI feels like a serious AI-native wallet intelligence SaaS product, not a generic crypto dashboard.

The interface must make complex Injective wallet data understandable, trustworthy, and actionable without overwhelming the user.
