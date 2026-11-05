import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/kursus", label: "Kursus" },
  { to: "/chat", label: "Guru Basa AI" },
  { to: "/tentang", label: "Tentang" },
] as const;

export function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Mabasa, ke beranda">
      <span className="grid size-9 place-items-center rounded-xl bg-primary font-aksara text-lg text-primary-foreground shadow-soft transition-transform group-hover:-rotate-6">
        ᬫ
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-semibold tracking-tight">Mabasa</span>
        <span className="block font-aksara text-[11px] text-muted-foreground">ᬫᬩᬲ</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:bg-primary-soft data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <Link to="/chat">Tanya Guru Basa</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buka menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetTitle className="font-display">Menu</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Navigasi seluler">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    className="rounded-lg px-3 py-3 font-medium hover:bg-muted data-[status=active]:bg-primary-soft"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="poleng h-1.5 opacity-80" aria-hidden />
    </header>
  );
}
