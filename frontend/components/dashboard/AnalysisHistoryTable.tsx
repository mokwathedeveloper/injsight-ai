"use client";

import * as React from "react";
import { AnalysisHistoryEntry } from "@/types/analysis-history";
import { AnalysisHistoryRow } from "./AnalysisHistoryRow";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Search, Filter, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AnalysisHistoryTableProps {
  entries: AnalysisHistoryEntry[];
  onDelete?: (id: string) => void;
  className?: string;
}

export function AnalysisHistoryTable({ entries, onDelete, className }: AnalysisHistoryTableProps) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === entries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(entries.map(e => e.id)));
    }
  };

  return (
    <Card className={cn("p-0 border-border bg-card overflow-hidden", className)}>
      {/* Table Header / Selection Bar */}
      <div className={cn(
        "p-4 border-b border-border transition-colors",
        selectedIds.size > 0 ? "bg-primary/5" : "bg-hover/10"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={entries.length > 0 && selectedIds.size === entries.length}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-border/50 bg-hover/20 text-primary focus:ring-primary/40 focus:ring-offset-0"
              />
            </div>
            {selectedIds.size > 0 ? (
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  {selectedIds.size} Selected
                </span>
                <div className="h-4 w-px bg-border-strong" />
                <div className="flex items-center gap-2">
                   <Button variant="secondary" size="sm" className="h-8 px-3 text-[10px] uppercase font-bold border-border-strong">
                      <Download size={12} className="mr-2" />
                      Export Reports
                   </Button>
                   <Button variant="secondary" size="sm" className="h-8 px-3 text-[10px] uppercase font-bold border-border-strong text-error hover:bg-error/10 hover:border-error/20">
                      <Trash2 size={12} className="mr-2" />
                      Delete
                   </Button>
                </div>
              </div>
            ) : (
              <h3 className="text-xs font-bold text-text-disabled uppercase tracking-[0.2em]">
                Analysis History Log
              </h3>
            )}
          </div>
          <div className="text-[10px] text-text-disabled font-medium px-4">
            {entries.length} Total Records
          </div>
        </div>
      </div>

      {/* Column Labels */}
      <div className="flex items-center px-4 py-3 bg-hover/20 border-b border-border/50 text-[9px] font-bold text-text-disabled uppercase tracking-widest">
        <div className="w-10 shrink-0" />
        <div className="flex-[2] min-w-[200px]">Wallet & Status</div>
        <div className="flex-1 min-w-[120px] hidden sm:block">Analysis Date</div>
        <div className="flex-1 min-w-[120px] hidden md:block">Risk Assessment</div>
        <div className="flex-1 min-w-[120px] text-right hidden lg:block pr-4">Holdings Value</div>
        <div className="w-24 text-right pr-4">Actions</div>
      </div>

      {/* Body */}
      <div className="divide-y divide-border/30 overflow-x-auto">
        {entries.map((entry) => (
          <AnalysisHistoryRow 
            key={entry.id} 
            entry={entry} 
            onDelete={onDelete}
            isSelected={selectedIds.has(entry.id)}
            onSelect={handleSelect}
          />
        ))}

        {entries.length === 0 && (
          <div className="py-32 text-center space-y-4">
             <div className="w-16 h-16 bg-hover rounded-full flex items-center justify-center mx-auto border border-border">
                <Filter size={24} className="text-text-disabled" />
             </div>
             <p className="text-text-secondary text-sm">No analysis records found.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-hover/10 border-t border-border/50 flex items-center justify-center">
        <button className="text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-primary transition-colors">
          Load More Records
        </button>
      </div>
    </Card>
  );
}
