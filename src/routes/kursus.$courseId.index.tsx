import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCourse } from "@/data/courses";
import { lessonKey, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/kursus/$courseId/")({
  loader: ({ params }) => {
    const course = getCourse(params.courseId);
    if (!course) throw notFound();
    return { courseId: course.id };
  },
  head: ({ loaderData }) => {
    const course = loaderData ? getCourse(loaderData.courseId) : undefined;
    const title = course ? `${course.title} — Mabasa` : "Kursus tidak ditemukan — Mabasa";
    const description = course?.description ?? "Kursus Basa Bali di Mabasa.";
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
      <h1 className="text-3xl font-semibold">Kursus tidak ditemukan</h1>
      <Link to="/kursus" className="mt-4 inline-block text-primary hover:underline">
        Kembali ke daftar kursus
      </Link>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { courseId } = Route.useLoaderData();
  const course = getCourse(courseId)!;
  const progress = useProgress();
  const done = course.lessons.filter((l) => progress[lessonKey(course.id, l.id)]).length;
  const nextLesson = course.lessons.find((l) => !progress[lessonKey(course.id, l.id)]) ?? course.lessons[0]!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/kursus" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Semua kursus
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <span className="inline-flex rounded-full bg-secondary-soft px-3 py-1 text-xs font-semibold text-secondary">
            {course.level}
          </span>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">{course.title}</h1>
          <p className="mt-1 font-display text-xl italic text-muted-foreground">{course.balineseTitle}</p>
          <p className="mt-5 text-lg text-muted-foreground">{course.description}</p>
          <Button asChild size="lg" className="mt-8 rounded-full px-7">
            <Link to="/kursus/$courseId/$lessonId" params={{ courseId: course.id, lessonId: nextLesson.id }}>
              {done === 0 ? "Mulai pelajaran pertama" : done === course.lessons.length ? "Ulangi dari awal" : "Lanjutkan belajar"}
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Target className="size-5 text-primary" /> Yang akan kamu kuasai
          </h2>
          <ul className="mt-4 space-y-3">
            {course.outcomes.map((o) => (
              <li key={o} className="flex gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-5">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">Kemajuan</span>
              <span className="text-muted-foreground">
                {done}/{course.lessons.length}
              </span>
            </div>
            <Progress value={(done / course.lessons.length) * 100} aria-label="Kemajuan kursus" />
          </div>
        </aside>
      </div>

      <h2 className="mt-16 text-2xl font-semibold">Daftar pelajaran</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {course.lessons.map((lesson, i) => {
          const p = progress[lessonKey(course.id, lesson.id)];
          return (
            <Link
              key={lesson.id}
              to="/kursus/$courseId/$lessonId"
              params={{ courseId: course.id, lessonId: lesson.id }}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lifted"
            >
              <span className="font-display text-4xl font-semibold text-primary/30 group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold">{lesson.title}</span>
                <span className="block font-display text-sm italic text-muted-foreground">{lesson.balineseTitle}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{lesson.summary}</span>
                <span className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {lesson.minutes} menit
                  </span>
                  {p && (
                    <span className="flex items-center gap-1 font-semibold text-success">
                      <CheckCircle2 className="size-3.5" /> Kuis {p.correct}/{p.total}
                    </span>
                  )}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
