import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InjSight AI — Understand Any Injective Wallet in Seconds",
  description: "AI-powered wallet intelligence for the Injective DeFi ecosystem. Analyze any wallet, get risk scores, portfolio insights, and plain-English AI reports.",
  keywords: "Injective, DeFi, wallet analysis, AI, portfolio, risk score",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
