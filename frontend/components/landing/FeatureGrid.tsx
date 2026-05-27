import * as React from "react";
import { Card } from "@/components/ui/Card";
import { landingData } from "@/data/landing";
import { Brain, Shield, PieChart, Bell } from "lucide-react";

const iconMap: Record<string, any> = {
  Brain,
  Shield,
  PieChart,
  Bell,
};

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
              Powerful Insights for <br />
              <span className="text-primary">Smarter Decisions</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
              Stop digging through block explorers. Get clear, actionable intelligence 
              on any Injective address instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {landingData.features.map((feature) => {
                const Icon = iconMap[feature.icon];
                return (
                  <Card key={feature.id} className="p-6 bg-hover/20 hover:bg-hover/40 transition-all border-border-strong group">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {Icon && <Icon className="text-primary" size={24} />}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Visual representation of features - stylized grid */}
            <div className="grid grid-cols-2 gap-4 p-8 bg-hover/20 rounded-3xl border border-border">
               <div className="aspect-square bg-card rounded-2xl border border-border shadow-2xl flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
               </div>
               <div className="aspect-square bg-card rounded-2xl border border-border shadow-2xl translate-y-12 flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/20 to-success/20" />
               </div>
               <div className="aspect-square bg-card rounded-2xl border border-border shadow-2xl -translate-y-8 flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-success/20 to-primary/20" />
               </div>
               <div className="aspect-square bg-card rounded-2xl border border-border shadow-2xl translate-y-4 flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-warning/20" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
