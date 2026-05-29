import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingPageContent } from "@/components/pricing/PricingPageContent";

export const metadata: Metadata = { title: "Pricing — InjSight AI" };

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <PricingPageContent />
      </main>
      <Footer />
    </div>
  );
}
