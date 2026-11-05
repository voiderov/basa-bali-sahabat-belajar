import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Shimmer } from "@/components/ai-elements/shimmer";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ThreadList } from "@/components/chat/ThreadList";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/chat/$threadId")({
  validateSearch: z.object({ q: z.string().max(500).optional() }),
  head: () => ({
    meta: [
      { title: "Percakapan dengan Guru Basa | Mabasa" },
      { name: "description", content: "Percakapan dengan Guru Basa, tutor AI Basa Bali." },
      { property: "og:title", content: "Percakapan dengan Guru Basa | Mabasa" },
      { property: "og:description", content: "Tanya jawab Basa Bali dengan AI dalam Bahasa Indonesia atau English." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ChatThreadPage,
});

function ChatThreadPage() {
  const { threadId } = Route.useParams();
  const { q } = Route.useSearch();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-[calc(100dvh-4.375rem)] min-h-0">
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar md:block">
        <ClientOnly>
          <ThreadList activeId={threadId} />
        </ClientOnly>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center border-b border-border px-3 py-2 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <History /> Riwayat
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-0">
              <SheetTitle className="sr-only">Riwayat percakapan</SheetTitle>
              <div className="h-full pt-8">
                <ThreadList activeId={threadId} onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <ClientOnly
          fallback={
            <div className="grid flex-1 place-items-center">
              <Shimmer>Memuat percakapan…</Shimmer>
            </div>
          }
        >
          <ChatWindow key={threadId} threadId={threadId} initialQuestion={q} />
        </ClientOnly>
      </div>
    </div>
  );
}
