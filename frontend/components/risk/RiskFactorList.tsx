import * as React from "react";
import { RiskDimension } from "@/types/risk-score";
import { cn } from "@/lib/utils";

interface RiskFactorListProps {
  dimensions: RiskDimension[];
}

export function RiskFactorList({ dimensions }: RiskFactorListProps) {
  return (
    <div className="space-y-5">
      {dimensions.map((dim) => (
        <div key={dim.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-primary tracking-tight">
              {dim.label}
            </span>
            <span className={cn("text-xs font-bold font-mono", {
              "text-success": dim.status === "success",
              "text-warning": dim.status === "warning",
              "text-error": dim.status === "error"
            })}>
              {dim.score}/100
            </span>
          </div>
          
          <div className="w-full h-1.5 bg-hover rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-1000 ease-out", {
                "bg-success": dim.status === "success",
                "bg-warning": dim.status === "warning",
                "bg-error": dim.status === "error"
              })} 
              style={{ width: `${dim.score}%` }} 
            />
          </div>
          
          <p className="text-[10px] text-text-disabled leading-normal">
            {dim.description}
          </p>
        </div>
      ))}
    </div>
  );
}
