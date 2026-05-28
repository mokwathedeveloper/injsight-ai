"use client";

import * as React from "react";
import { Check, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    category: "Intelligence & Analysis",
    items: [
      { name: "Tracked Wallet Addresses", free: "1 Wallet", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "AI Risk Scoring (0-100)", free: true, pro: true, team: true, enterprise: true },
      { name: "Advanced Portfolio Audits", free: false, pro: true, team: true, enterprise: true },
      { name: "On-Chain Activity Logs", free: "30 Days", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited" },
      { name: "Drift Detection Notifications", free: false, pro: true, team: true, enterprise: true },
    ]
  },
  {
    category: "Data & Portability",
    items: [
      { name: "PDF Snapshot Exports", free: false, pro: true, team: true, enterprise: true },
      { name: "CSV/Spreadsheet Data", free: false, pro: true, team: true, enterprise: true },
      { name: "Structured JSON Access", free: false, pro: false, team: true, enterprise: true },
      { name: "API Request Limit", free: "10 / min", pro: "1k / min", team: "10k / min", enterprise: "Custom" },
    ]
  },
  {
    category: "Collaboration & Support",
    items: [
      { name: "Team Seat Count", free: "1 User", pro: "1 User", team: "Up to 5", enterprise: "Custom" },
      { name: "Shared Monitor Watchlists", free: false, pro: false, team: true, enterprise: true },
      { name: "Webhook Integrations", free: false, pro: false, team: true, enterprise: true },
      { name: "Dedicated Account Manager", free: false, pro: false, team: false, enterprise: true },
    ]
  }
];

export function ComparisonTable() {
  const renderCell = (val: boolean | string) => {
    if (typeof val === "boolean") {
      return val ? (
        <div className="flex justify-center">
          <div className="p-1 bg-success/10 rounded-full text-success">
            <Check size={16} strokeWidth={3} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-text-disabled opacity-30">
          <Minus size={16} />
        </div>
      );
    }
    return (
      <span className="text-xs font-bold text-text-primary uppercase tracking-tighter">
        {val}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 overflow-x-auto pb-12">
      <Card className="min-w-[900px] p-0 border-border bg-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-hover/10">
              <th className="px-8 py-10 w-1/3">
                 <h4 className="text-xl font-bold text-text-primary tracking-tight">Full Plan Breakdown</h4>
                 <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-1">Deep-chain technical specs</p>
              </th>
              {["Starter", "Pro", "Team", "Enterprise"].map((plan) => (
                <th key={plan} className="px-6 py-10 text-center">
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-[0.2em]",
                    plan === "Pro" ? "text-primary" : "text-text-disabled"
                  )}>
                    {plan}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {FEATURES.map((cat, catIdx) => (
              <React.Fragment key={catIdx}>
                <tr className="bg-hover/5">
                  <td colSpan={5} className="px-8 py-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                       {cat.category}
                    </span>
                  </td>
                </tr>
                {cat.items.map((item, itemIdx) => (
                  <tr key={itemIdx} className="hover:bg-hover/20 transition-colors">
                    <td className="px-8 py-5 text-sm text-text-secondary font-medium">
                      {item.name}
                    </td>
                    <td className="px-6 py-5 text-center">{renderCell(item.free)}</td>
                    <td className="px-6 py-5 text-center">{renderCell(item.pro)}</td>
                    <td className="px-6 py-5 text-center">{renderCell(item.team)}</td>
                    <td className="px-6 py-5 text-center">{renderCell(item.enterprise)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-hover/10 border-t border-border/50 text-center">
           <div className="flex items-center justify-center gap-2 text-[10px] font-medium text-text-disabled italic">
              <Info size={12} />
              <span>Technical specifications updated monthly based on Injective network throughput.</span>
           </div>
        </div>
      </Card>
    </div>
  );
}
