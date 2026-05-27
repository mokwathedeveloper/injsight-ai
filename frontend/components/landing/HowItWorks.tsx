import * as React from "react";
import { landingData } from "@/data/landing";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-border bg-hover/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">How It Works</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Three simple steps to unlock deep wallet intelligence.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t border-dashed border-primary/30 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {landingData.steps.map((step, index) => (
              <div key={step.number} className="relative text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-text-primary text-2xl font-bold mx-auto shadow-[0_0_40px_-10px_rgba(0,102,255,0.5)]">
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-text-primary">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
