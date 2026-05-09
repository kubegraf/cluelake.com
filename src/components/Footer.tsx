const COLS = [
  {
    title: "Product",
    links: ["Features", "How it works", "Pricing", "Security", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact", "Brand"],
  },
  {
    title: "Resources",
    links: ["Help center", "Guides", "API", "Changelog", "Roadmap"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "GDPR", "DPA"],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent">
                <span className="text-sm font-bold text-white">C</span>
              </span>
              <span className="text-[18px] font-semibold tracking-tight">
                Almyne
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-ink-muted">
              The LifeOS for what matters most. Premium, private, and built for
              the way modern families and professionals actually live.
            </p>
            <div className="mt-5 flex items-center gap-3 text-ink-dim">
              <Social label="X" path="M18 2 13 9l5 7h-3l-3.5-5L7 16H4l5-7-5-7h3l3.5 5L15 2h3z" />
              <Social label="Instagram" path="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm6.5-12.8a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0zM21 7.7a8.5 8.5 0 0 0-2.4-6 8.7 8.7 0 0 0-6-2.4c-2.4 0-2.7 0-3.7.05A8.7 8.7 0 0 0 3 1.7 8.5 8.5 0 0 0 .6 7.7C.55 8.7.5 9 .5 12s0 3.3.05 4.3a8.5 8.5 0 0 0 2.4 6 8.7 8.7 0 0 0 6 2.4c1 .05 1.3.05 4.3.05s3.3 0 4.3-.05a8.7 8.7 0 0 0 6-2.4 8.5 8.5 0 0 0 2.4-6c.05-1 .05-1.3.05-4.3s0-3.3-.05-4.3z" />
              <Social label="LinkedIn" path="M5 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-2 7h4v11H3V10.5zm6 0h3.8v1.5h.1a4.2 4.2 0 0 1 3.8-2c4 0 4.7 2.6 4.7 6v5.5h-4v-4.9c0-1.2 0-2.6-1.6-2.6s-1.9 1.3-1.9 2.5v5h-4V10.5z" />
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-dim">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13.5px] text-ink-muted transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-[12.5px] text-ink-dim">
            © {new Date().getFullYear()} Almyne. All rights reserved.
          </p>
          <p className="text-[12px] text-ink-dim">
            Made with care · Berlin · San Francisco · Singapore
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-ink-muted transition-colors hover:border-brand/50 hover:text-ink"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
      </svg>
    </a>
  );
}
