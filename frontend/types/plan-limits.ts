import { PlanTier } from "./pricing";

export interface UsageMetric {
  id: string;
  label: string;
  current: number;
  limit: number | "Unlimited";
  unit?: string;
}

export interface PlanUsageData {
  tier: PlanTier;
  planName: string;
  metrics: UsageMetric[];
  resetDate: string;
}
