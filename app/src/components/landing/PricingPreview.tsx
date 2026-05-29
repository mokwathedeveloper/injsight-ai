import Link from "next/link";
import { Button } from "@/components/ui";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with basic wallet analysis",
    features: ["10 analyses / month", "3 saved wallets", "Basic AI reports", "Public wallet lookup"],
    cta: "Get Started Free",
    href: "/signup",
    popular: false,
    variant: "secondary" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious DeFi analysts and portfolio managers",
    features: ["500 analyses / month", "50 saved wallets", "Full AI reports", "Alerts & monitoring", "PDF export"],
    cta: "Start Pro Trial",
    href: "/signup?plan=pro",
    popular: true,
    variant: "accent" as const,
  },
  {
    name: "Team",
    price: "$99",
    period: "/month",
    description: "Collaborate with your team on Injective portfolios",
    features: ["2,000 analyses / month", "200 saved wallets", "Team workspace", "API access", "Webhooks"],
    cta: "Start Team Trial",
    href: "/signup?plan=team",
    popular: false,
    variant: "secondary" as const,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="page-section">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Pricing Preview
          </h2>
          <p className="text-text-secondary">Start free. Upgrade when you need more power.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-6 flex flex-col ${
                plan.popular ? "border-accent/40 shadow-glow relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-accent px-3 py-1 text-xs font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-base font-semibold text-text-primary">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-sm text-text-muted">{plan.period}</span>
                </div>
                <p className="text-xs text-text-muted mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} asChild>
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          <Link href="/pricing" className="text-accent hover:underline">
            View full pricing →
          </Link>
        </p>
      </div>
    </section>
  );
}
