import * as React from "react";
import { FileText, Database, Table, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExportFormat = "pdf" | "json" | "csv";

interface FormatOptionProps {
  format: ExportFormat;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const ICON_MAP = {
  pdf: FileText,
  json: Database,
  csv: Table,
};

export function FormatOption({ format, label, description, isSelected, onClick }: FormatOptionProps) {
  const Icon = ICON_MAP[format];

  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer group",
        isSelected 
          ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(0,102,255,0.1)]" 
          : "bg-hover/10 border-border hover:border-border-strong hover:bg-hover/20"
      )}
    >
      <div className={cn(
        "p-3 rounded-xl shrink-0 transition-colors",
        isSelected ? "bg-primary text-white" : "bg-hover text-text-disabled group-hover:text-text-secondary"
      )}>
        <Icon size={20} />
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn(
            "text-sm font-bold transition-colors",
            isSelected ? "text-primary" : "text-text-primary"
          )}>
            {label}
          </p>
          {isSelected && (
            <div className="bg-primary rounded-full p-0.5">
               <Check size={10} className="text-white" />
            </div>
          )}
        </div>
        <p className="text-[10px] text-text-secondary leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
