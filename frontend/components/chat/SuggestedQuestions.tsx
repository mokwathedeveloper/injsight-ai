import * as React from "react";
import { Sparkles } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (q: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-hover/20 hover:border-primary hover:bg-primary/5 transition-all text-xs text-text-secondary hover:text-text-primary"
        >
          <Sparkles size={12} className="text-primary" />
          {q}
        </button>
      ))}
    </div>
  );
}
