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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* AI Report Preview */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
              <FileText size={20} className="text-primary" />
              <span>AI Report Preview</span>
            </h3>
            <Card className="p-0 border-border-strong bg-hover/20 flex-1 flex flex-col overflow-hidden">
              <div className="flex border-b border-border">
                <button className="flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-text-primary bg-primary/10 border-b-2 border-primary transition-all">Overview</button>
                <button className="flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all">Portfolio</button>
                <button className="flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary transition-all">Risk</button>
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

          {/* Risk Score Preview */}
          <div className="lg:col-span-3 flex flex-col">
             <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
              <Activity size={20} className="text-primary" />
              <span>Risk Score Preview</span>
            </h3>
            <Card className="p-8 border-border-strong bg-hover/20 flex-1 flex flex-col items-center justify-center text-center">
              <div className="relative mb-8">
                <div className="w-40 h-40 rounded-full border-[14px] border-border flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-text-primary">72</span>
                  <span className="text-xs font-bold text-error uppercase tracking-widest">High Risk</span>
                </div>
                <svg className="absolute top-0 left-0 w-40 h-40 -rotate-90">
                  <circle cx="80" cy="80" r="73" fill="transparent" stroke="currentColor" strokeWidth="14" strokeDasharray="458" strokeDashoffset="120" className="text-error" />
                </svg>
                {/* Glow */}
                <div className="absolute inset-0 bg-error/10 blur-3xl -z-10 rounded-full" />
              </div>
              <ul className="space-y-4 text-left w-full">
                <RiskFactor label="High concentration in INJ" type="error" />
                <RiskFactor label="Low stablecoin buffer" type="error" />
                <RiskFactor label="Moderate activity risk" type="warning" />
                <RiskFactor label="Consider diversification" type="primary" />
              </ul>
            </Card>
          </div>

          {/* Pricing Preview */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center space-x-2">
              <Target size={20} className="text-primary" />
              <span>Pricing Preview</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {/* Pro Plan Highlight */}
              <Card className="relative p-6 border-primary bg-primary/5 ring-1 ring-primary flex-1 flex flex-col">
                <div className="absolute -top-3 right-4 bg-primary text-text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                <div className="mb-4">
                  <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Pro</span>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-extrabold text-text-primary">$29</span>
                    <span className="text-text-secondary text-xs ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <CheckItem label="Unlimited analyses" />
                  <CheckItem label="Unlimited wallets" />
                  <CheckItem label="All reports & exports" />
                  <CheckItem label="Watchlist alerts" />
                </ul>
                <Button variant="primary" className="w-full">Start Free Trial</Button>
              </Card>

              {/* Free Plan */}
              <div className="flex flex-col space-y-4">
                <Card className="p-6 border-border-strong bg-hover/20 flex-1">
                  <div className="mb-4">
                    <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Free</span>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-extrabold text-text-primary">$0</span>
                      <span className="text-text-secondary text-xs ml-1">/month</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <CheckItem label="5 wallet analyses" />
                    <CheckItem label="2 saved wallets" />
                    <CheckItem label="Basic reports" />
                  </ul>
                  <Button variant="secondary" size="sm" className="w-full">Get Started</Button>
                </Card>

                {/* Team */}
                <Card className="p-6 border-border-strong bg-hover/20 flex-1">
                   <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-bold text-text-primary uppercase tracking-widest">Team</span>
                    <span className="text-lg font-extrabold text-text-primary">$99</span>
                  </div>
                  <p className="text-[10px] text-text-secondary mb-4">Priority support and workspaces.</p>
                  <Button variant="secondary" size="sm" className="w-full">Start Free Trial</Button>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Security Feature Bar */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-9" />
           <div className="lg:col-span-3">
              <Card className="p-6 border-border-strong bg-hover/20">
                <h4 className="text-sm font-bold text-text-primary mb-4 flex items-center space-x-2">
                  <ShieldCheck size={16} className="text-success" />
                  <span>Your Data. Your Wallet.</span>
                </h4>
                <ul className="space-y-3 mb-6">
                  <SecurityItem label="Read-only access" />
                  <SecurityItem label="No private keys" />
                  <SecurityItem label="No custody" />
                  <SecurityItem label="Your data stays yours" />
                </ul>
                <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold text-primary">Learn More About Security</Button>
              </Card>
           </div>
        </div>
      </div>
    </section>
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
