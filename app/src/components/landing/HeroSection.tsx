"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { Search, Shield, TrendingUp, Brain, ArrowRight, Play, LayoutDashboard, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const PARTNER_LOGOS = ["INJECTIVE", "HELIX", "ASTROPORT", "LEVANA", "MITO"];

export function HeroSection() {
  const router     = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const loggedIn   = isAuthenticated();
  const firstName  = user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "back";
  const [address, setAddress] = useState("");

  const handleAnalyze = () => {
    if (address.trim()) {
      router.push(`/analyze?address=${encodeURIComponent(address.trim())}`);
    } else {
      router.push("/analyze");
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="page-container py-20 md:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — headline + CTA */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-muted border border-accent/20 text-xs font-semibold text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                AI-Powered Wallet Intelligence
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-text-primary leading-tight">
                Understand Any{" "}
                <span className="gradient-text">Injective Wallet</span>{" "}
                in Seconds.
              </h1>

              <p className="text-base text-text-secondary leading-relaxed max-w-lg">
                Analyze any Injective wallet address and get AI-powered insights, risk scores,
                portfolio composition, concentration analysis, and plain-English AI reports.
              </p>
            </div>

            {/* Wallet input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Enter any Injective wallet address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  className="input-field pl-10 py-3.5 text-sm"
                />
              </div>
              <Button variant="accent" size="lg" onClick={handleAnalyze}>
                Analyze <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-success" />
                Read-Only · No Private Keys
              </span>
              <span className="flex items-center gap-1.5">
                <Brain className="h-3.5 w-3.5 text-accent" />
                AI-Powered Intelligence
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-primary" />
                Built for Injective DeFi
              </span>
            </div>

            {/* CTAs — change based on auth state */}
            {loggedIn ? (
              <div className="space-y-3">
                {/* Logged-in welcome */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-success-muted border border-success/20 w-fit">
                  <Sparkles className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm font-semibold text-success">
                    Welcome back, {firstName}! You&apos;re signed in.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="accent" size="lg" asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/analyze">
                      <Search className="h-4 w-4" /> Analyze a Wallet
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="primary" size="lg" asChild>
                  <Link href="/signup">Start Analyzing Free</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link href="/analyze?demo=true">
                    <Play className="h-4 w-4" /> Try Demo Wallet
                  </Link>
                </Button>
              </div>
            )}

            {/* Partner logos */}
            <div className="pt-4">
              <p className="text-xs text-text-muted mb-3">Ecosystem Integrations</p>
              <div className="flex flex-wrap items-center gap-4">
                {PARTNER_LOGOS.map((logo) => (
                  <span key={logo} className="text-xs font-bold text-text-muted/60 tracking-wider uppercase">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — wallet intelligence preview card */}
          <div className="relative animate-fade-in lg:pl-8">
            <WalletPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function WalletPreviewCard() {
  return (
    <div className="glass-card p-5 space-y-4 max-w-md mx-auto shadow-glow border-accent/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-text-muted">Wallet Intelligence Preview</p>
          <p className="text-sm font-mono text-text-secondary mt-0.5">inj1qg5e...kkxh</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-danger">High Risk</span>
          <span className="badge-warning">72</span>
        </div>
      </div>

      <div className="divider" />

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-2 rounded-lg p-3">
          <p className="text-xs text-text-muted">Portfolio Value</p>
          <p className="text-lg font-bold text-text-primary mt-1">$248,450</p>
          <p className="text-xs text-success mt-0.5">+18.5% (30d)</p>
        </div>
        <div className="bg-surface-2 rounded-lg p-3">
          <p className="text-xs text-text-muted">Risk Assessment</p>
          <div className="mt-1 flex items-end gap-2">
            <span className="text-lg font-bold text-warning">72</span>
            <span className="text-xs text-text-muted mb-0.5">/ 100</span>
          </div>
          <p className="text-xs text-warning mt-0.5">High Risk</p>
        </div>
      </div>

      {/* Mini chart placeholder */}
      <div className="bg-surface-2 rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-text-muted">Portfolio Trend</p>
          <span className="text-xs text-success">+12.3%</span>
        </div>
        <div className="flex items-end gap-1 h-10">
          {[30, 45, 38, 55, 42, 65, 58, 70, 62, 80, 75, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-accent rounded-sm opacity-70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Top tokens */}
      <div className="space-y-2">
        {[
          { symbol: "INJ",   pct: "42.1%", value: "$104,534", change: "+3.2%" },
          { symbol: "USDT",  pct: "28.3%", value: "$70,280",  change: "0.0%" },
          { symbol: "ATOM",  pct: "15.6%", value: "$38,762",  change: "-1.4%" },
        ].map((token) => (
          <div key={token.symbol} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-[9px] font-bold text-white">
                {token.symbol[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">{token.symbol}</p>
                <p className="text-[10px] text-text-muted">{token.pct}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-primary">{token.value}</p>
              <p className={`text-[10px] ${token.change.startsWith("+") ? "text-success" : token.change === "0.0%" ? "text-text-muted" : "text-danger"}`}>
                {token.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
