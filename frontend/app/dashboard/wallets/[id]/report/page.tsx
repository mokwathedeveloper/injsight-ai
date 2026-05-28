"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { AIWalletSummary } from "@/components/report/AIWalletSummary";
import { AIRiskExplanation } from "@/components/report/AIRiskExplanation";
import { AIConcentrationAnalysis } from "@/components/report/AIConcentrationAnalysis";
import { AISuggestedSteps } from "@/components/report/AISuggestedSteps";
import { AIReportDisclaimer } from "@/components/report/AIReportDisclaimer";
import { MOCK_AI_REPORT } from "@/data/ai-report-mock";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function WalletAIReportPage({ params }: { params: { id: string } }) {
  const report = MOCK_AI_REPORT;

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700 max-w-4xl">
        <Link href={`/dashboard/wallets/${params.id}`} className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Wallet</span>
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              AI Wallet <span className="text-primary">Report</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Plain-English intelligence: summary, risk, concentration, and next steps.</p>
        </div>

        <AIWalletSummary data={report.summary} />
        <AIRiskExplanation data={report.risk} />
        <AIConcentrationAnalysis data={report.concentration} />
        <AISuggestedSteps steps={report.nextSteps} />
        <AIReportDisclaimer />
      </div>
    </AppShell>
  );
}
