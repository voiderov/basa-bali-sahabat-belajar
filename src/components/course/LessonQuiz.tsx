import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { QUIZ_PASS_RATIO, scoreQuiz, type QuizQuestion } from "@/data/courses";
import { markLessonComplete } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function LessonQuiz({ courseId, lessonId, quiz }: { courseId: string; lessonId: string; quiz: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const result = scoreQuiz(quiz, answers);
  const allAnswered = answers.every((a) => a !== null);

  const submit = () => {
    setSubmitted(true);
    if (result.passed) markLessonComplete(courseId, lessonId, result.correct, result.total);
  };

  const reset = () => {
    setAnswers(quiz.map(() => null));
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {quiz.map((q, qi) => (
        <fieldset key={qi} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <legend className="sr-only">Soal {qi + 1}</legend>
          <p className="font-semibold">
            <span className="mr-2 font-display text-primary">{qi + 1}.</span>
            {q.question}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = q.answer === oi;
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={submitted}
                  aria-pressed={selected}
                  onClick={() => setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    !submitted && selected && "border-primary bg-primary-soft",
                    !submitted && !selected && "border-border hover:bg-muted",
                    submitted && isCorrect && "border-success bg-success/10",
                    submitted && selected && !isCorrect && "border-destructive bg-destructive/10",
                    submitted && !selected && !isCorrect && "border-border opacity-60",
                  )}
                >
                  {opt}
                  {submitted && isCorrect && <CheckCircle2 className="size-4 shrink-0 text-success" />}
                  {submitted && selected && !isCorrect && <XCircle className="size-4 shrink-0 text-destructive" />}
                </button>
              );
            })}
          </div>
          {submitted && <p className="mt-3 text-sm text-muted-foreground">{q.explanation}</p>}
        </fieldset>
      ))}

      {!submitted ? (
        <Button onClick={submit} disabled={!allAnswered} size="lg" className="rounded-full px-7">
          Periksa jawaban
        </Button>
      ) : (
        <div
          role="status"
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5",
            result.passed ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
          )}
        >
          <p className="font-semibold">
            Skor {result.correct}/{result.total}.{" "}
            {result.passed
              ? "Luung pisan! Pelajaran ditandai selesai."
              : `Butuh minimal ${Math.ceil(QUIZ_PASS_RATIO * result.total)} benar untuk lulus. Coba lagi!`}
          </p>
          <Button variant="outline" onClick={reset} className="rounded-full">
            <RotateCcw /> Ulangi kuis
          </Button>
        </div>
      )}
    </div>
  );
}
