import { SuggestedNextStepsData } from "../types/next-steps";

export const MOCK_NEXT_STEPS: SuggestedNextStepsData = {
  actions: [
    {
      id: "stake-inj",
      category: "yield",
      title: "Stake Unstaked INJ",
      description: "You have 5,000 INJ in your liquid balance. Staking these could earn you approximately 15% APR.",
      actionLabel: "Stake on Hub",
      actionUrl: "https://hub.injective.network/staking",
      isExternal: true,
    },
    {
      id: "reduce-concentration",
      category: "risk",
      title: "Diversify Concentration",
      description: "92% of your portfolio is in 3 assets. Consider rebalancing into stablecoins to reduce volatility.",
      actionLabel: "Swap on Helix",
      actionUrl: "https://helixapp.com",
      isExternal: true,
    },
    {
      id: "dojoswap-yield",
      category: "yield",
      title: "Optimize Stablecoin Yield",
      description: "Your USDT/USDC holdings could earn 12%+ APR in DojoSwap liquidity pools.",
      actionLabel: "Open DojoSwap",
      actionUrl: "https://dojo.trading",
      isExternal: true,
    },
    {
      id: "security-audit",
      category: "security",
      title: "Review Contract Approvals",
      description: "You have 4 legacy approvals for older protocols. Revoking them enhances your wallet security.",
      actionLabel: "Revoke Permissions",
      actionUrl: "#",
      isExternal: false,
    },
  ],
};
