"use client";

import * as React from "react";
import { SuggestedAction, ActionCategory } from "@/types/next-steps";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  ExternalLink, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  Layers, 
  Lock 
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_CONFIG: Record<ActionCategory, { icon: any; color: string; bgColor: string }> = {
  yield: { icon: TrendingUp, color: "text-success", bgColor: "bg-success/10" },
  risk: { icon: ShieldAlert, color: "text-warning", bgColor: "bg-warning/10" },
  portfolio: { icon: Layers, color: "text-primary", bgColor: "bg-primary/10" },
  security: { icon: Lock, color: "text-accent", bgColor: "bg-accent/10" },
};

interface NextStepRowProps {
  action: SuggestedAction;
  index: number;
}

export function NextStepRow({ action, index }: NextStepRowProps) {
  const config = CATEGORY_CONFIG[action.category];
  const Icon = config.icon;

  return (
    <div 
      className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-hover/20 rounded-2xl border border-border/50 group hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4 flex-1">
        <div className={cn("p-3 rounded-xl shrink-0 mt-1", config.bgColor)}>
          <Icon size={20} className={config.color} />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
              {action.title}
            </h4>
            <Badge variant="secondary" className="text-[9px] py-0 px-1.5 lowercase h-4">
              {action.category}
            </Badge>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
            {action.description}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center md:justify-end">
        <a 
          href={action.actionUrl} 
          target={action.isExternal ? "_blank" : undefined} 
          rel={action.isExternal ? "noopener noreferrer" : undefined}
          className="w-full md:w-auto"
          aria-label={action.isExternal ? `Open ${action.actionLabel} in a new tab` : action.actionLabel}
          title={action.isExternal ? "External Injective Protocol" : "Internal App View"}
        >
          <Button 
            variant={action.category === 'risk' || action.category === 'security' ? 'secondary' : 'primary'} 
            size="sm" 
            className="w-full md:w-auto font-bold text-xs h-10 px-6 group/btn"
          >
            <span>{action.actionLabel}</span>
            {action.isExternal ? (
              <ExternalLink size={12} className="ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
            ) : (
              <ArrowRight size={12} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            )}
          </Button>
        </a>
      </div>
    </div>
  );
}
