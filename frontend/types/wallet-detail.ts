import { SavedWallet } from "./saved-wallets";

export type ActivityType = "send" | "receive" | "swap" | "stake" | "unstake" | "claim";

export interface WalletActivity {
  id: string;
  type: ActivityType;
  hash: string;
  amount?: number;
  asset?: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
  protocol?: string;
}

export interface AIReportSnapshot {
  id: string;
  timestamp: string;
  summary: string;
  riskScore: number;
}

export interface WalletDetail extends SavedWallet {
  activity: WalletActivity[];
  reportHistory: AIReportSnapshot[];
  peakValueUsd: number;
  activeSince: string;
  protocolsInteracted: number;
}
