import * as React from "react";
import { TrustBadge } from "./TrustBadge";
import { ReadOnlyArchitectureDiagram } from "./ReadOnlyArchitectureDiagram";
import { Eye, Lock, ShieldCheck, Sparkles, ServerCog, FileLock2 } from "lucide-react";

const BADGES = [
  { icon: Eye, title: "Read-only by design", description: "We only read public on-chain data. There is no path in our system to move or touch your funds." },
  { icon: Lock, title: "Non-custodial", description: "We never take custody of assets. No wallet connection or transaction signing is required to analyze." },
  { icon: ShieldCheck, title: "No secrets, ever", description: "We never ask for private keys or seed phrases. Anyone who does is attempting to scam you." },
  { icon: Sparkles, title: "Safe AI output", description: "AI insights are structured, disclaimer-backed, and never phrased as direct buy/sell instructions." },
  { icon: ServerCog, title: "Hardened infrastructure", description: "Rate limiting, input validation, and monitoring protect the platform from abuse and failures." },
  { icon: FileLock2, title: "Your data, your control", description: "Delete saved wallets, reports, and your account at any time from privacy controls." },
];

export function SecuritySection() {
  return (
    <section className="space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/20 rounded-full text-success text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck size={12} /> Security & Trust
        </span>
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Built read-only. Built to be trusted.</h2>
        <p className="text-text-secondary leading-relaxed">
          InjSight AI analyzes public Injective wallet data to deliver intelligence — without ever requesting custody,
          private keys, or permission to move funds.
        </p>
      </div>

      <ReadOnlyArchitectureDiagram />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BADGES.map((b) => (
          <TrustBadge key={b.title} {...b} />
        ))}
      </div>
    </section>
  );
}
