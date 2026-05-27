import { SavedWallet } from "../types/saved-wallets";

export const MOCK_SAVED_WALLETS: SavedWallet[] = [
  {
    id: "w-1",
    label: "Main Cold Wallet",
    address: "inj1whale...asdf",
    totalValueUsd: 1250430,
    riskScore: 24,
    riskLevel: "Low",
    lastAnalyzed: "2 hours ago",
    isPro: true,
  },
  {
    id: "w-2",
    label: "Degen Play Portfolio",
    address: "inj1degen...hjkl",
    totalValueUsd: 12450,
    riskScore: 88,
    riskLevel: "Very High",
    lastAnalyzed: "1 day ago",
  },
  {
    id: "w-3",
    label: "Stable Yield Farm",
    address: "inj1farm...qwer",
    totalValueUsd: 45200,
    riskScore: 12,
    riskLevel: "Low",
    lastAnalyzed: "5 hours ago",
    isPro: true,
  },
  {
    id: "w-4",
    label: "Testing Lab",
    address: "inj1test...zxcv",
    totalValueUsd: 50160,
    riskScore: 45,
    riskLevel: "Moderate",
    lastAnalyzed: "3 days ago",
  },
];
