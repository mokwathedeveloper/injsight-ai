export type FetchStatus = "idle" | "loading" | "success" | "error";

export type TxType = "send" | "receive" | "swap" | "stake" | "unstake" | "claim";

export interface InjectiveTransaction {
  id: string;
  hash: string;
  type: TxType;
  asset: string;
  amount: number;
  valueUsd: number;
  timestamp: string;
  counterparty: string;
  isLarge: boolean;
}

export type AssetCategory = "Native" | "Stablecoin" | "Ecosystem" | "Unknown";

export interface MarketAsset {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  change7d: number;
  category: AssetCategory;
  volatility: "Low" | "Medium" | "High";
}

export interface ExposureCategory {
  category: AssetCategory;
  percent: number;
  valueUsd: number;
  tokenCount: number;
  color: string;
}
