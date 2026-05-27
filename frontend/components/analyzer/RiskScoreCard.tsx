import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { cn } from "@/lib/utils";

interface RiskScoreCardProps {
  data: WalletAnalysisResult;
}

export function RiskScoreCard({ data }: RiskScoreCardProps) {
  const circumference = 358;
  const offset = circumference - (data.riskScore / 100) * circumference;

  return (
    <Card className="p-6 bg-card border-border flex flex-col items-center text-center space-y-8">
      <div className="w-full flex items-center justify-start space-x-2 text-text-secondary">
        <span className="text-sm font-bold uppercase tracking-wider">Overall Risk Score</span>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border-[12px] border-border flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-text-primary">{data.riskScore}</span>
          <span className={cn(
            "text-[10px] font-extrabold uppercase tracking-[0.2em]",
            data.riskLevel === "High" || data.riskLevel === "Very High" ? "text-error" : 
            data.riskLevel === "Moderate" ? "text-warning" : "text-success"
          )}>
            {data.riskLevel} Risk
          </span>
        </div>
        
        <svg className="absolute w-40 h-40 -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="74"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(
              "transition-all duration-1000 ease-out",
              data.riskLevel === "High" || data.riskLevel === "Very High" ? "text-error" : 
              data.riskLevel === "Moderate" ? "text-warning" : "text-success"
            )}
          />
        </svg>

        <div className={cn(
          "absolute inset-0 blur-3xl opacity-10 -z-10 rounded-full",
          data.riskLevel === "High" || data.riskLevel === "Very High" ? "bg-error" : 
          data.riskLevel === "Moderate" ? "bg-warning" : "bg-success"
        )} />
      </div>

      <div className="w-full space-y-4 pt-2">
        {data.riskFactors.map((factor) => (
          <div key={factor.label} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-text-secondary">
              <span>{factor.label}</span>
              <span className={cn(
                factor.status === "error" ? "text-error" : 
                factor.status === "warning" ? "text-warning" : "text-success"
              )}>{factor.score}/100</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-1000",
                  factor.status === "error" ? "bg-error" : 
                  factor.status === "warning" ? "bg-warning" : "bg-success"
                )} 
                style={{ width: `${factor.score}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
