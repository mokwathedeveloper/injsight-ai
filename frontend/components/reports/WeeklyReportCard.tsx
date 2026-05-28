import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { WeeklyReport } from "@/types/weekly-reports";
import { TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function WeeklyReportCard({ report }: { report: WeeklyReport }) {
  const valueUp = report.valueChangePct >= 0;
  const riskUp = report.riskDelta > 0;

  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">Weekly Summary</p>
          <h3 className="text-base font-bold text-text-primary mt-1">{report.weekOf}</h3>
        </div>
        <Badge variant="secondary">{report.walletCount} wallets</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl border border-border bg-hover/20">
          <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest">Value change</p>
          <p className={cn("text-lg font-bold flex items-center gap-1 mt-1", valueUp ? "text-success" : "text-error")}>
            {valueUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {valueUp ? "+" : ""}{report.valueChangePct}%
          </p>
        </div>
        <div className="p-3 rounded-xl border border-border bg-hover/20">
          <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest">Risk delta</p>
          <p className={cn("text-lg font-bold flex items-center gap-1 mt-1", riskUp ? "text-error" : "text-success")}>
            {riskUp ? "+" : ""}{report.riskDelta} pts
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        {report.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
            <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
