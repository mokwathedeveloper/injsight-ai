"use client";

import * as React from "react";
import { AnalysisHistoryEntry } from "@/types/analysis-history";
import { Badge } from "@/components/ui/Badge";
import { RiskLevelBadge } from "@/components/wallet/RiskLevelBadge";
import { 
  ChevronRight, 
  ExternalLink, 
  Trash2, 
  Share2, 
  MoreHorizontal,
  Loader2,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AnalysisHistoryRowProps {
  entry: AnalysisHistoryEntry;
  onDelete?: (id: string) => void;
  onShare?: (entry: AnalysisHistoryEntry) => void;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function AnalysisHistoryRow({ entry, onDelete, onShare, isSelected, onSelect }: AnalysisHistoryRowProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const date = new Date(entry.timestamp);

  const getStatusIcon = () => {
    switch (entry.status) {
      case "processing": return <Loader2 size={14} className="text-primary animate-spin" />;
      case "failed": return <AlertCircle size={14} className="text-error" />;
      default: return <CheckCircle2 size={14} className="text-success" />;
    }
  };

  return (
    <div className={cn(
      "group flex items-center p-4 hover:bg-hover transition-colors border-b border-border/50 last:border-0 relative",
      isSelected && "bg-primary/[0.03]"
    )}>
      {/* Selector */}
      <div className="w-10 flex items-center justify-center shrink-0">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onSelect?.(entry.id)}
          className="w-4 h-4 rounded border-border/50 bg-hover/20 text-primary focus:ring-primary/40 focus:ring-offset-0"
        />
      </div>

      {/* Wallet Info */}
      <div className="flex-[2] flex items-center gap-3 min-w-[200px]">
        <div className={cn(
          "w-10 h-10 rounded-xl bg-hover border border-border flex items-center justify-center transition-colors group-hover:border-primary/50",
          entry.status === 'failed' && "border-error/30"
        )}>
          {getStatusIcon()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text-primary truncate">
              {entry.label || "Untitled Analysis"}
            </span>
            <Badge variant="secondary" className="text-[8px] py-0 px-1 font-mono uppercase">
              {entry.status}
            </Badge>
          </div>
          <p className="text-[10px] font-mono text-text-disabled truncate mt-0.5">
            {entry.address}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex-1 min-w-[120px] hidden sm:block">
        <div className="text-xs font-bold text-text-primary">
          {date.toLocaleDateString()}
        </div>
        <div className="text-[10px] text-text-disabled uppercase mt-0.5">
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Risk Score */}
      <div className="flex-1 min-w-[120px] hidden md:block">
        <div className="flex items-center gap-2">
          <RiskLevelBadge level={entry.riskLevel} className="scale-90 origin-left" />
          <span className="text-xs font-bold font-mono text-text-primary">
            {entry.riskScore}
          </span>
        </div>
      </div>

      {/* Portfolio Value */}
      <div className="flex-1 min-w-[120px] text-right hidden lg:block">
        <div className="text-sm font-bold text-text-primary font-mono">
          ${entry.totalValueUsd.toLocaleString()}
        </div>
        <div className="text-[9px] text-text-disabled font-bold uppercase tracking-tighter mt-0.5">
          Portfolio Value
        </div>
      </div>

      {/* Actions */}
      <div className="w-24 flex items-center justify-end gap-2 pr-2">
        <Link href={`/analyze?address=${entry.address}`} className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-primary transition-colors">
          <ExternalLink size={16} />
        </Link>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-[#161B22] border border-border-strong rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button 
                  onClick={() => {
                    onShare?.(entry);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs text-text-secondary hover:text-text-primary hover:bg-hover transition-colors"
                >
                  <Share2 size={14} />
                  <span>Share Report</span>
                </button>
                <div className="border-t border-border/50" />
                <button 
                  onClick={() => {
                    onDelete?.(entry.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs text-error hover:bg-error/10 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Delete Record</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
