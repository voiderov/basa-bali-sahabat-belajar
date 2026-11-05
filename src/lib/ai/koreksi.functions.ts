import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type KoreksiVerdict = "benar" | "hampir" | "salah";
export type KoreksiResult = { ok: true; verdict: KoreksiVerdict; feedback: string } | { ok: false; error: string };

const inputSchema = z.object({
  prompt: z.string().min(1).max(300),
  reference: z.string().min(1).max(300),
  answer: z.string().min(1).max(300),
});

/** AI checks a learner's Balinese translation and explains corrections. */
export const koreksiTerjemahan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }): Promise<KoreksiResult> => {
    const apiKey = process.env['LOVABLE_API_KEY'];
    if (!apiKey) return { ok: false, error: "Konfigurasi AI belum lengkap di server." };

    const { createResponsesCall, describeAiError } = await import("./gateway.server");
    const instructions = `Anda adalah pemeriksa latihan Basa Bali untuk pelajar pemula.
Tugas: nilai terjemahan pelajar dari Bahasa Indonesia ke Basa Bali.
Terima variasi yang benar (sinonim, tingkat bahasa lain yang masih tepat, ejaan wajar, huruf besar/kecil, tanda baca) sebagai benar.
Balas PERSIS dengan format:
Baris pertama: salah satu kata BENAR, HAMPIR, atau SALAH.
Baris berikutnya: umpan balik 1-3 kalimat dalam Bahasa Indonesia, sebutkan bagian yang perlu diperbaiki dan berikan bentuk yang benar dengan cetak tebal. Sebut tingkat bahasanya (alus/andap) bila relevan.`;
    const userText = `Kalimat Indonesia: "${data.prompt}"
Contoh jawaban guru: "${data.reference}"
Jawaban pelajar: "${data.answer}"`;

    try {
      const request = new Request("https://local/koreksi");
      const { result } = createResponsesCall(
        request,
        { apiKey, effort: "low" },
        [{ role: "user", content: userText }],
        instructions,
      );
      const text = (await result.text).trim();
      if (!text) return { ok: false, error: "AI tidak memberikan jawaban. Coba lagi." };
      const [first, ...rest] = text.split("\n");
      const head = (first ?? "").toUpperCase();
      const verdict: KoreksiVerdict = head.includes("BENAR") ? "benar" : head.includes("HAMPIR") ? "hampir" : "salah";
      return { ok: true, verdict, feedback: rest.join("\n").trim() || text };
    } catch (error) {
      console.error("Koreksi error", error);
      return { ok: false, error: describeAiError(error).message };
    }
  });
