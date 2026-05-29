import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = {
  Product:   [{ label: "Features", href: "/#features" }, { label: "Pricing", href: "/pricing" }, { label: "Changelog", href: "/changelog" }],
  Resources: [{ label: "Documentation", href: "/docs" }, { label: "API", href: "/api" }, { label: "Blog", href: "/blog" }],
  Company:   [{ label: "About", href: "/about" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }],
  Injective: [{ label: "Injective Chain", href: "https://injective.com" }, { label: "Explorer", href: "https://explorer.injective.network" }],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-3 text-xs text-text-muted leading-relaxed">
              AI-powered wallet intelligence for the Injective DeFi ecosystem.
            </p>
            <p className="mt-3 text-xs text-text-muted">
              InjSight is a read-only analytics platform. We never access your funds or private data.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="section-label mb-3">{group}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>© 2025 InjSight AI. All rights reserved.</p>
          <p>Built for the Injective DeFi Community · Read-Only · Non-Custodial</p>
        </div>
      </div>
    </footer>
  );
}
