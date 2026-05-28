import { PlanTier } from "./pricing";

export type BillingCycle = "monthly" | "yearly";
export type InvoiceStatus = "paid" | "pending" | "failed";

export interface InvoiceEntry {
  id: string;
  number: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  url: string;
}

export interface PaymentMethod {
  type: "card" | "wallet";
  last4?: string;
  brand?: string;
  expiry?: string;
  walletAddress?: string;
}

export interface BillingSummary {
  currentPlan: PlanTier;
  planName: string;
  amount: number;
  currency: string;
  cycle: BillingCycle;
  nextBillingDate: string;
  status: "active" | "canceled" | "past_due";
}

export interface UserBillingData {
  summary: BillingSummary;
  paymentMethod: PaymentMethod;
  invoices: InvoiceEntry[];
}
