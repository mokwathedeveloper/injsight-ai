"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TokenBalanceTable } from "@/components/table/TokenBalanceTable";
import { MOCK_TOKEN_BALANCES } from "@/data/token-balance-mock";
import { ReadOnlySafetyNotice } from "@/components/analyzer/ReadOnlySafetyNotice";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TokenBalancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumb / Back */}
          <div className="flex items-center justify-between">
            <Link 
              href="/analyze" 
              className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center space-x-2 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Analyzer</span>
            </Link>
          </div>

          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              Detailed <span className="text-primary">Token Balances</span>
            </h1>
            <p className="text-text-secondary max-w-2xl leading-relaxed">
              Examine every asset held in the wallet. Sort by value, allocation, or balance 
              to understand portfolio distribution.
            </p>
          </div>

          {/* Table Section */}
          <div className="space-y-6">
            <TokenBalanceTable tokens={MOCK_TOKEN_BALANCES} />
            <ReadOnlySafetyNotice />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
