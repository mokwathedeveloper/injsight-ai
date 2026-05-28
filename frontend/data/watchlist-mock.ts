import { WatchlistWallet, WatchlistSummary } from "../types/watchlist";

export const MOCK_WATCHLIST_WALLETS: WatchlistWallet[] = [
  {
    id: "w-1",
    address: "inj1whale...asdf",
    label: "Main Whale Monitor",
    totalValueUsd: 1250430,
    change24h: 3.2,
    riskScore: 24,
    riskLevel: "Low",
    lastSync: "2 mins ago",
    status: "up-to-date",
  },
  {
    id: "w-2",
    address: "inj1degen...hjkl",
    label: "Meme Degen Tracker",
    totalValueUsd: 12450,
    change24h: -12.5,
    riskScore: 88,
    riskLevel: "Very High",
    lastSync: "5 mins ago",
    status: "alert",
  },
  {
    id: "w-3",
    address: "inj1farm...qwer",
    label: "Yield Farming Bot",
    totalValueUsd: 45200,
    change24h: 0.05,
    riskScore: 12,
    riskLevel: "Low",
    lastSync: "10 mins ago",
    status: "up-to-date",
  },
  {
    id: "w-4",
    address: "inj1test...zxcv",
    label: "Ecosystem Test Account",
    totalValueUsd: 50160,
    change24h: 1.2,
    riskScore: 45,
    riskLevel: "Moderate",
    lastSync: "1 min ago",
    status: "syncing",
  },
];

export const MOCK_WATCHLIST_SUMMARY: WatchlistSummary = {
  totalValueUsd: 1358240,
  avgRiskScore: 42,
  activeAlerts: 1,
  totalWallets: 4,
};
