import * as React from "react";
import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ 
  label, 
  value, 
  subValue, 
  icon: Icon, 
  trend, 
  className 
}: StatCardProps) {
  return (
    <Card className={cn("p-5 bg-card border-border flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
          {label}
        </span>
        {Icon && (
          <div className="p-2 bg-hover rounded-lg border border-border">
            <Icon size={14} className="text-text-secondary" />
          </div>
        )}
      </div>
      
      <div className="mt-3 space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-text-primary tracking-tight">
            {value}
          </span>
          {trend && (
            <span className={cn(
              "text-xs font-bold",
              trend.isPositive ? "text-success" : "text-error"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </span>
          )}
        </div>
        {subValue && (
          <p className="text-[10px] text-text-disabled font-medium uppercase tracking-tight">
            {subValue}
          </p>
        )}
      </div>
    </Card>
  );
}
