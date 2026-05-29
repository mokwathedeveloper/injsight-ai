/**
 * User store — plan, usage, and preferences derived from the backend.
 *
 * Complements the auth store (which holds identity + tokens) by caching
 * usage-quota data so every page can read limits without a round-trip.
 */
import { create } from "zustand";

interface PlanLimits {
  wallets: number;
  analysesPerMonth: number;
}

interface PlanUsage {
  wallets: number;
  analyses: number;
}

interface UserState {
  plan: string;
  limits: PlanLimits;
  usage: PlanUsage;
  isPro: () => boolean;

  setUsage: (plan: string, limits: PlanLimits, usage: PlanUsage) => void;
  reset: () => void;
}

const DEFAULT_LIMITS: PlanLimits = { wallets: 5, analysesPerMonth: 20 };
const DEFAULT_USAGE: PlanUsage = { wallets: 0, analyses: 0 };

export const useUserStore = create<UserState>((set, get) => ({
  plan: "free",
  limits: DEFAULT_LIMITS,
  usage: DEFAULT_USAGE,

  isPro: () => !["free"].includes(get().plan),

  setUsage: (plan, limits, usage) => set({ plan, limits, usage }),
  reset: () => set({ plan: "free", limits: DEFAULT_LIMITS, usage: DEFAULT_USAGE }),
}));
