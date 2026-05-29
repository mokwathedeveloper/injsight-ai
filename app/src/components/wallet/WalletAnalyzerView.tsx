"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Shield, FlaskConical } from "lucide-react";
import { Button, LoadingState, ErrorState } from "@/components/ui";
import { PortfolioSummary } from "./PortfolioSummary";
import { TokenBalanceTable } from "./TokenBalanceTable";
import { PortfolioCompositionChart } from "./PortfolioCompositionChart";
import { WalletRiskScore } from "./WalletRiskScore";
import { AiWalletReport } from "./AiWalletReport";
import { SuggestedNextSteps } from "./SuggestedNextSteps";
import { ReadOnlySafetyMessage } from "./ReadOnlySafetyMessage";
import { DEMO_WALLET_ADDRESS } from "@/config";
import { useAnalyzeWallet, type AnalysisResult } from "@/hooks/useAnalysis";

const LOADING_MESSAGES = [
  "Fetching Injective wallet data...",
  "Computing risk score...",
  "Generating AI report...",
];

export function WalletAnalyzerView() {
  const searchParams = useSearchParams();
  const initialAddress = searchParams.get("address") ?? "";
  const isDemo = searchParams.get("demo") === "true";

  const [inputAddress, setInputAddress] = useState(
    isDemo ? DEMO_WALLET_ADDRESS : initialAddress
  );
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  const mutation = useAnalyzeWallet();

  const handleAnalyze = () => {
    const addr = inputAddress.trim();
    if (!addr) return;
    setLoadingMsgIndex(0);
    // Cycle through loading messages while pending
    const interval = setInterval(() => {
      setLoadingMsgIndex((i) => {
        if (i < LOADING_MESSAGES.length - 1) return i + 1;
        clearInterval(interval);
        return i;
      });
    }, 2000);
    mutation.mutate(addr, {
      onSettled: () => clearInterval(interval),
    });
  };

  const handleDemo = () => {
    setInputAddress(DEMO_WALLET_ADDRESS);
    setLoadingMsgIndex(0);
    mutation.mutate(DEMO_WALLET_ADDRESS);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text-primary">Wallet Analyzer</h1>
        <p className="text-sm text-text-secondary">
          Paste any Injective wallet address to get AI-powered insights.
        </p>
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
          <Button
            variant="accent"
            onClick={handleAnalyze}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            <Search className="h-4 w-4" /> Analyze Wallet
          </Button>
          <Button
            variant="secondary"
            onClick={handleDemo}
            disabled={mutation.isPending}
          >
            <FlaskConical className="h-4 w-4" /> Try Demo Wallet
          </Button>
        </div>

        {/* Safety note */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Shield className="h-3.5 w-3.5 text-success shrink-0" />
          <p className="text-xs text-text-muted">
            InjSight is a read-only analytics platform. We never access your funds or
            private data.{" "}
            <a href="/security" className="text-accent hover:underline">
              Learn More
            </a>
          </p>
        </div>
      </div>

      {/* Loading */}
      {mutation.isPending && (
        <LoadingState message={LOADING_MESSAGES[loadingMsgIndex]} size="lg" />
      )}

      {/* Error */}
      {mutation.isError && (
        <ErrorState
          title="Analysis Failed"
          message={
            (mutation.error as { response?: { data?: { detail?: string } } })?.response?.data
              ?.detail ?? "Could not analyze this wallet. Please check the address and try again."
          }
          onRetry={handleAnalyze}
        />
      )}

      {/* Results */}
      {mutation.isSuccess && mutation.data && (
        <AnalysisResults data={mutation.data} />
      )}
    </div>
  );
}

function AnalysisResults({ data }: { data: AnalysisResult }) {
  const portfolio = data.portfolio ?? { totalValueUsd: 0, tokenCount: 0, holdings: [] };
  const risk      = data.riskScore;
  const report    = data.aiReport;
  const address   = data.walletAddress;

  return (
    <div className="space-y-6 animate-fade-in">
      {data.dataSource === "injective-demo" && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-muted border border-accent/20 text-xs text-accent">
          <span className="font-bold">Demo Mode</span> — showing representative data with live CoinGecko prices. Enter a real Injective wallet for on-chain data.
        </div>
      )}
      <PortfolioSummary
        address={address}
        totalValueUsd={portfolio.totalValueUsd}
        tokenCount={portfolio.tokenCount}
        riskScore={risk?.score ?? 0}
        riskLevel={risk?.level ?? "Unknown"}
        dataSource={data.dataSource}
        completedAt={data.completedAt}
      />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TokenBalanceTable address={address} holdings={portfolio.holdings} />
          <PortfolioCompositionChart
            address={address}
            holdings={portfolio.holdings}
            totalValueUsd={portfolio.totalValueUsd}
          />
        </div>
        <div className="space-y-6">
          <WalletRiskScore address={address} riskScore={risk} />
          <AiWalletReport address={address} report={report} />
          <SuggestedNextSteps steps={report?.suggestedNextSteps ?? []} />
        </div>
      </div>
      <ReadOnlySafetyMessage />
    </div>
  );
}
