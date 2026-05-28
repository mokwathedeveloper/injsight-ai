import { PricingTierData, FAQItem } from "../types/pricing";

export const PRICING_PLANS: PricingTierData[] = [
  {
    id: "free",
    name: "Ninja Starter",
    priceMonthly: 0,
    priceYearly: 0,
    description: "Essential intelligence for individual Injective participants.",
    ctaLabel: "Get Started Free",
    features: [
      { name: "1 Tracked Wallet", included: true },
      { name: "Basic AI Reports", included: true },
      { name: "Real-time Risk Scores", included: true },
      { name: "30-day History", included: true },
      { name: "Email Alerts", included: false },
      { name: "Custom API Access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Power User",
    priceMonthly: 29,
    priceYearly: 24,
    description: "Deep-chain analytics and priority intelligence for power users.",
    ctaLabel: "Upgrade to Pro",
    highlighted: true,
    features: [
      { name: "Unlimited Wallets", included: true },
      { name: "Advanced AI Audits", included: true },
      { name: "Portfolio Drift Alerts", included: true, isNew: true },
      { name: "Unlimited History", included: true },
      { name: "Priority API (1k req/min)", included: true },
      { name: "PDF/CSV Exports", included: true },
    ],
  },
  {
    id: "team",
    name: "Strategy Team",
    priceMonthly: 99,
    priceYearly: 79,
    description: "Collaboration tools and shared intelligence for small teams.",
    ctaLabel: "Start Team Trial",
    features: [
      { name: "Up to 5 Members", included: true },
      { name: "Shared Watchlists", included: true },
      { name: "Team Activity Log", included: true },
      { name: "Custom Risk Models", included: true },
      { name: "Webhook Notifications", included: true },
      { name: "Dedicated Support", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    description: "Institution-grade security and bespoke on-chain monitoring.",
    ctaLabel: "Contact Sales",
    features: [
      { name: "Unlimited Everything", included: true },
      { name: "SLA Guarantees", included: true },
      { name: "Custom Integrations", included: true },
      { name: "On-premise AI Models", included: true },
      { name: "White-label Reports", included: true },
      { name: "Account Manager", included: true },
    ],
  },
];

export const PRICING_FAQ: FAQItem[] = [
  {
    question: "Do you require my private keys?",
    answer: "Absolutely not. InjSight AI is 100% non-custodial and read-only. We only analyze public on-chain data. You should never share your private keys or seed phrases with anyone.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel or change your plan at any time from your account settings. If you cancel, your Pro features will remain active until the end of your current billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex) and native INJ payments via a connected Injective wallet.",
  },
  {
    question: "How accurate is the AI risk scoring?",
    answer: "Our risk engine uses real-time Injective indexer data and historical volatility models. While no tool can predict the future with 100% certainty, our AI provides institutional-grade probability assessments.",
  },
];
