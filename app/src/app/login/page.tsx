import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";
import { Shield, Brain, TrendingUp, Bell } from "lucide-react";

export const metadata: Metadata = { title: "Log In — InjSight AI" };

const trustPoints = [
  { icon: Shield,    title: "Read-Only & Non-Custodial",    desc: "We only read public blockchain data. Never your keys, assets, or custody permissions." },
  { icon: Brain,     title: "Your Security First",          desc: "We don't store private keys or seed phrases. Analysis only, nothing more." },
  { icon: TrendingUp,title: "Enterprise-Grade Security",    desc: "Bank-level encryption and infrastructure protect your account and data at all times." },
  { icon: Bell,      title: "Smart Risk Alerts",            desc: "Get notified instantly about changes to wallets you monitor." },
];

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left trust panel */}
      <div className="hidden lg:flex flex-col w-80 shrink-0 bg-surface border-r border-border p-8">
        <Logo />
        <p className="text-[11px] text-text-muted mt-1">AI Wallet Intelligence for Injective DeFi</p>

        <div className="mt-10 flex-1">
          <h2 className="text-base font-bold text-text-primary mb-1">Welcome back!</h2>
          <p className="text-xs text-text-secondary mb-8 leading-relaxed">
            Log in to access your saved wallets, AI reports, alerts and portfolio insights.
          </p>

          <div className="space-y-5">
            {trustPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="p-2 rounded-lg bg-surface-2 shrink-0 h-fit mt-0.5">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-primary">{title}</p>
                  <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="p-3 rounded-lg bg-success-muted border border-success/20">
            <p className="text-[10px] font-bold text-success uppercase tracking-wider mb-1">100% Read-Only</p>
            <p className="text-[11px] text-text-muted leading-relaxed">
              Built for security. We never access your funds or private data.
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Log in to InjSight AI</h1>
            <p className="text-sm text-text-secondary mt-1">
              Access your dashboard and continue your analysis.
            </p>
          </div>

          <div className="glass-card p-6">
            <LoginForm />
          </div>

          <p className="text-center text-xs text-text-muted mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline font-medium">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right panel — why users trust */}
      <div className="hidden xl:flex flex-col w-72 shrink-0 bg-surface border-l border-border p-8">
        <h3 className="text-sm font-semibold text-text-primary mb-5">Why users trust InjSight AI</h3>
        <div className="space-y-4">
          {[
            { title: "AI-Powered Insights",     desc: "Get actionable intelligence on any Injective wallet — risk, portfolio, and DeFi health." },
            { title: "Advanced Risk Analysis",  desc: "Our risk engine evaluates multiple risk factors to help you stay ahead." },
            { title: "Portfolio Intelligence",  desc: "Visualise asset distribution, concentration, and full portfolio health at a glance." },
            { title: "Smart Alerts",            desc: "Instant updates about risk changes, large transfers and wallet activity." },
            { title: "100% Read-Only",          desc: "Built from the ground up for security. No custody, no private keys, ever." },
          ].map(({ title, desc }) => (
            <div key={title} className="border-l-2 border-accent/30 pl-3">
              <p className="text-xs font-semibold text-text-primary">{title}</p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <div className="p-3 rounded-lg bg-accent-muted border border-accent/20">
            <p className="text-xs font-semibold text-accent mb-1">Trusted by the Injective Community</p>
            <p className="text-[11px] text-text-muted">Backed by power users across the Injective DeFi ecosystem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
