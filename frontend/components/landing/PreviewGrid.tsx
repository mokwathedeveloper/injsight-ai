"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { landingData } from "@/data/landing";
import { 
  Check, 
  Brain, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Activity, 
  ArrowRight,
  Target,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PreviewGrid() {
  return (
    <section className="py-24 bg-page overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* AI Report Preview (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
              <FileText size={20} className="text-primary" />
              <span>AI Report Preview</span>
            </h3>
            <Card className="p-0 border-border-strong bg-hover/20 flex-1 flex flex-row overflow-hidden min-h-[340px]">
              {/* Vertical Tabs Sidebar */}
              <div className="w-32 border-r border-border bg-black/20 flex flex-col pt-2">
                <TabItem label="Overview" active />
                <TabItem label="Portfolio" />
                <TabItem label="Risk Analysis" />
                <TabItem label="Concentration" />
                <TabItem label="Transactions" />
                <TabItem label="Insights" />
              </div>
              <div className="p-6 space-y-6 flex-1">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight">Executive Summary</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    This wallet holds $248,450 across 28 assets on Injective. The overall risk score is <span className="text-error font-bold">High (72/100)</span> due to high concentration in INJ and low stablecoin buffer.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Stat label="Total Value (USD)" value="$248,450" sub="↑ 12.5% (7d)" />
                  <Stat label="Total Assets" value="28" sub="+ 3 new assets" />
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <Badge variant="success" className="text-[10px]">Low Activity</Badge>
                  <button className="text-[10px] text-primary hover:underline font-bold flex items-center space-x-1">
                    <span>Analyze Wallet</span>
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Risk Score Preview (2.5 cols -> using 3) */}
          <div className="lg:col-span-3 flex flex-col">
             <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
              <Activity size={20} className="text-primary" />
              <span>Risk Score Preview</span>
            </h3>
            <Card className="p-6 border-border-strong bg-hover/20 flex-1 flex flex-col items-center justify-center text-center min-h-[340px]">
              <div className="relative mb-6 scale-90">
                <div className="w-36 h-36 rounded-full border-[12px] border-border flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-text-primary">72</span>
                  <span className="text-[10px] font-bold text-error uppercase tracking-widest">High Risk</span>
                </div>
                <svg className="absolute top-0 left-0 w-36 h-36 -rotate-90">
                  <circle cx="72" cy="72" r="66" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="414" strokeDashoffset="110" className="text-error" />
                </svg>
                {/* Glow */}
                <div className="absolute inset-0 bg-error/10 blur-3xl -z-10 rounded-full" />
              </div>
              <ul className="space-y-3 text-left w-full">
                <RiskFactor label="High concentration in INJ" type="error" />
                <RiskFactor label="Low stablecoin buffer" type="error" />
                <RiskFactor label="Moderate activity risk" type="warning" />
                <RiskFactor label="Consider diversification" type="primary" />
              </ul>
            </Card>
          </div>

          {/* Pricing Preview (3.5 cols -> using 3) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
              <Target size={20} className="text-primary" />
              <span>Pricing Preview</span>
            </h3>
            <Card className="p-0 border-border-strong bg-hover/20 flex-1 overflow-hidden flex flex-col min-h-[340px]">
               <div className="bg-primary/10 border-b border-primary/20 p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-text-primary uppercase tracking-widest">Pro Plan</span>
                    <Badge variant="default" className="text-[8px] h-4">Most Popular</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-extrabold text-text-primary">$29</span>
                    <span className="text-text-secondary text-[10px] ml-1">/month</span>
                  </div>
               </div>
               <div className="p-4 space-y-3 flex-1">
                  <CheckItem label="Unlimited analyses" />
                  <CheckItem label="Unlimited wallets" />
                  <CheckItem label="All reports & exports" />
                  <CheckItem label="Watchlist alerts" />
               </div>
               <div className="p-4 pt-0">
                  <Button variant="primary" size="sm" className="w-full text-xs">Start Free Trial</Button>
               </div>
            </Card>
          </div>

          {/* Security Card (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
                <ShieldCheck size={20} className="text-success" />
                <span>Your Data.</span>
              </h3>
              <Card className="p-5 border-border-strong bg-hover/20 flex-1 flex flex-col min-h-[340px]">
                <h4 className="text-[11px] font-bold text-text-primary mb-4 uppercase tracking-widest">Our Intelligence.</h4>
                <ul className="space-y-4 mb-6 flex-1">
                  <SecurityItem label="Read-only access" />
                  <SecurityItem label="No private keys" />
                  <SecurityItem label="No custody" />
                  <SecurityItem label="Your data stays yours" />
                </ul>
                <div className="relative group">
                   <div className="absolute inset-0 bg-primary/10 blur-xl group-hover:bg-primary/20 transition-colors rounded-full" />
                   <Button variant="ghost" size="sm" className="w-full text-[9px] font-bold text-primary relative z-10 border border-primary/20">Learn More About Security</Button>
                </div>
              </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={cn(
      "text-left px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider transition-all",
      active ? "text-text-primary bg-primary/10 border-l-2 border-primary" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
    )}>
      {label}
    </button>
  );
}


function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">{label}</div>
      <div className="text-lg font-bold text-text-primary">{value}</div>
      <div className={cn("text-[9px] font-bold", sub.includes("↑") ? "text-success" : "text-primary")}>{sub}</div>
    </div>
  );
}

function RiskFactor({ label, type }: { label: string; type: "error" | "warning" | "primary" }) {
  return (
    <li className="flex items-center space-x-2">
      <div className={cn("w-2 h-2 rounded-full", {
        "bg-error": type === "error",
        "bg-warning": type === "warning",
        "bg-primary": type === "primary",
      })} />
      <span className="text-xs text-text-secondary">{label}</span>
    </li>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <li className="flex items-center space-x-2">
      <Check size={14} className="text-success flex-shrink-0" />
      <span className="text-xs text-text-secondary">{label}</span>
    </li>
  );
}

function SecurityItem({ label }: { label: string }) {
  return (
    <li className="flex items-center space-x-2">
      <Check size={14} className="text-success flex-shrink-0" />
      <span className="text-xs text-text-secondary">{label}</span>
    </li>
  );
}
