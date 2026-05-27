"use client";

import * as React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Start your journey with AI-powered wallet intelligence."
    >
      <SignUpForm />
    </AuthLayout>
  );
}
