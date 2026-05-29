import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, Shield } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="page-section">
      <div className="page-container">
        <div className="relative rounded-2xl overflow-hidden border border-accent/20 bg-gradient-to-r from-primary/10 via-surface to-accent/10 p-10 md:p-16 text-center">
          {/* Background glows */}
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Start Analyzing in Seconds —{" "}
              <span className="gradient-text">No Sign-up Required</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Paste any Injective wallet address and get AI-powered intelligence instantly.
              Create a free account to save wallets and unlock alerts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="/analyze">
                  Analyze a Wallet Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/signup">Create Free Account</Link>
              </Button>
            </div>

            <p className="flex items-center justify-center gap-2 text-xs text-text-muted">
              <Shield className="h-3.5 w-3.5 text-success" />
              InjSight is a read-only analytics platform. We never access your funds or private data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
