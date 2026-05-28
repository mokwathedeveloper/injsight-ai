"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { PaymentMethodTabs } from "./PaymentMethodTabs";
import { PaymentStatusBanner } from "./PaymentStatusBanner";
import { CheckoutPlan, CryptoPaymentOption, PaymentMethodType, PaymentStatus } from "@/types/payments";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutCardProps {
  plan: CheckoutPlan;
  cryptoOptions: CryptoPaymentOption[];
}

export function CheckoutCard({ plan, cryptoOptions }: CheckoutCardProps) {
  const [method, setMethod] = React.useState<PaymentMethodType>("card");
  const [status, setStatus] = React.useState<PaymentStatus>("idle");
  const [selectedCrypto, setSelectedCrypto] = React.useState(cryptoOptions[0]?.symbol);

  const handlePay = () => {
    setStatus("processing");
    setTimeout(() => {
      // Deterministic demo outcome: card succeeds, crypto succeeds too
      setStatus("success");
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Order summary */}
      <Card className="lg:col-span-5 p-8 space-y-6 h-fit bg-card border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-text-disabled uppercase tracking-widest">Order Summary</h2>
          <Badge variant="price">{plan.interval === "month" ? "Monthly" : "Yearly"}</Badge>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-bold text-text-primary">{plan.name}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-text-primary tracking-tight">${plan.priceUsd}</span>
            <span className="text-sm text-text-secondary">/ {plan.interval}</span>
          </div>
        </div>

        <ul className="space-y-3 pt-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-xs text-text-secondary leading-relaxed">
              <Check size={14} className="text-success shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Subtotal</span>
            <span className="font-mono">${plan.priceUsd.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Tax</span>
            <span className="font-mono">$0.00</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-text-primary pt-2">
            <span>Total due today</span>
            <span className="font-mono">${plan.priceUsd.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Payment form */}
      <Card className="lg:col-span-7 p-8 space-y-6 bg-card border-border">
        <PaymentStatusBanner status={status} />

        {status !== "success" && (
          <>
            <PaymentMethodTabs value={method} onChange={setMethod} />

            {method === "card" ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label htmlFor="card-name" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
                    Cardholder Name
                  </label>
                  <Input id="card-name" placeholder="John Doe" className="h-12" disabled={status === "processing"} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="card-number" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
                    Card Number
                  </label>
                  <Input id="card-number" placeholder="4242 4242 4242 4242" className="h-12 font-mono" disabled={status === "processing"} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="card-exp" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Expiry</label>
                    <Input id="card-exp" placeholder="MM / YY" className="h-12 font-mono" disabled={status === "processing"} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="card-cvc" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">CVC</label>
                    <Input id="card-cvc" placeholder="123" className="h-12 font-mono" disabled={status === "processing"} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-300">
                <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Pay with Injective assets</p>
                {cryptoOptions.map((opt) => (
                  <button
                    key={opt.symbol}
                    onClick={() => setSelectedCrypto(opt.symbol)}
                    disabled={status === "processing"}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                      selectedCrypto === opt.symbol
                        ? "border-primary bg-primary/5"
                        : "border-border bg-hover/20 hover:border-border-strong"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-hover border border-border flex items-center justify-center text-xs font-bold">
                        {opt.symbol[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary leading-none mb-1">{opt.symbol}</p>
                        <p className="text-[10px] text-text-disabled uppercase font-bold">{opt.network}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-text-secondary">{opt.estimated}</span>
                  </button>
                ))}
              </div>
            )}

            <Button
              onClick={handlePay}
              disabled={status === "processing"}
              className="w-full h-12 font-bold text-sm gap-2"
            >
              <Lock size={14} />
              {status === "processing" ? "Processing..." : `Pay $${plan.priceUsd.toFixed(2)}`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-text-disabled">
              <ShieldCheck size={12} className="text-success" />
              <span className="text-[10px] uppercase tracking-wider font-medium">
                Encrypted & non-custodial — we never store card details or private keys
              </span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
