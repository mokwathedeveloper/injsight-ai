export type PlanTier = "free" | "pro" | "team" | "enterprise";

export interface PricingFeature {
  name: string;
  included: boolean | string;
  isNew?: boolean;
}

export interface PricingTierData {
  id: PlanTier;
  name: string;
  priceMonthly: number | "Custom";
  priceYearly: number | "Custom";
  description: string;
  ctaLabel: string;
  highlighted?: boolean;
  features: PricingFeature[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
