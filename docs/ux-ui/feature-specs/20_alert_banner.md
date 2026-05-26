# InjSight AI UX/UI Specification — Alert Banner

## 1. Feature Overview

**Feature:** Alert Banner  
**Category:** High-priority notification  
**Primary Route / Placement:** `Global component`  
**Product:** InjSight AI  
**Product Subtitle:** AI Wallet Intelligence for Injective DeFi  

## 2. Purpose

Display the most important current alert with action and dismissal.

This feature must feel professional, precise, and trustworthy. It should support the core InjSight AI promise: helping users understand Injective wallet data through AI-generated insights, portfolio visibility, and risk awareness.

## 3. User Goals

The user should be able to:

- Understand what this feature does within 5 seconds.
- Complete the primary action without confusion.
- See clear feedback for loading, empty, success, and error states.
- Trust that the product is read-only and does not require private keys.
- Move naturally to the next step in the product journey.

## 4. Primary User Stories

- As a DeFi user, I want this feature to be easy to understand so I can act confidently.
- As an Injective wallet holder, I want clear wallet intelligence without reading raw blockchain data.
- As a returning user, I want consistent UI patterns across the dashboard.
- As a power user, I want enough detail to make the feature useful beyond a demo.
- As a security-conscious user, I want to know the product does not custody funds or request secrets.

## 5. Required Components

- `AlertBanner`

## 6. Layout Specification

### Desktop Layout

- Use a structured 12-column layout.
- Main content should be visually balanced and not exceed comfortable reading width.
- Data-heavy content should use cards, tables, tabs, and filters rather than long unstructured sections.
- Critical insights should appear above the fold.
- Primary CTA should be visible without scrolling.

### Tablet Layout

- Collapse secondary columns below primary content.
- Maintain card hierarchy.
- Use two-column layouts only where content remains readable.
- Sidebar should collapse to icon-only if inside the app shell.

### Mobile Layout

- Use a single-column layout.
- Place the primary action near the top.
- Stack cards vertically.
- Convert complex tables into horizontal scroll or stacked mobile cards.
- Ensure all tap targets are at least 44px.

## 7. Visual Hierarchy

The hierarchy should be:

1. Page or feature title
2. Short explanatory subtitle
3. Primary action or primary metric
4. Supporting cards/data
5. Secondary actions
6. Footer/help/disclaimer content

Avoid overwhelming users with too many equal-weight sections.


## Design System Rules

Use the InjSight AI design system consistently.

### Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `bg-page` | `#0D1117` | Main page/app background |
| `bg-card` | `#161B22` | Cards, panels, modals |
| `bg-hover` | `#1C2128` | Hovered rows/cards |
| `border` | `#21262D` | Default borders |
| `border-strong` | `#30363D` | Hover/strong border |
| `primary` | `#0066FF` | Primary buttons, active states, focus rings |
| `primary-hover` | `#0052CC` | Primary hover |
| `accent` | `#00C2FF` | AI highlights and subtle glows |
| `success` | `#22C55E` | Success, low risk, positive states |
| `warning` | `#F5C542` | Medium risk and caution |
| `error` | `#EF4444` | High risk, errors, destructive actions |
| `text-primary` | `#F0F6FC` | Main text and headings |
| `text-secondary` | `#8B949E` | Labels, captions, descriptions |
| `text-disabled` | `#484F58` | Disabled and placeholder text |
| `text-link` | `#58A6FF` | Links |

### Typography

- Primary font: **Inter**
- Monospace font: **JetBrains Mono**
- Use JetBrains Mono only for wallet addresses, transaction hashes, JSON, API keys, and technical identifiers.
- Headings should be confident and concise.
- Body text should be practical, calm, and clear.

### Layout and Spacing

- Base spacing unit: 4px
- Standard card padding: 24px
- Compact card padding: 16px or 20px
- Standard card gap: 16px or 24px
- Desktop max-width: 1280px for marketing pages, 1440px for app pages
- Sidebar width: 240px desktop, 64px tablet, drawer on mobile
- Top navigation height: 64px

### Component Style

- Cards: `bg-card`, `border`, `rounded-lg`, no heavy shadows
- Inputs: 40px height, dark background, clear focus ring
- Buttons: 40px standard height, 52px large CTA
- Tables: 52px row height, hover row background
- Badges: uppercase label style, color + text, never color alone


## 8. Data Requirements

This feature may use one or more of the following data categories:

- Injective wallet address
- wallet token balances
- token symbols and metadata
- estimated token values
- portfolio composition
- wallet risk score
- AI-generated report sections
- saved wallet state
- user plan and usage state
- report/export status
- alert severity and status

If live data is unavailable, show a clear error or demo-state label. Do not display fake production data as real.

## 9. Empty State

The empty state should include:

- relevant icon
- clear headline
- short explanation
- one primary CTA

Suggested structure:

```txt
[Icon]

No data yet

Once you use Alert Banner, relevant wallet intelligence will appear here.

[Primary CTA]
```

## 10. Loading State

Use skeleton loaders for cards and tables. For wallet analysis flows, use staged loading messages:

```txt
Fetching Injective wallet data...
Normalizing token balances...
Calculating risk score...
Generating AI wallet report...
```

Do not show a blank screen while waiting.

## 11. Error State

Errors must be specific and actionable.

Examples:

```txt
We could not load this data right now.
Please try again shortly.
```

For wallet-related errors:

```txt
This does not look like a valid Injective wallet address.
Please check the address and try again.
```

For AI-related errors:

```txt
Wallet data was loaded, but the AI report could not be generated.
You can retry report generation.
```

## 12. Success State

A successful interaction should show:

- clear confirmation
- updated UI data
- optional toast
- obvious next action

Success copy should be calm and specific:

```txt
Wallet analysis complete.
```

or

```txt
Report exported successfully.
```


## Required Interaction States

Every implementation must include:

| State | Requirement |
|---|---|
| Default | Fully usable base state |
| Hover | Clear hover feedback on clickable elements |
| Focus | Visible keyboard focus ring using `primary` |
| Active | Clear active nav/tab/filter state |
| Disabled | Reduced opacity and clear reason if needed |
| Loading | Skeletons or staged loading, never blank screens |
| Empty | Helpful explanation and CTA |
| Error | Specific error message and recovery action |
| Success | Confirmation toast, banner, or inline confirmation |



## 13. Interaction Details

### Buttons

- Primary action uses `primary`.
- Secondary actions use ghost or secondary button.
- Destructive actions use `error`.
- Loading buttons must disable repeated clicks.

### Tables

If this feature uses a table:

- Header row uses label caps.
- Row height: 52px.
- Hover: `bg-hover`.
- Technical identifiers use JetBrains Mono.
- Long wallet addresses must be truncated with copy action.

### Cards

Cards must use:

```txt
bg-card
border
rounded-lg
p-6
```

Hover cards can use `bg-hover` and `border-strong`.

## 14. Accessibility


## Accessibility Requirements

- Use semantic HTML.
- Every input must have a visible label.
- Do not rely on color alone for risk/severity.
- Minimum touch target on mobile: 44px.
- All buttons and links must be keyboard accessible.
- Use `aria-busy` for loading buttons.
- Use `aria-invalid` and `aria-describedby` for form errors.
- Provide copy buttons for long wallet addresses.
- Avoid unsafe rendering of AI-generated HTML.


## 15. Responsive Design


## Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile 375px | Single column, full-width CTAs, sidebar drawer, tables scroll or become cards |
| Tablet 768px | Two-column where appropriate, sidebar icon-only, KPI cards wrap |
| Desktop 1280px | Full dashboard layout, full sidebar, multi-column grids |
| Wide 1440px+ | Keep max content width; do not overstretch text-heavy sections |



## 16. AI Output Rules

If this feature displays AI-generated text:

- Show AI output in structured sections.
- Avoid a single long paragraph.
- Include a disclaimer for analysis/report pages.
- Do not render unsafe HTML.
- Do not allow AI text to make financial guarantees.
- Do not phrase suggestions as direct buy/sell instructions.

## 17. Security and Trust Rules

This feature must never ask for:

- private keys
- seed phrases
- custody access
- trading permission
- transaction signing for analysis

If relevant, include this safety note:

```txt
InjSight AI only reads public wallet data. It never asks for private keys, seed phrases, or permission to move funds.
```

## 18. Suggested TypeScript Types

```ts
export interface AlertBannerProps {
  className?: string;
}

export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export interface WalletReference {
  address: string;
  label?: string;
  chain: "injective";
}
```

## 19. Implementation Notes for Developers

- Build reusable components first.
- Keep business logic out of presentation components.
- Use TypeScript interfaces for all props.
- Use Zod for forms and wallet address validation.
- Use TanStack Query for server data.
- Use Zustand only for global UI/client state.
- Keep mock data inside `frontend/data/`.
- Do not hardcode repeated UI patterns inside pages.
- Include all required states before marking the feature complete.

## 20. Recommended File Locations

```txt
frontend/components/
frontend/components/ui/
frontend/components/wallet/
frontend/components/report/
frontend/components/dashboard/
frontend/hooks/
frontend/services/
frontend/types/
frontend/data/
```

Specific files may include:

```txt
frontend/components/dashboard/AlertBanner.tsx
frontend/types/alert_banner.ts
frontend/data/mock_alert_banner.ts
```

## 21. QA Checklist

- [ ] Layout matches the design system.
- [ ] Mobile layout works.
- [ ] Tablet layout works.
- [ ] Desktop layout works.
- [ ] Loading state exists.
- [ ] Empty state exists.
- [ ] Error state exists.
- [ ] Success state exists.
- [ ] Keyboard navigation works.
- [ ] Color is not the only signal for status.
- [ ] Wallet addresses are truncated and copyable.
- [ ] AI text is structured and safe.
- [ ] No fake production data is shown.
- [ ] Read-only product safety is clear where relevant.

## 22. Completion Standard

This feature is complete only when it feels production-ready, visually consistent with InjSight AI, responsive across breakpoints, accessible, and safe for a public demo.
