import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

import { Shimmer } from "@/components/ai-elements/shimmer";
import { newThreadId, readThreads } from "@/lib/threads";

export const Route = createFileRoute("/chat/")({
  validateSearch: z.object({ q: z.string().max(500).optional() }),
  head: () => ({
    meta: [
      { title: "Guru Basa AI — Tanya Jawab Basa Bali | Mabasa" },
      {
        name: "description",
        content: "Chatbot AI khusus Basa Bali. Bertanya dalam Bahasa Indonesia atau English.",
      },
      { property: "og:title", content: "Guru Basa AI — Tanya Jawab Basa Bali" },
      { property: "og:description", content: "Tutor AI Basa Bali yang menjawab dalam Bahasa Indonesia dan English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatIndex,
});

/** Opens the most recent conversation, or a new one when a question is passed in. */
function ChatIndex() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const latest = readThreads()[0];
    const reuse = !q && latest;
    const threadId = reuse ? latest.id : (latest && latest.messages.length === 0 ? latest.id : newThreadId());
    navigate({ to: "/chat/$threadId", params: { threadId }, search: q ? { q } : {}, replace: true });
  }, [navigate, q]);

  return (
    <div className="grid h-[60vh] place-items-center">
      <Shimmer>Membuka Guru Basa…</Shimmer>
    </div>
  );
}
