import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WeeklyReport } from "@/types/weekly-reports";
import { Mail } from "lucide-react";

export function EmailPreview({ report }: { report: WeeklyReport }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-border flex items-center gap-2 bg-hover/20">
        <Mail size={14} className="text-primary" />
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Email Preview</h3>
      </div>
      <div className="p-6 space-y-4 bg-page/40">
        <div className="space-y-1">
          <p className="text-[11px] text-text-disabled">From: InjSight AI &lt;reports@injsight.ai&gt;</p>
          <p className="text-sm font-bold text-text-primary">Your weekly wallet intelligence — {report.weekOf}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-sm text-text-secondary leading-relaxed">
            Here&apos;s how your {report.walletCount} tracked wallets performed this week. Portfolio value moved{" "}
            <span className="font-bold text-text-primary">{report.valueChangePct >= 0 ? "+" : ""}{report.valueChangePct}%</span>.
          </p>
          <ul className="space-y-1.5">
            {report.highlights.map((h, i) => (
              <li key={i} className="text-xs text-text-secondary leading-relaxed">• {h}</li>
            ))}
          </ul>
          <p className="text-[10px] text-text-disabled italic pt-2 border-t border-border/50">
            Informational only — not financial advice. InjSight AI is read-only and non-custodial.
          </p>
        </div>
      </div>
    </Card>
  );
}
