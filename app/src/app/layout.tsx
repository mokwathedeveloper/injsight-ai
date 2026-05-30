import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "InjSight AI — Understand Any Injective Wallet in Seconds",
  description: "AI-powered wallet intelligence for the Injective DeFi ecosystem. Analyze any wallet, get risk scores, portfolio insights, and plain-English AI reports.",
  keywords: "Injective, DeFi, wallet analysis, AI, portfolio, risk score, blockchain",
  robots: "index, follow",
  openGraph: {
    title:       "InjSight AI — Injective Wallet Intelligence",
    description: "AI-powered wallet analysis for Injective DeFi",
    type:        "website",
  },
};

export const viewport: Viewport = {
  width:              "device-width",
  initialScale:       1,
  maximumScale:       5,
  userScalable:       true,
  themeColor:         "#0D1117",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to speed up font + API loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.coingecko.com" />
        <link rel="dns-prefetch" href="https://lcd.injective.network" />
        {/* Preload logo SVG */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
      </head>
      <body className="font-sans bg-background text-text-primary antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
