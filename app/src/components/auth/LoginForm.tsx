"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router   = useRouter();
  const [email,  setEmail]   = useState("");
  const [pw,     setPw]      = useState("");
  const [showPw, setShowPw]  = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,  setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 900));
    // Simulate wrong-password error for demo
    if (pw === "wrong") {
      setError("The email or password you entered is incorrect. Please try again.");
      setLoading(false);
      return;
    }
    router.push("/dashboard");
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
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <div className="space-y-1">
        <Input
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Enter your password"
          value={pw}
          onChange={e => setPw(e.target.value)}
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

      {/* Remember me */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
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
        {[
          { label: "Continue with Google",  color: "text-red-400"    },
          { label: "Continue with Apple",   color: "text-text-primary" },
        ].map(({ label, color }) => (
          <Button key={label} type="button" variant="secondary" className="text-xs justify-start gap-2">
            <span className={`${color} font-semibold`}>{label.split(" ")[2]}</span>
            <span className="text-text-muted">{label.replace(`Continue with ${label.split(" ")[2]}`, "").trim() || `Continue with ${label.split(" ")[2]}`}</span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Continue with Discord", color: "text-violet-400" },
          { label: "Continue with GitHub",  color: "text-text-secondary" },
        ].map(({ label, color }) => (
          <Button key={label} type="button" variant="secondary" className="text-xs">
            <span className={color}>{label.split(" ")[2]}</span>
          </Button>
        ))}
      </div>
    </form>
  );
}
