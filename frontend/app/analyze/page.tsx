"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletAnalyzerForm } from "@/components/analyzer/WalletAnalyzerForm";
import { AnalysisLoadingState } from "@/components/analyzer/AnalysisLoadingState";
import { WalletReport } from "@/components/analyzer/WalletReport";
import { EmptyAnalyzerState } from "@/components/analyzer/EmptyAnalyzerState";
import { ReadOnlySafetyNotice } from "@/components/analyzer/ReadOnlySafetyNotice";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { mockAnalysisResult } from "@/data/wallet-analyzer";
import { useWalletAnalysis } from "@/hooks/useWalletAnalysis";
import type { WalletAnalysisResult } from "@/types/wallet-analyzer";

export default function AnalyzePage() {
  const [result, setResult] = React.useState<WalletAnalysisResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const analysis = useWalletAnalysis();

  const handleAnalyze = async (addr: string) => {
    setResult(null);
    setError(null);
    try {
      // Live backend call (FastAPI). Real risk score + AI report.
      const data = await analysis.mutateAsync(addr);
      setResult(data);
    } catch (err: any) {
      if (err?.code === "INVALID_WALLET") {
        // Surface real server-side validation.
        setError(err.message);
      } else {
        // Backend unreachable (e.g. API not running): fall back to mock so the
        // demo still works, and tell the user it's sample data.
        setError("Live API unavailable — showing sample data.");
        setResult({ ...mockAnalysisResult, address: addr });
      }
    }
  };

  const isLoading = analysis.isPending;

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
              Wallet <span className="text-primary">Analyzer</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Get deep intelligence on any Injective address. AI-powered risk scoring, 
              portfolio breakdown, and security insights.
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <WalletAnalyzerForm onAnalyze={handleAnalyze} isLoading={isLoading} />
            {error && (
              <div className="max-w-3xl mx-auto">
                <ErrorBanner message={error} onClose={() => setError(null)} />
              </div>
            )}
            <ReadOnlySafetyNotice />
          </div>

          {/* Result / Loading Section */}
          <div className="pt-8 min-h-[400px]">
            {isLoading ? (
              <AnalysisLoadingState />
            ) : result ? (
              <WalletReport data={result} />
            ) : (
              <EmptyAnalyzerState />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
