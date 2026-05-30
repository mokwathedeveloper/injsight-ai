"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import {
  CreditCard, Wallet, Building2, Check, Copy,
  CheckCircle, ArrowLeft, Shield, Zap, Users,
  ChevronRight, Clock, AlertCircle,
} from "lucide-react";

// ── Plan data ──────────────────────────────────────────────────────────────

const PLANS = {
  pro: {
    name: "Pro",
    price: { monthly: 29, yearly: 24 },
    color: "text-accent",
    bg: "bg-accent-muted",
    icon: Zap,
    features: ["500 analyses/month", "50 saved wallets", "Full AI reports", "PDF export", "Alerts & notifications", "API access"],
  },
  team: {
    name: "Team",
    price: { monthly: 99, yearly: 83 },
    color: "text-violet-400",
    bg: "bg-violet-muted",
    icon: Users,
    features: ["2,000 analyses/month", "200 saved wallets", "Full AI reports", "Team workspace", "Webhooks", "Priority support"],
  },
};

// ── Payment methods ────────────────────────────────────────────────────────

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: CreditCard,
    desc: "Visa, Mastercard, Amex — processed securely",
    badge: "Most Popular",
    badgeColor: "badge-accent",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    icon: Building2,
    desc: "Direct bank wire — processed within 1–2 business days",
    badge: "No Fees",
    badgeColor: "badge-success",
  },
  {
    id: "crypto",
    label: "Crypto (INJ / USDT)",
    icon: Wallet,
    desc: "Pay with Injective tokens — on-chain and instant",
    badge: "On-Chain",
    badgeColor: "badge-primary",
  },
];

// ── Crypto addresses ───────────────────────────────────────────────────────

const CRYPTO_ADDRESSES = {
  INJ:  "inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqku",
  USDT: "inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqku",
};

// ── Bank details ───────────────────────────────────────────────────────────

const BANK_DETAILS = {
  bankName:       "Standard Bank",
  accountName:    "InjSight AI (Pty) Ltd",
  accountNumber:  "000-123-456-789",
  branchCode:     "051001",
  swiftCode:      "SBZAZAJJ",
  reference:      "INJSIGHT-{YOUR_EMAIL}",
};

// ── Main component ─────────────────────────────────────────────────────────

function UpgradeContent() {
  const searchParams  = useSearchParams();
  const { user }      = useAuthStore();

  const planId        = (searchParams.get("plan") ?? "pro") as "pro" | "team";
  const billingCycle  = (searchParams.get("billing") ?? "monthly") as "monthly" | "yearly";

  const plan          = PLANS[planId] ?? PLANS.pro;
  const PlanIcon      = plan.icon;
  const price         = plan.price[billingCycle];

  const [method,    setMethod]    = useState("card");
  const [copied,    setCopied]    = useState<string | null>(null);
  const [step,      setStep]      = useState<"select" | "details" | "confirm">("select");
  const [cardNum,   setCardNum]   = useState("");
  const [cardName,  setCardName]  = useState(user?.name ?? "");
  const [expiry,    setExpiry]    = useState("");
  const [cvv,       setCvv]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatCardNumber = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");

  // ── Render ──────────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-5">
        <div className="w-16 h-16 rounded-full bg-success-muted border border-success/30 flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          {method === "card" ? "Payment Received!" : "Request Submitted!"}
        </h2>
        <p className="text-text-secondary leading-relaxed">
          {method === "card"
            ? `Your ${plan.name} plan is now active. Welcome to InjSight AI Pro!`
            : method === "bank"
            ? "We've received your bank transfer request. Your plan will be activated within 1–2 business days once payment clears."
            : "We'll verify your crypto payment on-chain and activate your plan shortly. This typically takes under 5 minutes."}
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Button variant="accent" asChild>
            <Link href="/dashboard"><CheckCircle className="h-4 w-4" /> Go to Dashboard</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/billing">View Billing</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/pricing"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-text-primary">Upgrade to {plan.name}</h1>
          <p className="text-sm text-text-secondary">Choose your payment method to continue</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left: Order summary ── */}
        <div className="lg:col-span-1">
          <div className="glass-card p-5 sticky top-6">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">Order Summary</h3>

            {/* Plan badge */}
            <div className={`flex items-center gap-3 p-3 rounded-xl ${plan.bg} border border-current/20 mb-4`}>
              <div className={`p-2 rounded-lg bg-background/50`}>
                <PlanIcon className={`h-5 w-5 ${plan.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary">InjSight AI {plan.name}</p>
                <p className="text-xs text-text-muted capitalize">{billingCycle} billing</p>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-5">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-text-secondary">
                  <Check className="h-3.5 w-3.5 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="divider mb-4" />

            {/* Price */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-text-muted">{plan.name} Plan</span>
              <span className="text-sm font-semibold text-text-primary">${price}/mo</span>
            </div>
            {billingCycle === "yearly" && (
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-success">Annual discount (20%)</span>
                <span className="text-xs text-success">-${29 - price}/mo</span>
              </div>
            )}
            <div className="divider my-3" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-text-primary">Total today</span>
              <span className="text-lg font-bold text-text-primary">
                ${billingCycle === "yearly" ? price * 12 : price}
                <span className="text-xs text-text-muted font-normal ml-1">
                  {billingCycle === "yearly" ? "/year" : "/month"}
                </span>
              </span>
            </div>

            {/* Security note */}
            <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-surface-2 border border-border">
              <Shield className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
              <p className="text-[11px] text-text-muted leading-relaxed">
                Secure payment. Cancel anytime from your billing settings. No hidden fees.
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: Payment methods ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Step 1: Choose method */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
              Choose Payment Method
            </h3>
            <div className="space-y-3">
              {PAYMENT_METHODS.map(pm => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    onClick={() => { setMethod(pm.id); setStep("details"); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      method === pm.id
                        ? "border-primary bg-primary-muted"
                        : "border-border hover:border-primary/50 hover:bg-surface-2"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg ${method === pm.id ? "bg-primary/20" : "bg-surface-3"}`}>
                      <Icon className={`h-5 w-5 ${method === pm.id ? "text-accent" : "text-text-secondary"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-text-primary">{pm.label}</p>
                        <span className={pm.badgeColor}>{pm.badge}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{pm.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                      method === pm.id ? "border-primary bg-primary" : "border-border"
                    }`}>
                      {method === pm.id && <div className="w-full h-full rounded-full bg-white scale-50" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Payment details */}
          {step !== "select" && (
            <div className="glass-card p-5 animate-fade-in">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                {method === "card" ? "Card Details"
                  : method === "bank" ? "Bank Transfer Instructions"
                  : "Crypto Payment Address"}
              </h3>

              {/* ── CARD ── */}
              {method === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-text-secondary block mb-1.5">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <input
                        value={cardNum}
                        onChange={e => setCardNum(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className="input-field pl-10 font-mono text-sm tracking-widest"
                        maxLength={19}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary block mb-1.5">Cardholder Name</label>
                    <input
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-text-secondary block mb-1.5">Expiry Date</label>
                      <input
                        value={expiry}
                        onChange={e => setExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className="input-field text-sm font-mono"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-text-secondary block mb-1.5">CVV</label>
                      <input
                        value={cvv}
                        onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))}
                        placeholder="123"
                        className="input-field text-sm font-mono"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-2 border border-border">
                    <Shield className="h-3.5 w-3.5 text-success shrink-0" />
                    <p className="text-[11px] text-text-muted">256-bit SSL encrypted. Your card details are never stored.</p>
                  </div>
                </div>
              )}

              {/* ── BANK TRANSFER ── */}
              {method === "bank" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-warning-muted border border-warning/20 flex gap-3">
                    <Clock className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    <p className="text-xs text-warning leading-relaxed">
                      Bank transfers take <strong>1–2 business days</strong> to process. Your plan will be activated once payment is confirmed.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(BANK_DETAILS).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-surface-2 border border-border">
                        <div>
                          <p className="text-[10px] text-text-muted uppercase tracking-wide">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                          <p className={`text-sm font-semibold text-text-primary mt-0.5 ${key === "reference" ? "text-accent" : ""}`}>
                            {key === "reference" ? val.replace("{YOUR_EMAIL}", user?.email ?? "your-email") : val}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(key === "reference" ? val.replace("{YOUR_EMAIL}", user?.email ?? "your-email") : val, key)}
                          className="p-1.5 rounded hover:bg-surface-3 transition-colors"
                        >
                          {copied === key
                            ? <CheckCircle className="h-4 w-4 text-success" />
                            : <Copy className="h-4 w-4 text-text-muted" />
                          }
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-surface-2 border border-border flex items-start gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Use your email as the payment reference so we can match your payment. Amount: <strong>${billingCycle === "yearly" ? price * 12 : price}</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* ── CRYPTO ── */}
              {method === "crypto" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-primary-muted border border-primary/20 flex gap-3">
                    <Wallet className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-accent leading-relaxed">
                      Send exactly <strong>${billingCycle === "yearly" ? price * 12 : price} USD</strong> worth of INJ or USDT to the address below. Plan activates within 5 minutes of on-chain confirmation.
                    </p>
                  </div>

                  {Object.entries(CRYPTO_ADDRESSES).map(([token, addr]) => (
                    <div key={token} className="glass-card p-4 border border-border/60">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-[10px] font-bold text-accent">
                            {token[0]}
                          </div>
                          <p className="text-sm font-semibold text-text-primary">{token}</p>
                          <span className="badge-primary text-[10px]">Injective Mainnet</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(addr, token)}
                          className="flex items-center gap-1.5 text-xs text-accent hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-primary/20"
                        >
                          {copied === token
                            ? <><CheckCircle className="h-3.5 w-3.5 text-success" /> Copied</>
                            : <><Copy className="h-3.5 w-3.5" /> Copy</>
                          }
                        </button>
                      </div>
                      <div className="bg-surface-2 rounded-lg px-3 py-2.5 font-mono text-xs text-accent break-all border border-border">
                        {addr}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-text-secondary">After sending:</p>
                    {[
                      "Send from your Injective wallet (Keplr or MetaMask + Injective network)",
                      "Include your email in the memo/note field if possible",
                      "Email a screenshot to: support@injsight.ai with subject 'Crypto Payment — " + user?.email + "'",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                        <span className="text-accent font-bold shrink-0">{i + 1}.</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {step !== "select" && (
            <Button
              variant="accent"
              size="lg"
              className="w-full"
              onClick={() => setSubmitted(true)}
              disabled={method === "card" && (!cardNum || !cardName || !expiry || !cvv)}
            >
              {method === "card"
                ? `Pay $${billingCycle === "yearly" ? price * 12 : price} — Activate ${plan.name}`
                : method === "bank"
                ? "I've Sent the Bank Transfer"
                : "I've Sent the Crypto Payment"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          <p className="text-center text-xs text-text-muted">
            By upgrading you agree to our{" "}
            <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
            Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UpgradePage() {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center h-64">
          <div className="border-2 border-border border-t-accent rounded-full h-8 w-8 animate-spin" />
        </div>
      }>
        <UpgradeContent />
      </Suspense>
    </DashboardLayout>
  );
}
