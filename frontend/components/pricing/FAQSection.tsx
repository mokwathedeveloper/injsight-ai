"use client";

import * as React from "react";
import { PRICING_FAQ } from "@/data/pricing-data";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mx-auto">
          <MessageCircleQuestion size={12} />
          <span>Support Hub</span>
        </div>
        <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
           Frequently Asked Questions
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed max-w-lg mx-auto">
           Everything you need to know about InjSight AI billing, security, 
           and data intelligence models.
        </p>
      </div>

      <div className="space-y-4">
        {PRICING_FAQ.map((item, index) => (
          <div 
            key={index} 
            className={cn(
              "border border-border rounded-2xl overflow-hidden transition-all duration-300",
              openIndex === index ? "bg-hover/20 border-border-strong" : "bg-card hover:border-border-strong hover:bg-hover/10"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-sm font-bold text-text-primary pr-8">
                {item.question}
              </span>
              <ChevronDown 
                size={18} 
                className={cn(
                  "text-text-disabled transition-transform duration-300",
                  openIndex === index && "rotate-180 text-primary"
                )} 
              />
            </button>
            
            <div className={cn(
              "grid transition-all duration-300 ease-in-out",
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-sm text-text-secondary leading-relaxed border-t border-border/50 pt-4 mx-6 mt-0">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-hover/10 border border-dashed border-border rounded-2xl text-center space-y-4">
         <p className="text-sm text-text-secondary">Still have questions? Our Injective Ninjas are here to help.</p>
         <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">
            Contact Support Team
         </button>
      </div>
    </div>
  );
}
