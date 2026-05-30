import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WalletAnalyzerView } from "@/components/wallet/WalletAnalyzerView";
import { LoadingState } from "@/components/ui";

export const metadata: Metadata = {
  title: "Wallet Analyzer — InjSight AI",
};

export default function AnalyzePage() {
  return (
    <DashboardLayout>
      {/* Suspense required because WalletAnalyzerView uses useSearchParams() */}
      <Suspense fallback={<LoadingState message="Loading analyzer..." size="lg" />}>
        <WalletAnalyzerView />
      </Suspense>
    </DashboardLayout>
  );
}
