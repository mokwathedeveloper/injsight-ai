"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { landingData } from "@/data/landing";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-page/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo/websiteLogo.png"
                alt="InjSight AI Logo"
                width={32}
                height={32}
                className="w-auto h-8"
              />
              <span className="text-xl font-bold text-text-primary tracking-tight">
                InjSight AI
              </span>
            </Link>
            <div className="ml-4 hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-success/10 border border-success/20 rounded-full">
              <div className="w-1 h-1 rounded-full bg-success animate-pulse" />
              <span className="text-[9px] font-bold text-success uppercase tracking-widest">Secure & Read-Only</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {landingData.navigation.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Link href="/analyze">
              <Button variant="primary" size="sm">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-text-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden bg-page border-b border-border overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {landingData.navigation.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-2 px-3">
            <Button variant="ghost" className="w-full justify-start">
              Log in
            </Button>
            <Button variant="primary" className="w-full">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
