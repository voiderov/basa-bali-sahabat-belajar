import type { UIMessage } from "ai";
import { useEffect, useState } from "react";

// Riwayat percakapan Guru Basa disimpan di browser pengguna (localStorage).

const KEY = "mabasa:threads:v1";
const EVENT = "mabasa:threads";

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

export const NEW_THREAD_TITLE = "Percakapan baru";

export function readThreads(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as ChatThread[];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.updatedAt - a.updatedAt) : [];
  } catch {
    return [];
  }
}

function writeThreads(threads: ChatThread[]) {
  window.localStorage.setItem(KEY, JSON.stringify(threads));
  window.dispatchEvent(new Event(EVENT));
}

export function getThread(id: string) {
  return readThreads().find((t) => t.id === id);
}

export function newThreadId() {
  return crypto.randomUUID().slice(0, 12);
}

/** Returns the existing thread with this id, creating it only when missing. */
export function ensureThread(id: string): ChatThread {
  const existing = getThread(id);
  if (existing) return existing;
  const thread: ChatThread = { id, title: NEW_THREAD_TITLE, updatedAt: Date.now(), messages: [] };
  writeThreads([thread, ...readThreads()]);
  return thread;
}

export function titleFromMessages(messages: UIMessage[]) {
  const firstUser = messages.find((m) => m.role === "user");
  const text = firstUser?.parts.find((p) => p.type === "text");
  if (!text || text.type !== "text") return NEW_THREAD_TITLE;
  const clean = text.text.replace(/\s+/g, " ").trim();
  return clean.length > 48 ? `${clean.slice(0, 48)}…` : clean || NEW_THREAD_TITLE;
}

export function saveThreadMessages(id: string, messages: UIMessage[]) {
  const threads = readThreads();
  const idx = threads.findIndex((t) => t.id === id);
  const updated: ChatThread = {
    id,
    title: titleFromMessages(messages),
    updatedAt: Date.now(),
    messages,
  };
  if (idx === -1) threads.unshift(updated);
  else threads[idx] = updated;
  writeThreads(threads);
}

export function deleteThread(id: string) {
  writeThreads(readThreads().filter((t) => t.id !== id));
}

export function useThreads(): ChatThread[] {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  useEffect(() => {
    const sync = () => setThreads(readThreads());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return threads;
}
