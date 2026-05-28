"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { CheckoutCard } from "@/components/billing/CheckoutCard";
import { MOCK_CHECKOUT_PLAN, MOCK_CRYPTO_OPTIONS } from "@/data/payments-mock";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700 max-w-5xl">
        <Link
          href="/dashboard/billing"
          className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Billing</span>
        </Link>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            Complete your <span className="text-primary">upgrade</span>
          </h1>
          <p className="text-text-secondary text-sm">
            Review your plan and choose how you&apos;d like to pay. Cancel anytime.
          </p>
        </div>

        <CheckoutCard plan={MOCK_CHECKOUT_PLAN} cryptoOptions={MOCK_CRYPTO_OPTIONS} />
      </div>
    </AppShell>
  );
}
