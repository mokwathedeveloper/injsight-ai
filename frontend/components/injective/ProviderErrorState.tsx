import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ServerCrash } from "lucide-react";

interface ProviderErrorStateProps {
  provider?: string;
  onRetry?: () => void;
}

export function ProviderErrorState({ provider = "Injective indexer", onRetry }: ProviderErrorStateProps) {
  return (
    <Card className="p-10 text-center space-y-4 border-error/30 bg-error/5">
      <div className="w-14 h-14 rounded-full bg-error/10 border border-error/30 flex items-center justify-center mx-auto text-error">
        <ServerCrash size={24} />
      </div>
      <div className="space-y-1">
        <p className="text-text-primary font-bold">Could not reach {provider}</p>
        <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
          On-chain data is temporarily unavailable. This is a provider issue, not your wallet — your funds and data are safe.
        </p>
      </div>
      {onRetry && (
        <Button variant="secondary" className="border-border-strong" onClick={onRetry}>
          Retry fetch
        </Button>
      )}
    </Card>
  );
}
