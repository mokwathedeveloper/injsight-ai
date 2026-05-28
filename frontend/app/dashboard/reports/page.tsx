"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { ReportTable } from "@/components/reports/ReportTable";
import { ReportFilters } from "@/components/reports/ReportFilters";
import { StatCard } from "@/components/dashboard/StatCard";
import { ExportModal } from "@/components/reports/ExportModal";
import { MOCK_REPORTS, MOCK_REPORT_HUB_STATS } from "@/data/reports-mock";
import { AIReportHubEntry } from "@/types/reports";
import { FileText, ShieldAlert, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ReportsPage() {
  const [reports, setReports] = React.useState(MOCK_REPORTS);
  const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);
  const [selectedReport, setSelectedReport] = React.useState<AIReportHubEntry | undefined>(undefined);
  const stats = MOCK_REPORT_HUB_STATS;

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const handleOpenExport = (report?: AIReportHubEntry) => {
    setSelectedReport(report);
    setIsExportModalOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Intelligence <span className="text-primary">Reports</span>
            </h1>
            <p className="text-text-secondary text-sm">
              Your centralized repository for all AI-generated wallet audits and deep-dives.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              className="h-12 px-6 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest"
              onClick={() => handleOpenExport()}
            >
              <Download size={18} className="text-text-disabled" />
              <span>Bulk Export</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            label="Total Reports"
            value={stats.totalReports}
            icon={FileText}
            subValue="Historical Archive"
          />
          <StatCard 
            label="High Risk Flagged"
            value={stats.highRiskReports}
            icon={ShieldAlert}
            trend={{ value: 12, isPositive: false }}
            subValue="Critical Findings"
          />
          <StatCard 
            label="Successful Exports"
            value={stats.totalExports}
            icon={Download}
            subValue="CSV/PDF/JSON"
          />
          <StatCard 
            label="Last Audit"
            value={stats.lastGenerated}
            icon={Clock}
            subValue="Recent Generation"
          />
        </div>

        {/* Toolbar */}
        <ReportFilters />

        {/* Reports Hub */}
        <div className="space-y-4">
          <ReportTable 
            reports={reports} 
            onDelete={handleDeleteReport} 
            onExport={handleOpenExport}
          />
          
          <div className="p-6 bg-hover/10 border border-border/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 flex-1">
               <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Premium Intelligence</p>
               <p className="text-[10px] text-text-secondary leading-relaxed">
                 Need more detailed reports or weekly automated audits? <strong>Upgrade to Pro</strong> for 
                 unlimited exports and deep-chain historical analysis.
               </p>
            </div>
            <Button variant="primary" className="h-10 px-8 text-[10px] font-bold uppercase tracking-widest shrink-0">
               Upgrade Plan
            </Button>
          </div>
        </div>
      </div>

      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        reportTitle={selectedReport?.title}
        walletAddress={selectedReport?.walletAddress}
      />
    </AppShell>
  );
}
