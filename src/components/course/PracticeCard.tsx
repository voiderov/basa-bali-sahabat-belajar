import { useServerFn } from "@tanstack/react-start";
import { Loader2, PenLine } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { MessageResponse } from "@/components/ai-elements/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Practice } from "@/data/courses";
import { koreksiTerjemahan, type KoreksiVerdict } from "@/lib/ai/koreksi.functions";
import { cn } from "@/lib/utils";

const VERDICT: Record<KoreksiVerdict, { label: string; className: string }> = {
  benar: { label: "Benar! Luung pisan.", className: "border-success/50 bg-success/10" },
  hampir: { label: "Hampir tepat", className: "border-accent bg-accent/15" },
  salah: { label: "Perlu diperbaiki", className: "border-destructive/40 bg-destructive/10" },
};

export function PracticeCard({ practice, index }: { practice: Practice; index: number }) {
  const koreksi = useServerFn(koreksiTerjemahan);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ verdict: KoreksiVerdict; feedback: string } | null>(null);
  const [showRef, setShowRef] = useState(false);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await koreksi({ data: { prompt: practice.prompt, reference: practice.reference, answer: answer.trim() } });
      if (res.ok) setResult({ verdict: res.verdict, feedback: res.feedback });
      else toast.error(res.error);
    } catch {
      toast.error("Koneksi terputus. Periksa internet lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Latihan {index + 1}</p>
      <p className="mt-2 text-lg">
        Terjemahkan ke Basa Bali: <span className="font-display font-semibold">“{practice.prompt}”</span>
      </p>
      {practice.hint && <p className="mt-1 text-sm text-muted-foreground">Petunjuk: {practice.hint}</p>}
      <form onSubmit={check} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Tulis jawabanmu…"
          aria-label={`Jawaban latihan ${index + 1}`}
          maxLength={300}
          className="h-11 bg-background"
        />
        <Button type="submit" disabled={!answer.trim() || loading} className="h-11 rounded-full px-6">
          {loading ? <Loader2 className="animate-spin" /> : <PenLine />}
          {loading ? "Memeriksa…" : "Koreksi dengan AI"}
        </Button>
      </form>
      {result && (
        <div role="status" className={cn("mt-4 rounded-xl border p-4", VERDICT[result.verdict].className)}>
          <p className="font-semibold">{VERDICT[result.verdict].label}</p>
          <div className="mt-1 text-sm">
            <MessageResponse>{result.feedback}</MessageResponse>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setShowRef((v) => !v)}
        className="mt-3 text-sm font-medium text-primary hover:underline"
      >
        {showRef ? "Sembunyikan contoh jawaban" : "Lihat contoh jawaban"}
      </button>
      {showRef && <p className="mt-1 font-display text-lg font-semibold text-primary">{practice.reference}</p>}
    </div>
  );
}
