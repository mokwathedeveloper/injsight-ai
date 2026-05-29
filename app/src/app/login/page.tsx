import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

export const metadata: Metadata = { title: "Log In — InjSight AI" };

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-sm text-text-secondary mt-1">
            Sign in to your InjSight AI account
          </p>
        </div>

        <div className="glass-card p-6">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-text-muted mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
