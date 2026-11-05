import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Languages, MessageCircleQuestion, PenLine, ScrollText } from "lucide-react";

import heroImg from "@/assets/hero-bali.jpg";
import guruImg from "@/assets/guru-basa.png";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mabasa — Belajar Basa Bali dengan Guru Basa AI" },
      {
        name: "description",
        content:
          "Kursus Pengenalan dan Pendidikan Dasar Basa Bali, plus Guru Basa AI yang bisa ditanya dalam Bahasa Indonesia dan Inggris.",
      },
      { property: "og:title", content: "Mabasa — Belajar Basa Bali dengan Guru Basa AI" },
      {
        property: "og:description",
        content: "Belajar salam, sor singgih basa, aksara, dan kalimat sehari-hari Basa Bali bersama AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: BookOpen,
    title: "Kursus terstruktur",
    body: "Dua jalur belajar: pengenalan dan pendidikan dasar, lengkap dengan kosakata dan kuis.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Guru Basa AI",
    body: "Tanya apa pun tentang Basa Bali dalam Bahasa Indonesia atau English — dijawab dengan contoh dan tingkat bahasanya.",
  },
  {
    icon: PenLine,
    title: "Latihan dikoreksi AI",
    body: "Tulis terjemahanmu sendiri, lalu AI memeriksa dan menjelaskan bagian yang perlu diperbaiki.",
  },
  {
    icon: ScrollText,
    title: "Sor singgih & aksara",
    body: "Pahami kapan memakai basa alus dan andap, serta kenali 18 aksara wreastra.",
  },
];

const SAMPLE_QUESTIONS = [
  "Apa bedanya “tiang” dan “titiang”?",
  "How do I say “thank you very much” in Balinese?",
  "Terjemahkan: Saya mau ke pasar membeli kue",
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Candi bentar di Bali saat matahari terbit dengan naskah lontar di depannya"
          width={1600}
          height={1008}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden />
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6">
          <p className="animate-rise font-aksara text-2xl tracking-widest text-accent" aria-hidden>
            ᬳᬦᬘᬭᬓ
          </p>
          <p className="animate-rise mt-1 font-display text-lg italic text-ink-foreground/90 [animation-delay:80ms]">
            Om Swastyastu
          </p>
          <h1 className="animate-rise mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] text-ink-foreground [animation-delay:160ms] sm:text-7xl">
            Belajar Basa Bali, <em className="font-normal text-accent">ditemani</em> Guru Basa AI.
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-lg text-ink-foreground/85 [animation-delay:240ms]">
            Kursus singkat untuk pelajar dan pendatang, plus tutor AI yang menjawab pertanyaanmu dalam Bahasa Indonesia
            maupun English.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3 [animation-delay:320ms]">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/kursus">
                Mulai belajar <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-ink-foreground/40 bg-ink/30 px-7 text-ink-foreground hover:bg-ink/50 hover:text-ink-foreground">
              <Link to="/chat">Tanya Guru Basa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Bahasa ibu yang perlu <span className="text-primary">dijaga bersama.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Banyak generasi muda Bali kini lebih sering memakai Bahasa Indonesia, dan pendatang kesulitan menemukan materi
            yang ramah pemula. Aturan sor singgih basa juga membuat orang ragu untuk mulai berbicara. Mabasa menghadirkan
            materi singkat dan tutor AI yang bisa ditanya kapan saja.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Kursus utama</p>
              <h2 className="mt-2 text-4xl font-semibold">Pilih jalur belajarmu</h2>
            </div>
            <Link to="/kursus" className="text-sm font-semibold text-primary hover:underline">
              Lihat semua kursus →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {courses.map((course, i) => (
              <Link
                key={course.id}
                to="/kursus/$courseId"
                params={{ courseId: course.id }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lifted"
              >
                <span className="absolute -right-4 -top-6 font-display text-[9rem] font-semibold leading-none text-primary/10">
                  0{i + 1}
                </span>
                <span className="inline-flex rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-secondary">
                  {course.level} · {course.lessons.length} pelajaran
                </span>
                <h3 className="mt-5 text-3xl font-semibold">{course.title}</h3>
                <p className="mt-1 font-display italic text-muted-foreground">{course.balineseTitle}</p>
                <p className="mt-4 text-muted-foreground">{course.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
                  Mulai kursus <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI tutor teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground sm:p-12 md:grid-cols-[auto_1fr]">
          <img src={guruImg} alt="Maskot Guru Basa" width={816} height={816} loading="lazy" className="mx-auto w-44 md:w-56" />
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
              <Languages className="size-4" /> Indonesia · English → Basa Bali
            </p>
            <h2 className="mt-3 text-4xl font-semibold">Kenalan dengan Guru Basa</h2>
            <p className="mt-4 max-w-xl text-ink-foreground/75">
              Tutor AI yang khusus membahas Basa Bali. Setiap jawaban menyertakan contoh kalimat, label tingkat bahasa
              (alus/andap), dan latihan singkat.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {SAMPLE_QUESTIONS.map((q) => (
                <Link
                  key={q}
                  to="/chat"
                  search={{ q }}
                  className="w-fit rounded-full border border-ink-foreground/20 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
