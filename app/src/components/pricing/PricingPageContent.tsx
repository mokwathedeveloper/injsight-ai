"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Zap, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";

const PLANS = [
  {
    id: "free", name: "Free", monthlyPrice: 0, yearlyPrice: 0,
    description: "For individuals exploring Injective DeFi",
    features: [
      { text: "10 wallet analyses / month",  included: true  },
      { text: "3 saved wallets",             included: true  },
      { text: "Basic AI reports",            included: true  },
      { text: "Public wallet lookup",        included: true  },
      { text: "Risk score dashboard",        included: true  },
      { text: "PDF export",                  included: false },
      { text: "Alerts & notifications",      included: false },
      { text: "Team workspace",              included: false },
      { text: "API access",                  included: false },
    ],
    popular: false,
  },
  {
    id: "pro", name: "Pro", monthlyPrice: 29, yearlyPrice: 24,
    description: "For serious DeFi analysts and researchers",
    features: [
      { text: "500 analyses / month",        included: true  },
      { text: "50 saved wallets",            included: true  },
      { text: "Full AI reports",             included: true  },
      { text: "Public wallet lookup",        included: true  },
      { text: "Risk score dashboard",        included: true  },
      { text: "PDF export",                  included: true  },
      { text: "Alerts & notifications",      included: true  },
      { text: "Team workspace",              included: false },
      { text: "API access",                  included: false },
    ],
    popular: true,
  },
  {
    id: "team", name: "Team", monthlyPrice: 99, yearlyPrice: 83,
    description: "For teams and institutional analysts",
    features: [
      { text: "2,000 analyses / month",      included: true  },
      { text: "200 saved wallets",           included: true  },
      { text: "Full AI reports",             included: true  },
      { text: "Public wallet lookup",        included: true  },
      { text: "Risk score dashboard",        included: true  },
      { text: "PDF export",                  included: true  },
      { text: "Alerts & notifications",      included: true  },
      { text: "Team workspace",              included: true  },
      { text: "API access",                  included: true  },
    ],
    popular: false,
  },
];

function PlanButton({
  plan, yearly, currentPlan, isLoggedIn,
}: {
  plan: typeof PLANS[number];
  yearly: boolean;
  currentPlan: string;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const isCurrent = currentPlan.toLowerCase() === plan.id;
  const isDowngrade =
    (currentPlan === "pro"  && plan.id === "free") ||
    (currentPlan === "team" && plan.id === "free") ||
    (currentPlan === "team" && plan.id === "pro");

  if (isLoggedIn) {
    if (isCurrent) {
      return (
        <div className="w-full py-2.5 rounded-lg border border-success/30 bg-success-muted text-success text-sm font-semibold text-center flex items-center justify-center gap-2">
          <Check className="h-4 w-4" /> Your Current Plan
        </div>
      );
    }
    if (isDowngrade) {
      return (
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/dashboard/settings">Downgrade</Link>
        </Button>
      );
    }
    // Upgrade
    return (
      <Button variant={plan.popular ? "accent" : "secondary"} className="w-full" asChild>
        <Link href="/billing">
          <Zap className="h-3.5 w-3.5" />
          Upgrade to {plan.name}
        </Link>
      </Button>
    );
  }

  // Not logged in
  if (plan.id === "free") {
    return (
      <Button variant="secondary" className="w-full" asChild>
        <Link href="/signup">Get Started Free</Link>
      </Button>
    );
  }

  return (
    <Button variant={plan.popular ? "accent" : "secondary"} className="w-full" asChild>
      <Link href={`/signup?plan=${plan.id}`}>
        Start {plan.name} Trial
      </Link>
    </Button>
  );
}

export function PricingPageContent() {
  const [yearly, setYearly] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const loggedIn    = isAuthenticated();
  const currentPlan = user?.plan ?? "free";

  return (
    <div className="page-container page-section">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="section-label mb-3">Pricing</p>
        <h1 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto">
          Start free. Upgrade when you need more analyses, saved wallets, or team features.
        </p>

        {/* Logged-in banner */}
        {loggedIn && (
          <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-primary-muted border border-primary/25 text-sm font-semibold text-accent">
            <Crown className="h-4 w-4" />
            You&apos;re on the <span className="capitalize">{currentPlan}</span> plan
            &nbsp;·&nbsp;
            <Link href="/billing" className="underline underline-offset-2 hover:text-white">
              Manage billing →
            </Link>
          </div>
        )}

        {/* Monthly / Yearly toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-sm ${!yearly ? "text-text-primary font-semibold" : "text-text-muted"}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? "bg-primary" : "bg-surface-3"}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${yearly ? "left-7" : "left-1"}`} />
          </button>
          <span className={`text-sm ${yearly ? "text-text-primary font-semibold" : "text-text-muted"}`}>
            Yearly <span className="badge-success ml-1">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PLANS.map((plan) => {
          const price     = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          const isCurrent = loggedIn && currentPlan.toLowerCase() === plan.id;

          return (
            <div
              key={plan.id}
              className={`glass-card p-6 flex flex-col relative transition-all duration-200 ${
                isCurrent
                  ? "border-success/40 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                  : plan.popular
                  ? "border-accent/40 shadow-glow"
                  : ""
              }`}
            >
              {/* Badge */}
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-success text-white text-xs font-bold whitespace-nowrap">
                  Current Plan
                </div>
              )}
              {!isCurrent && plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-accent px-3 py-1 text-xs font-bold whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Plan info */}
              <div className="mb-5">
                <h3 className="text-lg font-bold text-text-primary">{plan.name}</h3>
                <p className="text-xs text-text-muted mt-1">{plan.description}</p>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold text-text-primary">
                    {price === 0 ? "Free" : `$${price}`}
                  </span>
                  {price > 0 && <span className="text-text-muted">/month</span>}
                </div>
                {yearly && price > 0 && (
                  <p className="text-xs text-success mt-1">Billed annually</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map(({ text, included }) => (
                  <li key={text} className="flex items-center gap-2 text-sm">
                    {included
                      ? <Check className="h-3.5 w-3.5 text-success shrink-0" />
                      : <X className="h-3.5 w-3.5 text-text-muted shrink-0" />
                    }
                    <span className={included ? "text-text-secondary" : "text-text-muted line-through"}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA — smart based on auth + current plan */}
              <PlanButton
                plan={plan}
                yearly={yearly}
                currentPlan={currentPlan}
                isLoggedIn={loggedIn}
              />
            </div>
          );
        })}
      </div>

      {/* Not logged in — extra nudge */}
      {!loggedIn && (
        <p className="text-center text-sm text-text-muted mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline font-medium">
            Log in to manage your plan →
          </Link>
        </p>
      )}

      {/* FAQ */}
      <div className="mt-20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Frequently Asked</h2>
        <div className="space-y-4">
          {[
            { q: "Is InjSight really read-only?", a: "Yes. We only read public on-chain data from the Injective blockchain. We never ask for private keys, seed phrases, or any form of wallet access." },
            { q: "What counts as one analysis?", a: "One analysis = one wallet address analyzed. Viewing a previously analyzed wallet within 24 hours doesn't consume an analysis credit." },
            { q: "Can I upgrade or downgrade anytime?", a: "Yes, you can change your plan at any time from the Billing page. Your access continues until the end of the current billing period." },
            { q: "How do I upgrade?", a: "Log in → go to Billing → select your new plan. Or click any upgrade button on this page when logged in." },
          ].map(({ q, a }) => (
            <div key={q} className="glass-card p-5">
              <p className="text-sm font-semibold text-text-primary mb-2">{q}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
