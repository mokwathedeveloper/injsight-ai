"use client";

import * as React from "react";
import { Search, Filter, Calendar, Shield } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AnalysisHistoryFilters } from "@/types/analysis-history";

interface AnalysisHistoryToolbarProps {
  filters: AnalysisHistoryFilters;
  onFilterChange: (filters: AnalysisHistoryFilters) => void;
}

export function AnalysisHistoryToolbar({ filters, onFilterChange }: AnalysisHistoryToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
        <Input 
          placeholder="Search by wallet address or label..." 
          className="h-12 pl-11 bg-card border-border-strong text-sm"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      {/* Filters Group */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-card border border-border-strong rounded-xl p-1 h-12">
          <button 
            onClick={() => onFilterChange({ ...filters, riskLevel: "All" })}
            className={`px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filters.riskLevel === "All" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-disabled hover:text-text-primary"}`}
          >
            All Risk
          </button>
          <button 
            onClick={() => onFilterChange({ ...filters, riskLevel: "High" })}
            className={`px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filters.riskLevel === "High" ? "bg-error/20 text-error border border-error/30" : "text-text-disabled hover:text-text-primary"}`}
          >
            High
          </button>
        </div>

        <div className="flex bg-card border border-border-strong rounded-xl p-1 h-12">
          {["7d", "30d", "all"].map((range) => (
            <button 
              key={range}
              onClick={() => onFilterChange({ ...filters, dateRange: range as any })}
              className={`px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filters.dateRange === range ? "bg-hover text-text-primary" : "text-text-disabled hover:text-text-primary"}`}
            >
              {range}
            </button>
          ))}
        </div>

        <Button variant="secondary" className="h-12 px-5 gap-2 border-border-strong">
          <Calendar size={18} className="text-text-disabled" />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Advanced</span>
        </Button>
      </div>
    </div>
  );
}
