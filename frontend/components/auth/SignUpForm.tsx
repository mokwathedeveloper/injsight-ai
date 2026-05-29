"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      // Form has no name field; derive a sensible default from the email.
      const name = data.email.split("@")[0];
      const result = await authApi.signup(name, data.email, data.password);
      setAuth(result.user, result.tokens.accessToken, result.tokens.refreshToken);
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError && err.code === "NETWORK_ERROR") {
        setError("Could not reach the InjSight AI API. Is the backend running?");
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}
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
          <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
            Create Password
          </label>
          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="bg-hover/10 border-border/50 h-12"
          />
          <PasswordStrengthMeter password={password} />
          {errors.password && (
            <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="pt-2 px-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              {...register("agreeTerms")}
              type="checkbox"
              className="mt-1 w-4 h-4 rounded border-border/50 bg-hover/20 text-primary focus:ring-primary/40 focus:ring-offset-0"
            />
            <span className="text-xs text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
              I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="text-[10px] text-error font-medium mt-2 uppercase tracking-tight">
              {errors.agreeTerms.message}
            </p>
          )}
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
              <span>Create Free Account</span>
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
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
