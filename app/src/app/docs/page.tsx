import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, BookOpen, Code, Zap, Shield, Brain, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Documentation — InjSight AI" };

const SECTIONS = [
  {
    icon: Zap, color: "text-accent", bg: "bg-accent-muted",
    title: "Quick Start",
    desc: "Get up and running in 5 minutes. Analyze your first Injective wallet.",
    links: [
      { label: "Analyze a wallet", href: "/analyze" },
      { label: "Sign up free", href: "/signup" },
      { label: "Try demo wallet", href: "/analyze?demo=true" },
    ],
  },
  {
    icon: Brain, color: "text-primary", bg: "bg-primary-muted",
    title: "AI Features",
    desc: "Understand how OpenRouter AI and LangChain power wallet intelligence.",
    links: [
      { label: "Ask Your Wallet chat", href: "/dashboard/chat" },
      { label: "AI report guide", href: "/dashboard/reports" },
      { label: "Risk score explained", href: "/security" },
    ],
  },
  {
    icon: Code, color: "text-violet-400", bg: "bg-violet-muted",
    title: "API Reference",
    desc: "Integrate InjSight AI into your own apps with our REST API.",
    links: [
      { label: "API endpoints", href: "/api" },
      { label: "API keys", href: "/api-access" },
      { label: "Webhooks", href: "/dashboard/webhooks" },
    ],
  },
  {
    icon: Shield, color: "text-success", bg: "bg-success-muted",
    title: "Security",
    desc: "Read-only architecture, non-custodial design, and data privacy.",
    links: [
      { label: "Security overview", href: "/security" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Paste any Injective wallet", desc: "Enter any inj1... address. No wallet connection or sign-up required for public analysis." },
  { step: "02", title: "InjSight fetches on-chain data", desc: "We query Injective Mainnet LCD nodes for live token balances, staking positions, and transaction history." },
  { step: "03", title: "AI analyzes and scores", desc: "Our LangChain agent computes a multi-factor risk score and sends the portfolio to OpenRouter AI for plain-English insights." },
  { step: "04", title: "Get actionable intelligence", desc: "View risk score, portfolio breakdown, AI report, suggested next steps, and chat with AI about any wallet." },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="bg-surface/50 border-b border-border py-16">
          <div className="page-container text-center">
            <p className="section-label mb-3">Documentation</p>
            <h1 className="text-4xl font-bold text-text-primary mb-4">InjSight AI Docs</h1>
            <p className="text-text-secondary max-w-xl mx-auto mb-6">
              Everything you need to understand, use, and integrate InjSight AI.
            </p>
            <div className="relative max-w-sm mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input placeholder="Search docs..." className="input-field pl-9 text-sm" />
            </div>
          </div>
        </div>

        <div className="page-container py-16">
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {SECTIONS.map(({ icon: Icon, color, bg, title, desc, links }) => (
              <div key={title} className="glass-card-hover p-6">
                <div className={`inline-flex p-2.5 rounded-lg ${bg} mb-4`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <h2 className="text-base font-bold text-text-primary mb-1">{title}</h2>
                <p className="text-sm text-text-secondary mb-4">{desc}</p>
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="flex items-center gap-2 text-sm text-accent hover:underline">
                        <ArrowRight className="h-3.5 w-3.5" /> {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {HOW_IT_WORKS.map(({ step, title, desc }) => (
                <div key={step} className="glass-card p-5 text-center">
                  <div className="text-3xl font-bold gradient-text mb-3">{step}</div>
                  <h3 className="text-sm font-semibold text-text-primary mb-2">{title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
