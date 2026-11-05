import { convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";

import { createResponsesCall, describeAiError } from "./gateway.server";

export type BasaLevel = "semua" | "alus" | "andap";

const LEVEL_NOTE: Record<BasaLevel, string> = {
  semua: "Tampilkan bentuk alus dan andap bila keduanya berbeda.",
  alus: "Pengguna ingin fokus pada basa alus (sopan). Utamakan bentuk alus; sebut bentuk andap hanya bila membantu.",
  andap: "Pengguna ingin fokus pada basa andap (sehari-hari dengan teman sebaya). Utamakan bentuk andap; sebut bentuk alus bila konteksnya menuntut kesopanan.",
};

export function guruBasaInstructions(level: BasaLevel) {
  return `Anda adalah "Guru Basa", tutor Basa Bali yang ramah, sabar, dan akurat di aplikasi pembelajaran Mabasa.

TUGAS
- Membantu pelajar memahami dan menggunakan Basa Bali: terjemahan, kosakata, tata bahasa, sor singgih basa (alus singgih, alus sor, alus madia, alus mider, andap, kasar), Aksara Bali, ungkapan, dan konteks budaya Bali.
- Pengguna boleh bertanya dalam Bahasa Indonesia atau Bahasa Inggris.

BAHASA JAWABAN
- Deteksi bahasa pertanyaan pengguna. Jika pengguna bertanya dalam Bahasa Inggris, jelaskan dalam Bahasa Inggris. Jika dalam Bahasa Indonesia, jelaskan dalam Bahasa Indonesia.
- Selalu sertakan contoh dalam Basa Bali (huruf Latin, dicetak tebal) beserta artinya.
- Beri label tingkat bahasa untuk setiap kata/kalimat Bali, misalnya *(alus)*, *(andap)*, *(alus sor)*.
- Jika pengguna menulis dalam Basa Bali, balas dengan Basa Bali sederhana lalu beri terjemahan singkat.
- Sertakan Aksara Bali (Unicode) hanya jika diminta atau sangat relevan, dan selalu dengan transliterasi Latin.

GAYA
- Ringkas dan terstruktur: gunakan poin, tabel kecil, atau contoh kalimat. Hindari jawaban yang terlalu panjang.
- Akhiri dengan satu latihan singkat atau pertanyaan balik bila cocok, agar pelajar aktif berlatih.
- ${LEVEL_NOTE[level]}

KEJUJURAN DAN BATASAN
- Basa Bali punya variasi daerah (dialek dataran dan Bali Aga). Jika ada variasi atau Anda tidak yakin, katakan dengan jujur dan sarankan konfirmasi ke guru atau penutur asli.
- Jangan mengarang kata. Lebih baik memberi kata yang umum dan pasti.
- Jika pertanyaan di luar topik Basa Bali dan budaya Bali, jawab singkat dengan sopan lalu arahkan kembali ke pembelajaran Basa Bali.
- Hormati nilai agama dan adat Bali.`;
}

const bodySchema = z.object({
  messages: z.array(z.any()).min(1).max(200),
  threadId: z.string().min(1).max(64),
  level: z.enum(["semua", "alus", "andap"]).default("semua"),
});

export async function handleGuruBasaChat(request: Request) {
  const apiKey = process.env['LOVABLE_API_KEY'];
  if (!apiKey) return Response.json({ error: "Konfigurasi AI belum lengkap di server." }, { status: 500 });

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const messages = parsed.messages as UIMessage[];
  const modelMessages = await convertToModelMessages(messages);
  const { result, withRunId } = createResponsesCall(
    request,
    { apiKey, effort: "low" },
    modelMessages,
    guruBasaInstructions(parsed.level),
  );

  return withRunId(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      onError: (error) => {
        console.error("Guru Basa error", error);
        return describeAiError(error).message;
      },
    }),
  );
}
