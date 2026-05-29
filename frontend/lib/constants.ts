/**
 * Application-wide constants.
 * Never import from components or stores here — this is the bottom of the
 * dependency tree.
 */

export const APP_NAME = "InjSight AI";
export const APP_SUBTITLE = "AI Wallet Intelligence for Injective DeFi";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://injsight.ai";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/** Injective chain identifiers. */
export const CHAIN = {
  INJECTIVE: "injective",
  ADDRESS_PREFIX: "inj1",
  EXPLORER_BASE: "https://explorer.injective.network",
  TX_PATH: "/transaction",
} as const;

/** Risk score thresholds. */
export const RISK = {
  LOW_MAX: 34,
  MODERATE_MAX: 59,
  HIGH_MAX: 79,
  VERY_HIGH_MIN: 80,
} as const;

/** Plan tier names (must match backend values). */
export const PLAN = {
  FREE: "free",
  PRO: "pro",
  TEAM: "team",
  ENTERPRISE: "enterprise",
} as const;

/** Free-plan hard limits (mirrors backend PLAN_LIMITS). */
export const FREE_LIMITS = {
  WALLETS: 5,
  ANALYSES_PER_MONTH: 20,
} as const;

/** Analysis pipeline stage labels shown during loading. */
export const ANALYSIS_STAGES = [
  "Connecting to Injective indexer…",
  "Fetching wallet balances…",
  "Normalizing token metadata…",
  "Calculating risk score…",
  "Generating AI wallet report…",
] as const;

/** Read-only product safety message. */
export const SAFETY_MESSAGE =
  "InjSight AI only reads public Injective wallet data. It never asks for private keys, seed phrases, or permission to move funds.";
