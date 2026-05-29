/**
 * Canonical wallet types.
 * Re-exports from domain-specific files so the prompt-specified path works.
 */
export type { RiskLevel, WalletAnalysisResult, TokenHolding, RiskFactor, SecurityFlag, AIInsight } from "./wallet-analyzer";
export type { SavedWallet, WalletCollection } from "./saved-wallets";
export type { WalletDetail, WalletActivity, ActivityType, AIReportSnapshot } from "./wallet-detail";

export interface WalletAddress {
  address: string;
  chain: "injective";
  label?: string;
}
