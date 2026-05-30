import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Code, ExternalLink, Key } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = { title: "API Reference — InjSight AI" };

const ENDPOINTS = [
  { method:"POST", path:"/api/public/analyze-wallet",         auth:false, desc:"Analyze any Injective wallet — returns portfolio, risk score, AI report." },
  { method:"GET",  path:"/api/public/demo-wallet",            auth:false, desc:"Get a demo wallet analysis to preview the product." },
  { method:"POST", path:"/api/auth/signup",                   auth:false, desc:"Register a new user account." },
  { method:"POST", path:"/api/auth/login",                    auth:false, desc:"Log in and receive a JWT token pair." },
  { method:"GET",  path:"/api/wallets",                       auth:true,  desc:"List all saved wallets for the authenticated user." },
  { method:"POST", path:"/api/wallets",                       auth:true,  desc:"Save a new wallet to monitor." },
  { method:"DELETE",path:"/api/wallets/{id}",                 auth:true,  desc:"Remove a saved wallet." },
  { method:"GET",  path:"/api/analysis",                      auth:true,  desc:"Get full analysis history for the authenticated user." },
  { method:"GET",  path:"/api/reports",                       auth:true,  desc:"Get all AI reports for the authenticated user." },
  { method:"GET",  path:"/api/alerts",                        auth:true,  desc:"Get risk change alerts for the authenticated user." },
  { method:"GET",  path:"/api/insights",                      auth:true,  desc:"Get AI-generated insights from saved wallets." },
  { method:"POST", path:"/api/insights/generate",             auth:true,  desc:"Trigger fresh insight generation across all saved wallets." },
  { method:"POST", path:"/api/v1/ai/chat",                    auth:false, desc:"Ask a question about any wallet — returns AI answer." },
  { method:"GET",  path:"/api/injective/{address}/portfolio",  auth:false, desc:"Get live token balances for an Injective address." },
  { method:"GET",  path:"/api/injective/{address}/staking",    auth:false, desc:"Get staking delegations and pending rewards." },
  { method:"GET",  path:"/api/injective/{address}/ecosystem",  auth:false, desc:"Get ecosystem exposure breakdown." },
  { method:"GET",  path:"/api/injective/{address}/market",     auth:false, desc:"Get market context with live prices and 24h changes." },
  { method:"GET",  path:"/api/injective/{address}/transactions",auth:false, desc:"Get recent transaction history from Injective Mainnet." },
];

const methodColor: Record<string, string> = {
  GET:    "bg-success-muted text-success",
  POST:   "bg-primary-muted text-accent",
  DELETE: "bg-danger-muted text-danger",
  PUT:    "bg-warning-muted text-warning",
};

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="bg-surface/50 border-b border-border py-14">
          <div className="page-container">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="section-label mb-2">Developer</p>
                <h1 className="text-4xl font-bold text-text-primary mb-3">API Reference</h1>
                <p className="text-text-secondary max-w-lg">
                  Integrate InjSight AI into your own apps. The REST API provides real-time
                  Injective wallet intelligence, risk scores, and AI-powered analysis.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Button variant="accent" asChild>
                  <a href="https://injsight-ai-backend.onrender.com/docs" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Interactive Docs
                  </a>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/api-access"><Key className="h-3.5 w-3.5" /> Get API Key</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="page-container py-12">
          <div className="glass-card p-5 mb-8 border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-text-primary">Base URL</h3>
            </div>
            <code className="text-sm font-mono text-accent">https://injsight-ai-backend.onrender.com</code>
            <p className="text-xs text-text-muted mt-1">All endpoints are relative to this base URL.</p>
          </div>

          <div className="glass-card p-5 mb-8">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Authentication</h3>
            <p className="text-sm text-text-secondary mb-3">
              Protected endpoints require a Bearer JWT token in the Authorization header.
              Obtain a token by calling <code className="text-accent text-xs bg-surface-2 px-1.5 py-0.5 rounded">POST /api/auth/login</code>.
            </p>
            <div className="bg-surface-2 rounded-lg p-3 font-mono text-xs text-text-secondary">
              Authorization: Bearer eyJhbGci...
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="text-sm font-semibold text-text-primary">Endpoints ({ENDPOINTS.length})</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-2/30">
                  {["Method","Endpoint","Auth","Description"].map(h=>(
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-text-muted uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ENDPOINTS.map((ep, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className={`badge text-xs font-bold font-mono ${methodColor[ep.method] ?? "badge bg-surface-2 text-text-secondary border border-border"}`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <code className="text-xs font-mono text-accent">{ep.path}</code>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-semibold ${ep.auth ? "text-warning" : "text-success"}`}>
                        {ep.auth ? "Required" : "Public"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-text-secondary">{ep.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
