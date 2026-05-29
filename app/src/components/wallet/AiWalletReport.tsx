"use client";

import { Brain, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

const MOCK_REPORT = {
  summary: "This wallet holds a well-structured Injective DeFi portfolio worth $248,450. The INJ concentration at 42.1% is slightly elevated. No urgent action required, but diversification could reduce single-asset risk.",
  analyzedAt: "May 29, 2025",
  address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh",
};

export function AiWalletReport({ address }: { address: string }) {
  return (
    <div className="glass-card p-5 border-accent/20">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-accent-muted">
          <Brain className="h-3.5 w-3.5 text-accent" />
        </div>
        <span className="text-sm font-semibold text-text-primary">AI Summary</span>
        <span className="ml-auto badge-success">Ready</span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed mb-4">
        {MOCK_REPORT.summary}
      </p>

      <div className="text-[10px] text-text-muted mb-3 flex items-center gap-1">
        <span>Analyzed:</span>
        <span className="font-mono">{MOCK_REPORT.address.slice(0, 18)}...</span>
        <span>·</span>
        <span>{MOCK_REPORT.analyzedAt}</span>
      </div>

      <Button variant="accent" size="sm" className="w-full" asChild>
        <Link href={`/analyze/report?address=${address}`}>
          <FileText className="h-3.5 w-3.5" /> View Full AI Report
        </Link>
      </Button>
    </div>
  );
}
