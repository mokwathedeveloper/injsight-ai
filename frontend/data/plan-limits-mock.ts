import { PlanUsageData } from "../types/plan-limits";

export const MOCK_PLAN_USAGE: PlanUsageData = {
  tier: "free",
  planName: "Ninja Starter",
  resetDate: "2026-06-27T00:00:00Z",
  metrics: [
    {
      id: "wallets",
      label: "Tracked Wallets",
      current: 4,
      limit: 5,
    },
    {
      id: "reports",
      label: "AI Intelligence Reports",
      current: 12,
      limit: 20,
      unit: "per mo",
    },
    {
      id: "api",
      label: "API Requests",
      current: 850,
      limit: 1000,
      unit: "per day",
    },
    {
      id: "exports",
      label: "Data Exports",
      current: 2,
      limit: 3,
      unit: "per mo",
    },
  ],
};
