"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatMessage } from "@/types/chat";
import { INITIAL_CHAT, SUGGESTED_QUESTIONS, answerFor } from "@/data/chat-mock";
import { ShieldCheck } from "lucide-react";

export function WalletChatPanel() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(INITIAL_CHAT);
  const [isThinking, setIsThinking] = React.useState(false);

  const send = (text: string) => {
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: text, timestamp: "now" };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setTimeout(() => {
      const reply: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", content: answerFor(text), timestamp: "now" };
      setMessages((prev) => [...prev, reply]);
      setIsThinking(false);
    }, 1400);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <Card className="p-0 overflow-hidden flex flex-col h-[640px]">
      <div className="p-4 border-b border-border flex items-center justify-between bg-hover/20">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Ask Your Wallet</h3>
        <span className="flex items-center gap-1.5 text-[10px] text-text-disabled uppercase font-bold">
          <ShieldCheck size={12} className="text-success" /> Read-only
        </span>
      </div>

      <ChatMessageList messages={messages} isThinking={isThinking} />

      {showSuggestions && (
        <div className="px-4 pb-3">
          <SuggestedQuestions questions={SUGGESTED_QUESTIONS} onSelect={send} />
        </div>
      )}

      <ChatInput onSend={send} disabled={isThinking} />
    </Card>
  );
}
