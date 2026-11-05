import { Lightbulb } from "lucide-react";

import type { LessonSection } from "@/data/courses";

const LEVEL_STYLE: Record<string, string> = {
  andap: "bg-secondary-soft text-secondary",
  kasar: "bg-destructive/10 text-destructive",
};

function LevelBadge({ level }: { level: string }) {
  const style = LEVEL_STYLE[level] ?? "bg-primary-soft text-primary";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${style}`}>{level}</span>;
}

export function LessonSections({ sections }: { sections: LessonSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s, i) => {
        if (s.type === "text") {
          return (
            <section key={i}>
              {s.heading && <h2 className="text-2xl font-semibold">{s.heading}</h2>}
              <p className="mt-3 text-lg leading-relaxed text-foreground/85">{s.body}</p>
            </section>
          );
        }
        if (s.type === "tip") {
          return (
            <aside key={i} className="flex gap-4 rounded-2xl border border-accent/60 bg-accent/15 p-5">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
              <p className="text-accent-foreground">{s.body}</p>
            </aside>
          );
        }
        if (s.type === "aksara") {
          return (
            <section key={i}>
              {s.heading && <h2 className="text-2xl font-semibold">{s.heading}</h2>}
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {s.letters.map((l) => (
                  <div
                    key={l.latin}
                    className="lontar-lines flex flex-col items-center rounded-2xl border border-border bg-card py-4 shadow-soft"
                  >
                    <span className="font-aksara text-4xl leading-tight text-primary" lang="ban-Bali">
                      {l.char}
                    </span>
                    <span className="mt-1 text-sm font-semibold">{l.latin}</span>
                  </div>
                ))}
              </div>
            </section>
          );
        }
        const hasEnglish = s.rows.some((r) => r.english);
        const hasLevel = s.rows.some((r) => r.level);
        return (
          <section key={i}>
            {s.heading && <h2 className="text-2xl font-semibold">{s.heading}</h2>}
            <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/70 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Basa Bali</th>
                    <th className="px-4 py-3 font-semibold">Indonesia</th>
                    {hasEnglish && <th className="px-4 py-3 font-semibold">English</th>}
                    {hasLevel && <th className="px-4 py-3 font-semibold">Tingkat</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {s.rows.map((r) => (
                    <tr key={r.bali + r.indonesia}>
                      <td className="px-4 py-3 font-display text-base font-semibold text-primary">{r.bali}</td>
                      <td className="px-4 py-3">{r.indonesia}</td>
                      {hasEnglish && <td className="px-4 py-3 text-muted-foreground">{r.english}</td>}
                      {hasLevel && <td className="px-4 py-3">{r.level && <LevelBadge level={r.level} />}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
