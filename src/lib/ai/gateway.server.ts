import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, RetryError, streamText, type ModelMessage } from "ai";

import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "./run-id.ts";

export const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
export const CHAT_MODEL = "openai/gpt-6-astra";
export const GEMINI_MODEL = "gemini-3.8-flash";

type StreamResult = ReturnType<typeof streamText>;
export type ChatAttempt = { name: string; start: () => StreamResult };

/**
 * Ordered list of AI backends to try (server only):
 * 1. The owner's Gemini key (GEMINI_API_KEY), when set.
 * 2. Lovable AI Gateway (LOVABLE_API_KEY) as fallback, so the app keeps working
 *    when Gemini is overloaded or its quota runs out.
 */
export function chatAttempts(request: Request, messages: ModelMessage[], instructions: string): ChatAttempt[] {
  const attempts: ChatAttempt[] = [];

  const geminiKey = process.env["GEMINI_API_KEY"];
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    attempts.push({
      name: "gemini",
      start: () =>
        streamText({
          model: google(process.env["GEMINI_MODEL"] || GEMINI_MODEL),
          instructions,
          messages,
          abortSignal: request.signal,
          maxRetries: 1,
        }),
    });
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (apiKey) {
    attempts.push({
      name: "lovable-ai",
      start: () => {
        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: GATEWAY_URL,
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        return streamText({
          model: provider.responses(CHAT_MODEL),
          instructions,
          messages,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              store: false,
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            },
          },
        });
      },
    });
  }

  return attempts;
}

/**
 * Waits until a stream produces its first output (returns null) or fails before
 * producing anything (returns the error). The stream can still be consumed in full
 * afterwards because each consumer receives its own copy.
 */
export async function firstOutputOrError(result: StreamResult): Promise<unknown | null> {
  try {
    for await (const part of result.fullStream) {
      if (part.type === "error") return part.error ?? new Error("AI error");
      if (part.type === "text-delta" || part.type === "reasoning-delta" || part.type === "finish") return null;
    }
    return null;
  } catch (error) {
    return error;
  }
}

/** Maps AI failures to a short, user-safe Indonesian message. */
export function describeAiError(error: unknown): { status: number; message: string } {
  const inner = RetryError.isInstance(error) ? error.lastError : error;
  const status = APICallError.isInstance(inner) ? (inner.statusCode ?? 500) : 500;
  if (status === 429 || status === 503)
    return { status, message: "Guru Basa sedang ramai atau kuota AI habis. Coba lagi sebentar lagi." };
  if (status === 402)
    return { status, message: "Kuota AI aplikasi ini sudah habis. Pemilik aplikasi perlu menambah kredit AI." };
  if (status === 400 || status === 401 || status === 403)
    return { status, message: "Kunci AI tidak valid atau akses AI dibatasi. Pemilik aplikasi perlu memeriksanya." };
  if (inner instanceof Error && inner.name === "AbortError") return { status: 499, message: "Dihentikan." };
  return { status, message: "Guru Basa gagal menjawab. Silakan coba lagi." };
}
