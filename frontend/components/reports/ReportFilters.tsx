"use client";

import * as React from "react";
import { Search, Filter, Calendar, FileText } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ReportFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
        <Input 
          placeholder="Search by report title or wallet..." 
          className="h-12 pl-11 bg-card border-border-strong text-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex bg-card border border-border-strong rounded-xl p-1 h-12">
          <button className="px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20">
            All Types
          </button>
          <button className="px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-disabled hover:text-text-primary transition-all">
            Risk
          </button>
          <button className="px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-disabled hover:text-text-primary transition-all">
            Portfolio
          </button>
        </div>

        <Button variant="secondary" className="h-12 px-5 gap-2 border-border-strong">
          <Calendar size={18} className="text-text-disabled" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Date Range</span>
        </Button>
      </div>
    </div>
  );
}
