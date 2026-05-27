import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Github, Mail, Chrome, MessageCircle } from "lucide-react";

export function SocialAuthButtons() {
  const providers = [
    { name: "Google", icon: Chrome, color: "hover:bg-[#4285F4]/10 hover:border-[#4285F4]/30" },
    { name: "Discord", icon: MessageCircle, color: "hover:bg-[#5865F2]/10 hover:border-[#5865F2]/30" },
    { name: "GitHub", icon: Github, color: "hover:bg-text-primary/10 hover:border-text-primary/30" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {providers.map((p) => {
        const Icon = p.icon;
        return (
          <Button 
            key={p.name} 
            variant="secondary" 
            className={`h-11 border-border/50 bg-hover/10 transition-all ${p.color}`}
            title={`Continue with ${p.name}`}
          >
            <Icon size={18} />
            <span className="sm:hidden ml-2 font-bold text-xs uppercase tracking-wider">
              {p.name}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
