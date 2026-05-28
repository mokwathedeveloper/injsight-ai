import { TreasurySummary, TreasuryMovement, ExposureSlice } from "@/types/treasury";

export const MOCK_TREASURY_SUMMARY: TreasurySummary = {
  totalValueUsd: 6965700,
  walletCount: 3,
  weeklyChangePct: -2.4,
  largestOutflowUsd: 420000,
};

export const MOCK_TREASURY_MOVEMENTS: TreasuryMovement[] = [
  { id: "t-1", date: "May 28, 2026", type: "outflow", token: "USDT", amountUsd: 420000, counterparty: "inj1mm…4d5e" },
  { id: "t-2", date: "May 27, 2026", type: "inflow", token: "INJ", amountUsd: 185000, counterparty: "Staking rewards" },
  { id: "t-3", date: "May 25, 2026", type: "outflow", token: "INJ", amountUsd: 96000, counterparty: "inj1dao…8f9a" },
  { id: "t-4", date: "May 24, 2026", type: "inflow", token: "USDC", amountUsd: 310000, counterparty: "Protocol fees" },
  { id: "t-5", date: "May 22, 2026", type: "outflow", token: "USDC", amountUsd: 54000, counterparty: "Grants payout" },
];

export const MOCK_TREASURY_EXPOSURE: ExposureSlice[] = [
  { category: "INJ (Native)", valueUsd: 3480000, percent: 50, color: "#0066FF" },
  { category: "Stablecoins", valueUsd: 2090000, percent: 30, color: "#22C55E" },
  { category: "Ecosystem Tokens", valueUsd: 975000, percent: 14, color: "#00C2FF" },
  { category: "Unknown / Other", valueUsd: 420700, percent: 6, color: "#F5C542" },
];
