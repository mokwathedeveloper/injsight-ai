"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletAnalyzerForm } from "@/components/analyzer/WalletAnalyzerForm";
import { AnalysisLoadingState } from "@/components/analyzer/AnalysisLoadingState";
import { WalletReport } from "@/components/analyzer/WalletReport";
import { EmptyAnalyzerState } from "@/components/analyzer/EmptyAnalyzerState";
import { ReadOnlySafetyNotice } from "@/components/analyzer/ReadOnlySafetyNotice";
import { mockAnalysisResult } from "@/data/wallet-analyzer";

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<typeof mockAnalysisResult | null>(null);

  const handleAnalyze = (addr: string) => {
    setIsLoading(true);
    setResult(null);

    // Simulate analysis delay with staged messages
    setTimeout(() => {
      setIsLoading(false);
      setResult({
        ...mockAnalysisResult,
        address: addr,
      });
    }, 6000);
  };

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
