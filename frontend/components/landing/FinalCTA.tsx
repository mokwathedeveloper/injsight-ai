import * as React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-primary px-8 py-12 md:py-16 md:px-16 overflow-hidden shadow-[0_0_80px_-20px_rgba(0,102,255,0.6)]">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-3xl -z-0 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 blur-3xl -z-0 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight">
                Start Analyzing in Seconds — <br className="hidden md:block" /> No Sign-up Required
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Paste a wallet address and unlock AI wallet intelligence now.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg font-bold group px-10 shadow-xl"
              >
                <span>Analyze Wallet Now</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
