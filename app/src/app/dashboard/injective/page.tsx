"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, PieChart, TrendingUp, Layers, ArrowRight, Info, Zap } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import { DEMO_WALLET_ADDRESS } from "@/config";

const FEATURE_CARDS = [
  {
    icon: Activity,
    title: "Transaction Activity",
    description: "View all on-chain transactions",
    subPage: "transactions",
    accentColor: "#0066FF",
  },
  {
    icon: PieChart,
    title: "Ecosystem Exposure",
    description: "Portfolio + staking breakdown",
    subPage: "ecosystem",
    accentColor: "#7C3AED",
  },
  {
    icon: TrendingUp,
    title: "Market Context",
    description: "Live prices and 24h changes",
    subPage: "market",
    accentColor: "#00C2FF",
  },
  {
    icon: Layers,
    title: "Staking Positions",
    description: "INJ delegation + rewards",
    subPage: "staking",
    accentColor: "#22C55E",
  },
] as const;

function InjectiveHubContent() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  function handleFetch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;
    router.push(`/dashboard/injective/${trimmed}/ecosystem`);
  }

  function handleDemo() {
    router.push(`/dashboard/injective/${DEMO_WALLET_ADDRESS}/ecosystem`);
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="section-label">Blockchain</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary">
          Injective <span className="gradient-text">Ecosystem</span>
        </h1>
        <p className="text-sm text-text-secondary">
          Real-time on-chain data from Injective Mainnet
        </p>
      </div>

      {/* Address Input Card */}
      <div className="glass-card p-6 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-0.5">Explore a Wallet</h2>
          <p className="text-xs text-text-muted">
            Enter an Injective address to view real-time on-chain data
          </p>
        </div>
        <form onSubmit={handleFetch} className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="inj1... (Injective wallet address)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            spellCheck={false}
          />
          <Button
            type="submit"
            variant="accent"
            disabled={!address.trim()}
            className="shrink-0"
          >
            <Zap className="h-4 w-4" />
            Fetch Data
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleDemo}
            className="shrink-0"
          >
            Try Demo
          </Button>
        </form>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <p className="section-label mb-3">Available Views</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURE_CARDS.map(({ icon: Icon, title, description, subPage, accentColor }) => {
            const href = address.trim()
              ? `/dashboard/injective/${address.trim()}/${subPage}`
              : `/dashboard/injective/${DEMO_WALLET_ADDRESS}/${subPage}`;

            return (
              <Link key={subPage} href={href} className="group glass-card-hover p-5 block">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2.5 rounded-lg shrink-0"
                      style={{ backgroundColor: `${accentColor}18`, border: `1px solid ${accentColor}30` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accentColor }} />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-text-secondary">{description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 mt-0.5 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Callout */}
      <div className="glass-card p-4 flex items-start gap-3 border-l-2 border-l-accent">
        <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-text-secondary leading-relaxed">
          InjSight connects directly to Injective Mainnet LCD nodes. Data is fetched in real time.
        </p>
      </div>
    </div>
  );
}

export default function InjectivePage() {
  return (
    <DashboardLayout>
      <InjectiveHubContent />
    </DashboardLayout>
  );
}
