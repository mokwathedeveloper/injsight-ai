import { RiskLevel } from "./wallet-analyzer";

export interface SavedWallet {
  id: string;
  label: string;
  address: string;
  totalValueUsd: number;
  riskScore: number;
  riskLevel: RiskLevel;
  lastAnalyzed: string;
  isPro?: boolean;
}

export interface WalletCollection {
  wallets: SavedWallet[];
  totalValue: number;
}
