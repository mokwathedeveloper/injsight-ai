"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const passwordChecks = [
  { label: "At least 8 characters",  test: (p: string) => p.length >= 8 },
  { label: "1 number",               test: (p: string) => /\d/.test(p) },
  { label: "1 special character",    test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
  { label: "1 uppercase letter",     test: (p: string) => /[A-Z]/.test(p) },
];

/** Extract a human-readable string from any FastAPI error shape. */
function extractErrorMsg(err: unknown, fallback: string): string {
  const data = (err as { response?: { data?: unknown } })?.response?.data as Record<string, unknown> | undefined;
  if (!data) return fallback;

  // { message: "string" }
  if (typeof data.message === "string") return data.message;

  // { detail: "string" }
  if (typeof data.detail === "string") return data.detail;

  // FastAPI Pydantic 422: { detail: [{ msg, loc, type, input }] }
  if (Array.isArray(data.detail) && data.detail.length > 0) {
    const first = data.detail[0] as Record<string, unknown>;
    const field = Array.isArray(first.loc) ? (first.loc as string[]).slice(-1)[0] : "";
    const msg   = typeof first.msg === "string" ? first.msg : "";
    return field ? `${field}: ${msg}` : msg || fallback;
  }

  return fallback;
}

export function SignUpForm() {
  const router       = useRouter();
  const { register } = useAuthStore();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const strength      = passwordChecks.filter((c) => c.test(password)).length;
  const strengthLabel = ["Weak", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-danger", "bg-danger", "bg-warning", "bg-yellow-400", "bg-success"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (strength < 2)          { setError("Please choose a stronger password."); return; }
    setLoading(true);
    setError("");
    try {
      await register(email.trim(), password, name.trim() || undefined);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(extractErrorMsg(err, "Registration failed. The email may already be in use."));
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
        label="Full name (optional)"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <Input
        label="Email address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <div className="space-y-1.5">
        <Input
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightIcon={
            <button type="button" onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        {password && (
          <div className="space-y-2 pt-1">
            <div className="flex gap-1">
              {[0,1,2,3].map((i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? strengthColor : "bg-surface-3"}`} />
              ))}
            </div>
            <p className="text-xs text-text-muted">Password strength: <span className="font-semibold text-text-primary">{strengthLabel}</span></p>
            <div className="grid grid-cols-2 gap-1">
              {passwordChecks.map(({ label, test }) => (
                <div key={label} className="flex items-center gap-1">
                  {test(password)
                    ? <CheckCircle className="h-3 w-3 text-success shrink-0" />
                    : <XCircle className="h-3 w-3 text-text-muted shrink-0" />
                  }
                  <span className="text-[11px] text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Input
        label="Confirm password"
        type="password"
        placeholder="Confirm your password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        error={confirm && confirm !== password ? "Passwords do not match" : undefined}
      />

      <Button type="submit" variant="accent" className="w-full" loading={loading}>
        Create account
      </Button>

      <div className="relative my-4">
        <div className="divider" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="bg-background px-3 text-xs text-text-muted">or sign up with</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Google",  color: "text-red-400" },
          { label: "Discord", color: "text-violet-400" },
          { label: "GitHub",  color: "text-text-secondary" },
        ].map(({ label, color }) => (
          <Button key={label} type="button" variant="secondary" size="sm" className="text-xs">
            <span className={color}>{label}</span>
          </Button>
        ))}
      </div>

      <p className="text-center text-xs text-text-muted mt-4">
        By signing up you agree to our{" "}
        <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link>
        {" "}and{" "}
        <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}
