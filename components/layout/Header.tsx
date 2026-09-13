"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { primaryNav, site } from "@/lib/config/site";
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
  const toggleRef = useRef<HTMLButtonElement>(null);

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
  // behind does not scroll, focus moves into it, focus stays inside it, and
  // focus goes back where it came from on close. A drawer that leaves focus on
  // the page behind is unusable with a keyboard.
  //
  // ⚠ THE TRAP IS NOT OPTIONAL HERE, BECAUSE THE PANEL IS NOT AN OVERLAY. It is
  // inline flow inside the sticky header, not a top-layer dialog, and the scroll
  // lock is `overflow: hidden` on the body rather than anything that removes the
  // page from the tab order. So every link in the page behind is still focusable
  // while the drawer is open, and the body cannot scroll to show them: tabbing
  // past the last control moves focus to something off-screen that will never be
  // scrolled into view. From the user's side the caret simply disappears.
  //
  // ⚠ TAB IS HANDLED BY MOVING FOCUS OURSELVES, NOT BY SENTINEL ELEMENTS. The
  // cycle is the toggle button plus the panel's controls, in DOM order — the
  // toggle is in it because it is the drawer's own close button, and dropping it
  // would make the X unreachable by keyboard while the drawer is open.
  useEffect(() => {
    if (!open) return;

    // Captured before anything is focused, so it is the element the user was on
    // when they opened the drawer — in practice the toggle, but not always: the
    // route-change effect can close a drawer opened from anywhere.
    const returnTo = document.activeElement as HTMLElement | null;

    const cycle = () => {
      const inPanel = panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])"),
          )
        : [];
      return toggleRef.current ? [toggleRef.current, ...inPanel] : inPanel;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;

      const items = cycle();
      if (items.length === 0) return;

      // preventDefault unconditionally: the browser's own next stop is a page
      // element behind the drawer, so letting the default through is the bug.
      e.preventDefault();
      const at = items.indexOf(document.activeElement as HTMLElement);
      // at === -1 means focus escaped the cycle anyway — a click on the page
      // behind, or the browser restoring focus after a bfcache hop. Re-entering
      // at the near end rather than trusting the modulo, which would treat -1 as
      // a real index and land one short of the last item on Shift+Tab.
      const next =
        at === -1
          ? (e.shiftKey ? items.length - 1 : 0)
          : (at + (e.shiftKey ? -1 : 1) + items.length) % items.length;
      items[next]?.focus();
    };

    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      // ⚠ WITHOUT THIS, CLOSING DROPS FOCUS ON THE FLOOR. The panel is hidden
      // with the focused link still inside it, focus falls back to <body>, and
      // the next Tab starts again from the top of the document — the keyboard
      // user is silently teleported to the start of the page. `isConnected`
      // because a route change can close the drawer and replace the page in the
      // same commit, and focusing a detached node does nothing but is confusing
      // to read.
      if (returnTo?.isConnected) returnTo.focus();
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
          <Button href={site.consoleUrl} variant="ghost" size="sm">Sign in</Button>
          <Button href="/get-started" size="sm">Get started</Button>
        </div>

        <button
          type="button"
          ref={toggleRef}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto inline-flex size-10 items-center justify-center rounded-lg border border-[color:var(--color-line)] text-[color:var(--color-fg-muted)] lg:hidden"
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </Container>

      {/*
        ⚠ THE PANEL IS ALWAYS RENDERED AND HIDDEN WITH THE `hidden` ATTRIBUTE,
        NOT MOUNTED ON OPEN. The toggle carries aria-controls="mobile-nav"
        unconditionally; when the panel was mounted only while open, that IDREF
        pointed at nothing for the whole time the drawer was shut, which is the
        state a screen reader user meets it in. A dangling aria-controls is not
        a warning, it is just ignored, and aria-expanded="false" then describes a
        relationship the accessibility tree does not have.

        `hidden` rather than a display utility because Tailwind v4's preflight
        gives `[hidden]` `display: none !important`, so it beats the `lg:hidden`
        on the same element regardless of class order. display:none also takes
        the links out of the tab order, so a closed drawer adds nothing for the
        focus cycle above to find.
      */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        // The panel is the modal itself, so it is what carries the role — there
        // is no backdrop element to put it on.
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        // ⚠ THE DRAWER SCROLLS WITHIN THE VIEWPORT. Opening it locks the body,
        // so anything below the fold is unreachable — on a landscape phone that
        // was "Sign in" and "Get started", the two links the header exists for.
        // `dvh` rather than `vh` because mobile browsers count the collapsing
        // address bar in `vh` and clip the last item behind it.
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
            <Button href={site.consoleUrl} variant="secondary">Sign in</Button>
            <Button href="/get-started">Get started</Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
