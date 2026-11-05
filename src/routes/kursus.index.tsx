import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/courses";
import { lessonKey, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/kursus/")({
  head: () => ({
    meta: [
      { title: "Kursus Basa Bali — Mabasa" },
      { name: "description", content: "Dua kursus utama: Pengenalan Basa Bali dan Pendidikan Dasar Basa Bali." },
      { property: "og:title", content: "Kursus Basa Bali — Mabasa" },
      { property: "og:description", content: "Pilih jalur belajar Basa Bali: pengenalan atau pendidikan dasar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const progress = useProgress();
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">Paplajahan</p>
      <h1 className="mt-2 text-5xl font-semibold">Kursus Basa Bali</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Mulai dari pengenalan, lalu lanjut ke pendidikan dasar. Setiap pelajaran berisi materi singkat, kuis, dan latihan
        menerjemahkan yang dikoreksi AI. Kemajuanmu tersimpan otomatis di browser ini.
      </p>

      <div className="mt-12 space-y-10">
        {courses.map((course, ci) => {
          const done = course.lessons.filter((l) => progress[lessonKey(course.id, l.id)]).length;
          const pct = Math.round((done / course.lessons.length) * 100);
          return (
            <section key={course.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="grid gap-8 p-8 md:grid-cols-[1fr_1.3fr]">
                <div>
                  <span className="font-display text-6xl font-semibold text-primary/20">0{ci + 1}</span>
                  <h2 className="mt-2 text-3xl font-semibold">{course.title}</h2>
                  <p className="font-display italic text-muted-foreground">{course.balineseTitle}</p>
                  <p className="mt-4 text-muted-foreground">{course.description}</p>
                  <div className="mt-6">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium">Kemajuan</span>
                      <span className="text-muted-foreground">
                        {done}/{course.lessons.length} selesai
                      </span>
                    </div>
                    <Progress value={pct} aria-label={`Kemajuan ${course.title}`} />
                  </div>
                  <Link
                    to="/kursus/$courseId"
                    params={{ courseId: course.id }}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                  >
                    Lihat kursus <ArrowRight className="size-4" />
                  </Link>
                </div>
                <ol className="divide-y divide-border rounded-2xl border border-border bg-background/60">
                  {course.lessons.map((lesson, i) => {
                    const isDone = Boolean(progress[lessonKey(course.id, lesson.id)]);
                    return (
                      <li key={lesson.id}>
                        <Link
                          to="/kursus/$courseId/$lessonId"
                          params={{ courseId: course.id, lessonId: lesson.id }}
                          className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted font-display font-semibold">
                            {isDone ? <CheckCircle2 className="size-5 text-success" /> : i + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">{lesson.title}</span>
                            <span className="block truncate text-sm text-muted-foreground">{lesson.summary}</span>
                          </span>
                          <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                            <Clock className="size-3.5" /> {lesson.minutes} mnt
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
