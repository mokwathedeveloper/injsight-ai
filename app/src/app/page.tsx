import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { AiReportPreview } from "@/components/landing/AiReportPreview";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { CtaBanner } from "@/components/landing/CtaBanner";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AiReportPreview />
        <PricingPreview />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
