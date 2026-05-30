import { useQuery } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";

export interface Transaction {
  hash:      string;
  height:    number;
  timestamp: string;
  type:      string;
  fee:       number;
  status:    "success" | "failed";
  memo:      string;
}

export interface Delegation {
  validator:    string;
  amount:       number;
  shares:       string;
}

export interface StakingData {
  address:          string;
  delegations:      Delegation[];
  total_staked_inj: number;
  total_staked_usd: number;
  rewards:          { validator: string; amount: number }[];
  total_rewards_inj: number;
  total_rewards_usd: number;
  inj_price:        number;
  data_source:      string;
}

export interface EcosystemData {
  address:               string;
  total_value_usd:       number;
  portfolio_value_usd:   number;
  staking_value_usd:     number;
  ecosystem_exposure_pct: number;
  injective_native_pct:  number;
  stablecoin_pct:        number;
  defi_pct:              number;
  unknown_pct:           number;
  categories:            { name: string; value_usd: number; pct: number }[];
  top_tokens:            { symbol: string; name: string; value_usd: number; percent: number }[];
  staking:               StakingData;
  data_sources:          string[];
}

export interface AssetMarketItem {
  symbol:    string;
  name:      string;
  price:     number;
  change24h: number;
  value_usd: number;
  pct:       number;
  category:  string;
}

export interface MarketContext {
  address:          string;
  total_value_usd:  number;
  inj_price:        number;
  inj_change_24h:   number;
  dominant_asset:   string;
  dominant_pct:     number;
  asset_market_data: AssetMarketItem[];
  data_source:      string;
  last_updated:     string;
}

const STALE = 60_000; // 1 min

export function useInjectiveTransactions(address: string | null) {
  return useQuery({
    queryKey: ["injective-transactions", address],
    queryFn: async () => {
      const res = await apiClient.get(`/injective/${address}/transactions?limit=30`);
      return unwrapData(res) as { transactions: Transaction[]; total_count: number; data_source: string };
    },
    enabled: !!address,
    staleTime: STALE,
  });
}

export function useInjectiveStaking(address: string | null) {
  return useQuery({
    queryKey: ["injective-staking", address],
    queryFn: async () => {
      const res = await apiClient.get(`/injective/${address}/staking`);
      return unwrapData(res) as StakingData;
    },
    enabled: !!address,
    staleTime: STALE,
  });
}

export function useInjectiveEcosystem(address: string | null) {
  return useQuery({
    queryKey: ["injective-ecosystem", address],
    queryFn: async () => {
      const res = await apiClient.get(`/injective/${address}/ecosystem`);
      return unwrapData(res) as EcosystemData;
    },
    enabled: !!address,
    staleTime: STALE,
  });
}

export function useInjectiveMarket(address: string | null) {
  return useQuery({
    queryKey: ["injective-market", address],
    queryFn: async () => {
      const res = await apiClient.get(`/injective/${address}/market`);
      return unwrapData(res) as MarketContext;
    },
    enabled: !!address,
    staleTime: STALE,
  });
}
