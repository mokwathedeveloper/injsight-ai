export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  isPopular?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface LandingData {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  navigation: NavLink[];
  features: Feature[];
  steps: Step[];
  pricing: PricingTier[];
  footer: {
    product: NavLink[];
    resources: NavLink[];
    company: NavLink[];
    socials: SocialLink[];
  };
}
