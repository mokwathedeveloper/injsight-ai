import * as React from "react";
import { ChatMessage } from "@/types/chat";
import { Sparkles, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isThinking?: boolean;
}

export function ChatMessageList({ messages, isThinking }: ChatMessageListProps) {
  const endRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isThinking]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((m) => {
        const isUser = m.role === "user";
        return (
          <div key={m.id} className={cn("flex gap-3 animate-in fade-in slide-in-from-bottom-2", isUser && "flex-row-reverse")}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
              isUser ? "bg-hover border-border text-text-secondary" : "bg-primary/10 border-primary/20 text-primary"
            )}>
              {isUser ? <User size={15} /> : <Sparkles size={15} />}
            </div>
            <div className={cn(
              "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
              isUser ? "bg-primary text-white" : "bg-hover/40 border border-border text-text-secondary"
            )}>
              {m.content}
            </div>
          </div>
        );
      })}

      {isThinking && (
        <div className="flex gap-3 animate-in fade-in">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border bg-primary/10 border-primary/20 text-primary">
            <Sparkles size={15} />
          </div>
          <div className="bg-hover/40 border border-border rounded-2xl px-4 py-3 flex items-center gap-2 text-text-disabled text-xs">
            <Loader2 size={14} className="animate-spin" /> Analyzing wallet…
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
