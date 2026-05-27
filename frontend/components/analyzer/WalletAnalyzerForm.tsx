"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletSchema, WalletSchema } from "@/schemas/wallet.schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Loader2 } from "lucide-react";

interface WalletAnalyzerFormProps {
  onAnalyze: (address: string) => void;
  isLoading?: boolean;
}

export function WalletAnalyzerForm({ onAnalyze, isLoading }: WalletAnalyzerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletSchema>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = (data: WalletSchema) => {
    onAnalyze(data.address);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto space-y-4">
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-25 group-focus-within:opacity-100 transition-opacity" />
        
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-disabled">
              <Search size={20} />
            </div>
            <Input
              {...register("address")}
              placeholder="Enter Injective address (inj1...)"
              className="h-14 pl-12 pr-4 bg-card/80 border-border-strong text-lg font-mono placeholder:text-text-disabled/50"
              disabled={isLoading}
              aria-invalid={!!errors.address}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="ml-2 px-8 h-14 font-bold shadow-xl shadow-primary/10"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing
              </>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>
      </div>
      
      {errors.address && (
        <p className="text-sm text-error font-medium pl-1 animate-in fade-in slide-in-from-top-1">
          {errors.address.message}
        </p>
      )}
    </form>
  );
}
