import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";
import { Shield, Brain, Bell, Lock } from "lucide-react";

export const metadata: Metadata = { title: "Sign Up — InjSight AI" };

const benefits = [
  { icon: Brain,  title: "Read-Only by Design",   desc: "We only read public blockchain data. Never your keys, assets, or custody permissions." },
  { icon: Shield, title: "Non-Custodial",          desc: "We never take custody of anything. Analysis only." },
  { icon: Lock,   title: "Enterprise-Grade Security", desc: "Bank-level encryption and security practices protect your account." },
  { icon: Bell,   title: "No Private Keys",        desc: "We never ask for seed phrases or private keys." },
];

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-80 shrink-0 bg-surface border-r border-border p-8">
        <Logo />
        <p className="text-xs text-text-muted mt-1">AI Wallet Intelligence for Injective DeFi</p>

        <div className="mt-10">
          <h2 className="text-base font-semibold text-text-primary mb-1">Create your account</h2>
          <p className="text-xs text-text-secondary mb-8">
            Join thousands of DeFi users who analyse smarter and manage risk with AI.
          </p>

          <div className="space-y-4">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <div className="p-2 rounded-lg bg-surface-2 shrink-0 h-fit">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-primary">{title}</p>
                  <p className="text-[11px] text-text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <div className="p-3 rounded-lg bg-surface-2 border border-border">
            <p className="text-[10px] font-bold text-warning uppercase tracking-wider mb-1">Important</p>
            <p className="text-[11px] text-text-muted leading-relaxed">
              InjSight provides informational insights about wallets only and is not financial advice.
              Always do your own research.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-text-primary">Sign up for InjSight AI</h1>
            <p className="text-xs text-text-muted">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">Log In</Link>
            </p>
          </div>

          <p className="text-sm text-text-secondary mb-6">
            Start analysing wallets and uncovering AI-powered insights.
          </p>

          <SignUpForm />
        </div>
      </div>

      {/* Why users trust */}
      <div className="hidden xl:flex flex-col w-72 shrink-0 bg-surface border-l border-border p-8">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Why users trust InjSight AI</h3>
        <div className="space-y-4">
          {[
            { title: "AI-Powered Insights",      desc: "Our AI analyses multiple risk factors to help you stay ahead." },
            { title: "Portfolio Intelligence",   desc: "Visualise asset distribution, concentration, and portfolio health." },
            { title: "Smart Alerts",             desc: "Receive immediate updates about risk changes and transfers." },
            { title: "100% Read-Only",           desc: "Built from the ground up for security. No custody, ever." },
          ].map(({ title, desc }) => (
            <div key={title} className="border-l-2 border-accent/30 pl-3">
              <p className="text-xs font-semibold text-text-primary">{title}</p>
              <p className="text-[11px] text-text-muted mt-0.5">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 rounded-lg bg-accent-muted border border-accent/20">
          <p className="text-xs font-semibold text-accent mb-1">Trusted by the Injective Community</p>
          <p className="text-[11px] text-text-muted">Backed by power users of the Injective ecosystem.</p>
        </div>
      </div>
    </div>
  );
}
