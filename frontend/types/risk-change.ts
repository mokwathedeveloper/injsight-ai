import { RiskLevel } from "./wallet-analyzer";

export interface RiskChange {
  id: string;
  walletId: string;
  previousScore: number;
  currentScore: number;
  delta: number; // positive or negative
  timestamp: string;
  reason: string;
  riskLevel: RiskLevel;
  severity: "low" | "medium" | "high" | "critical";
}

export interface RiskHistoryLog {
  walletAddress: string;
  changes: RiskChange[];
}
