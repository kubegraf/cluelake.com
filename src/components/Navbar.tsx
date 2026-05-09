import { useEffect, useState } from "react";

const NAV = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Use cases", href: "#use" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/75 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent shadow-lg shadow-brand/30">
            <span className="text-sm font-bold text-white">C</span>
          </span>
          <span className="text-[17px] font-semibold tracking-tight">ClueLake</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[14px] text-ink-muted transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden text-[14px] text-ink-muted transition-colors hover:text-ink md:inline"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Get started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-border md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[14.5px] text-ink-muted hover:bg-surface hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
