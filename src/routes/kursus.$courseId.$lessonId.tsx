import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, MessageCircleQuestion } from "lucide-react";

import { LessonQuiz } from "@/components/course/LessonQuiz";
import { LessonSections } from "@/components/course/LessonSections";
import { PracticeCard } from "@/components/course/PracticeCard";
import { Button } from "@/components/ui/button";
import { getLesson } from "@/data/courses";

export const Route = createFileRoute("/kursus/$courseId/$lessonId")({
  loader: ({ params }) => {
    const found = getLesson(params.courseId, params.lessonId);
    if (!found) throw notFound();
    return { courseId: params.courseId, lessonId: params.lessonId };
  },
  head: ({ loaderData }) => {
    const found = loaderData ? getLesson(loaderData.courseId, loaderData.lessonId) : undefined;
    const title = found ? `${found.lesson.title} — ${found.course.title} | Mabasa` : "Pelajaran — Mabasa";
    const description = found?.lesson.summary ?? "Pelajaran Basa Bali di Mabasa.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Pelajaran tidak ditemukan</h1>
      <Link to="/kursus" className="mt-4 inline-block text-primary hover:underline">
        Kembali ke daftar kursus
      </Link>
    </div>
  ),
  component: LessonPage,
});

function LessonPage() {
  const { courseId, lessonId } = Route.useLoaderData();
  const { course, lesson, index, prev, next } = getLesson(courseId, lessonId)!;
  const askPrompt = `Saya sedang belajar "${lesson.title}". Bisakah jelaskan lagi dengan contoh lain?`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        to="/kursus/$courseId"
        params={{ courseId: course.id }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> {course.title}
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Pelajaran {index + 1} dari {course.lessons.length}
        </p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">{lesson.title}</h1>
        <p className="mt-1 font-display text-xl italic text-muted-foreground">{lesson.balineseTitle}</p>
        <p className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="size-4" /> {lesson.minutes} menit
        </p>
      </header>

      <div className="mt-10">
        <LessonSections sections={lesson.sections} />
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-ink-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md">
          <span className="font-semibold">Masih bingung?</span>{" "}
          <span className="text-ink-foreground/75">Tanyakan materi ini ke Guru Basa dalam Bahasa Indonesia atau English.</span>
        </p>
        <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/chat" search={{ q: askPrompt }}>
            <MessageCircleQuestion /> Tanya Guru Basa
          </Link>
        </Button>
      </div>

      {lesson.practice.length > 0 && (
        <section className="mt-14">
          <h2 className="text-3xl font-semibold">Latihan menerjemahkan</h2>
          <p className="mt-2 text-muted-foreground">Tulis jawabanmu sendiri. AI akan memeriksa dan menjelaskan koreksinya.</p>
          <div className="mt-6 space-y-4">
            {lesson.practice.map((p, i) => (
              <PracticeCard key={p.prompt} practice={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="text-3xl font-semibold">Kuis</h2>
        <p className="mt-2 text-muted-foreground">Jawab semua soal untuk menandai pelajaran ini selesai.</p>
        <div className="mt-6">
          <LessonQuiz key={`${courseId}/${lessonId}`} courseId={courseId} lessonId={lessonId} quiz={lesson.quiz} />
        </div>
      </section>

      <nav className="mt-16 flex justify-between gap-4 border-t border-border pt-8" aria-label="Navigasi pelajaran">
        {prev ? (
          <Link
            to="/kursus/$courseId/$lessonId"
            params={{ courseId, lessonId: prev.id }}
            className="group flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-muted-foreground">Sebelumnya</span>
              <span className="font-semibold">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to="/kursus/$courseId/$lessonId"
            params={{ courseId, lessonId: next.id }}
            className="group flex items-center gap-2 text-right text-sm"
          >
            <span>
              <span className="block text-muted-foreground">Berikutnya</span>
              <span className="font-semibold">{next.title}</span>
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link to="/kursus" className="text-sm font-semibold text-primary hover:underline">
            Selesai! Lihat kursus lain →
          </Link>
        )}
      </nav>
    </div>
  );
}
