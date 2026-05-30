import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Brain, TrendingUp, Shield, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Blog — InjSight AI" };

const POSTS = [
  {
    icon: Brain, color: "text-accent", bg: "bg-accent-muted",
    title: "Introducing InjSight AI: AI-Powered Wallet Intelligence for Injective DeFi",
    excerpt: "We built InjSight AI to solve a real problem: Injective DeFi users have no native tool to understand wallet risk in plain English. Today we're changing that.",
    date: "May 30, 2026",
    readTime: "5 min read",
    tag: "Product",
  },
  {
    icon: TrendingUp, color: "text-primary", bg: "bg-primary-muted",
    title: "How We Use LangChain ReAct Agents to Analyze Injective Wallets",
    excerpt: "Deep dive into our multi-tool agent architecture: InjectiveWalletTool, RiskAnalysisTool, LivePriceTool, and PortfolioInsightsTool working together.",
    date: "May 28, 2026",
    readTime: "8 min read",
    tag: "Engineering",
  },
  {
    icon: Shield, color: "text-success", bg: "bg-success-muted",
    title: "Why Read-Only Analytics Is the Right Approach for DeFi Intelligence",
    excerpt: "Non-custodial, read-only analysis isn't just a feature — it's a fundamental design principle that makes InjSight AI trustworthy by default.",
    date: "May 25, 2026",
    readTime: "4 min read",
    tag: "Security",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="page-container page-section">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Blog</p>
            <h1 className="text-4xl font-bold text-text-primary mb-4">InjSight AI Blog</h1>
            <p className="text-text-secondary">Product updates, engineering deep-dives, and DeFi intelligence insights.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {POSTS.map(({ icon: Icon, color, bg, title, excerpt, date, readTime, tag }) => (
              <article key={title} className="glass-card-hover p-6 flex flex-col">
                <div className={`inline-flex p-2.5 rounded-lg ${bg} mb-4 w-fit`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <span className={`badge mb-3 w-fit ${color === "text-accent" ? "badge-accent" : color === "text-primary" ? "badge-primary" : "badge-success"}`}>
                  {tag}
                </span>
                <h2 className="text-sm font-bold text-text-primary mb-3 leading-relaxed">{title}</h2>
                <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1">{excerpt}</p>
                <div className="flex items-center gap-3 text-[11px] text-text-muted border-t border-border pt-3 mt-auto">
                  <Calendar className="h-3 w-3" />
                  <span>{date}</span>
                  <span>·</span>
                  <span>{readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
