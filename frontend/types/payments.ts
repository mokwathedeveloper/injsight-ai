export type PaymentMethodType = "card" | "crypto";

export type PaymentStatus = "idle" | "processing" | "success" | "error";

export interface CheckoutPlan {
  id: string;
  name: string;
  priceUsd: number;
  interval: "month" | "year";
  features: string[];
}

export interface CryptoPaymentOption {
  symbol: string;
  name: string;
  network: string;
  estimated: string;
}
