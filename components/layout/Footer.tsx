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
              Deployment-aware observability for Kubernetes.
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
                                            {/* ⚠ THE HIT AREA IS BIGGER THAN THE TEXT, ON PURPOSE. At 13.5px
                          these links are ~21.6px tall with 8px between them — the smallest
                          targets on the site, well under the 44px a thumb needs, in the one
                          place a phone user is most likely reaching one-handed. `block py-1.5
                          -my-1.5` grows the target to ~40px and pulls the same amount back off
                          the margin, so the column's visual rhythm is unchanged. */}
<Link
                        href={l.href}
                        className="-my-1.5 block py-1.5 text-[13.5px] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
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
