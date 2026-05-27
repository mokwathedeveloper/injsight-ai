"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, CheckCircle2 } from "lucide-react";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john@example.com",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    setIsSuccess(false);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Profile Data:", data);
    setIsSaving(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
            Full Name
          </label>
          <Input
            {...register("fullName")}
            placeholder="Your name"
            className="bg-hover/10 border-border/50 h-11"
          />
          {errors.fullName && (
            <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
            Email Address
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className="bg-hover/10 border-border/50 h-11"
          />
          {errors.email && (
            <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button 
          type="submit" 
          disabled={isSaving}
          className="px-8 h-11 font-bold text-xs uppercase tracking-widest"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Save Profile"}
        </Button>
        {isSuccess && (
          <div className="flex items-center gap-2 text-success animate-in fade-in slide-in-from-left-2">
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Changes Saved</span>
          </div>
        )}
      </div>
    </form>
  );
}
