"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Brain, Zap } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-page flex flex-col lg:flex-row overflow-hidden">
      {/* Left: Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-20 py-12 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo/websiteLogo.png" alt="InjSight AI" width={40} height={40} />
              <span className="text-2xl font-bold text-text-primary tracking-tight">InjSight AI</span>
            </Link>
            <div className="space-y-2 text-center lg:text-left">
              <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">{title}</h1>
              <p className="text-text-secondary">{subtitle}</p>
            </div>
          </div>
          
          <div className="mt-8">
            {children}
          </div>
        </div>

        {/* Mobile footer/disclaimer */}
        <p className="mt-12 text-center text-[10px] text-text-disabled uppercase tracking-widest font-bold">
          Secure & Read-Only Intelligence
        </p>
      </div>

      {/* Right: Trust Panel / Decorative */}
      <div className="hidden lg:flex flex-1 bg-hover/10 border-l border-border/50 relative flex-col items-center justify-center p-20 overflow-hidden">
        {/* Animated Glows */}
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 space-y-12 max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-success/10 border border-success/20 rounded-full text-success text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={12} />
              <span>Verified Non-Custodial</span>
            </div>
            <h2 className="text-4xl font-extrabold text-text-primary leading-tight">
              Master your Injective <br /> 
              <span className="text-primary">DeFi Journey.</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Join thousands of users leveraging AI-powered intelligence to 
              secure assets and maximize yield on the Injective network.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                <Brain className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="text-text-primary font-bold">AI Portfolio Intelligence</h4>
                <p className="text-sm text-text-secondary">Get real-time insights into your holdings and performance.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 group">
              <div className="p-3 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors">
                <Zap className="text-accent" size={24} />
              </div>
              <div>
                <h4 className="text-text-primary font-bold">Smart Risk Guard</h4>
                <p className="text-sm text-text-secondary">Automated security flags and volatility alerts for your assets.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50">
             <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-[#161B22] bg-hover" />
                 ))}
               </div>
               <span className="text-xs text-text-disabled font-medium">Join 2,500+ active Injective Ninjas</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
