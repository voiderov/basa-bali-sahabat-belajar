import { useEffect, useState } from "react";

const KEY = "mabasa:progress:v1";
const EVENT = "mabasa:progress";

export type LessonProgress = { correct: number; total: number; completedAt: number };
export type ProgressMap = Record<string, LessonProgress>;

export const lessonKey = (courseId: string, lessonId: string) => `${courseId}/${lessonId}`;

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

export function markLessonComplete(courseId: string, lessonId: string, correct: number, total: number) {
  const map = read();
  const key = lessonKey(courseId, lessonId);
  const prev = map[key];
  if (!prev || correct >= prev.correct) {
    map[key] = { correct, total, completedAt: Date.now() };
    window.localStorage.setItem(KEY, JSON.stringify(map));
    window.dispatchEvent(new Event(EVENT));
  }
}

/** Reads progress after hydration so server and first client render match. */
export function useProgress(): ProgressMap {
  const [map, setMap] = useState<ProgressMap>({});
  useEffect(() => {
    const sync = () => setMap(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return map;
}
