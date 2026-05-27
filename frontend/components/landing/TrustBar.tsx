import * as React from "react";
import { ShieldCheck, ShieldAlert, Zap, Cpu } from "lucide-react";
import Image from "next/image";

export function TrustBar() {
  return (
    <div className="bg-hover/30 border-y border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Trust Pillars */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <TrustItem icon={<ShieldCheck className="text-primary" size={20} />} label="Read-Only Non-Custodial" />
            <TrustItem icon={<ShieldAlert className="text-primary" size={20} />} label="No Private Keys Ever Required" />
            <TrustItem icon={<Cpu className="text-primary" size={20} />} label="AI-Powered Wallet Intelligence" />
            <TrustItem icon={<Zap className="text-primary" size={20} />} label="Built for Injective" />
          </div>

          {/* Partner Logos */}
          <div className="flex items-center space-x-8 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <span className="text-[10px] font-bold text-text-disabled uppercase tracking-[0.2em] whitespace-nowrap">Trusted by users on</span>
            <div className="flex items-center space-x-8">
               <span className="text-text-primary font-bold tracking-tighter text-xl">INJECTIVE</span>
               <span className="text-text-primary font-bold tracking-tighter text-xl">HELIX</span>
               <span className="text-text-primary font-bold tracking-tighter text-xl">WAGMI</span>
               <span className="text-text-primary font-bold tracking-tighter text-xl">ASTROPORT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-lg bg-page border border-border flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <span className="text-sm font-semibold text-text-secondary leading-tight max-w-[120px]">
        {label}
      </span>
    </div>
  );
}
