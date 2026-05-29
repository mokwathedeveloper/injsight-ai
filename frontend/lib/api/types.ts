/** DTOs returned by the InjSight AI backend (camelCase, post-envelope). */

export interface ApiHolding {
  symbol: string;
  name: string;
  category: string;
  amount: number;
  value_usd: number;
  percent: number;
  price: number;
}

export interface ApiAnalysis {
  id: string;
  walletAddress: string;
  chain: string;
  status: string;
  dataSource: string | null;
  createdAt: string;
  completedAt: string | null;
  portfolio: {
    totalValueUsd: number;
    tokenCount: number;
    holdings: ApiHolding[];
  };
  riskScore: {
    score: number;
    level: string;
    dimensions: Record<string, number>;
    methodologyVersion: string;
  } | null;
  aiReport: {
    summary: string;
    concentrationAnalysis: string;
    riskExplanation: string;
    injectiveContext: string;
    suggestedNextSteps: string[];
    modelName: string;
  } | null;
}

export interface ApiUser {
  id: string;
  email: string;
  name: string | null;
  plan: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface ApiTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface ApiAuthResult {
  user: ApiUser;
  tokens: ApiTokens;
}

export interface ApiWallet {
  id: string;
  address: string;
  chain: string;
  label: string | null;
  isDemo: boolean;
  lastAnalyzedAt: string | null;
  createdAt: string;
  riskScore: number | null;
  riskLevel: string | null;
  totalValueUsd: number | null;
}

export interface ApiAlert {
  id: string;
  walletAddress: string | null;
  type: string;
  severity: string;
  title: string;
  message: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface ApiReport {
  id: string;
  analysisRunId: string;
  walletAddress: string;
  title: string;
  summary: string | null;
  concentrationAnalysis: string | null;
  riskExplanation: string | null;
  injectiveContext: string | null;
  suggestedNextSteps: string[];
  riskScore: number | null;
  riskLevel: string | null;
  modelName: string | null;
  createdAt: string;
}

export interface ApiUsage {
  plan: string;
  limits: { wallets: number; analysesPerMonth: number };
  usage: { wallets: number; analyses: number };
}
