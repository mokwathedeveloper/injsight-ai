"use client";

import { FileText, Download, Share2, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { formatCurrency, formatAddress } from "@/lib/utils";
import Link from "next/link";

const MOCK_REPORTS = [
  { id: "r1", address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh", label: "My Wallet",    riskScore: 72, riskLevel: "high",   value: 104032, generatedAt: "May 29, 2025 10:24 AM" },
  { id: "r2", address: "inj1hcm8vtmfntcjl7pgz3d68kpzthfa9x3tzkmzh", label: "Research #1", riskScore: 43, riskLevel: "medium", value: 87901,  generatedAt: "May 28, 2025  9:12 AM" },
  { id: "r3", address: "inj1xyz4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "Team Fund",   riskScore: 28, riskLevel: "low",    value: 12480,  generatedAt: "May 27, 2025  3:45 PM" },
];

const riskClasses: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Reports</h1>
          <p className="text-sm text-text-secondary">View, export, and share your AI wallet reports.</p>
        </div>
        <Button variant="accent" size="sm">
          <Plus className="h-3.5 w-3.5" /> Generate Report
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_REPORTS.map((report) => (
          <div key={report.id} className="glass-card-hover p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-primary-muted shrink-0">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{report.label}</p>
                <p className="text-[10px] font-mono text-text-muted">{formatAddress(report.address, 8)}</p>
                <p className="text-[10px] text-text-muted mt-0.5">{report.generatedAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-surface-2 rounded-lg p-2">
                <p className="text-[10px] text-text-muted">Portfolio Value</p>
                <p className="text-sm font-bold text-text-primary">{formatCurrency(report.value)}</p>
              </div>
              <div className="bg-surface-2 rounded-lg p-2">
                <p className="text-[10px] text-text-muted">Risk Score</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-bold text-text-primary">{report.riskScore}</span>
                  <span className={riskClasses[report.riskLevel]}>{report.riskLevel}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/dashboard/reports/${report.id}`}>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
