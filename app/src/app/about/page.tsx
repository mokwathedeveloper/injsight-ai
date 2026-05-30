import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, Shield, Globe, Zap } from "lucide-react";

export const metadata: Metadata = { title: "About — InjSight AI" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <div className="page-container page-section text-center max-w-3xl mx-auto">
          <p className="section-label mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            AI Wallet Intelligence for <span className="gradient-text">Injective DeFi</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            InjSight AI was built to solve a real problem: Injective DeFi users have no native
            AI-powered tool to understand wallet risk, portfolio composition, or get plain-English
            insights from on-chain data.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-surface/40 border-y border-border py-16">
          <div className="page-container max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">Our Mission</h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Make complex Injective on-chain data understandable, trustworthy, and actionable
                  for every DeFi user — from beginners to institutional analysts.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  We believe AI-powered analytics should be accessible to everyone, not just
                  those who can afford $150/month enterprise subscriptions.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Brain, color: "text-accent", bg: "bg-accent-muted", title: "AI-Native", desc: "Every analysis is powered by LLM intelligence" },
                  { icon: Shield, color: "text-success", bg: "bg-success-muted", title: "Read-Only", desc: "Zero custody, zero private keys, ever" },
                  { icon: Globe, color: "text-primary", bg: "bg-primary-muted", title: "Injective-First", desc: "Purpose-built for the Injective ecosystem" },
                  { icon: Zap, color: "text-warning", bg: "bg-warning-muted", title: "Real-Time", desc: "Live on-chain data, not cached snapshots" },
                ].map(({ icon: Icon, color, bg, title, desc }) => (
                  <div key={title} className="glass-card p-4">
                    <div className={`inline-flex p-2 rounded-lg ${bg} mb-2`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <p className="text-xs font-bold text-text-primary">{title}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Built for hackathon */}
        <div className="page-container py-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Built at Injective Solo AI Builder Sprint</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            InjSight AI was created during the Injective Solo AI Builder Sprint (May 2026),
            a hackathon focused on discovering high-quality AI-powered repositories for the
            Injective ecosystem.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "53", label: "Pages built" },
              { value: "100%", label: "Real on-chain data" },
              { value: "0", label: "Mock data" },
            ].map(({ value, label }) => (
              <div key={label} className="glass-card p-4">
                <p className="text-2xl font-bold gradient-text">{value}</p>
                <p className="text-xs text-text-muted mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
