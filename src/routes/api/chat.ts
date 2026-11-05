import { createFileRoute } from "@tanstack/react-router";

import { handleGuruBasaChat } from "@/lib/ai/guru-basa.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: ({ request }) => handleGuruBasaChat(request),
    },
  },
});
