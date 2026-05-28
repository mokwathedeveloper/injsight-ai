export interface TreasurySummary {
  totalValueUsd: number;
  walletCount: number;
  weeklyChangePct: number;
  largestOutflowUsd: number;
}

export type MovementType = "inflow" | "outflow";

export interface TreasuryMovement {
  id: string;
  date: string;
  type: MovementType;
  token: string;
  amountUsd: number;
  counterparty: string;
}

export interface ExposureSlice {
  category: string;
  valueUsd: number;
  percent: number;
  color: string;
}
