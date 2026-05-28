export interface AdminStats {
  totalUsers: number;
  activeToday: number;
  analysesToday: number;
  aiCostUsd: number;
  errorRatePct: number;
}

export interface AdminUser {
  id: string;
  email: string;
  plan: "Free" | "Pro" | "Team" | "Enterprise";
  status: "active" | "suspended";
  analyses: number;
  joined: string;
}

export interface UsagePoint {
  day: string;
  analyses: number;
  reports: number;
}

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorLogEntry {
  id: string;
  time: string;
  severity: ErrorSeverity;
  type: string;
  message: string;
  endpoint: string;
  count: number;
}

export interface CostBreakdown {
  label: string;
  amountUsd: number;
}

export interface FunnelStage {
  label: string;
  value: number;
}

export interface CohortRow {
  cohort: string;
  signups: number;
  week1: number;
  week2: number;
  week4: number;
}
