"use client";

import * as React from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AddToWatchlistButtonProps {
  onAdd?: (address: string) => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
}

export function AddToWatchlistButton({ 
  onAdd, 
  className,
  variant = "primary",
  size = "default"
}: AddToWatchlistButtonProps) {
  const [isAdding, setIsAdding] = React.useState(false);

  const handleClick = () => {
    setIsAdding(true);
    // In a real app, this would open a modal or prompt
    setTimeout(() => {
      setIsAdding(false);
      onAdd?.("inj1...");
    }, 1000);
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      disabled={isAdding}
      className={cn("font-bold text-xs uppercase tracking-widest", className)}
    >
      {isAdding ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <Plus className="w-4 h-4 mr-2" />
      )}
      <span>Track New Wallet</span>
    </Button>
  );
}
