"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoWalletSelector } from "@/components/demo/DemoWalletSelector";
import { DemoAnalysisLoadingState } from "@/components/demo/DemoAnalysisLoadingState";
import { DemoWalletReport } from "@/components/demo/DemoWalletReport";
import { ReadOnlySafetyNotice } from "@/components/analyzer/ReadOnlySafetyNotice";
import { DemoWallet } from "@/types/demo-wallets";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const [selectedWallet, setSelectedWallet] = React.useState<DemoWallet | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showReport, setShowReport] = React.useState(false);

  const handleSelectWallet = (wallet: DemoWallet) => {
    setSelectedWallet(wallet);
  };

  const handleStartDemo = () => {
    if (!selectedWallet) return;
    setIsLoading(true);
    setShowReport(false);

    // Simulate analysis delay
    setTimeout(() => {
      setIsLoading(false);
      setShowReport(true);
    }, 4000);
  };

  const handleReset = () => {
    setSelectedWallet(null);
    setShowReport(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary tracking-tight">
              Demo <span className="text-primary">Wallet Mode</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Explore InjSight AI using sample portfolios. See how we analyze risk, 
              provide AI insights, and visualize Injective assets.
            </p>
          </div>

          {!showReport && !isLoading && (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
              <DemoWalletSelector 
                onSelect={handleSelectWallet} 
                selectedWalletId={selectedWallet?.id} 
              />
              
              <div className="flex flex-col items-center space-y-6">
                <Button 
                  size="lg" 
                  className="px-12 h-14 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                  disabled={!selectedWallet}
                  onClick={handleStartDemo}
                >
                  Analyze Demo Wallet
                </Button>
                
                <Link href="/analyze" className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center space-x-2">
                  <ArrowLeft size={14} />
                  <span>Back to Real Analyzer</span>
                </Link>
              </div>
              
              <ReadOnlySafetyNotice />
            </div>
          )}

          {isLoading && <DemoAnalysisLoadingState />}

          {showReport && selectedWallet && (
            <div className="space-y-8">
              <div className="flex justify-start">
                <button 
                  onClick={handleReset}
                  className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center space-x-2 group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Choose Different Demo Wallet</span>
                </button>
              </div>
              <DemoWalletReport data={selectedWallet.data} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
