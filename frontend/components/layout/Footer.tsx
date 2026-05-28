import Link from "next/link";
import Image from "next/image";
import { landingData } from "@/data/landing";
import { Twitter, Github, Send, MessageCircle } from "lucide-react";

const iconMap: Record<string, any> = {
  Twitter,
  Github,
  Send,
  MessageCircle,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-page border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Subtitle */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo/websiteLogo.png"
                alt="InjSight AI Logo"
                width={32}
                height={32}
                className="w-auto h-8"
              />
              <span className="text-xl font-bold text-text-primary">
                InjSight AI
              </span>
            </Link>
            <p className="text-text-secondary text-sm max-w-xs">
              AI-powered wallet and portfolio insights for the Injective ecosystem.
            </p>
            <div className="flex space-x-4">
              {landingData.footer.socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <Link
                    key={social.platform}
                    href={social.href}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon size={20} />}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-6">Product</h3>
            <ul className="space-y-4">
              {landingData.footer.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              {landingData.footer.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/security"
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              {landingData.footer.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-text-disabled text-xs">
            © {currentYear} InjSight AI. All rights reserved.
          </p>
          <p className="text-text-disabled text-xs text-center md:text-right max-w-md">
            InjSight AI is an informational platform only. Not financial advice. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
