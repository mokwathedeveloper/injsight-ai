import { RiskLevel } from "./wallet-analyzer";

export type AnalysisStatus = "completed" | "processing" | "failed";

export interface AnalysisHistoryEntry {
  id: string;
  address: string;
  label?: string;
  timestamp: string;
  riskScore: number;
  riskLevel: RiskLevel;
  totalValueUsd: number;
  status: AnalysisStatus;
  reportId?: string;
}

export interface AnalysisHistoryFilters {
  search: string;
  riskLevel: RiskLevel | "All";
  dateRange: "24h" | "7d" | "30d" | "all";
}
