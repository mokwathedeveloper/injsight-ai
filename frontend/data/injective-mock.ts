import { InjectiveTransaction, MarketAsset, ExposureCategory } from "@/types/injective";

export const MOCK_TRANSACTIONS: InjectiveTransaction[] = [
  { id: "tx-1", hash: "0x8f2a…b6c8", type: "receive", asset: "INJ", amount: 1250, valueUsd: 31250, timestamp: "2026-05-29T22:14:00Z", counterparty: "inj1mm…4d5e", isLarge: true },
  { id: "tx-2", hash: "0x1a2b…9c0d", type: "swap", asset: "USDT", amount: 8400, valueUsd: 8400, timestamp: "2026-05-29T18:02:00Z", counterparty: "Helix DEX", isLarge: false },
  { id: "tx-3", hash: "0x7e8f…1a2b", type: "stake", asset: "INJ", amount: 600, valueUsd: 15000, timestamp: "2026-05-28T11:40:00Z", counterparty: "Validator: InjGuard", isLarge: false },
  { id: "tx-4", hash: "0x3c4d…5e6f", type: "send", asset: "USDC", amount: 52000, valueUsd: 52000, timestamp: "2026-05-27T09:15:00Z", counterparty: "inj1dao…8f9a", isLarge: true },
  { id: "tx-5", hash: "0x9a0b…2c3d", type: "claim", asset: "INJ", amount: 42.5, valueUsd: 1062, timestamp: "2026-05-26T07:30:00Z", counterparty: "Staking rewards", isLarge: false },
];

export const MOCK_MARKET_ASSETS: MarketAsset[] = [
  { symbol: "INJ", name: "Injective", priceUsd: 25.04, change24h: 2.1, change7d: -4.3, category: "Native", volatility: "Medium" },
  { symbol: "USDT", name: "Tether", priceUsd: 1.0, change24h: 0.0, change7d: 0.1, category: "Stablecoin", volatility: "Low" },
  { symbol: "WETH", name: "Wrapped Ether", priceUsd: 3120.5, change24h: -1.2, change7d: 3.8, category: "Ecosystem", volatility: "Medium" },
  { symbol: "TIA", name: "Celestia", priceUsd: 6.74, change24h: 5.6, change7d: 12.4, category: "Ecosystem", volatility: "High" },
];

export const MOCK_ECOSYSTEM_EXPOSURE: ExposureCategory[] = [
  { category: "Native", percent: 42, valueUsd: 104349, tokenCount: 1, color: "#0066FF" },
  { category: "Stablecoin", percent: 31, valueUsd: 77019, tokenCount: 2, color: "#22C55E" },
  { category: "Ecosystem", percent: 21, valueUsd: 52174, tokenCount: 5, color: "#00C2FF" },
  { category: "Unknown", percent: 6, valueUsd: 14907, tokenCount: 3, color: "#F5C542" },
];
