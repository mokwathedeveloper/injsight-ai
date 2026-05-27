import * as React from "react";
import { RecentAnalysis } from "@/types/user-dashboard";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RecentAnalysisTableProps {
  data: RecentAnalysis[];
}

export function RecentAnalysisTable({ data }: RecentAnalysisTableProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Recent Analyses</h3>
        <Link href="/dashboard/history" className="text-[10px] font-bold text-primary uppercase hover:underline">
          View All
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/50">
          {data.map((item) => (
            <Link 
              key={item.id} 
              href={`/dashboard/wallets/${item.id}`}
              className="flex items-center justify-between p-4 hover:bg-hover transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg border",
                  item.riskScore < 30 ? "bg-success/10 border-success/20 text-success" :
                  item.riskScore < 60 ? "bg-warning/10 border-warning/20 text-warning" :
                  "bg-error/10 border-error/20 text-error"
                )}>
                  <Shield size={16} />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
                    {item.address}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-text-disabled font-medium">
                    <Clock size={10} />
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-right flex items-center gap-4">
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-text-primary">
                    ${(item.totalValue / 1000).toFixed(1)}k
                  </div>
                  <div className="text-[10px] text-text-disabled">Portfolio Value</div>
                </div>
                <ChevronRight size={14} className="text-text-disabled group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {data.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-text-disabled text-sm">No recent analyses found.</p>
        </div>
      )}
    </Card>
  );
}
