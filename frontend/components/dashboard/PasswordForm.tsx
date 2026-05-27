"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, CheckCircle2, Shield } from "lucide-react";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function PasswordForm() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues) => {
    setIsSaving(true);
    setIsSuccess(false);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Password updated");
    setIsSaving(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
            Current Password
          </label>
          <Input
            {...register("currentPassword")}
            type="password"
            placeholder="••••••••"
            className="bg-hover/10 border-border/50 h-11"
          />
          {errors.currentPassword && (
            <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
              New Password
            </label>
            <Input
              {...register("newPassword")}
              type="password"
              placeholder="••••••••"
              className="bg-hover/10 border-border/50 h-11"
            />
            {errors.newPassword && (
              <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
              Confirm New Password
            </label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="bg-hover/10 border-border/50 h-11"
            />
            {errors.confirmPassword && (
              <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button 
          type="submit" 
          disabled={isSaving}
          variant="secondary"
          className="px-8 h-11 font-bold text-xs uppercase tracking-widest border-border-strong"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Update Password"}
        </Button>
        {isSuccess && (
          <div className="flex items-center gap-2 text-success animate-in fade-in slide-in-from-left-2">
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Password Updated</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl flex items-start gap-3">
        <Shield size={18} className="text-accent shrink-0 mt-0.5" />
        <p className="text-[10px] text-text-secondary leading-relaxed italic">
          Security Tip: Use a password at least 12 characters long with a mix of letters, numbers, and symbols.
        </p>
      </div>
    </form>
  );
}
