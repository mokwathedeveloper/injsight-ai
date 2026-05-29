"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-danger-muted border border-danger/20 text-xs text-danger">
          {error}
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div>
        <Input
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightIcon={
            <button type="button" onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        <div className="flex justify-end mt-1.5">
          <Link href="/forgot-password" className="text-xs text-accent hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>

      <Button type="submit" variant="accent" className="w-full" loading={loading}>
        Log in
      </Button>

      <div className="relative my-4">
        <div className="divider" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="bg-surface px-3 text-xs text-text-muted">or continue with</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Google", "Discord", "GitHub"].map((p) => (
          <Button key={p} type="button" variant="secondary" size="sm" className="text-xs">
            {p}
          </Button>
        ))}
      </div>
    </form>
  );
}
