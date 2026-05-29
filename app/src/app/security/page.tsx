import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Lock,
  Eye,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Server,
  Database,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security — InjSight AI",
  description: "Learn how InjSight AI keeps your data safe with read-only, non-custodial architecture.",
};

// ── data ───────────────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: Eye,       title: "Read-Only",        desc: "We only read public blockchain data. Never write."       },
  { icon: Lock,      title: "No Custody",        desc: "Funds stay in your wallet. We never hold assets."        },
  { icon: KeyRound,  title: "No Private Keys",   desc: "Your keys are never requested or stored."                },
  { icon: ShieldCheck, title: "AI Safety",       desc: "Outputs are advisory only — you stay in control."        },
];

const FLOW_STEPS = [
  { step: "1", label: "Your Wallet",      desc: "Your Injective address",                 color: "bg-primary/10 border-primary/30 text-accent"    },
  { step: "2", label: "Injective Chain",  desc: "Public on-chain data",                   color: "bg-surface-3 border-border text-text-secondary" },
  { step: "3", label: "InjSight AI",      desc: "Aggregation engine",                     color: "bg-accent/10 border-accent/30 text-accent"      },
  { step: "4", label: "AI Analysis",      desc: "GPT-4 powered intelligence",             color: "bg-purple-500/10 border-purple-500/30 text-purple-300" },
  { step: "5", label: "You See Results",  desc: "Insights displayed to you only",         color: "bg-success/10 border-success/30 text-success"   },
];

const PRINCIPLES = [
  {
    icon: Eye,
    title: "Read-Only by Design",
    desc: "InjSight AI exclusively reads from public Injective blockchain data. We never submit transactions, request signatures, or interact with any wallet functions. Our platform has zero write access to any blockchain.",
  },
  {
    icon: Lock,
    title: "Data Minimization",
    desc: "We collect only the wallet addresses you explicitly provide. No email is required to analyze a wallet. No cookies track your behavior across sessions. Analytics are aggregated and anonymized.",
  },
  {
    icon: ShieldCheck,
    title: "Infrastructure Security",
    desc: "All data in transit is encrypted with TLS 1.3. Our APIs are rate-limited and protected against DDoS attacks. Databases are encrypted at rest with AES-256. Access logs are retained for 90 days.",
  },
  {
    icon: KeyRound,
    title: "No Authentication Required",
    desc: "Analyzing public wallet data requires no account. When you create an account to save wallets, your password is hashed with bcrypt — we never store plaintext credentials.",
  },
];

const CERTS = [
  { label: "SOC 2 Type II",       sub: "In progress" },
  { label: "TLS 1.3",             sub: "Enforced"    },
  { label: "DDoS Protection",     sub: "Always On"   },
  { label: "Dependency Audits",   sub: "Weekly"      },
  { label: "Secure Infrastructure", sub: "AWS / GCP" },
  { label: "Data Minimization",   sub: "GDPR Aligned"},
];

const FAQS = [
  {
    q: "Can InjSight AI access or move my funds?",
    a: "No. InjSight AI is a read-only analytics platform. We only query public blockchain data using your wallet address. We have no mechanism to initiate transactions, request signatures, or interact with your wallet in any way.",
  },
  {
    q: "Do you store my wallet address?",
    a: "Only if you explicitly save it to your account. Guest analyses are ephemeral — we do not persist addresses from unregistered sessions. Saved wallets are stored encrypted and associated only with your account.",
  },
  {
    q: "Is my AI chat conversation stored?",
    a: "Chat sessions are retained temporarily to maintain context within a single session. We do not use your conversations to train AI models. Conversations are purged after 30 days of inactivity.",
  },
  {
    q: "What data do you query from Injective?",
    a: "We query publicly available on-chain data: token balances, transaction history (last 90 days), DeFi protocol positions, staking data, and governance participation. All of this is already publicly visible on Injective Explorer.",
  },
  {
    q: "How do I request deletion of my data?",
    a: "Log in to your account, go to Settings → Privacy, and click 'Delete Account'. All your data including saved wallets, report history, and chat logs will be permanently deleted within 72 hours.",
  },
];

// ── FAQ item (client-side accordion handled via pure CSS) ─────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="glass-card group">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
        <span className="text-sm font-medium text-text-primary">{q}</span>
        <ChevronDown className="h-4 w-4 text-text-muted shrink-0 ml-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">
        <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
      </div>
    </details>
  );
}

// ── page ───────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="page-section bg-gradient-to-b from-surface/50 to-background">
          <div className="page-container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-accent text-xs font-semibold mb-5">
                <ShieldCheck className="h-3.5 w-3.5" /> Security &amp; Trust Center
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">
                Security You Can Trust
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed">
                InjSight AI is built on a foundation of read-only access, data minimization, and transparent security practices. Your funds and private keys are never at risk.
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRUST_BADGES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card-hover p-5 text-center">
                  <div className="mx-auto mb-3 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-sm font-semibold text-text-primary mb-1">{title}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Read-Only Architecture Flow */}
        <section className="page-section">
          <div className="page-container">
            <div className="text-center mb-10">
              <p className="section-label mb-2">Architecture</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Read-Only Architecture
              </h2>
              <p className="mt-2 text-text-secondary text-sm max-w-lg mx-auto">
                Every data flow in InjSight AI is strictly one-directional — from the blockchain to you.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 flex-wrap">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.step} className="flex items-center gap-3">
                  <div className={`glass-card border px-5 py-4 text-center min-w-[130px] ${step.color}`}>
                    <div className="text-xs font-bold opacity-60 mb-1">Step {step.step}</div>
                    <p className="text-sm font-semibold">{step.label}</p>
                    <p className="text-[11px] opacity-70 mt-1">{step.desc}</p>
                  </div>
                  {i < FLOW_STEPS.length - 1 && (
                    <ArrowRight className="h-5 w-5 text-text-muted shrink-0 hidden md:block" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-text-muted mt-6">
              At no point in this flow does InjSight AI have write access to your wallet or private keys.
            </p>
          </div>
        </section>

        {/* Security Principles */}
        <section className="page-section bg-surface/20">
          <div className="page-container">
            <div className="text-center mb-10">
              <p className="section-label mb-2">Principles</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Our Security Principles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {PRINCIPLES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-6 flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-2">{title}</p>
                    <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="page-section">
          <div className="page-container">
            <div className="text-center mb-10">
              <p className="section-label mb-2">Compliance</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Security Certifications &amp; Practices
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {CERTS.map(({ label, sub }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="h-4 w-4 text-success" />
                  </div>
                  <p className="text-xs font-semibold text-text-primary">{label}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="page-section bg-surface/20">
          <div className="page-container max-w-2xl">
            <div className="text-center mb-10">
              <p className="section-label mb-2">FAQ</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">Security Questions</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="mt-10 text-center glass-card p-6">
              <Server className="h-8 w-8 text-accent mx-auto mb-3" />
              <p className="text-sm font-semibold text-text-primary mb-2">Still have security questions?</p>
              <p className="text-xs text-text-secondary mb-4">
                Reach out to our security team directly at{" "}
                <a href="mailto:security@injsight.ai" className="text-accent hover:underline">
                  security@injsight.ai
                </a>
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a href="mailto:security@injsight.ai" className="btn-secondary text-xs">
                  <Database className="h-3.5 w-3.5" /> Contact Security Team
                </a>
                <a href="/docs/security" className="btn-ghost text-xs">
                  Read Security Docs →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
