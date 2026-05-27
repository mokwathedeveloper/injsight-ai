import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { landingData } from "@/data/landing";
import { WalletAnalyzerPreview } from "./WalletAnalyzerPreview";
import { ShieldCheck, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-accent text-xs font-semibold uppercase tracking-wider">
              <Zap size={14} className="fill-accent" />
              <span>AI Wallet Intelligence for Injective DeFi</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
              Understand Any <br />
              <span className="text-primary">Injective Wallet</span> <br />
              in Seconds.
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {landingData.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-xl mx-auto lg:mx-0">
              <div className="relative w-full">
                <Input
                  placeholder="inj1...walletaddresshere"
                  className="h-[52px] pl-4 pr-32 bg-card/50 backdrop-blur-sm border-border-strong font-mono"
                />
                <Link href="/analyze">
                  <Button 
                    className="absolute right-1 top-1 bottom-1 px-6 rounded"
                    size="default"
                  >
                    Analyze Wallet
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 pt-4">
              <Link href="/demo">
                <button className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium group">
                  <div className="w-8 h-8 rounded-full bg-hover flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-text-secondary border-b-[6px] border-b-transparent ml-1 group-hover:border-l-primary transition-colors" />
                  </div>
                  <span>{landingData.hero.secondaryCta}</span>
                </button>
              </Link>
              
              <div className="flex items-center space-x-4 text-xs text-text-disabled">
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={14} className="text-success" />
                  <span>No sign-up required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={14} className="text-success" />
                  <span>Read-only</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ShieldCheck size={14} className="text-success" />
                  <span>No private keys</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview Card */}
          <div className="relative">
            {/* Decorative Glow behind card */}
            <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl -z-10" />
            <WalletAnalyzerPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
