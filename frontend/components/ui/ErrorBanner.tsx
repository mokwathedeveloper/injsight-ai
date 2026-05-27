import * as React from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorBannerProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function ErrorBanner({ message, onClose, className }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 bg-error/10 border border-error/20 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300",
      className
    )}>
      <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
      <p className="text-xs text-error font-medium flex-1 leading-relaxed">
        {message}
      </p>
      {onClose && (
        <button 
          onClick={onClose}
          className="p-1 hover:bg-error/10 rounded-md text-error transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
