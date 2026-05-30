import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Terms of Service — InjSight AI" };

const SECTIONS = [
  { title: "1. Acceptance of Terms", content: "By using InjSight AI, you agree to these Terms of Service. If you do not agree, do not use the service. These terms may be updated — continued use constitutes acceptance." },
  { title: "2. Description of Service", content: "InjSight AI is a read-only blockchain analytics platform that provides AI-powered wallet intelligence for the Injective DeFi ecosystem. We analyze publicly available on-chain data and generate informational reports.\n\nInjSight AI does NOT:\n• Request access to your private keys or seed phrases\n• Execute transactions on your behalf\n• Hold or custody any digital assets\n• Provide financial advice or investment recommendations" },
  { title: "3. Informational Use Only", content: "All content, risk scores, AI reports, and analysis provided by InjSight AI are for informational and educational purposes only. Nothing on this platform constitutes financial, investment, tax, or legal advice.\n\nPast portfolio performance does not guarantee future results. Always conduct your own research before making any financial decisions." },
  { title: "4. User Accounts", content: "You are responsible for maintaining the security of your account credentials. You agree not to share your account with others. You must provide accurate information during registration. You may delete your account at any time from Settings." },
  { title: "5. Acceptable Use", content: "You agree not to:\n• Attempt to reverse-engineer or scrape our AI models\n• Use the service to facilitate illegal activity\n• Attempt to access other users' accounts or data\n• Overwhelm our infrastructure with automated requests beyond reasonable use\n• Use the service in violation of Injective network terms" },
  { title: "6. Intellectual Property", content: "InjSight AI's software, design, and content are owned by InjSight AI and licensed under the MIT License (for open-source components). On-chain blockchain data is public. AI-generated report content belongs to you." },
  { title: "7. Limitation of Liability", content: "InjSight AI is provided 'as is' without warranties. We are not liable for:\n• Inaccuracies in on-chain data from third-party nodes\n• AI report errors or misinterpretations\n• Financial losses resulting from acting on our analysis\n• Service interruptions or data loss\n\nOur total liability is limited to the amount you paid in the last 30 days." },
  { title: "8. Governing Law", content: "These terms are governed by the laws of the Republic of South Africa. Disputes shall be resolved through binding arbitration." },
  { title: "9. Contact", content: "For legal inquiries: github.com/mokwathedeveloper/injsight-ai/issues" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 page-section">
        <div className="page-container max-w-3xl">
          <div className="mb-10">
            <p className="section-label mb-3">Legal</p>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Terms of Service</h1>
            <p className="text-sm text-text-muted">Last updated: May 30, 2026</p>
          </div>
          <div className="space-y-5">
            {SECTIONS.map(({ title, content }) => (
              <div key={title} className="glass-card p-6">
                <h2 className="text-base font-bold text-text-primary mb-3">{title}</h2>
                <div className="text-sm text-text-secondary leading-relaxed space-y-2">
                  {content.split("\n").map((line, i) => (
                    <p key={i} className={line.startsWith("•") ? "ml-2" : ""}>{line}</p>
                  ))}
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
