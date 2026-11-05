import { describe, expect, it } from "vitest";

import { courses, getLesson, scoreQuiz } from "@/data/courses";

describe("course content", () => {
  it("offers the two main courses: introduction and basic education", () => {
    expect(courses.map((c) => c.id)).toEqual(["pengenalan", "dasar"]);
  });

  it("every quiz answer points at an existing option", () => {
    for (const course of courses) {
      for (const lesson of course.lessons) {
        expect(lesson.quiz.length).toBeGreaterThan(0);
        for (const q of lesson.quiz) {
          expect(q.answer).toBeGreaterThanOrEqual(0);
          expect(q.answer).toBeLessThan(q.options.length);
        }
      }
    }
  });

  it("scores a quiz and requires 70% to pass", () => {
    const lesson = getLesson("pengenalan", "salam")!.lesson; // 4 questions
    const allRight = lesson.quiz.map((q) => q.answer);
    expect(scoreQuiz(lesson.quiz, allRight)).toMatchObject({ correct: 4, passed: true });
    const twoRight = allRight.map((a, i) => (i < 2 ? a : null));
    expect(scoreQuiz(lesson.quiz, twoRight)).toMatchObject({ correct: 2, passed: false });
  });
});
