"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 p-4 border-t border-border bg-card">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about this wallet…"
        className="h-11"
        disabled={disabled}
        aria-label="Ask a question about this wallet"
      />
      <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={disabled || !value.trim()} aria-label="Send">
        <Send size={16} />
      </Button>
    </form>
  );
}
