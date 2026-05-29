/**
 * Canonical user types used across the app.
 * Re-exports relevant types so import paths stay stable.
 */
import type { ApiUser } from "@/lib/api/types";

export type { ApiUser };

export type PlanTier = "free" | "pro" | "team" | "enterprise";

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  plan: PlanTier;
  emailVerified: boolean;
  createdAt: string;
}

export interface UserPlanLimits {
  wallets: number;        // -1 = unlimited
  analysesPerMonth: number;
}

export interface UserUsage {
  wallets: number;
  analyses: number;
}

export interface UserSettings {
  notificationsEmail: boolean;
  notificationsInApp: boolean;
  displayCurrency: "USD" | "EUR" | "GBP";
  timezone: string;
}
