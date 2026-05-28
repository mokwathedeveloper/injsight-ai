import { RiskLevel } from "./wallet-analyzer";

export interface WatchlistWallet {
  id: string;
  address: string;
  label: string;
  totalValueUsd: number;
  change24h: number;
  riskScore: number;
  riskLevel: RiskLevel;
  lastSync: string;
  status: "syncing" | "up-to-date" | "alert";
}

export interface WatchlistSummary {
  totalValueUsd: number;
  avgRiskScore: number;
  activeAlerts: number;
  totalWallets: number;
}
