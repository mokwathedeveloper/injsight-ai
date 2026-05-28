import {
  AdminStats, AdminUser, UsagePoint, ErrorLogEntry, CostBreakdown, FunnelStage, CohortRow,
} from "@/types/admin";

export const MOCK_ADMIN_STATS: AdminStats = {
  totalUsers: 8421,
  activeToday: 1203,
  analysesToday: 6428,
  aiCostUsd: 184.32,
  errorRatePct: 0.6,
};

export const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: "u-1", email: "aria@ninjacap.io", plan: "Team", status: "active", analyses: 412, joined: "Jan 2026" },
  { id: "u-2", email: "trader.jane@gmail.com", plan: "Pro", status: "active", analyses: 188, joined: "Feb 2026" },
  { id: "u-3", email: "dao@helixfund.xyz", plan: "Enterprise", status: "active", analyses: 1340, joined: "Dec 2025" },
  { id: "u-4", email: "spam.bot@temp.io", plan: "Free", status: "suspended", analyses: 5021, joined: "May 2026" },
  { id: "u-5", email: "newuser@proton.me", plan: "Free", status: "active", analyses: 3, joined: "May 2026" },
];

export const MOCK_USAGE_SERIES: UsagePoint[] = [
  { day: "Mon", analyses: 4200, reports: 820 },
  { day: "Tue", analyses: 4800, reports: 910 },
  { day: "Wed", analyses: 5100, reports: 1020 },
  { day: "Thu", analyses: 4600, reports: 870 },
  { day: "Fri", analyses: 6100, reports: 1180 },
  { day: "Sat", analyses: 5400, reports: 940 },
  { day: "Sun", analyses: 6428, reports: 1260 },
];

export const MOCK_ERROR_LOG: ErrorLogEntry[] = [
  { id: "e-1", time: "23:54:11", severity: "high", type: "ProviderTimeout", message: "Injective indexer request exceeded 10s timeout.", endpoint: "/v1/wallets/{addr}", count: 14 },
  { id: "e-2", time: "23:40:02", severity: "critical", type: "AIGenerationFailure", message: "AI report generation returned empty completion.", endpoint: "/v1/wallets/{addr}/report", count: 3 },
  { id: "e-3", time: "22:18:44", severity: "medium", type: "RateLimited", message: "Upstream price feed rate limit reached.", endpoint: "/internal/prices", count: 41 },
  { id: "e-4", time: "21:05:31", severity: "low", type: "ValidationError", message: "Invalid Injective address supplied by client.", endpoint: "/v1/wallets/{addr}", count: 220 },
];

export const MOCK_COST_BREAKDOWN: CostBreakdown[] = [
  { label: "AI report generation", amountUsd: 121.4 },
  { label: "Risk scoring", amountUsd: 38.2 },
  { label: "Chat (Ask Your Wallet)", amountUsd: 24.72 },
];

export const MOCK_FUNNEL: FunnelStage[] = [
  { label: "Visited landing", value: 24800 },
  { label: "Analyzed a wallet", value: 11200 },
  { label: "Signed up", value: 4100 },
  { label: "Saved a wallet", value: 2600 },
  { label: "Upgraded to paid", value: 540 },
];

export const MOCK_COHORTS: CohortRow[] = [
  { cohort: "May W1", signups: 820, week1: 64, week2: 41, week4: 28 },
  { cohort: "May W2", signups: 910, week1: 68, week2: 44, week4: 30 },
  { cohort: "May W3", signups: 1040, week1: 71, week2: 47, week4: 0 },
  { cohort: "May W4", signups: 980, week1: 73, week2: 0, week4: 0 },
];
