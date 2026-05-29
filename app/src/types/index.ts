export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface WalletSummary {
  address: string;
  label?: string;
  chain: string;
  totalValueUsd: number;
  tokenCount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  lastAnalyzedAt: string;
  isDemo?: boolean;
}

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: number;
  valueUsd: number;
  priceUsd: number;
  change24h: number;
  allocationPct: number;
  logoUrl?: string;
}

export interface PortfolioComposition {
  category: string;
  allocationPct: number;
  valueUsd: number;
  color: string;
}

export interface RiskScore {
  overall: number;
  level: RiskLevel;
  concentration: number;
  volatility: number;
  defi: number;
  liquidity: number;
  factors: RiskFactor[];
}

export interface RiskFactor {
  id: string;
  label: string;
  severity: RiskLevel;
  description: string;
}

export interface AIReport {
  walletAddress: string;
  summary: string;
  riskExplanation: string;
  concentrationAnalysis: string;
  suggestedNextSteps: string[];
  generatedAt: string;
}

export interface Transaction {
  hash: string;
  type: string;
  amount: number;
  token: string;
  valueUsd: number;
  timestamp: string;
  status: "success" | "failed" | "pending";
}

export interface Alert {
  id: string;
  type: "risk_change" | "large_transfer" | "new_token" | "price_alert";
  severity: RiskLevel;
  title: string;
  message: string;
  walletAddress: string;
  createdAt: string;
  read: boolean;
}

export interface SavedWallet {
  id: string;
  address: string;
  label?: string;
  chain: string;
  riskScore: number;
  riskLevel: RiskLevel;
  totalValueUsd: number;
  lastAnalyzedAt: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  plan: "free" | "pro" | "team" | "enterprise";
  avatarUrl?: string;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: "month" | "year";
  features: string[];
  limit: number;
  popular?: boolean;
}

export interface AnalysisHistoryItem {
  id: string;
  walletAddress: string;
  label?: string;
  analyzedAt: string;
  riskScore: number;
  riskLevel: RiskLevel;
  totalValueUsd: number;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "analyst" | "viewer";
  avatarUrl?: string;
  joinedAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  lastUsed?: string;
  createdAt: string;
  permissions: string[];
}
