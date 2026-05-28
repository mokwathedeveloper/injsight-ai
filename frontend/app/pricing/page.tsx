"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FAQSection } from "@/components/pricing/FAQSection";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 space-y-32">
        {/* Header Hero */}
        <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
             <Sparkles size={12} />
             <span>Institutional Grade Intelligence</span>
           </div>
           <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             Plans that scale with <br />
             <span className="text-primary">your ambition.</span>
           </h1>
           <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             Unlock deep-chain analytics, automated risk monitoring, and priority 
             AI audits. No private keys, no custody, just pure intelligence.
           </p>
        </section>

        {/* Pricing Tiers Section */}
        <PricingTiers />

        {/* Comparison Section */}
        <section className="space-y-16">
          <div className="text-center px-4">
             <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">Compare technical features</h2>
             <p className="text-text-secondary mt-2">Deep dive into our tiered intelligence capabilities.</p>
          </div>
          <ComparisonTable />
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-4">
           <div className="bg-primary p-12 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Ready to master Injective?</h2>
                    <p className="text-white/80 max-w-md leading-relaxed">
                       Start with a free account today and see why top Ninjas choose 
                       InjSight AI for their portfolio surveillance.
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <button className="h-14 px-10 bg-white text-primary font-bold uppercase tracking-widest rounded-2xl hover:bg-white/90 transition-all shadow-xl">
                       Get Started Free
                    </button>
                    <button className="h-14 px-10 bg-primary-hover text-white border border-white/20 font-bold uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                       Contact Sales
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
