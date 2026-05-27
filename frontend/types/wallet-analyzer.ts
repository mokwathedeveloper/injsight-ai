export type RiskLevel = "Low" | "Moderate" | "High" | "Very High";

export interface TokenHolding {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  valueUsd: number;
  priceUsd: number;
  priceChange24h: number;
  percentOfPortfolio: number;
  icon?: string;
}

export interface RiskFactor {
  label: string;
  score: number;
  status: "success" | "warning" | "error";
  description: string;
}

export interface SecurityFlag {
  id: string;
  level: "info" | "warning" | "error";
  message: string;
}

export interface AIInsight {
  title: string;
  content: string;
  category: "portfolio" | "risk" | "opportunity";
}

export interface WalletAnalysisResult {
  address: string;
  network: "mainnet" | "testnet";
  totalValueUsd: number;
  change24h: number;
  riskScore: number;
  riskLevel: RiskLevel;
  holdings: TokenHolding[];
  riskFactors: RiskFactor[];
  securityFlags: SecurityFlag[];
  insights: AIInsight[];
  recentTransactionsCount: number;
}
