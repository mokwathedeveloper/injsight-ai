"use client";

import { CreditCard, Download, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

const INVOICES = [
  { id: "INV-2025-05", date: "May 1, 2025",   amount: 29, status: "paid" },
  { id: "INV-2025-04", date: "Apr 1, 2025",   amount: 29, status: "paid" },
  { id: "INV-2025-03", date: "Mar 1, 2025",   amount: 29, status: "paid" },
];

export function BillingView() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Billing</h1>
        <p className="text-sm text-text-secondary">Manage your subscription and payment methods.</p>
      </div>

      {/* Current plan */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">Current Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-text-primary">Pro Plan</span>
              <span className="badge-success">Active</span>
            </div>
            <p className="text-sm text-text-secondary">$29/month · Renews June 1, 2025</p>
            <p className="text-xs text-text-muted mt-1">500 analyses/month · 50 saved wallets · Full AI reports</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/pricing">Change Plan</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-danger">Cancel</Button>
          </div>
        </div>

        {/* Usage bar */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-muted mb-2">Current period usage (28/500 analyses)</p>
          <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: "5.6%" }} />
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">Payment Method</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-surface-2">
              <CreditCard className="h-5 w-5 text-text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-primary">Visa ending in 4242</p>
              <p className="text-xs text-text-muted">Expires 12/2027</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">Update Card</Button>
        </div>
      </div>

      {/* Invoices */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Billing History</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Invoice", "Date", "Amount", "Status", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                <td className="px-5 py-3 text-xs font-mono text-text-primary">{inv.id}</td>
                <td className="px-5 py-3 text-xs text-text-secondary">{inv.date}</td>
                <td className="px-5 py-3 text-xs text-text-primary">${inv.amount}.00</td>
                <td className="px-5 py-3">
                  <span className="badge-success">
                    <CheckCircle className="h-3 w-3" /> {inv.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Button variant="ghost" size="sm">
                    <Download className="h-3.5 w-3.5" /> PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
