"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, LayoutDashboard, LogOut, Search } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { href: "/#features",     label: "Features"    },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/docs",          label: "Docs"         },
  { href: "/pricing",       label: "Pricing"      },
  { href: "/about",         label: "About"        },
];

export function Navbar() {
  const pathname     = usePathname();
  const router       = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const loggedIn = isAuthenticated();

  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "Account";
  const initials    = displayName.slice(0, 2).toUpperCase();
  const plan        = user?.plan ?? "free";

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link px-3 py-2 rounded-md",
                  pathname === link.href && "text-text-primary bg-surface-2"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Logged IN ── */}
          {loggedIn ? (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="secondary" size="sm" asChild>
                <Link href="/analyze">
                  <Search className="h-3.5 w-3.5" /> Analyze
                </Link>
              </Button>
              <Button variant="accent" size="sm" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                </Link>
              </Button>

              {/* User avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors border border-border ml-1"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    {initials}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-text-primary leading-tight">{displayName}</p>
                    <p className="text-[10px] text-text-muted capitalize">{plan}</p>
                  </div>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1.5 w-48 glass-card shadow-card-hover py-1 z-50 animate-slide-down">
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-xs font-semibold text-text-primary truncate">{user?.email}</p>
                        <p className="text-[10px] text-text-muted capitalize mt-0.5">{plan} plan</p>
                      </div>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors">
                        <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                      </Link>
                      <Link href="/dashboard/settings" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors">
                        Settings
                      </Link>
                      <div className="divider my-1" />
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger hover:bg-danger-muted transition-colors">
                        <LogOut className="h-3.5 w-3.5" /> Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* ── Logged OUT ── */
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button variant="accent" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1 animate-slide-down">
            {loggedIn && (
              <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-surface-2 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{displayName}</p>
                  <p className="text-[10px] text-text-muted capitalize">{plan} plan</p>
                </div>
              </div>
            )}

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-md hover:bg-surface-2"
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-3">
              {loggedIn ? (
                <>
                  <Button variant="accent" className="w-full" asChild>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                    </Link>
                  </Button>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/analyze" onClick={() => setMobileOpen(false)}>
                      <Search className="h-4 w-4" /> Analyze Wallet
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full text-danger" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                    <LogOut className="h-4 w-4" /> Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="flex-1" asChild>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>Log In</Link>
                  </Button>
                  <Button variant="accent" className="flex-1" asChild>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
