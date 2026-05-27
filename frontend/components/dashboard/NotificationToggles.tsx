"use client";

import * as React from "react";
import { Bell, TrendingUp, ShieldAlert, FileText, Globe, RefreshCcw, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToggleItemProps {
  icon: any;
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

function ToggleItem({ icon: Icon, label, description, isEnabled, onToggle }: ToggleItemProps) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 hover:bg-hover/20 rounded-xl transition-colors group">
      <div className="flex items-start gap-4">
        <div className={cn(
          "p-2 rounded-lg shrink-0 mt-0.5 transition-colors",
          isEnabled ? "bg-primary/10 text-primary" : "bg-hover text-text-disabled"
        )}>
          <Icon size={18} />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
            {label}
          </p>
          <p className="text-[10px] text-text-secondary leading-relaxed max-w-sm">
            {description}
          </p>
        </div>
      </div>

      <button 
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page mt-1",
          isEnabled ? "bg-primary" : "bg-hover"
        )}
      >
        <span 
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            isEnabled ? "translate-x-5" : "translate-x-0"
          )} 
        />
      </button>
    </div>
  );
}

export function NotificationToggles() {
  const [prefs, setPrefs] = React.useState({
    risk: true,
    yield: true,
    weekly: false,
    security: true,
  });

  return (
    <div className="space-y-2">
      <ToggleItem 
        icon={ShieldAlert}
        label="Critical Risk Alerts"
        description="Get instant notifications when high volatility or security threats are detected in your tracked wallets."
        isEnabled={prefs.risk}
        onToggle={() => setPrefs({ ...prefs, risk: !prefs.risk })}
      />
      <ToggleItem 
        icon={TrendingUp}
        label="Yield Opportunities"
        description="Receive alerts for new staking incentives, pool rewards, and optimized yield strategies on Injective."
        isEnabled={prefs.yield}
        onToggle={() => setPrefs({ ...prefs, yield: !prefs.yield })}
      />
      <ToggleItem 
        icon={FileText}
        label="Weekly Intelligence Audit"
        description="A comprehensive summary of your entire portfolio's performance and risk delivered every Monday."
        isEnabled={prefs.weekly}
        onToggle={() => setPrefs({ ...prefs, weekly: !prefs.weekly })}
      />
      <ToggleItem 
        icon={Bell}
        label="System Updates"
        description="Stay informed about new feature releases, protocol integrations, and platform maintenance."
        isEnabled={prefs.security}
        onToggle={() => setPrefs({ ...prefs, security: !prefs.security })}
      />
    </div>
  );
}

export function DisplayPreferences() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-text-secondary px-1">
          <DollarSign size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Base Currency</span>
        </div>
        <div className="flex bg-card border border-border rounded-xl p-1">
          {["USD", "EUR", "BTC", "INJ"].map((cur) => (
            <button 
              key={cur}
              className={cn(
                "flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                cur === "USD" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-disabled hover:text-text-primary"
              )}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-text-secondary px-1">
          <RefreshCcw size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Data Refresh Rate</span>
        </div>
        <div className="flex bg-card border border-border rounded-xl p-1">
          {["5m", "15m", "1h", "1d"].map((rate) => (
            <button 
              key={rate}
              className={cn(
                "flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                rate === "15m" ? "bg-hover text-text-primary border border-border-strong shadow-sm" : "text-text-disabled hover:text-text-primary"
              )}
            >
              {rate}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
