"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function LoginForm() {
  const router    = useRouter();
  const { login } = useAuthStore();

  const [email,    setEmail]    = useState("");
  const [pw,       setPw]       = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email.trim(), pw);
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string; detail?: string } } })
          ?.response?.data?.message ??
        (err as { response?: { data?: { detail?: string } } })
          ?.response?.data?.detail ??
        "Invalid email or password. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-danger-muted border border-danger/25">
          <AlertCircle className="h-4 w-4 text-danger shrink-0 mt-0.5" />
          <p className="text-xs text-danger leading-relaxed">{error}</p>
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <div className="space-y-1">
        <Input
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Enter your password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
          autoComplete="current-password"
          rightIcon={
            <button type="button" onClick={() => setShowPw(!showPw)} className="focus:outline-none">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs text-accent hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="w-4 h-4 rounded border-border bg-surface-2 text-primary focus:ring-primary/40"
        />
        <span className="text-xs text-text-secondary">Remember me</span>
      </label>

      <Button type="submit" variant="accent" className="w-full" loading={loading}>
        Log In
      </Button>

      <div className="relative my-2">
        <div className="divider" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="bg-surface px-3 text-xs text-text-muted">or continue with</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" className="text-xs">
          <span className="text-red-400 font-semibold">Google</span>
        </Button>
        <Button type="button" variant="secondary" className="text-xs">
          <span className="text-text-primary">Apple</span>
        </Button>
        <Button type="button" variant="secondary" className="text-xs">
          <span className="text-violet-400">Discord</span>
        </Button>
        <Button type="button" variant="secondary" className="text-xs">
          <span className="text-text-secondary">GitHub</span>
        </Button>
      </div>
    </form>
  );
}
