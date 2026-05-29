"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  Brain, Send, User, Bot, Zap, CheckCircle2,
  Shield, Search, RefreshCw, Trash2, ChevronDown,
} from "lucide-react";
import { useAiChat, type ChatMessage } from "@/hooks/useAiChat";
import { useAnalyzeWallet } from "@/hooks/useAnalysis";
import { useSavedWallets } from "@/hooks/useWallets";
import { formatCurrency, formatAddress } from "@/lib/utils";
import { DEMO_WALLET_ADDRESS } from "@/config";

// ── Types ─────────────────────────────────────────────────────────────────────

interface DisplayMessage {
  id:        string;
  role:      "user" | "ai";
  content:   string;
  timestamp: string;
  isTyping?: boolean;
}

interface PortfolioHolding {
  symbol:    string;
  percent:   number;
  value_usd: number;
}

interface WalletContext {
  portfolio?: {
    totalValueUsd?: number;
    tokenCount?:    number;
    holdings?:      PortfolioHolding[];
  };
  riskScore?: { score?: number; level?: string };
  dataSource?: string;
}

const SUGGESTED = [
  "Why is this wallet high risk?",
  "What are the top assets?",
  "How can I reduce risk?",
  "Explain the risk score in simple terms",
  "What is the stablecoin buffer?",
  "Which tokens should I diversify into?",
];

// ── Markdown-ish renderer ────────────────────────────────────────────────────

function RenderAI({ content }: { content: string }) {
  return (
    <div className="space-y-1">
      {content.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
          p.startsWith("**") && p.endsWith("**")
            ? <strong key={j} className="text-text-primary font-semibold">{p.slice(2, -2)}</strong>
            : <span key={j}>{p}</span>
        );

        if (/^[•\-]\s/.test(line)) {
          return (
            <div key={i} className="flex gap-2 text-xs text-text-secondary leading-relaxed">
              <span className="text-accent shrink-0">•</span>
              <span>{parts}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          const num = line.match(/^\d+/)![0];
          const rest = line.replace(/^\d+\.\s*/, "");
          const restParts = rest.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
            p.startsWith("**") && p.endsWith("**")
              ? <strong key={j} className="text-text-primary font-semibold">{p.slice(2,-2)}</strong>
              : <span key={j}>{p}</span>
          );
          return (
            <div key={i} className="flex gap-2 text-xs text-text-secondary leading-relaxed">
              <span className="text-accent shrink-0 font-semibold">{num}.</span>
              <span>{restParts}</span>
            </div>
          );
        }
        return <p key={i} className="text-xs text-text-secondary leading-relaxed">{parts}</p>;
      })}
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

function AskWalletChat() {
  const { data: savedWallets }  = useSavedWallets();
  const chatMutation            = useAiChat();
  const analyzeMutation         = useAnalyzeWallet();

  const [address,      setAddress]      = useState("");
  const [inputAddr,    setInputAddr]    = useState("");
  const [messages,     setMessages]     = useState<DisplayMessage[]>([]);
  const [input,        setInput]        = useState("");
  const [walletCtx,    setWalletCtx]    = useState<WalletContext | null>(null);
  const [showSaved,    setShowSaved]    = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ts = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // ── Load wallet ──────────────────────────────────────────────────────────────
  const loadWallet = useCallback(
    async (addr: string) => {
      const clean = addr.trim();
      if (!clean) return;

      setAddress(clean);
      setMessages([]);
      setWalletCtx(null);
      setShowSaved(false);

      // Typing indicator while loading
      setMessages([{ id: "init", role: "ai", content: "", timestamp: ts(), isTyping: true }]);

      try {
        const analysis = await analyzeMutation.mutateAsync(clean);
        const ctx: WalletContext = {
          portfolio: analysis.portfolio,
          riskScore: analysis.riskScore,
          dataSource: analysis.dataSource,
        };
        setWalletCtx(ctx);

        const level  = analysis.riskScore?.level ?? "Unknown";
        const score  = analysis.riskScore?.score ?? 0;
        const value  = analysis.portfolio?.totalValueUsd ?? 0;
        const top    = (analysis.portfolio?.holdings ?? [])[0];

        setMessages([{
          id:      "greeting",
          role:    "ai",
          content: `**Wallet loaded!** I'm ready to answer your questions.\n\n**Quick summary:**\n- Portfolio value: **${formatCurrency(value)}**\n- Risk score: **${score}/100 — ${level} Risk**${top ? `\n- Largest holding: **${top.symbol}** at ${top.percent}%` : ""}\n\nAsk me anything about this wallet.`,
          timestamp: ts(),
        }]);
      } catch {
        setMessages([{
          id:      "err",
          role:    "ai",
          content: "I couldn't load data for this address. Please check it's a valid Injective wallet (`inj1...`) and try again.",
          timestamp: ts(),
        }]);
      }
    },
    [analyzeMutation]
  );

  // ── Send message ─────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !address || chatMutation.isPending) return;
      setInput("");

      const userMsg: DisplayMessage = {
        id: `u-${Date.now()}`, role: "user", content: trimmed, timestamp: ts(),
      };

      const typingId = `t-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: typingId, role: "ai", content: "", timestamp: ts(), isTyping: true },
      ]);

      // History = last 6 completed turns (not typing)
      const history: ChatMessage[] = messages
        .filter((m) => !m.isTyping)
        .slice(-6)
        .map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.content }));

      try {
        const res = await chatMutation.mutateAsync({ address, question: trimmed, history });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? { id: `ai-${Date.now()}`, role: "ai", content: res.answer, timestamp: ts() }
              : m
          )
        );
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? { id: `ai-err-${Date.now()}`, role: "ai", content: "Something went wrong. Please try again.", timestamp: ts() }
              : m
          )
        );
      }

      inputRef.current?.focus();
    },
    [address, messages, chatMutation]
  );

  // ── Derived state ────────────────────────────────────────────────────────────
  const level    = walletCtx?.riskScore?.level ?? "";
  const score    = walletCtx?.riskScore?.score ?? 0;
  const holdings = walletCtx?.portfolio?.holdings ?? [];
  const totalVal = walletCtx?.portfolio?.totalValueUsd ?? 0;

  const riskClr  = level === "Very High" ? "text-danger"
                 : level === "High"      ? "text-warning"
                 : level === "Moderate"  ? "text-yellow-400"
                 : "text-success";

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Ask Your Wallet</h1>
          <p className="text-sm text-text-secondary">
            Converse with AI about any Injective wallet in real time.
          </p>
        </div>
        {address && (
          <Button
            variant="ghost" size="sm"
            onClick={() => { setAddress(""); setMessages([]); setWalletCtx(null); setInputAddr(""); }}
          >
            <Trash2 className="h-3.5 w-3.5" /> New Chat
          </Button>
        )}
      </div>

      {/* ── No wallet loaded ── */}
      {!address && (
        <div className="glass-card p-6 border-accent/20 animate-fade-in">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-accent-muted">
              <Brain className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-text-primary">Load a Wallet to Start</h2>
              <p className="text-xs text-text-muted">Paste any Injective address or pick a saved wallet</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                value={inputAddr}
                onChange={(e) => setInputAddr(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && loadWallet(inputAddr)}
                placeholder="inj1... — paste any Injective wallet address"
                className="input-field pl-10 font-mono text-sm"
              />
            </div>
            <Button
              variant="accent"
              onClick={() => loadWallet(inputAddr)}
              loading={analyzeMutation.isPending}
              disabled={!inputAddr.trim()}
            >
              <Brain className="h-4 w-4" /> Load
            </Button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="secondary" size="sm" className="text-xs"
              onClick={() => loadWallet(DEMO_WALLET_ADDRESS)}
              loading={analyzeMutation.isPending}
            >
              <Zap className="h-3.5 w-3.5" /> Try Demo Wallet
            </Button>

            {savedWallets && savedWallets.length > 0 && (
              <div className="relative">
                <Button
                  variant="secondary" size="sm" className="text-xs"
                  onClick={() => setShowSaved(!showSaved)}
                >
                  My Saved Wallets ({savedWallets.length})
                  <ChevronDown className={`h-3 w-3 transition-transform ${showSaved ? "rotate-180" : ""}`} />
                </Button>
                {showSaved && (
                  <div className="absolute top-full mt-1 left-0 w-72 glass-card shadow-card-hover py-1 z-50 animate-slide-down max-h-48 overflow-y-auto scrollbar-hide">
                    {savedWallets.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => { setShowSaved(false); loadWallet(w.address); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors text-left"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[9px] font-bold text-accent shrink-0">
                          {(w.label ?? w.address)[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{w.label ?? "Wallet"}</p>
                          <p className="text-[10px] font-mono text-text-muted truncate">{formatAddress(w.address, 8)}</p>
                        </div>
                        {w.riskScore != null && (
                          <span className="text-[10px] text-text-muted shrink-0">{w.riskScore}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Chat + context ── */}
      {address && (
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Chat panel */}
          <div className="flex flex-col flex-[2] min-w-0 glass-card overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Brain className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-primary">AI Model: OpenRouter</p>
                  <p className="text-[10px] font-mono text-text-muted">{formatAddress(address, 10)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!analyzeMutation.isPending && walletCtx && (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                    <span className="text-xs text-success font-medium">Connected</span>
                  </div>
                )}
                <Button variant="ghost" size="icon" onClick={() => loadWallet(address)} title="Reload wallet">
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.role === "ai" ? "bg-primary/10" : "bg-surface-3"
                  }`}>
                    {msg.role === "ai"
                      ? <Bot className="h-3.5 w-3.5 text-accent" />
                      : <User className="h-3.5 w-3.5 text-text-secondary" />
                    }
                  </div>
                  <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-sm"
                        : "bg-surface-2 border border-border rounded-tl-sm"
                    }`}>
                      {msg.isTyping
                        ? <TypingDots />
                        : msg.role === "user"
                          ? <p className="text-xs leading-relaxed">{msg.content}</p>
                          : <RenderAI content={msg.content} />
                      }
                    </div>
                    {!msg.isTyping && (
                      <span className="text-[10px] text-text-muted px-1">{msg.timestamp}</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions */}
            <div className="px-5 py-3 border-t border-border/50 shrink-0">
              <p className="text-[10px] text-text-muted mb-2">Suggested questions</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={chatMutation.isPending || analyzeMutation.isPending}
                    className="px-3 py-1.5 rounded-full bg-surface-2 border border-border text-xs text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors disabled:opacity-40"
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
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
                  }}
                  placeholder="Ask anything about this wallet or its report..."
                  className="input-field text-xs flex-1"
                  disabled={chatMutation.isPending || analyzeMutation.isPending}
                />
                <Button
                  variant="accent" size="icon"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || chatMutation.isPending || analyzeMutation.isPending}
                  loading={chatMutation.isPending}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-text-muted mt-1.5">
                <kbd className="px-1 py-0.5 bg-surface-3 rounded text-[10px]">Enter</kbd> to send
                · Read-only · Non-custodial · No private keys
              </p>
            </div>
          </div>

          {/* Context panel */}
          <div className="flex flex-col flex-1 min-w-0 gap-4 overflow-y-auto scrollbar-hide pb-2">
            <div className="glass-card p-4 shrink-0">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Wallet Context</h3>
              <div className="bg-surface-2 rounded-lg px-3 py-2 mb-3">
                <p className="text-[10px] text-text-muted mb-0.5">Address</p>
                <p className="text-xs font-mono text-accent break-all">{formatAddress(address, 10)}</p>
              </div>

              {walletCtx ? (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-surface-2 rounded-lg p-2">
                      <p className="text-[10px] text-text-muted">Risk Score</p>
                      <p className={`text-base font-bold mt-0.5 ${riskClr}`}>{score}</p>
                      <p className={`text-[10px] font-semibold ${riskClr}`}>{level}</p>
                    </div>
                    <div className="bg-surface-2 rounded-lg p-2">
                      <p className="text-[10px] text-text-muted">Portfolio</p>
                      <p className="text-sm font-bold text-text-primary mt-0.5">
                        {totalVal > 0 ? formatCurrency(totalVal) : "—"}
                      </p>
                    </div>
                  </div>

                  {holdings.length > 0 && (
                    <>
                      <p className="section-label mb-2">Top Holdings</p>
                      <div className="space-y-2">
                        {holdings.slice(0, 5).map((h, i) => (
                          <div key={h.symbol + i} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[9px] font-bold text-accent shrink-0">
                                {h.symbol[0]}
                              </div>
                              <span className="text-xs text-text-secondary truncate">{h.symbol}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="w-12 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.min(h.percent, 100)}%` }} />
                              </div>
                              <span className="text-xs text-text-primary w-8 text-right">{h.percent}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : analyzeMutation.isPending ? (
                <div className="space-y-2">
                  {[1,2,3].map(i => <div key={i} className="h-7 rounded-lg shimmer" />)}
                </div>
              ) : null}
            </div>

            <div className="glass-card p-4 shrink-0 border-success/20">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-success mb-1">Your Security Is Our Priority</p>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    InjSight is read-only. We never access your private keys or funds.
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="secondary" size="sm" className="w-full text-xs shrink-0"
              onClick={() => { setAddress(""); setMessages([]); setWalletCtx(null); setInputAddr(""); }}
            >
              Switch Wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <DashboardLayout>
      <AskWalletChat />
    </DashboardLayout>
  );
}
