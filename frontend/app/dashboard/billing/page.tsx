"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { BillingSummaryCard } from "@/components/dashboard/BillingSummaryCard";
import { PaymentMethodCard } from "@/components/dashboard/PaymentMethodCard";
import { BillingHistoryTable } from "@/components/dashboard/BillingHistoryTable";
import { PlanLimitCard } from "@/components/dashboard/PlanLimitCard";
import { LimitUpgradePrompt } from "@/components/dashboard/LimitUpgradePrompt";
import { MOCK_BILLING_DATA } from "@/data/billing-mock";
import { CreditCard, History, ShieldCheck, Zap } from "lucide-react";
import { billingApi } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";

export default function BillingPage() {
  const authed = useAuthStore((s) => !!s.accessToken);
  const [data, setData] = React.useState(MOCK_BILLING_DATA);

  React.useEffect(() => {
    if (!authed) return;
    billingApi.summary().then((b: any) => {
      if (!b) return;
      setData((prev) => ({
        ...prev,
        summary: {
          ...prev.summary,
          currentPlan: b.plan ?? prev.summary.currentPlan,
          planName: b.plan ? b.plan.charAt(0).toUpperCase() + b.plan.slice(1) : prev.summary.planName,
          amount: b.priceUsd ?? prev.summary.amount,
          cycle: b.billingCycle ?? prev.summary.cycle,
        },
        invoices: b.invoices?.length ? b.invoices : prev.invoices,
      }));
    }).catch(() => {});
  }, [authed]);

  return (
    <AppShell>
      <div className="space-y-12 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <CreditCard size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Billing & <span className="text-primary">Subscription</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">
            Manage your plan, payment methods, and historical invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Summary & Payment */}
           <div className="lg:col-span-6 h-full">
              <BillingSummaryCard summary={data.summary} />
           </div>
           <div className="lg:col-span-6 h-full">
              <PaymentMethodCard method={data.paymentMethod} />
           </div>

           {/* Usage & Limits - Reused from Feature 27 */}
           <div className="lg:col-span-12 space-y-6 pt-4">
              <div className="flex items-center gap-2 text-text-primary px-1">
                 <Zap size={18} className="text-primary fill-primary" />
                 <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Active Usage Status</h3>
              </div>
              <PlanLimitCard />
              {data.summary.currentPlan === "free" && <LimitUpgradePrompt />}
           </div>

           {/* Invoices */}
           <div className="lg:col-span-12 pt-4">
              <div className="flex items-center gap-2 text-text-primary px-1 mb-6">
                 <History size={18} className="text-primary" />
                 <h3 className="text-sm font-bold uppercase tracking-[0.2em]">Billing History</h3>
              </div>
              <BillingHistoryTable invoices={data.invoices} />
           </div>
        </div>

        {/* Security / Partner info */}
        <div className="p-8 border-t border-border/50 text-center space-y-4">
           <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase">
                 <ShieldCheck size={14} className="text-success" />
                 <span>PCI-DSS Level 1 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 <span>Secure Injective Native Payments</span>
              </div>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
