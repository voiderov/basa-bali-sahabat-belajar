import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Database, Globe, Layers, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Mabasa & AI Disclosure" },
      {
        name: "description",
        content: "Masalah, target pengguna, cara kerja AI, arsitektur, dan AI & Technology Disclosure Mabasa.",
      },
      { property: "og:title", content: "Tentang Mabasa & AI Disclosure" },
      { property: "og:description", content: "Bagaimana Mabasa memakai AI untuk pembelajaran Basa Bali." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const STACK = [
  { label: "Frontend", value: "React 19, TanStack Start, Tailwind CSS v4, komponen AI Elements" },
  { label: "Backend", value: "Server route & server function TanStack Start (edge runtime)" },
  { label: "AI model / API", value: "Lovable AI Gateway → model OpenAI GPT (Responses API) via Vercel AI SDK" },
  { label: "Penyimpanan", value: "localStorage browser: riwayat chat & kemajuan belajar (tanpa login, tanpa data pribadi di server)" },
  { label: "Hosting", value: "Lovable (deploy otomatis)" },
  { label: "AI coding assistant", value: "Lovable AI agent untuk membantu menulis kode dan desain" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Tentang proyek</p>
      <h1 className="mt-2 text-5xl font-semibold leading-tight">Mabasa — belajar Basa Bali dengan AI</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        Dibangun untuk AI Web Innovation Challenge Bali DigiFest 2026 bertema <em>Build with AI, Solve for Bali</em>, area
        Pendidikan dan Bali Smart Society (budaya).
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-2xl font-semibold">Masalah</h2>
          <p className="mt-3 text-muted-foreground">
            Penggunaan Basa Bali di kalangan generasi muda menurun, materi belajar digital yang ramah pemula masih
            terbatas, dan aturan sor singgih basa membuat pelajar takut salah. Pendatang dan wisatawan juga sulit
            menemukan tempat bertanya dalam Bahasa Indonesia atau Inggris.
          </p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Users className="size-5 text-primary" /> Target pengguna
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>Siswa SD–SMA/SMK di Bali yang mempelajari muatan lokal Basa Bali</li>
            <li>Generasi muda Bali yang ingin lancar kembali berbahasa ibu</li>
            <li>Pendatang, ekspatriat, dan wisatawan</li>
            <li>Guru sebagai alat bantu latihan di luar kelas</li>
          </ul>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-3xl font-semibold">
          <Bot className="size-6 text-primary" /> Bagaimana AI bekerja
        </h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">1. Guru Basa — chatbot khusus Basa Bali</h3>
            <p className="mt-2 text-muted-foreground">
              Model bahasa besar (LLM) diberi instruksi sistem khusus sebagai tutor Basa Bali: mendeteksi bahasa
              pertanyaan (Indonesia/English), menjawab dalam bahasa yang sama, selalu memberi contoh Basa Bali dengan
              label tingkat bahasa (alus/andap), jujur saat ada variasi dialek, dan mengarahkan kembali pertanyaan di
              luar topik. Pengguna dapat memilih fokus basa alus atau andap. Jawaban dialirkan (streaming) secara
              langsung, dan riwayat percakapan lengkap dikirim setiap giliran agar konteks terjaga.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-xl font-semibold">2. Koreksi latihan terjemahan</h3>
            <p className="mt-2 text-muted-foreground">
              Di setiap pelajaran, pelajar menulis terjemahan bebas. AI membandingkan jawaban dengan contoh guru,
              menerima variasi yang benar (sinonim atau tingkat bahasa lain yang tepat), lalu memberi penilaian
              BENAR / HAMPIR / SALAH beserta penjelasan perbaikan.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-3xl font-semibold">
          <Layers className="size-6 text-primary" /> Arsitektur & alur data
        </h2>
        <pre className="mt-6 overflow-x-auto rounded-2xl bg-ink p-6 text-sm leading-relaxed text-ink-foreground">
{`Browser (React)
  ├─ Kursus & kuis ──────────────► data materi statis + kemajuan di localStorage
  ├─ Guru Basa (useChat) ── POST /api/chat ──► Server route
  │                                             └─ instruksi Guru Basa + riwayat
  │                                                └─► Lovable AI Gateway (LLM, streaming)
  └─ Latihan terjemahan ── server function koreksiTerjemahan ──► Lovable AI Gateway
Riwayat chat ◄── disimpan per percakapan di localStorage (/chat/:threadId)`}
        </pre>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-3xl font-semibold">
          <ShieldCheck className="size-6 text-primary" /> AI & Technology Disclosure
        </h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <dl className="divide-y divide-border">
            {STACK.map((s) => (
              <div key={s.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr]">
                <dt className="font-semibold">{s.label}</dt>
                <dd className="text-muted-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <Database className="mt-0.5 size-4 shrink-0" /> Tidak ada akun atau data pribadi yang disimpan di server.
            Kunci API hanya ada di server dan tidak disimpan di repository.
          </li>
          <li className="flex gap-2">
            <Globe className="mt-0.5 size-4 shrink-0" /> Materi kursus disusun dari referensi umum Basa Bali dan perlu
            ditinjau oleh guru Basa Bali sebelum dipakai resmi di sekolah.
          </li>
        </ul>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link to="/kursus" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
          Coba kursus
        </Link>
        <Link to="/chat" className="rounded-full border border-border px-6 py-3 font-semibold hover:bg-muted">
          Coba Guru Basa
        </Link>
      </div>
    </div>
  );
}
