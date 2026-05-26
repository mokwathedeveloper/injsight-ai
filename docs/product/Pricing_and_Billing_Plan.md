# InjSight AI — Payment and Billing Plan

## 1. Purpose

This document defines the payment and billing direction for InjSight AI.

Payments are not required for the first MVP, but the product should be designed with a clear SaaS monetization path.

---

## 2. Billing Strategy

The MVP should include a pricing page but should not require payment integration before the wallet analyzer works.

Recommended order:

```txt
Phase 1: Static pricing page
Phase 2: Usage limits
Phase 3: Stripe checkout
Phase 4: Billing history
Phase 5: Crypto payments
Phase 6: Team and enterprise billing
```

---

## 3. Subscription Plans

## 3.1 Free

Target user:

- first-time users
- hackathon judges
- casual Injective users

Features:

- limited wallet analyses per month
- basic AI summary
- basic risk score
- demo wallet mode

Suggested limit:

```txt
3 wallet analyses/month
```

---

## 3.2 Pro

Target user:

- active Injective traders
- DeFi users
- power users monitoring wallets

Features:

- more or unlimited wallet analyses
- saved wallets
- report history
- advanced risk breakdown
- exportable reports
- wallet watchlist later

Suggested price:

```txt
$19/month
```

---

## 3.3 Team

Target user:

- DAOs
- DeFi teams
- crypto research teams
- small funds

Features:

- shared wallets
- team dashboard
- shared reports
- watchlists
- alert center
- member roles
- report exports

Suggested price:

```txt
$199/month
```

---

## 3.4 Enterprise

Target user:

- protocols
- institutions
- larger funds
- analytics teams

Features:

- custom wallet intelligence
- API access
- custom alerts
- enterprise support
- protocol dashboards
- custom data retention
- security review

Suggested price:

```txt
Custom
```

---

## 4. Usage Limits

Suggested MVP limits:

| Feature | Free | Pro | Team | Enterprise |
|---|---:|---:|---:|---:|
| Wallet analyses/month | 3 | 250 | 2,000 | Custom |
| Saved wallets | 0 or 3 | 50 | 500 | Custom |
| AI reports | 3 | 250 | 2,000 | Custom |
| Export reports | No | Yes | Yes | Yes |
| Alerts | No | Basic | Advanced | Custom |
| API access | No | No | Optional | Yes |
| Team members | No | No | 5+ | Custom |

---

## 5. Payment Methods

## 5.1 MVP

No payment processing required.

MVP should include:

- pricing page
- plan descriptions
- upgrade CTA
- waitlist or contact CTA for Team/Enterprise

---

## 5.2 Card Payments

Recommended provider:

```txt
Stripe
```

Future features:

- checkout session
- subscription management
- billing portal
- invoice history
- plan upgrades/downgrades
- webhook handling

---

## 5.3 Crypto Payments

Future option for crypto-native users.

Possible tokens:

```txt
USDC
USDT
INJ
```

Important:

- crypto payments should come after core SaaS and Stripe are stable
- verify payments server-side
- do not manually trust user-submitted transaction hashes
- clearly state network requirements
- handle underpayment/overpayment states

---

## 6. Billing Pages

Future route:

```txt
/dashboard/billing
```

Sections:

- current plan
- usage meter
- payment method
- billing history
- upgrade/downgrade options
- cancel plan
- contact support

---

## 7. Billing API Endpoints

Future endpoints:

```txt
GET  /api/billing/plan
GET  /api/billing/usage
POST /api/billing/checkout
POST /api/billing/portal
POST /api/billing/webhook
GET  /api/billing/history
```

---

## 8. Billing Database Tables

Future tables:

```txt
subscriptions
billing_events
invoices
payment_methods
usage_events
```

Store:

- provider customer id
- provider subscription id
- plan
- subscription status
- period start/end
- usage count

Do not store:

- raw card details
- private wallet keys
- payment secrets

---

## 9. Subscription States

Support these states:

```txt
trialing
active
past_due
canceled
expired
incomplete
```

User experience:

- `trialing`: show trial days left
- `active`: full access
- `past_due`: warning banner
- `canceled`: access until end of period
- `expired`: downgrade or restrict access

---

## 10. MVP Pricing Page Copy

Headline:

```txt
Start free. Upgrade when wallet intelligence becomes part of your workflow.
```

Subheadline:

```txt
Analyze Injective wallets with AI-generated insights, risk scores, and reports. Start with free wallet analysis, then unlock saved wallets, history, alerts, and team features.
```

Primary CTA:

```txt
Analyze a Wallet
```

Secondary CTA:

```txt
View Plans
```

---

## 11. Billing Security

When payments are added:

- verify webhook signatures
- never trust client-side plan changes
- enforce plan limits on backend
- store only provider IDs
- do not store card numbers
- audit all plan changes
- use idempotency keys for checkout
- handle failed payments gracefully

---

## 12. Recommendation

Do not build payments before the core product is working.

Build in this order:

```txt
Wallet analyzer
AI report
Risk score
Saved wallets
Report history
Pricing page
Usage limits
Stripe payments
Team billing
Crypto payments
```
