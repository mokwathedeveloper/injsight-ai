import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SecuritySection } from "@/components/security/SecuritySection";
import { DisclaimerBox } from "@/components/ui/DisclaimerBox";

export const metadata = {
  title: "Security — InjSight AI",
  description: "How InjSight AI keeps your wallet analysis read-only, non-custodial, and safe.",
};

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <SecuritySection />
          <DisclaimerBox />
        </div>
      </main>
      <Footer />
    </div>
  );
}
