import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Button, Input } from "@/components/ui";
import { Mail } from "lucide-react";

export const metadata: Metadata = { title: "Reset Password — InjSight AI" };

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"><Logo size="lg" /></div>
          <h1 className="text-xl font-bold text-text-primary">Reset your password</h1>
          <p className="text-sm text-text-secondary mt-1">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>
        <div className="glass-card p-6 space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="input-field pl-10"
            />
          </div>
          <Button variant="accent" className="w-full">Send Reset Link</Button>
          <p className="text-center text-xs text-text-muted">
            Remember your password?{" "}
            <Link href="/login" className="text-accent hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
