import { TokenHolding } from "./wallet-analyzer";

export interface TokenBalanceRowData extends TokenHolding {
  category?: string;
  isStaked?: boolean;
}

export type SortField = "symbol" | "balance" | "valueUsd" | "percentOfPortfolio";
export type SortOrder = "asc" | "desc";
