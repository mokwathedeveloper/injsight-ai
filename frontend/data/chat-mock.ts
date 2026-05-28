import { ChatMessage } from "@/types/chat";

export const SUGGESTED_QUESTIONS = [
  "What is the biggest risk in this wallet?",
  "How concentrated is this portfolio?",
  "What changed in the last 7 days?",
  "Is this wallet actively staking?",
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "c-0",
    role: "assistant",
    content:
      "Hi! I can answer questions about this wallet using its public on-chain data and the latest AI report. Ask me anything — I never see private keys and can't move funds.",
    timestamp: "now",
  },
];

// Deterministic canned answers for the demo (no real model call).
export const CANNED_ANSWERS: Record<string, string> = {
  risk: "The largest risk is asset concentration: roughly 60% of the portfolio is held in INJ, which carries medium volatility. Smart-contract exposure is moderate and limited to audited protocols. Overall this maps to a Low–Moderate risk score.",
  concentration: "Concentration is moderate-to-high. The top 3 assets account for ~92% of value, with INJ alone at ~60%. A 22% stablecoin buffer offsets some downside, but a single-asset shock would move the portfolio significantly.",
  changed: "Over the last 7 days total value rose ~3.2%, driven mostly by INJ price appreciation. There was one large outflow (~$52k USDC) and continued staking inflows. No new unverified tokens appeared.",
  staking: "Yes — this wallet has an active staking position with the InjGuard validator and recently claimed staking rewards. Around 5,000 INJ remain unstaked and idle.",
  default: "Based on this wallet's public on-chain data, it's an active Injective participant with staking activity, a stablecoin buffer, and concentrated INJ exposure. Ask about risk, concentration, recent changes, or staking for more detail.",
};

export function answerFor(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("risk")) return CANNED_ANSWERS.risk;
  if (q.includes("concentr") || q.includes("diversif")) return CANNED_ANSWERS.concentration;
  if (q.includes("change") || q.includes("7 day") || q.includes("week")) return CANNED_ANSWERS.changed;
  if (q.includes("stak")) return CANNED_ANSWERS.staking;
  return CANNED_ANSWERS.default;
}
