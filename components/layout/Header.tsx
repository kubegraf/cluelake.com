"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { primaryNav } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * The site header.
 *
 * ⚠ IT SOLIDIFIES ON SCROLL RATHER THAN ANIMATING. One property changes — the
 * background's opacity, plus a border — over 200ms. A header that moves, shrinks
 * or re-lays-out on scroll causes layout shift on every page and reads as
 * decoration on a site aimed at engineers.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route change closes the drawer. Without this, tapping a link navigates and
  // leaves the menu covering the page it just went to.
  useEffect(() => setOpen(false), [pathname]);

  // ⚠ THE DRAWER IS A MODAL, SO IT BEHAVES LIKE ONE: Escape closes it, the page
  // behind does not scroll, and focus moves into it. A drawer that leaves focus
  // on the page behind is unusable with a keyboard.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        scrolled
          ? "border-b border-[color:var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-ink)_88%,transparent)] backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center gap-6">
        <Link href="/" aria-label="ClueLake home" className="shrink-0">
          <Logo size={19} />
        </Link>

        <nav aria-label="Primary" className="ml-2 hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[14px] transition-colors",
                  active
                    ? "text-[color:var(--color-fg)]"
                    : "text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button href="/login" variant="ghost" size="sm">Sign in</Button>
          <Button href="/get-started" size="sm">Get started</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto inline-flex size-10 items-center justify-center rounded-lg border border-[color:var(--color-line)] text-[color:var(--color-fg-muted)] lg:hidden"
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          // ⚠ THE DRAWER SCROLLS WITHIN THE VIEWPORT. Opening it locks the body,
          // so anything below the fold is unreachable — on a landscape phone
          // that was "Sign in" and "Get started", the two links the header
          // exists for. `dvh` rather than `vh` because mobile browsers count the
          // collapsing address bar in `vh` and clip the last item behind it.
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-[color:var(--color-line)] bg-[color:var(--color-ink)] lg:hidden"
        >
          <Container className="py-4">
            <nav aria-label="Primary (mobile)" className="grid gap-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-[15px] text-[color:var(--color-fg)] hover:bg-[color:var(--color-surface-2)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 grid gap-2 border-t border-[color:var(--color-line)] pt-3">
              <Button href="/login" variant="secondary">Sign in</Button>
              <Button href="/get-started">Get started</Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
