import { AIWalletReportData } from "../types/ai-report";

export const MOCK_AI_REPORT: AIWalletReportData = {
  summary: {
    title: "Portfolio Summary",
    content: "The wallet shows a highly active Injective ecosystem participant with a strong focus on L1 staking and stablecoin liquidity. Total value has grown 3.2% in the last 7 days, primarily driven by INJ price appreciation.",
    observations: [
      { id: "s1", level: "success", text: "Healthy diversification between staked assets and liquid capital." },
      { id: "s2", level: "info", text: "Wallet has interacted with 12 unique protocols in the last 30 days." },
    ],
  },
  risk: {
    title: "Risk Analysis",
    content: "Overall risk is Low (24/100). The primary risk factor is volatility exposure to INJ, which accounts for 60% of the portfolio. Smart contract risk is minimized through the use of audited protocols.",
    observations: [
      { id: "r1", level: "success", text: "No suspicious contract interactions or known phishing addresses detected." },
      { id: "r2", level: "warning", text: "High volatility exposure due to concentrated INJ position." },
    ],
  },
  concentration: {
    title: "Concentration Insights",
    content: "Portfolio concentration is moderate. While INJ is the dominant asset, the 24% stablecoin position provides a significant buffer against market downturns.",
    observations: [
      { id: "c1", level: "info", text: "Stablecoin ratio (24%) is above the ecosystem average of 15%." },
      { id: "c2", level: "warning", text: "92% of value is concentrated in the top 3 assets." },
    ],
  },
  nextSteps: [
    "Consider staking the remaining 5,000 unstaked INJ to earn ~15% APR.",
    "Explore diversifying stablecoin yields across DojoSwap and Helix.",
    "Set up real-time alerts for large volatility swings in NINJA positions.",
  ],
};
