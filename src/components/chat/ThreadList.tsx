import { Link, useNavigate } from "@tanstack/react-router";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteThread, newThreadId, useThreads } from "@/lib/threads";
import { cn } from "@/lib/utils";

export function ThreadList({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  const threads = useThreads();
  const navigate = useNavigate();

  const createThread = () => {
    onNavigate?.();
    navigate({ to: "/chat/$threadId", params: { threadId: newThreadId() } });
  };

  const remove = (id: string) => {
    deleteThread(id);
    if (id === activeId) {
      onNavigate?.();
      navigate({ to: "/chat", replace: true });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="p-3">
        <Button onClick={createThread} className="w-full justify-start rounded-xl">
          <Plus /> Percakapan baru
        </Button>
      </div>
      <p className="px-4 pb-2 pt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Riwayat</p>
      <ul className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4" aria-label="Riwayat percakapan">
        {threads.length === 0 && <li className="px-3 py-2 text-sm text-muted-foreground">Belum ada percakapan.</li>}
        {threads.map((t) => (
          <li
            key={t.id}
            className={cn(
              "group flex items-center gap-1 rounded-lg pr-1 transition-colors hover:bg-sidebar-accent",
              t.id === activeId && "bg-sidebar-accent",
            )}
          >
            <Link
              to="/chat/$threadId"
              params={{ threadId: t.id }}
              onClick={onNavigate}
              className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-sm"
            >
              <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{t.title}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => remove(t.id)}
              aria-label={`Hapus percakapan ${t.title}`}
              className="shrink-0 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </li>
        ))}
      </ul>
      <p className="border-t border-sidebar-border px-4 py-3 text-xs text-muted-foreground">
        Riwayat tersimpan di browser ini saja.
      </p>
    </div>
  );
}
