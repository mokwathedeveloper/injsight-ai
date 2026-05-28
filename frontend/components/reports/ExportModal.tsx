"use client";

import * as React from "react";
import { 
  X, 
  Download, 
  Loader2, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormatOption, ExportFormat } from "./FormatOption";
import { cn } from "@/lib/utils";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
  walletAddress?: string;
}

export function ExportModal({ isOpen, onClose, reportTitle, walletAddress }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>("pdf");
  const [selectedScope, setSelectedScope] = React.useState<"snapshot" | "7d" | "30d">("snapshot");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleExport = async () => {
    setIsGenerating(true);
    // Simulate generation time
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsGenerating(false);
    setIsSuccess(true);
    
    // Simulate download
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <Card className="relative w-full max-w-xl p-0 bg-[#0D1117] border-border-strong shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Download size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary tracking-tight">Export Intelligence</h2>
              <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-0.5">
                Data Portability Engine
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Format Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
              Select Export Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormatOption 
                format="pdf" 
                label="Portable Document (PDF)" 
                description="High-fidelity, printable intelligence report with charts."
                isSelected={selectedFormat === "pdf"}
                onClick={() => setSelectedFormat("pdf")}
              />
              <FormatOption 
                format="csv" 
                label="Spreadsheet (CSV)" 
                description="Raw balance and transaction data for Excel/Sheets."
                isSelected={selectedFormat === "csv"}
                onClick={() => setSelectedFormat("csv")}
              />
              <FormatOption 
                format="json" 
                label="Machine Readable (JSON)" 
                description="Complete structured data for developers and APIs."
                isSelected={selectedFormat === "json"}
                onClick={() => setSelectedFormat("json")}
              />
            </div>
          </div>

          {/* Scope Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
              Data Scope
            </label>
            <div className="flex bg-card border border-border rounded-2xl p-1">
               <button 
                 onClick={() => setSelectedScope("snapshot")}
                 className={cn(
                   "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                   selectedScope === "snapshot" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-disabled hover:text-text-primary"
                 )}
               >
                 Latest Snapshot
               </button>
               <button 
                 onClick={() => setSelectedScope("7d")}
                 className={cn(
                   "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                   selectedScope === "7d" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-disabled hover:text-text-primary"
                 )}
               >
                 7D History
               </button>
               <button 
                 onClick={() => setSelectedScope("30d")}
                 className={cn(
                   "flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                   selectedScope === "30d" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-disabled hover:text-text-primary"
                 )}
               >
                 Full Audit Log
               </button>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
            <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-text-secondary leading-relaxed italic">
              All exports are generated locally and contain no private keys or sensitive credentials. 
              Data is sourced directly from the Injective on-chain indexer.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              variant="secondary" 
              onClick={onClose}
              className="flex-1 h-12 font-bold text-xs uppercase tracking-widest border-border-strong"
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleExport}
              disabled={isGenerating}
              className={cn(
                "flex-[2] h-12 font-bold text-xs uppercase tracking-widest transition-all",
                isSuccess ? "bg-success hover:bg-success" : "shadow-lg shadow-primary/20"
              )}
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Generating {selectedFormat.toUpperCase()}...</span>
                </div>
              ) : isSuccess ? (
                <div className="flex items-center gap-2">
                   <CheckCircle2 size={16} className="animate-bounce" />
                   <span>Download Started</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Generate & Download</span>
                  <ArrowRight size={14} />
                </div>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-page p-4 text-[9px] text-text-disabled text-center font-bold border-t border-border uppercase tracking-widest flex items-center justify-center gap-2">
           <Info size={12} />
           <span>Secure & Read-Only Intelligence Export</span>
        </div>
      </Card>
    </div>
  );
}

function CheckCircle2({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
