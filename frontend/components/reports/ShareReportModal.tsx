"use client";

import * as React from "react";
import { 
  X, 
  Share2, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  Clock, 
  ShieldAlert,
  Globe,
  Info,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId?: string;
  reportTitle?: string;
}

export function ShareReportModal({ isOpen, onClose, reportId, reportTitle }: ShareReportModalProps) {
  const [expiry, setExpiry] = React.useState<"1h" | "24h" | "7d" | "never">("24h");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedUrl, setGeneratedUrl] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const handleGenerateLink = async () => {
    setIsGenerating(true);
    // Simulate generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setGeneratedUrl(`https://injsight.ai/p/${reportId || "temp-id"}`);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <Card className="relative w-full max-w-lg p-0 bg-[#0D1117] border-border-strong shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Share2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary tracking-tight">Share Intelligence</h2>
              <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-0.5">
                Public Read-Only Link
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {!generatedUrl ? (
            <div className="space-y-6">
              <div className="space-y-2 px-1">
                 <h3 className="text-sm font-bold text-text-primary uppercase tracking-tight">Visibility Warning</h3>
                 <p className="text-xs text-text-secondary leading-relaxed">
                   Generating a public link allows anyone with the URL to view this specific report snapshot. 
                   Your private account details remain hidden.
                 </p>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1 flex items-center gap-2">
                  <Clock size={12} />
                  <span>Link Expiration</span>
                </label>
                <div className="flex bg-card border border-border rounded-xl p-1">
                  {(["1h", "24h", "7d", "never"] as const).map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => setExpiry(opt)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                        expiry === opt ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-disabled hover:text-text-primary"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
                <Globe size={18} className="text-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-text-secondary leading-relaxed italic">
                  Public links are <strong>read-only</strong>. Viewers can see the portfolio breakdown and AI insights 
                  but cannot modify settings or track new wallets.
                </p>
              </div>

              <Button 
                onClick={handleGenerateLink} 
                disabled={isGenerating}
                className="w-full h-12 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                {isGenerating ? (
                   <div className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Generating Link...</span>
                   </div>
                ) : (
                   "Generate Shareable Link"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
               <div className="space-y-2 px-1 text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/20">
                     <Check size={24} className="text-success" />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-tight">Public Link Ready</h3>
                  <p className="text-xs text-text-secondary">
                    Your intelligence report is now shareable via the link below.
                  </p>
               </div>

               <div className="space-y-3">
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
                    <input 
                      readOnly 
                      value={generatedUrl}
                      className="w-full h-12 pl-10 pr-24 bg-hover/30 border border-border-strong rounded-xl text-xs font-mono text-primary outline-none"
                    />
                    <button 
                      onClick={handleCopy}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-lg text-[10px] font-bold uppercase transition-all",
                        copied ? "bg-success text-white" : "bg-primary text-white hover:bg-primary-hover"
                      )}
                    >
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>
               </div>

               <div className="p-4 bg-hover/20 border border-border rounded-xl flex items-center justify-center gap-3">
                  <ShieldAlert size={14} className="text-warning" />
                  <span className="text-[10px] text-text-disabled font-bold uppercase tracking-widest">
                    Expires in {expiry === 'never' ? '∞' : expiry}
                  </span>
               </div>

               <button 
                 onClick={() => setGeneratedUrl(null)}
                 className="w-full py-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-text-primary transition-colors"
               >
                 Change Settings
               </button>
            </div>
          )}
        </div>

        <div className="bg-page p-4 text-[9px] text-text-disabled text-center font-bold border-t border-border uppercase tracking-widest flex items-center justify-center gap-2">
           <Info size={12} />
           <span>Secure & Read-Only Public Exposure</span>
        </div>
      </Card>
    </div>
  );
}
