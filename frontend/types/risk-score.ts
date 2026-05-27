export type RiskStatus = "success" | "warning" | "error";

export interface RiskDimension {
  id: string;
  label: string;
  score: number; // 0-100
  status: RiskStatus;
  description: string;
}

export interface WalletRiskData {
  totalScore: number;
  level: string;
  dimensions: RiskDimension[];
  peerComparison: {
    walletScore: number;
    averageScore: number;
    percentile: number;
  };
}
