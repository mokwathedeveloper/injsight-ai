"use client";

import * as React from "react";
import { Search, Filter, ShieldAlert, TrendingUp, Lock, Bell } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertFilters, AlertType, AlertSeverity } from "@/types/alerts";
import { cn } from "@/lib/utils";

interface AlertFilterBarProps {
  filters: AlertFilters;
  onFilterChange: (filters: AlertFilters) => void;
}

export function AlertFilterBar({ filters, onFilterChange }: AlertFilterBarProps) {
  const types: { value: AlertType | "all"; label: string; icon: any }[] = [
    { value: "all", label: "All", icon: Bell },
    { value: "risk", label: "Risk", icon: ShieldAlert },
    { value: "yield", label: "Yield", icon: TrendingUp },
    { value: "security", label: "Security", icon: Lock },
  ];

  const severities: { value: AlertSeverity | "all"; label: string }[] = [
    { value: "all", label: "All Levels" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
        <Input 
          placeholder="Search by alert title or message..." 
          className="h-12 pl-11 bg-card border-border-strong text-sm"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Filters Group */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-card border border-border-strong rounded-xl p-1 h-12">
          {types.map((t) => {
            const Icon = t.icon;
            return (
              <button 
                key={t.value}
                onClick={() => onFilterChange({ ...filters, type: t.value })}
                className={cn(
                  "flex items-center gap-2 px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  filters.type === t.value 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-text-disabled hover:text-text-primary"
                )}
              >
                <Icon size={12} className={cn(filters.type === t.value ? "text-white" : "text-text-disabled")} />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex bg-card border border-border-strong rounded-xl p-1 h-12">
          {["unread", "all"].map((state) => (
            <button 
              key={state}
              onClick={() => onFilterChange({ ...filters, isRead: state === "unread" ? false : "all" })}
              className={cn(
                "px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                (state === "unread" && filters.isRead === false) || (state === "all" && filters.isRead === "all")
                  ? "bg-hover text-text-primary border border-border-strong shadow-sm" 
                  : "text-text-disabled hover:text-text-primary"
              )}
            >
              {state}
            </button>
          ))}
        </div>

        <Button variant="secondary" className="h-12 px-5 gap-2 border-border-strong">
          <Filter size={18} className="text-text-disabled" />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">More Filters</span>
        </Button>
      </div>
    </div>
  );
}
