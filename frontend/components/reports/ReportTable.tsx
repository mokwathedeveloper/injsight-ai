"use client";

import * as React from "react";
import { AIReportHubEntry } from "@/types/reports";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RiskLevelBadge } from "@/components/wallet/RiskLevelBadge";
import { 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  MoreVertical,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ReportTableProps {
  reports: AIReportHubEntry[];
  onDelete?: (id: string) => void;
  onExport?: (report: AIReportHubEntry) => void;
  onShare?: (report: AIReportHubEntry) => void;
}

export function ReportTable({ reports, onDelete, onExport, onShare }: ReportTableProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-hover/10 border-b border-border/50">
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Report Title</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Wallet Address</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Risk</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em]">Status</th>
              <th className="px-6 py-4 text-[9px] font-bold text-text-disabled uppercase tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {reports.map((report) => (
              <tr key={report.id} className="group hover:bg-hover/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <FileText size={18} />
                    </div>
                    <div>
                      <Link href={`/dashboard/reports/${report.id}`}>
                        <div className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors cursor-pointer">
                          {report.title}
                        </div>
                      </Link>
                      <div className="text-[10px] text-text-disabled mt-0.5">
                        Generated {new Date(report.dateGenerated).toLocaleDateString()} • {report.sizeKb}kb
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                   <div className="space-y-1">
                      <div className="text-xs font-bold text-text-secondary">{report.walletLabel || "Untracked Wallet"}</div>
                      <code className="text-[10px] font-mono text-text-disabled">{report.walletAddress}</code>
                   </div>
                </td>
                <td className="px-6 py-5">
                  <RiskLevelBadge level={report.riskLevel} className="scale-90 origin-left" />
                </td>
                <td className="px-6 py-5">
                  {report.status === "processing" ? (
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 size={12} className="animate-spin" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Processing</span>
                    </div>
                  ) : report.status === "failed" ? (
                    <div className="flex items-center gap-2 text-error">
                      <AlertCircle size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Failed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Ready</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/reports/${report.id}`}>
                      <button className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-primary transition-colors" title="View Report">
                        <Eye size={16} />
                      </button>
                    </Link>
                    <button 
                      className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-primary transition-colors" 
                      title="Share"
                      onClick={() => onShare?.(report)}
                    >
                      <Share2 size={16} />
                    </button>
                    <button 
                      className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors" 
                      title="Download"
                      onClick={() => onExport?.(report)}
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete?.(report.id)}
                      className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-error transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reports.length === 0 && (
          <div className="py-32 text-center space-y-4">
             <div className="w-16 h-16 bg-hover rounded-full flex items-center justify-center mx-auto border border-border">
                <FileText size={24} className="text-text-disabled" />
             </div>
             <p className="text-text-secondary text-sm">No intelligence reports found.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
