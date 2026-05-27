"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { AnalysisHistoryTable } from "@/components/dashboard/AnalysisHistoryTable";
import { AnalysisHistoryToolbar } from "@/components/dashboard/AnalysisHistoryToolbar";
import { MOCK_ANALYSIS_HISTORY } from "@/data/analysis-history-mock";
import { AnalysisHistoryFilters } from "@/types/analysis-history";
import { History, Shield, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HistoryPage() {
  const [entries, setEntries] = React.useState(MOCK_ANALYSIS_HISTORY);
  const [filters, setFilters] = React.useState<AnalysisHistoryFilters>({
    search: "",
    riskLevel: "All",
    dateRange: "all",
  });

  const filteredEntries = React.useMemo(() => {
    return entries.filter(entry => {
      const matchesSearch = !filters.search || 
        entry.address.toLowerCase().includes(filters.search.toLowerCase()) ||
        entry.label?.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRisk = filters.riskLevel === "All" || entry.riskLevel === filters.riskLevel;
      
      return matchesSearch && matchesRisk;
    });
  }, [entries, filters]);

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <History size={20} />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Analysis <span className="text-primary">History</span>
              </h1>
            </div>
            <p className="text-text-secondary text-sm">
              Your comprehensive audit log of every wallet intelligence report generated.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="h-12 px-6 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest">
              <FileText size={18} className="text-text-disabled" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <AnalysisHistoryToolbar 
          filters={filters} 
          onFilterChange={setFilters} 
        />

        {/* History Log */}
        <div className="space-y-4">
          <AnalysisHistoryTable 
            entries={filteredEntries} 
            onDelete={handleDeleteEntry}
          />
          
          <div className="p-6 bg-hover/10 border border-border/50 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-accent/10 rounded-lg text-accent shrink-0">
               <Shield size={18} />
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Data Retention Policy</p>
               <p className="text-[10px] text-text-secondary leading-relaxed">
                 Free plan accounts retain 30 days of analysis history. <strong>Pro Plan</strong> users get 
                 unlimited historical retention and priority report re-generation.
               </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
