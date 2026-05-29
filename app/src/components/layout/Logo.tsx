import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-5 h-5 text-xs", text: "text-sm" },
    md: { icon: "w-7 h-7 text-sm", text: "text-base" },
    lg: { icon: "w-9 h-9 text-base", text: "text-xl" },
  };
  const s = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      <div className={cn("rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white", s.icon)}>
        I
      </div>
      <span className={cn("font-bold text-text-primary", s.text)}>
        InjSight <span className="text-accent">AI</span>
      </span>
    </Link>
  );
}
