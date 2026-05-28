"use client";

import * as React from "react";
import { InvoiceEntry } from "@/types/billing";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillingHistoryTableProps {
  invoices: InvoiceEntry[];
}

export function BillingHistoryTable({ invoices }: BillingHistoryTableProps) {
  return (
    <Card className="p-0 border-border bg-card overflow-hidden">
      <div className="p-6 border-b border-border bg-hover/10">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest px-0.5">Billing History</h3>
        <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-1">Invoice Archive</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-hover/5 border-b border-border/50 text-[9px] font-bold text-text-disabled uppercase tracking-widest">
              <th className="px-6 py-4">Invoice Number</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {invoices.map((inv) => (
              <tr key={inv.id} className="group hover:bg-hover/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                     <FileText size={16} className="text-text-disabled" />
                     <span className="text-sm font-bold text-text-primary">{inv.number}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-text-secondary font-medium">
                   {new Date(inv.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-text-primary font-mono">
                   ${inv.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-success">
                      <CheckCircle2 size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Paid</span>
                   </div>
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-primary transition-colors" title="Download PDF">
                      <Download size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-text-disabled text-sm">No billing records found.</p>
        </div>
      )}
    </Card>
  );
}
