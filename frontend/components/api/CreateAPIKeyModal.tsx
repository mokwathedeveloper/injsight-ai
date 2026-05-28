"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, KeyRound, Copy, Check } from "lucide-react";

interface CreateAPIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export function CreateAPIKeyModal({ isOpen, onClose, onCreate }: CreateAPIKeyModalProps) {
  const [name, setName] = React.useState("");
  const [generatedKey, setGeneratedKey] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    const key = `injsk_live_${Math.random().toString(36).slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;
    setGeneratedKey(key);
    onCreate(name.trim());
  };

  const reset = () => { setName(""); setGeneratedKey(null); setCopied(false); onClose(); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={reset} />
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary"><KeyRound size={20} /></div>
            <h3 className="text-base font-bold text-text-primary">{generatedKey ? "API key created" : "Create API key"}</h3>
          </div>
          <button onClick={reset} className="text-text-disabled hover:text-text-primary" aria-label="Close"><X size={20} /></button>
        </div>

        {generatedKey ? (
          <div className="space-y-4">
            <p className="text-xs text-warning leading-relaxed bg-warning/10 border border-warning/30 rounded-lg p-3">
              Copy this key now — for your security it will not be shown again.
            </p>
            <div className="flex items-center gap-2 bg-hover/40 border border-border rounded-lg p-3">
              <code className="text-xs font-mono text-text-primary break-all flex-1">{generatedKey}</code>
              <button
                onClick={() => { navigator.clipboard?.writeText(generatedKey); setCopied(true); }}
                className="p-2 rounded-lg hover:bg-hover text-text-disabled hover:text-text-primary shrink-0"
                aria-label="Copy key"
              >
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>
            <Button className="w-full h-11 font-bold" onClick={reset}>Done</Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="key-name" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Key name</label>
              <Input id="key-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Production server" className="h-11" />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 h-11" onClick={reset}>Cancel</Button>
              <Button className="flex-1 h-11 font-bold" onClick={handleCreate} disabled={!name.trim()}>Generate key</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
