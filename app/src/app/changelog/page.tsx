import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui";
import { Zap, Shield, Brain, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Changelog — InjSight AI" };

const RELEASES = [
  {
    version: "1.0.0",
    date: "May 30, 2026",
    label: "Latest",
    labelVariant: "accent" as const,
    title: "Full Production Launch",
    description: "InjSight AI goes live with complete AI-powered wallet intelligence for Injective DeFi.",
    changes: [
      { icon: Brain,      color: "text-accent",   text: "OpenRouter AI (LangChain ReAct agent) — real wallet reports and chat" },
      { icon: TrendingUp, color: "text-primary",   text: "Live Injective Mainnet LCD integration — real on-chain balances" },
      { icon: Zap,        color: "text-warning",   text: "CoinGecko live prices — real USD values for all tokens" },
      { icon: Shield,     color: "text-success",   text: "Supabase Realtime alerts — risk change notifications" },
      { icon: Brain,      color: "text-violet-400", text: "Ask Your Wallet chat — conversational AI about any wallet" },
      { icon: TrendingUp, color: "text-accent",   text: "53 routes — wallet analysis, dashboard, insights, treasury, team" },
      { icon: Shield,     color: "text-success",   text: "JWT auth — secure register, login, session management" },
    ],
  },
  {
    version: "0.9.0",
    date: "May 25, 2026",
    label: "Beta",
    labelVariant: "warning" as const,
    title: "AI + Injective Deep Integration",
    description: "Connected real Injective blockchain data and integrated OpenRouter AI for production-grade analysis.",
    changes: [
      { icon: Brain,      color: "text-accent",   text: "OpenRouter API key integration — llama-3.3-70b-instruct primary model" },
      { icon: TrendingUp, color: "text-primary",   text: "Injective transaction history from LCD event queries" },
      { icon: Shield,     color: "text-success",   text: "INJ staking delegations and pending rewards via LCD" },
      { icon: Zap,        color: "text-warning",   text: "Ecosystem exposure breakdown — portfolio + staking combined" },
      { icon: Brain,      color: "text-accent",   text: "Market context page — live prices, 24h changes per asset" },
    ],
  },
  {
    version: "0.8.0",
    date: "May 20, 2026",
    label: "Alpha",
    labelVariant: "secondary" as const,
    title: "Platform Foundation",
    description: "Complete full-stack foundation with Next.js 14 frontend and FastAPI backend.",
    changes: [
      { icon: Shield,     color: "text-primary",   text: "Next.js 14 + TypeScript + Tailwind dark fintech design system" },
      { icon: TrendingUp, color: "text-accent",   text: "FastAPI backend + PostgreSQL (Supabase) + Alembic migrations" },
      { icon: Brain,      color: "text-success",   text: "53-page UI matching professional mockups" },
      { icon: Zap,        color: "text-warning",   text: "Risk scoring engine — concentration, volatility, stablecoin buffer" },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 page-section">
        <div className="page-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Changelog</p>
            <h1 className="text-4xl font-bold text-text-primary mb-4">What&apos;s New</h1>
            <p className="text-text-secondary">Every update, fix, and improvement to InjSight AI.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {RELEASES.map((release) => (
                <div key={release.version} className="relative pl-16">
                  <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-accent border-2 border-background -translate-x-1/2" />
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-xs font-mono text-text-muted">v{release.version}</span>
                      <span className={`badge ${release.labelVariant === "accent" ? "badge-accent" : release.labelVariant === "warning" ? "badge-warning" : "badge bg-surface-2 text-text-secondary border border-border"}`}>
                        {release.label}
                      </span>
                      <span className="text-xs text-text-muted ml-auto">{release.date}</span>
                    </div>
                    <h2 className="text-lg font-bold text-text-primary mb-1">{release.title}</h2>
                    <p className="text-sm text-text-secondary mb-4">{release.description}</p>
                    <ul className="space-y-2">
                      {release.changes.map(({ icon: Icon, color, text }, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                          <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
