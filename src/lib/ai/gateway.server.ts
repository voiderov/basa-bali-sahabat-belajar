import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, streamText, type ModelMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
export const CHAT_MODEL = "openai/gpt-6-astra";
export const GEMINI_MODEL = "gemini-2.5-flash";

type CallResult = {
  result: ReturnType<typeof streamText>;
  wrap: (res: Response) => Response | Promise<Response>;
};

/**
 * Streams one AI call (server only).
 * Uses the owner's Gemini key when GEMINI_API_KEY is set, otherwise Lovable AI Gateway.
 * Returns null when no AI credential is configured.
 */
export function createChatCall(
  request: Request,
  messages: ModelMessage[],
  instructions: string,
): CallResult | null {
  const geminiKey = process.env["GEMINI_API_KEY"];
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    const result = streamText({
      model: google(GEMINI_MODEL),
      instructions,
      messages,
      abortSignal: request.signal,
    });
    return { result, wrap: (res) => res };
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return null;
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
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
  return { result, wrap: (res) => withLovableAiGatewayRunIdHeader(res, runIdFetch) };
}

/** Maps AI failures to a short, user-safe Indonesian message. */
export function describeAiError(error: unknown): { status: number; message: string } {
  const status = APICallError.isInstance(error) ? (error.statusCode ?? 500) : 500;
  if (status === 429) return { status, message: "Guru Basa sedang ramai atau kuota AI habis. Coba lagi sebentar lagi." };
  if (status === 402)
    return { status, message: "Kuota AI aplikasi ini sudah habis. Pemilik aplikasi perlu menambah kredit AI." };
  if (status === 400 || status === 401 || status === 403)
    return { status, message: "Kunci AI tidak valid atau akses AI dibatasi. Pemilik aplikasi perlu memeriksanya." };
  if (error instanceof Error && error.name === "AbortError") return { status: 499, message: "Dihentikan." };
  return { status, message: "Guru Basa gagal menjawab. Silakan coba lagi." };
}
