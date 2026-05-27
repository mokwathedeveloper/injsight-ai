"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  X, 
  Wallet as WalletIcon, 
  Tag, 
  Loader2, 
  ShieldCheck, 
  Info 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const walletSchema = z.object({
  address: z.string().startsWith("inj", "Must be a valid Injective address (starting with 'inj')").min(42, "Address is too short"),
  label: z.string().min(1, "Please provide a label for this wallet"),
});

type WalletFormValues = z.infer<typeof walletSchema>;

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: WalletFormValues) => void;
}

export function AddWalletModal({ isOpen, onClose, onAdd }: AddWalletModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WalletFormValues>({
    resolver: zodResolver(walletSchema),
  });

  const onSubmit = async (data: WalletFormValues) => {
    setIsLoading(true);
    // Simulate validation/fetching
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onAdd(data);
    setIsLoading(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <Card className="relative w-full max-w-lg p-0 bg-[#0D1117] border-border-strong shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <WalletIcon size={20} />
            </div>
            <h2 className="text-lg font-bold text-text-primary">Track New Wallet</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1 flex items-center gap-2">
                <WalletIcon size={12} />
                <span>Wallet Address</span>
              </label>
              <Input
                {...register("address")}
                placeholder="inj1..."
                className="bg-hover/10 border-border/50 h-12 font-mono text-sm"
              />
              {errors.address && (
                <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1 flex items-center gap-2">
                <Tag size={12} />
                <span>Custom Label</span>
              </label>
              <Input
                {...register("label")}
                placeholder="e.g. My Ledger Wallet"
                className="bg-hover/10 border-border/50 h-12"
              />
              {errors.label && (
                <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">
                  {errors.label.message}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
            <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-text-secondary leading-relaxed italic">
              Saving a wallet allows InjSight AI to monitor risk and value changes in real-time. 
              No transaction signing is required for tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              className="flex-1 h-12 font-bold text-xs uppercase tracking-widest"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-[2] h-12 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Add to My Wallets"
              )}
            </Button>
          </div>
        </form>

        <div className="bg-page p-4 text-[9px] text-text-disabled text-center font-bold border-t border-border uppercase tracking-widest flex items-center justify-center gap-2">
           <Info size={12} />
           <span>Secure & Read-Only Management</span>
        </div>
      </Card>
    </div>
  );
}
