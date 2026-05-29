export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const APP_NAME = "InjSight AI";
export const APP_TAGLINE = "Understand Any Injective Wallet in Seconds";

export const INJECTIVE_CHAIN_ID = "injective-1";

export const DEMO_WALLET_ADDRESS = "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh";

export const RISK_THRESHOLDS = {
  low:      [0,  30],
  medium:   [31, 60],
  high:     [61, 80],
  critical: [81, 100],
} as const;

export const CHART_COLORS = [
  "#0066FF",
  "#00C2FF",
  "#7C3AED",
  "#22C55E",
  "#F5C542",
  "#EF4444",
  "#EC4899",
  "#F97316",
];

export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    analysesPerMonth: 10,
    savedWallets: 3,
    features: ["10 analyses/month", "3 saved wallets", "Basic AI reports"],
  },
  pro: {
    name: "Pro",
    price: 29,
    analysesPerMonth: 500,
    savedWallets: 50,
    features: ["500 analyses/month", "50 saved wallets", "Full AI reports", "Alerts", "Export PDF"],
  },
  team: {
    name: "Team",
    price: 99,
    analysesPerMonth: 2000,
    savedWallets: 200,
    features: ["2,000 analyses/month", "200 saved wallets", "Team workspace", "API access", "Webhooks"],
  },
};
