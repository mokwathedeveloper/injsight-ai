import { LandingData } from "@/types/landing";

export const landingData: LandingData = {
  hero: {
    headline: "Understand Any Injective Wallet in Seconds.",
    subheadline: "Paste a wallet address and get AI-powered insights, risk scores, portfolio composition, concentration analysis, and plain-English reports.",
    primaryCta: "Analyze Wallet",
    secondaryCta: "Try Demo Wallet",
  },
  navigation: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reports", href: "#reports" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" },
  ],
  features: [
    {
      id: "ai-insights",
      title: "AI-Powered Insights",
      description: "Advanced AI analyzes on-chain data and explains what it means in plain English.",
      icon: "Brain",
    },
    {
      id: "risk-analysis",
      title: "Risk Score Analysis",
      description: "Get a clear risk score and breakdown across key risk factors.",
      icon: "Shield",
    },
    {
      id: "portfolio-composition",
      title: "Portfolio Composition",
      description: "Visualize your assets and understand your exposure at a glance.",
      icon: "PieChart",
    },
    {
      id: "real-time-monitoring",
      title: "Real-time Monitoring",
      description: "Track wallet changes and get alerts for what matters most.",
      icon: "Bell",
    },
  ],
  steps: [
    {
      number: 1,
      title: "Paste Wallet Address",
      description: "Enter any Injective wallet address to get started.",
    },
    {
      number: 2,
      title: "AI Analyzes Data",
      description: "Our AI analyzes on-chain data, portfolio, and risk factors.",
    },
    {
      number: 3,
      title: "Get Intelligence",
      description: "Receive insights, risk score, and plain-English report.",
    },
  ],
  pricing: [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "/month",
      description: "5 wallet analyses, 2 saved wallets, Basic reports",
      features: ["5 wallet analyses", "2 saved wallets", "Basic reports"],
      cta: "Get Started",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Unlimited analyses, Unlimited wallets, All reports & exports, Watchlist alerts",
      features: ["Unlimited analyses", "Unlimited wallets", "All reports & exports", "Watchlist alerts"],
      cta: "Start Free Trial",
      isPopular: true,
    },
    {
      id: "team",
      name: "Team",
      price: "$99",
      period: "/month",
      description: "Everything in Pro, Team workspace, Shared watchlists, Priority support",
      features: ["Everything in Pro", "Team workspace", "Shared watchlists", "Priority support"],
      cta: "Start Free Trial",
    },
  ],
  footer: {
    product: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Reports", href: "#reports" },
      { label: "Pricing", href: "#pricing" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "API", href: "/api" },
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
    socials: [
      { platform: "Twitter", href: "https://twitter.com", icon: "Twitter" },
      { platform: "Discord", href: "https://discord.com", icon: "MessageCircle" },
      { platform: "Telegram", href: "https://telegram.org", icon: "Send" },
      { platform: "GitHub", href: "https://github.com", icon: "Github" },
    ],
  },
};
