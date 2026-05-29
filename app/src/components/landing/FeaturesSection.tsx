import { Brain, Shield, TrendingUp, Bell, FileText, Zap, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get plain-English AI analysis of any wallet — risk factors, concentration, and strategic suggestions.",
    color: "text-accent",
    bg: "bg-accent-muted",
  },
  {
    icon: TrendingUp,
    title: "Risk Score Engine",
    description: "Quantified risk scores across concentration, volatility, DeFi exposure, and liquidity factors.",
    color: "text-primary",
    bg: "bg-primary-muted",
  },
  {
    icon: Shield,
    title: "Portfolio Composition",
    description: "Visual breakdown of token allocations, asset categories, and portfolio diversification metrics.",
    color: "text-success",
    bg: "bg-success-muted",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive instant updates about risk changes, large transfers, and significant portfolio shifts.",
    color: "text-warning",
    bg: "bg-warning-muted",
  },
  {
    icon: FileText,
    title: "Exportable Reports",
    description: "Generate and share professional PDF reports. Build shareable links for team collaboration.",
    color: "text-violet-400",
    bg: "bg-violet-muted",
  },
  {
    icon: Globe,
    title: "Injective Ecosystem",
    description: "Deep Injective-native data: spot markets, perpetuals, staking, governance, and DEX activity.",
    color: "text-accent",
    bg: "bg-accent-muted",
  },
  {
    icon: Zap,
    title: "Real-Time Data",
    description: "Live portfolio values, transaction history, and market context updated in real time.",
    color: "text-warning",
    bg: "bg-warning-muted",
  },
  {
    icon: Lock,
    title: "100% Read-Only",
    description: "We never ask for private keys or seed phrases. Pure on-chain data, fully non-custodial.",
    color: "text-success",
    bg: "bg-success-muted",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="page-section border-t border-border/50">
      <div className="page-container">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Powerful Insights for Smarter Decisions
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Everything you need to understand any Injective wallet — from raw on-chain data to
            AI-generated strategic insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glass-card-hover p-5 group">
                <div className={`inline-flex p-2.5 rounded-lg ${feature.bg} mb-4`}>
                  <Icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
