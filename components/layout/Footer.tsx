import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Section";
import { footerNav, site } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-line)] py-12">
      <Container>
        <div className="flex flex-wrap gap-10">
          <div className="min-w-[15rem] max-w-[19rem]">
            <Logo size={18} />
            <p className="mt-3.5 text-[13.5px] leading-relaxed text-[color:var(--color-fg-subtle)]">
              Observability for Kubernetes and cloud infrastructure.
            </p>
          </div>

          <div className="ml-auto grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-fg-subtle)]">
                  {col.title}
                </h2>
                <ul className="mt-3 grid list-none gap-2 p-0">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {/* ⚠ ONE BRANCH, BECAUSE EVERY FOOTER LINK IS FIRST-PARTY.
                          The outbound case was here for a single link and went
                          unreachable when it was removed; an `if` that can never
                          be true is a claim about the data that stops being
                          checked. `lib/config/site.ts` says what to restore if
                          an external link is ever added back. */}
                      <Link
                        href={l.href}
                        className="text-[13.5px] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--color-line)] pt-6">
          <p className="m-0 text-[12.5px] text-[color:var(--color-fg-subtle)]">
            ClueLake is a product of{" "}
            <span className="text-[color:var(--color-fg-muted)]">{site.company}</span>. ©{" "}
            {new Date().getFullYear()} {site.company}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
