import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, streamText, type ModelMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
export const CHAT_MODEL = "openai/gpt-6-astra";

/** Streams one Responses call through Lovable AI Gateway (server only). */
export function createResponsesCall(
  request: Request,
  config: { apiKey: string; model?: string; effort?: "low" | "medium" },
  messages: ModelMessage[],
  instructions?: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses(config.model ?? CHAT_MODEL),
    ...(instructions ? { instructions } : {}),
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: config.effort ?? "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return { result, runIdFetch, withRunId: (res: Response) => withLovableAiGatewayRunIdHeader(res, runIdFetch) };
}

/** Maps gateway failures to a short, user-safe Indonesian message. */
export function describeAiError(error: unknown): { status: number; message: string } {
  const status = APICallError.isInstance(error) ? (error.statusCode ?? 500) : 500;
  if (status === 429) return { status, message: "Guru Basa sedang ramai. Coba lagi sebentar lagi." };
  if (status === 402)
    return { status, message: "Kuota AI aplikasi ini sudah habis. Pemilik aplikasi perlu menambah kredit AI." };
  if (status === 403) return { status, message: "Akses AI sedang dibatasi untuk aplikasi ini." };
  if (status === 401) return { status, message: "Konfigurasi AI belum lengkap di server." };
  if (error instanceof Error && error.name === "AbortError") return { status: 499, message: "Dihentikan." };
  return { status, message: "Guru Basa gagal menjawab. Silakan coba lagi." };
}
