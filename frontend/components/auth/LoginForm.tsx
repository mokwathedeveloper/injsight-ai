"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // For demo purposes, fail on a specific email
    if (data.email === "fail@example.com") {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
      return;
    }

    console.log("Login Data:", data);
    setIsLoading(false);
    // Redirect on success
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
      <ErrorBanner message={error || ""} onClose={() => setError(null)} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
            Email Address
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className="bg-hover/10 border-border/50 h-12"
          />
          {errors.email && (
            <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">
              Password
            </label>
            <Link href="#" className="text-[10px] font-bold text-primary uppercase tracking-tight hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-hover/10 border-border/50 h-12 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="pt-2 px-1">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              {...register("rememberMe")}
              type="checkbox"
              className="w-4 h-4 rounded border-border/50 bg-hover/20 text-primary focus:ring-primary/40 focus:ring-offset-0"
            />
            <span className="text-xs text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
              Remember me on this device
            </span>
          </label>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 font-bold text-sm shadow-lg shadow-primary/20 mt-4 group"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <div className="flex items-center justify-center">
              <span>Sign In</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-bold">
          <span className="bg-page px-4 text-text-disabled tracking-widest">Or continue with</span>
        </div>
      </div>

      <SocialAuthButtons />

      <p className="text-center text-xs text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-bold hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
}
