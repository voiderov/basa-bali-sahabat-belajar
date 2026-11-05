import { Link } from "@tanstack/react-router";

import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="poleng h-2 opacity-90" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="[&_*]:text-ink-foreground">
            <Wordmark />
          </div>
          <p className="max-w-sm text-sm text-ink-foreground/70">
            Platform belajar Basa Bali berbasis AI. Dibangun untuk AI Web Innovation Challenge — Bali DigiFest 2026.
          </p>
          <p className="font-display text-lg italic text-accent">Om Santih, Santih, Santih, Om</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-ink-foreground/60">Belajar</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/kursus/$courseId" params={{ courseId: "pengenalan" }} className="hover:text-accent">
                Pengenalan Basa Bali
              </Link>
            </li>
            <li>
              <Link to="/kursus/$courseId" params={{ courseId: "dasar" }} className="hover:text-accent">
                Pendidikan Dasar
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-accent">
                Guru Basa AI
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-ink-foreground/60">Proyek</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/tentang" className="hover:text-accent">
                Tentang & AI Disclosure
              </Link>
            </li>
            <li className="text-ink-foreground/60">Tema: Build with AI, Solve for Bali</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
