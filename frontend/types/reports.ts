import { RiskLevel } from "./wallet-analyzer";

export type ReportStatus = "ready" | "processing" | "failed";
export type ReportFormat = "pdf" | "json" | "csv";

export interface AIReportHubEntry {
  id: string;
  title: string;
  walletAddress: string;
  walletLabel?: string;
  dateGenerated: string;
  riskScore: number;
  riskLevel: RiskLevel;
  status: ReportStatus;
  availableFormats: ReportFormat[];
  sizeKb?: number;
}

export interface ReportHubStats {
  totalReports: number;
  highRiskReports: number;
  totalExports: number;
  lastGenerated: string;
}
