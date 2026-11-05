import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import guruImg from "@/assets/guru-basa.png";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { ensureThread, getThread, saveThreadMessages } from "@/lib/threads";

type Level = "semua" | "alus" | "andap";

const SUGGESTIONS = [
  "Apa bedanya “tiang” dan “titiang”?",
  "How do I greet someone politely in Balinese?",
  "Terjemahkan ke basa alus: Saya mau ke pasar membeli kue",
  "Ajari saya angka 1 sampai 10",
  "What does “Om Swastyastu” mean?",
  "Bagaimana menulis nama saya dengan Aksara Bali?",
];

function errorText(error: Error) {
  try {
    const parsed = JSON.parse(error.message) as { error?: string };
    if (parsed.error) return parsed.error;
  } catch {
    /* not JSON */
  }
  if (/failed to fetch|network/i.test(error.message)) return "Koneksi terputus. Periksa internet lalu coba lagi.";
  return error.message || "Guru Basa gagal menjawab. Silakan coba lagi.";
}

export function ChatWindow({ threadId, initialQuestion }: { threadId: string; initialQuestion?: string | undefined }) {
  const [initialMessages] = useState<UIMessage[]>(() => getThread(threadId)?.messages ?? []);
  const [level, setLevel] = useState<Level>("semua");
  const levelRef = useRef(level);
  levelRef.current = level;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: () => ({ threadId, level: levelRef.current }) }),
    [threadId],
  );

  const { messages, sendMessage, status, stop } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (error) => toast.error(errorText(error)),
  });

  const busy = status === "submitted" || status === "streaming";

  // Make sure the route thread exists in storage (idempotent, StrictMode-safe).
  useEffect(() => {
    ensureThread(threadId);
  }, [threadId]);

  // Persist after each completed turn (or failure), never mid-stream.
  useEffect(() => {
    if (status === "streaming" || messages.length === 0) return;
    saveThreadMessages(threadId, messages);
  }, [messages, status, threadId]);

  // Keep the composer focused when idle.
  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy, threadId]);

  // Auto-send a question passed from a lesson or the home page.
  const sentInitial = useRef(false);
  useEffect(() => {
    if (!initialQuestion || sentInitial.current || initialMessages.length > 0) return;
    sentInitial.current = true;
    void sendMessage({ text: initialQuestion });
  }, [initialQuestion, initialMessages.length, sendMessage]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    void sendMessage({ text: clean });
  };

  const handleSubmit = (msg: PromptInputMessage) => send(msg.text);

  const lastMessage = messages.at(-1);
  const waiting = status === "submitted" || (status === "streaming" && lastMessage?.role === "user");

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Conversation className="min-h-0 flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center pt-6 text-center">
              <img src={guruImg} alt="Guru Basa" width={816} height={816} className="w-28" />
              <h1 className="mt-4 text-3xl font-semibold">Om Swastyastu! Tiang Guru Basa.</h1>
              <p className="mt-2 max-w-md text-muted-foreground">
                Tanyakan apa saja tentang Basa Bali dalam Bahasa Indonesia atau English. Ask me anything about the
                Balinese language.
              </p>
              <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm shadow-soft transition-colors hover:border-primary hover:bg-primary-soft"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, mi) => {
              const isLast = mi === messages.length - 1;
              return (
                <Message key={message.id} from={message.role}>
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <img src={guruImg} alt="" width={816} height={816} className="size-6" />
                      Guru Basa
                    </div>
                  )}
                  <MessageContent className="text-[15px] leading-relaxed">
                    {message.parts.map((part, pi) => {
                      if (part.type === "text") {
                        return message.role === "assistant" ? (
                          <MessageResponse key={pi} isAnimating={isLast && status === "streaming"}>
                            {part.text}
                          </MessageResponse>
                        ) : (
                          <p key={pi} className="whitespace-pre-wrap">
                            {part.text}
                          </p>
                        );
                      }
                      if (part.type === "reasoning" && part.text.trim()) {
                        return (
                          <Reasoning
                            key={pi}
                            isStreaming={isLast && status === "streaming" && part.state === "streaming"}
                            defaultOpen={false}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              );
            })
          )}
          {waiting && (
            <Message from="assistant">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <img src={guruImg} alt="" width={816} height={816} className="size-6" />
                Guru Basa
              </div>
              <Shimmer className="text-sm">Guru Basa sedang berpikir…</Shimmer>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border bg-background/90 px-4 py-4 backdrop-blur">
        <div className="mx-auto w-full max-w-3xl">
          <PromptInput onSubmit={handleSubmit} className="rounded-2xl bg-card shadow-soft">
            <PromptInputTextarea
              ref={textareaRef}
              placeholder="Tanya dalam Bahasa Indonesia atau English…"
              aria-label="Pertanyaan untuk Guru Basa"
            />
            <PromptInputFooter className="justify-between">
              <PromptInputSelect value={level} onValueChange={(v) => setLevel(v as Level)}>
                <PromptInputSelectTrigger className="h-8 w-auto gap-1 text-xs" aria-label="Fokus tingkat bahasa">
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  <PromptInputSelectItem value="semua">Alus & andap</PromptInputSelectItem>
                  <PromptInputSelectItem value="alus">Fokus basa alus</PromptInputSelectItem>
                  <PromptInputSelectItem value="andap">Fokus basa andap</PromptInputSelectItem>
                </PromptInputSelectContent>
              </PromptInputSelect>
              <PromptInputSubmit status={status} onStop={stop} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Jawaban AI bisa keliru. Konfirmasi ke guru atau penutur asli untuk hal penting.
          </p>
        </div>
      </div>
    </div>
  );
}
