"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  Brain,
  Send,
  User,
  Bot,
  Zap,
  CheckCircle2,
  TrendingUp,
  Shield,
  BarChart2,
  AlertTriangle,
} from "lucide-react";

// ── types ──────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

// ── mock data ──────────────────────────────────────────────────────────────────

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "Why is this wallet considered high risk?",
    timestamp: "2:14 PM",
  },
  {
    id: "m2",
    role: "ai",
    content:
      "This wallet carries a **Risk Score of 82/100** — classified as **Critical** — for several reasons:\n\n1. **Concentration Risk (High):** INJ represents 76.4% of total portfolio value. Any significant price movement in INJ directly impacts the entire portfolio.\n\n2. **DeFi Protocol Exposure:** Over 45% of assets are deployed across DeFi protocols (Helix, Astroport, Mito). Smart contract risk and liquidity risk are elevated.\n\n3. **Low Stablecoin Buffer:** Only 6.2% of holdings are in stablecoins (USDT/USDC), leaving little downside protection during volatile periods.\n\n4. **Activity Pattern:** High transaction frequency with large single-transaction amounts suggests active trading, increasing exposure.\n\nTo reduce risk, consider diversifying into more blue-chip assets and increasing stablecoin allocation to at least 20%.",
    timestamp: "2:14 PM",
  },
  {
    id: "m3",
    role: "user",
    content: "Which asset is the biggest part of the portfolio?",
    timestamp: "2:15 PM",
  },
  {
    id: "m4",
    role: "ai",
    content:
      "The **largest holding is INJ (Injective Protocol)** at **76.4% of portfolio value**, totalling approximately **$1,836,500**.\n\nHere's the full breakdown of top assets:\n\n• **INJ** — 76.4% · $1,836,500\n• **USDT** — 6.2% · $149,035\n• **ATOM** — 8.9% · $213,938\n• **WBTC** — 5.1% · $122,593\n• **Others** — 3.4% · $81,729\n\nThe heavy concentration in INJ is the primary driver of the elevated risk score. A rebalancing strategy would recommend reducing INJ below 50% and distributing into more diversified assets.",
    timestamp: "2:15 PM",
  },
];

const SUGGESTED_QUESTIONS = [
  "Why is this high risk?",
  "What are the top assets?",
  "How can I reduce risk?",
  "Explain risk score in simple terms",
];

const WALLET_ASSETS = [
  { name: "INJ",  pct: 76.4, value: "$1,836,500", color: "#0066FF" },
  { name: "ATOM", pct: 8.9,  value: "$213,938",   color: "#7C3AED" },
  { name: "USDT", pct: 6.2,  value: "$149,035",   color: "#22C55E" },
  { name: "WBTC", pct: 5.1,  value: "$122,593",   color: "#F5C542" },
];

const QUICK_INSIGHTS = [
  { icon: AlertTriangle, color: "text-danger",  text: "INJ concentration exceeds safe threshold (76.4%)" },
  { icon: Shield,        color: "text-warning", text: "DeFi exposure at 45% — monitor liquidity risk" },
  { icon: TrendingUp,    color: "text-success",  text: "Portfolio grew 12.4% over the last 30 days" },
  { icon: BarChart2,     color: "text-accent",   text: "Stablecoin buffer below recommended 20% minimum" },
];

// ── helpers ────────────────────────────────────────────────────────────────────

function renderAIContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const boldReplaced = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (line.startsWith("•")) {
      return (
        <li
          key={i}
          className="text-xs text-text-secondary leading-relaxed ml-3"
          dangerouslySetInnerHTML={{ __html: boldReplaced.replace(/^•\s*/, "") }}
        />
      );
    }
    if (/^\d+\./.test(line)) {
      return (
        <p
          key={i}
          className="text-xs text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldReplaced }}
        />
      );
    }
    if (line.trim() === "") return <div key={i} className="h-1.5" />;
    return (
      <p
        key={i}
        className="text-xs text-text-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: boldReplaced }}
      />
    );
  });
}

// ── view ───────────────────────────────────────────────────────────────────────

function ChatView() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  }

  return (
    <div className="space-y-0 h-[calc(100vh-130px)] flex flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h1 className="text-xl font-bold text-text-primary">Ask Your Wallet</h1>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* ── Left: Chat panel ── */}
        <div className="flex flex-col flex-[2] min-w-0 glass-card overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Brain className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-semibold text-text-primary">Ask Your Wallet</span>
              <span className="badge-primary flex items-center gap-1">
                <Zap className="h-3 w-3" /> GPT-4
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-success font-medium">Connected</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.role === "ai" ? "bg-primary/10" : "bg-surface-3"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <Bot className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-text-secondary" />
                  )}
                </div>
                <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={`rounded-xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-sm"
                        : "bg-surface-2 border border-border rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="text-xs leading-relaxed">{msg.content}</p>
                    ) : (
                      <div className="space-y-0.5">{renderAIContent(msg.content)}</div>
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted px-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested questions */}
          <div className="px-5 py-3 border-t border-border/50 shrink-0">
            <p className="text-[10px] text-text-muted mb-2">Suggested questions</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-5 py-4 border-t border-border shrink-0">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask anything about this wallet..."
                className="input-field text-xs flex-1"
              />
              <Button
                variant="accent"
                size="icon"
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right: Context panel ── */}
        <div className="flex flex-col flex-1 min-w-0 gap-4">
          {/* Wallet context */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Wallet Context</h3>
            <div className="bg-surface-2 rounded-lg px-3 py-2 mb-3">
              <p className="text-[10px] text-text-muted">Address</p>
              <p className="text-xs font-mono text-accent">inj1qg5...kkxh</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-surface-2 rounded-lg p-2">
                <p className="text-[10px] text-text-muted">Risk Score</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-sm font-bold text-danger">82</span>
                  <span className="badge-danger text-[10px]">Critical</span>
                </div>
              </div>
              <div className="bg-surface-2 rounded-lg p-2">
                <p className="text-[10px] text-text-muted">Portfolio Value</p>
                <p className="text-sm font-bold text-text-primary">$2.40M</p>
              </div>
            </div>
            <p className="section-label mb-2">Top Assets</p>
            <div className="space-y-2">
              {WALLET_ASSETS.map((a) => (
                <div key={a.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: a.color }} />
                    <span className="text-xs text-text-secondary">{a.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: a.color }} />
                    </div>
                    <span className="text-xs text-text-primary w-10 text-right">{a.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick insights */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Insights</h3>
            <ul className="space-y-2.5">
              {QUICK_INSIGHTS.map(({ icon: Icon, color, text }, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                  <p className="text-xs text-text-secondary leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="glass-card p-4 space-y-2">
            <Button variant="secondary" size="sm" className="w-full text-xs">
              <Brain className="h-3.5 w-3.5" /> Re-Analyze Wallet
            </Button>
            <Button variant="ghost" size="sm" className="w-full text-xs">
              Switch Wallet Context
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <DashboardLayout>
      <ChatView />
    </DashboardLayout>
  );
}
