"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  asChild?: boolean;
}

const variants = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  ghost:     "btn-ghost",
  accent:    "btn-accent",
  danger:    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-danger hover:bg-red-600 text-white transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
  outline:   "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border border-primary text-primary hover:bg-primary-muted transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes = {
  sm:   "!px-3 !py-1.5 !text-xs",
  md:   "",
  lg:   "!px-6 !py-3 !text-base",
  icon: "!p-2 !rounded-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, asChild, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {typeof children === "string" ? children : <span>{children}</span>}
          </>
        ) : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";
export { Button };
