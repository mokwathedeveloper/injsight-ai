import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { unwrapData } from "@/lib/apiClient";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  answer: string;
  address: string;
}

export function useAiChat() {
  return useMutation({
    mutationFn: async ({
      address,
      question,
      history,
    }: {
      address: string;
      question: string;
      history: ChatMessage[];
    }): Promise<ChatResponse> => {
      const res = await apiClient.post("/v1/ai/chat", { address, question, history });
      const payload = res.data.data ?? res.data;
      return payload as ChatResponse;
    },
  });
}
