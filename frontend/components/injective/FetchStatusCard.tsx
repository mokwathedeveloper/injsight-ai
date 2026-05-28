import * as React from "react";
import { Card } from "@/components/ui/Card";
import { DataSourceBadge } from "@/components/dashboard/DataSourceBadge";
import { FetchStatus } from "@/types/injective";
import { Loader2, CheckCircle2, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface FetchStatusCardProps {
  status: FetchStatus;
  source?: string;
  lastSync?: string;
}

const STAGES = [
  "Connecting to Injective indexer",
  "Fetching wallet balances",
  "Normalizing token metadata",
  "Enriching with market prices",
];

export function FetchStatusCard({ status, source = "injective-indexer", lastSync = "Just now" }: FetchStatusCardProps) {
  return (
    <Card className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-xl", status === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary")}>
          {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : status === "success" ? <CheckCircle2 size={18} /> : <Database size={18} />}
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary">
            {status === "loading" ? STAGES[0] + "…" : status === "success" ? "Wallet data synced" : "Awaiting data fetch"}
          </p>
          <p className="text-[11px] text-text-secondary">Read-only · public chain data only</p>
        </div>
      </div>
      <DataSourceBadge source={source} lastAnalyzed={lastSync} />
    </Card>
  );
}
