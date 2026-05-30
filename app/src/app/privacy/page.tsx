import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Privacy Policy — InjSight AI" };

const SECTIONS = [
  { title: "1. Information We Collect", content: `InjSight AI collects only what is necessary to provide the service:

• **Account information**: Email address and hashed password when you register.
• **Wallet addresses**: Injective wallet addresses you choose to analyze or save. These are public blockchain addresses.
• **Usage data**: Analysis history, saved wallets, and alert preferences associated with your account.
• **On-chain data**: We read publicly available blockchain data from Injective Mainnet via public LCD nodes. We do not read private data.

We do not collect private keys, seed phrases, or any form of wallet access credentials. Ever.` },
  { title: "2. How We Use Your Information", content: `• To provide wallet analysis and AI-generated reports.
• To store saved wallets and analysis history in your account.
• To send risk change alerts you have enabled.
• To improve the accuracy of our risk scoring models.
• We do not sell your data to third parties.
• We do not use your data for advertising.` },
  { title: "3. Data Storage", content: `Your account data is stored in Supabase (PostgreSQL), hosted in the United States. Wallet addresses you analyze are processed in real time and may be cached briefly for performance. Analysis results are stored in your account history.` },
  { title: "4. Third-Party Services", content: `InjSight AI uses the following third-party services:

• **Injective LCD Nodes**: For reading public blockchain data (no personal data shared).
• **CoinGecko API**: For live cryptocurrency prices (no personal data shared).
• **OpenRouter / Meta Llama**: For AI report generation. Wallet portfolio data (token balances, addresses) is sent to generate reports. No personal account data is shared.
• **Supabase**: For database and authentication.` },
  { title: "5. Your Rights", content: `You have the right to:
• Access your account data at any time.
• Export your analysis history and saved wallets.
• Delete your account and all associated data.
• Withdraw consent for data processing.

To exercise these rights, contact us or delete your account from Settings.` },
  { title: "6. Security", content: `We use industry-standard security practices including JWT authentication, Row Level Security (RLS) in Supabase, HTTPS encryption in transit, and hashed passwords. InjSight AI is 100% read-only — we never request wallet signing permissions.` },
  { title: "7. Contact", content: `For privacy-related questions, contact us via GitHub Issues at:\nhttps://github.com/mokwathedeveloper/injsight-ai/issues` },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 page-section">
        <div className="page-container max-w-3xl">
          <div className="mb-10">
            <p className="section-label mb-3">Legal</p>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Privacy Policy</h1>
            <p className="text-sm text-text-muted">Last updated: May 30, 2026</p>
          </div>
          <div className="glass-card p-6 mb-6 border-success/20">
            <p className="text-sm text-success font-semibold mb-1">Our Privacy Commitment</p>
            <p className="text-sm text-text-secondary">
              InjSight AI is a read-only analytics platform. We never access your funds, request private keys,
              or store any sensitive financial credentials. Your privacy and security are core to our design.
            </p>
          </div>
          <div className="space-y-8">
            {SECTIONS.map(({ title, content }) => (
              <div key={title} className="glass-card p-6">
                <h2 className="text-base font-bold text-text-primary mb-3">{title}</h2>
                <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line space-y-2">
                  {content.split("\n").map((line, i) => {
                    if (line.startsWith("• **")) {
                      const [bold, ...rest] = line.replace("• **", "").split("**:");
                      return (
                        <p key={i}>
                          <span className="text-text-primary font-semibold">• {bold}:</span>
                          {rest.join("")}
                        </p>
                      );
                    }
                    if (line.startsWith("• ")) return <p key={i}>{line}</p>;
                    return <p key={i}>{line}</p>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
