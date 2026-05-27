import { PortfolioComposition } from "../types/composition";

export const MOCK_COMPOSITION_DATA: PortfolioComposition = {
  categories: [
    { name: "L1 Tokens (INJ)", value: 60, color: "#0066FF" },
    { name: "Stablecoins", value: 24, color: "#22C55E" },
    { name: "Ethereum Ecosystem", value: 12, color: "#00C2FF" },
    { name: "DeFi & Altcoins", value: 4, color: "#F5C542" },
  ],
  riskDistribution: [
    { name: "Low Risk", value: 85, color: "#22C55E" },
    { name: "Moderate Risk", value: 12, color: "#F5C542" },
    { name: "High Risk", value: 3, color: "#EF4444" },
  ],
};
