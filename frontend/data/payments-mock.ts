import { CheckoutPlan, CryptoPaymentOption } from "@/types/payments";

export const MOCK_CHECKOUT_PLAN: CheckoutPlan = {
  id: "pro",
  name: "Power User (Pro)",
  priceUsd: 24,
  interval: "month",
  features: [
    "Unlimited wallet analyses",
    "Advanced AI risk audits",
    "Unlimited on-chain activity logs",
    "Priority report generation",
    "PDF / CSV / JSON exports",
  ],
};

export const MOCK_CRYPTO_OPTIONS: CryptoPaymentOption[] = [
  { symbol: "INJ", name: "Injective", network: "Injective", estimated: "≈ 0.96 INJ" },
  { symbol: "USDT", name: "Tether", network: "Injective", estimated: "≈ 24.00 USDT" },
  { symbol: "USDC", name: "USD Coin", network: "Injective", estimated: "≈ 24.00 USDC" },
];
