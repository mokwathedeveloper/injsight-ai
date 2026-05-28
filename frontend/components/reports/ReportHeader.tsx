"use client";

import * as React from "react";
import { ArrowLeft, Calendar, ShieldCheck, Share2, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReportHeaderProps {
  title: string;
  walletAddress: string;
  walletLabel?: string;
  date: string;
}

export function ReportHeader({ title, walletAddress, walletLabel, date }: ReportHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link 
        href="/dashboard/reports" 
        className="text-xs font-bold text-text-disabled hover:text-primary transition-colors flex items-center gap-2 group uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Reports Hub</span>
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              {title}
            </h1>
            <Badge variant="success" className="bg-success/10 text-success border-success/20 text-[10px]">
              AI VERIFIED
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-text-disabled" />
              <span>Generated on {formattedDate}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-text-primary">{walletLabel || "Tracked Wallet"}</span>
              <code className="text-xs font-mono bg-hover/50 px-2 py-0.5 rounded border border-border/50">
                {walletAddress}
              </code>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" className="h-11 px-5 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest group">
            <Share2 size={14} className="text-text-disabled group-hover:text-primary transition-colors" />
            <span>Share</span>
          </Button>
          <Button variant="secondary" className="h-11 px-5 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest group">
            <Printer size={14} className="text-text-disabled group-hover:text-primary transition-colors" />
            <span>Print</span>
          </Button>
          <Button className="h-11 px-6 gap-2 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20">
            <Download size={14} />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
        <ShieldCheck size={14} className="text-success" />
        <span>Authenticity Hash: 0x7a2...bc92 • Secure Storage Active</span>
      </div>
    </div>
  );
}
