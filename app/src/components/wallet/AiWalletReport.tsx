"use client";

import { Brain, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import type { AnalysisResult } from "@/hooks/useAnalysis";

interface Props {
  address: string;
  report: AnalysisResult["aiReport"] | null;
}

export function AiWalletReport({ address, report }: Props) {
  if (!report) return null;

  return (
    <div className="glass-card p-5 border-accent/20">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-accent-muted">
          <Brain className="h-3.5 w-3.5 text-accent" />
        </div>
        <span className="text-sm font-semibold text-text-primary">AI Summary</span>
        <span className="ml-auto badge-success">Ready</span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed mb-3">{report.summary}</p>

      {report.riskExplanation && (
        <div className="border-l-2 border-accent/30 pl-3 mb-3">
          <p className="text-xs text-text-muted leading-relaxed">{report.riskExplanation}</p>
        </div>
      )}

      {report.concentrationAnalysis && (
        <p className="text-[11px] text-text-muted leading-relaxed mb-3 italic">
          {report.concentrationAnalysis}
        </p>
      )}

      <p className="text-[10px] font-mono text-text-muted mb-3 truncate">
        {address.slice(0, 24)}...
      </p>

      <Button variant="accent" size="sm" className="w-full" asChild>
        <Link href={`/dashboard/reports?address=${encodeURIComponent(address)}`}>
          <FileText className="h-3.5 w-3.5" /> View Full AI Report
        </Link>
      </Button>

      {report.disclaimer && (
        <p className="text-[10px] text-text-muted mt-3 leading-relaxed">{report.disclaimer}</p>
      )}
    </div>
  );
}
