import { Shield } from "lucide-react";

export function ReadOnlySafetyMessage() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-success-muted border border-success/20">
      <Shield className="h-4 w-4 text-success shrink-0 mt-0.5" />
      <p className="text-xs text-text-secondary leading-relaxed">
        <strong className="text-success">Read-Only Platform:</strong> InjSight is a read-only analytics
        platform. We never access your funds or private data. All analysis is based solely on public
        on-chain data from the Injective blockchain. We do not store your wallet address or any personal
        information unless you choose to create an account.{" "}
        <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
}
