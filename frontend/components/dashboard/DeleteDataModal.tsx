"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, AlertTriangle } from "lucide-react";

interface DeleteDataModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmWord?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteDataModal({ isOpen, title, description, confirmWord = "DELETE", onConfirm, onClose }: DeleteDataModalProps) {
  const [typed, setTyped] = React.useState("");
  React.useEffect(() => { if (!isOpen) setTyped(""); }, [isOpen]);

  if (!isOpen) return null;
  const canConfirm = typed.trim().toUpperCase() === confirmWord;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card border border-error/30 rounded-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error/10 rounded-xl text-error"><AlertTriangle size={20} /></div>
            <h3 className="text-base font-bold text-text-primary">{title}</h3>
          </div>
          <button onClick={onClose} className="text-text-disabled hover:text-text-primary" aria-label="Close"><X size={20} /></button>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">{description}</p>

        <div className="space-y-2">
          <label htmlFor="confirm-delete" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
            Type <span className="text-error">{confirmWord}</span> to confirm
          </label>
          <Input id="confirm-delete" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={confirmWord} className="h-11" />
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1 h-11" onClick={onClose}>Cancel</Button>
          <Button variant="error" className="flex-1 h-11 font-bold" disabled={!canConfirm} onClick={() => { onConfirm(); onClose(); }}>
            Delete permanently
          </Button>
        </div>
      </div>
    </div>
  );
}
