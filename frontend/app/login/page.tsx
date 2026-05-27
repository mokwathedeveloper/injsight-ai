"use client";

import * as React from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to access your saved wallets and AI reports."
    >
      <LoginForm />
    </AuthLayout>
  );
}
