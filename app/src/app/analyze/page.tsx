import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { WalletAnalyzerView } from "@/components/wallet/WalletAnalyzerView";

export const metadata: Metadata = {
  title: "Wallet Analyzer — InjSight AI",
};

export default function AnalyzePage() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <WalletAnalyzerView />
        </main>
      </div>
    </div>
  );
}
