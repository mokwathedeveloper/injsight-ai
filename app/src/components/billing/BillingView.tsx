"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import { CreditCard, Download, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { Button, CardSkeleton, EmptyState, ErrorState } from "@/components/ui";
import Link from "next/link";

const PLAN_FEATURES: Record<string, { analyses: number; wallets: number; features: string[] }> = {
  free:       { analyses: 10,   wallets: 3,   features: ["Basic AI reports", "3 saved wallets"] },
  pro:        { analyses: 500,  wallets: 50,  features: ["Full AI reports", "PDF export", "Alerts"] },
  team:       { analyses: 2000, wallets: 200, features: ["Team workspace", "API access", "Webhooks"] },
  enterprise: { analyses: 99999, wallets: 9999, features: ["Unlimited", "Dedicated support"] },
};

const PLAN_PRICE: Record<string, number> = { free: 0, pro: 29, team: 99, enterprise: 499 };

export function BillingView() {
  const { user } = useAuthStore();

  const billingQ = useQuery({
    queryKey: ["billing-summary"],
    queryFn: async () => {
      const res = await apiClient.get("/billing/summary");
      return unwrapData(res) as Record<string, unknown>;
    },
  });

  const plan      = (user?.plan ?? "free").toLowerCase();
  const planInfo  = PLAN_FEATURES[plan] ?? PLAN_FEATURES.free;
  const planPrice = PLAN_PRICE[plan] ?? 0;
  const billing   = billingQ.data ?? {};

  // Usage from billing summary or defaults
  const analysesUsed  = (billing.total_analyses  as number) ?? 0;
  const walletsSaved  = (billing.saved_wallets    as number) ?? 0;
  const reportsGen    = (billing.total_reports    as number) ?? 0;
  const invoices      = (billing.invoices         as any[]) ?? [];

  const analysisPct   = Math.min((analysesUsed / planInfo.analyses) * 100, 100);
  const walletPct     = planInfo.wallets < 9999 ? Math.min((walletsSaved / planInfo.wallets) * 100, 100) : 0;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Billing</h1>
        <p className="text-sm text-text-secondary">Manage your subscription, usage, and payment.</p>
      </div>

      {/* Current plan */}
      {billingQ.isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="glass-card p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Current Plan</h2>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-bold text-text-primary capitalize">{plan} Plan</span>
                <span className="badge-success">Active</span>
                {plan === "free" && <span className="badge bg-surface-2 text-text-muted border border-border">Free Tier</span>}
              </div>
              {planPrice > 0 ? (
                <p className="text-sm text-text-secondary">${planPrice}/month</p>
              ) : (
                <p className="text-sm text-text-secondary">Free — no credit card required</p>
              )}
              <p className="text-xs text-text-muted mt-1">
                {planInfo.analyses === 99999 ? "Unlimited" : `${planInfo.analyses.toLocaleString()}`} analyses/month
                · {planInfo.wallets === 9999 ? "Unlimited" : planInfo.wallets} saved wallets
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/pricing">Change Plan</Link>
              </Button>
              {plan !== "free" && (
                <Button variant="ghost" size="sm" className="text-danger">Cancel</Button>
              )}
            </div>
          </div>

          {/* Usage bars */}
          <div className="mt-5 pt-4 border-t border-border space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-muted">Analyses used</span>
                <span className="text-text-secondary font-semibold">
                  {analysesUsed} / {planInfo.analyses === 99999 ? "∞" : planInfo.analyses.toLocaleString()}
                </span>
              </div>
              <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${analysisPct >= 90 ? "bg-danger" : analysisPct >= 70 ? "bg-warning" : "bg-primary"}`}
                  style={{ width: `${analysisPct}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-muted">Saved wallets</span>
                <span className="text-text-secondary font-semibold">
                  {walletsSaved} / {planInfo.wallets === 9999 ? "∞" : planInfo.wallets}
                </span>
              </div>
              <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${walletPct >= 90 ? "bg-warning" : "bg-accent"}`}
                  style={{ width: `${walletPct}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">AI Reports generated</span>
              <span className="text-text-secondary font-semibold">{reportsGen}</span>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade CTA for free users */}
      {plan === "free" && (
        <div className="glass-card p-5 border-accent/20 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent-muted shrink-0">
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary mb-1">Unlock Pro Features</p>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              Get 500 analyses/month, 50 saved wallets, full AI reports, PDF export, alerts, and more.
            </p>
            <Button variant="accent" size="sm" asChild>
              <Link href="/pricing"><TrendingUp className="h-3.5 w-3.5" /> Upgrade to Pro — $29/mo</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Payment method — only for paid plans */}
      {plan !== "free" && (
        <div className="glass-card p-6">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Payment Method</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-2">
                <CreditCard className="h-5 w-5 text-text-secondary" />
              </div>
              <div>
                <p className="text-sm text-text-primary">Card on file</p>
                <p className="text-xs text-text-muted">Managed securely by Stripe</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">Update Card</Button>
          </div>
        </div>
      )}

      {/* Billing history */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Billing History</h2>
        </div>

        {billingQ.isLoading ? (
          <div className="p-5 space-y-3">
            {[0,1,2].map(i => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-24 shimmer rounded" />
                <div className="h-4 w-16 shimmer rounded" />
              </div>
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <EmptyState
            icon={<CreditCard className="h-8 w-8 text-text-muted" />}
            title="No invoices yet"
            description={plan === "free" ? "Upgrade to a paid plan to see billing history." : "Your invoices will appear here."}
            className="py-8"
          />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-2/30">
                {["Invoice", "Date", "Amount", "Status", ""].map((h, i) => (
                  <th key={i} className="text-left px-5 py-3 text-xs font-semibold text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv: any) => (
                <tr key={inv.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3 text-xs font-mono text-text-primary">{inv.id}</td>
                  <td className="px-5 py-3 text-xs text-text-secondary">{inv.date}</td>
                  <td className="px-5 py-3 text-xs font-semibold text-text-primary">${inv.amount}.00</td>
                  <td className="px-5 py-3">
                    <span className="badge-success flex items-center gap-1 w-fit">
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
        )}
      </div>

      {/* Plan features list */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-3">Your Plan Includes</h2>
        <div className="grid grid-cols-2 gap-2">
          {planInfo.features.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" />
              <span className="text-xs text-text-secondary">{f}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-text-muted mt-4">
          Need more? <Link href="/pricing" className="text-accent hover:underline">See all plans →</Link>
        </p>
      </div>
    </div>
  );
}
