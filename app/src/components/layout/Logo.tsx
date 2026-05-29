import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const imgSizes = { sm: 24, md: 30, lg: 38 };
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };
  const dim = imgSizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="InjSight AI logo"
        width={dim}
        height={dim}
        style={{ width: dim, height: dim }}
        className="rounded-lg object-contain"
        priority
      />
      <span className={cn("font-bold text-text-primary", textSizes[size])}>
        InjSight <span className="text-accent">AI</span>
      </span>
    </Link>
  );
}
