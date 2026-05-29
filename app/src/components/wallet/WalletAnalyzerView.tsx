"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Shield, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui";
import { PortfolioSummary } from "./PortfolioSummary";
import { TokenBalanceTable } from "./TokenBalanceTable";
import { PortfolioCompositionChart } from "./PortfolioCompositionChart";
import { WalletRiskScore } from "./WalletRiskScore";
import { AiWalletReport } from "./AiWalletReport";
import { SuggestedNextSteps } from "./SuggestedNextSteps";
import { ReadOnlySafetyMessage } from "./ReadOnlySafetyMessage";
import { DEMO_WALLET_ADDRESS } from "@/config";

export function WalletAnalyzerView() {
  const searchParams = useSearchParams();
  const initialAddress = searchParams.get("address") ?? "";
  const isDemo = searchParams.get("demo") === "true";

  const [inputAddress, setInputAddress] = useState(isDemo ? DEMO_WALLET_ADDRESS : initialAddress);
  const [analyzedAddress, setAnalyzedAddress] = useState(isDemo ? DEMO_WALLET_ADDRESS : initialAddress);
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(isDemo || !!initialAddress);

  const handleAnalyze = async () => {
    if (!inputAddress.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setAnalyzedAddress(inputAddress.trim());
    setHasResult(true);
    setLoading(false);
  };

  const handleDemo = () => {
    setInputAddress(DEMO_WALLET_ADDRESS);
    setAnalyzedAddress(DEMO_WALLET_ADDRESS);
    setHasResult(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text-primary">Wallet Analyzer</h1>
        <p className="text-sm text-text-secondary">Paste any Injective wallet address to get AI-powered insights.</p>
      </div>

      {/* Input bar */}
      <div className="glass-card p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="inj1... — paste any Injective wallet address"
              value={inputAddress}
              onChange={(e) => setInputAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              className="input-field pl-10"
            />
          </div>
          <Button variant="accent" onClick={handleAnalyze} loading={loading}>
            <Search className="h-4 w-4" /> Analyze Wallet
          </Button>
          <Button variant="secondary" onClick={handleDemo}>
            <FlaskConical className="h-4 w-4" /> Try Demo Wallet
          </Button>
        </div>

        {/* Safety note */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Shield className="h-3.5 w-3.5 text-success shrink-0" />
          <p className="text-xs text-text-muted">
            InjSight is a read-only analytics platform. We never access your funds or private data.{" "}
            <a href="/security" className="text-accent hover:underline">Learn More</a>
          </p>
        </div>
      </div>

      {/* Results */}
      {hasResult && !loading && (
        <div className="space-y-6 animate-fade-in">
          <PortfolioSummary address={analyzedAddress} />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TokenBalanceTable address={analyzedAddress} />
              <PortfolioCompositionChart address={analyzedAddress} />
            </div>
            <div className="space-y-6">
              <WalletRiskScore address={analyzedAddress} />
              <AiWalletReport address={analyzedAddress} />
              <SuggestedNextSteps address={analyzedAddress} />
            </div>
          </div>
          <ReadOnlySafetyMessage />
        </div>
      )}
    </div>
  );
}
