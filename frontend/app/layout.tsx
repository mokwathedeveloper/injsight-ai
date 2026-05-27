import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { TrustSafetyBanner } from "@/components/ui/TrustSafetyBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains-mono" 
});

export const metadata: Metadata = {
  title: "InjSight AI",
  description: "AI Wallet Intelligence for Injective DeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <TrustSafetyBanner />
      </body>
    </html>
  );
}
