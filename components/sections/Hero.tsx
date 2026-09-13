import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { WhatChangedPanel } from "@/components/product/WhatChangedPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * The hero.
 *
 * ⚠ IT IS A SERVER COMPONENT, AND THE MOTION IS CSS. Nothing here is a client
 * component, nothing waits for hydration, and no animation library is shipped
 * to move six elements 10px — the entrance runs from the stylesheet on the
 * first frame, before React has done anything, and it runs with JavaScript
 * turned off. The only interactive thing in this section is the product panel,
 * which brings its own `"use client"`.
 *
 * ⚠ THE SEQUENCE IS A LIST OF NUMBERS, in `STEP` below. Every delay on the page
 * reads in one place, in order, so the rhythm survives somebody inserting a
 * line — see `.cl-enter` / `.cl-settle` in globals.css for the mechanism and
 * for why the heading moves without fading.
 */

/** The entrance, in order. Roughly a frame and a half apart: close enough to
 *  read as one movement, far enough apart to read as a sequence. */
const STEP = {
  eyebrow: "0ms",
  headline1: "60ms",
  headline2: "150ms",
  trace: "210ms",
  panel: "220ms",
  lede: "300ms",
  ctas: "340ms",
  proof: "420ms",
  caption: "520ms",
} as const;

/** `--d` is the delay each entrance rule reads. Typed here once rather than
 *  cast at every call site. */
const delay = (d: string): CSSProperties => ({ ["--d" as string]: d });

/** ⚠ CAPABILITIES, NOT CLAIMS. Each line is something the product does and a
 *  reader could check. There is no customer count and no uptime figure here
 *  because neither exists yet — see the README. */
/** ⚠ THE SAME FOUR NOUNS THE LEDE NAMES, in the order the panel lists them.
 *  If one is added or removed here, the lede two elements down says something
 *  the rotator does not, and the panel beside it shows a third thing. The
 *  cycle length in globals.css divides by FOUR — change the count and the
 *  words overlap. */
const TRACE_NOUNS = ["deployment", "image", "build", "commit"] as const;

/** ⚠ EACH ONE MUST READ AS A SENTENCE AFTER "Observe". They are objects of the
 *  same verb, not a list of features — "Observe every deploy." is a claim the
 *  product backs; "Observe Kubernetes." would be a category. Four entries,
 *  because the cycle in globals.css divides by four. */
const OBSERVE_OBJECTS = ["everything", "every signal", "every deploy", "every change"] as const;

/** The four signals the lede names, in the order it names them. The highlight
 *  walks across these; the words themselves never change. */
const LEDE_SIGNALS = ["logs", "metrics", "traces", "Kubernetes deployments"] as const;

const PROOF = [
  "Kubernetes-native",
  "OpenTelemetry-native",
  // ⚠ HEDGED ON PURPOSE, and the hedge is the site's. features, architecture,
  // pricing and QuerySection all say "PromQL for the supported query set"
  // rather than plain compatibility. A chip that drops the qualifier makes the
  // hero the one place on the site overclaiming — against this list's own rule
  // two lines up.
  "PromQL for supported queries",
  "eBPF visibility",
];

export function Hero() {
  return (
    <section className="grid-field relative isolate overflow-hidden border-b border-[color:var(--color-line)] py-14 sm:py-20 lg:py-24">
      <div aria-hidden className="cl-aurora" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* ── The argument ──────────────────────────────────────────────── */}
          <div>
            <p
              style={delay(STEP.eyebrow)}
              className="cl-enter inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-surface)] py-1 pl-2.5 pr-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-fg-subtle)]"
            >
              <span aria-hidden className="cl-beacon" />
              Deployment-aware observability
            </p>

            {/* ⚠ THE LINE BREAK IS A `block`, NOT A `<br>`. Each line is its own
                element because each one enters separately — and because a <br>
                inside a heading is read aloud as a break by some screen
                readers. The text still wraps normally inside either line. */}
            <h1 className="mt-5 text-[clamp(2rem,7vw,4.6rem)] font-semibold tracking-[-0.036em]">
              {/* ⚠ THE TRAILING SPACE IS LOAD-BEARING. Without it the lines
                  concatenate in the accessible name and the heading announces as
                  "Observe everything.Understand what changed." A `block`
                  collapses the space visually, so it costs nothing on screen. */}
              {/* ⚠ THE ROTATOR IS IN THE LCP ELEMENT, so its first word is
                  painted opaque on frame one — see `cl-rotate-word-first` in
                  globals.css. A plain fade-in here would push this site's
                  Largest Contentful Paint out by the length of the fade, which
                  is the exact trap `cl-settle` is documented for. */}
              <span className="cl-settle block" style={delay(STEP.headline1)}>
                <span className="sr-only">Observe everything.</span>
                <span aria-hidden>
                  Observe{" "}
                  <span className="cl-rotator cl-rotator-lcp">
                    {OBSERVE_OBJECTS.map((word, i) => (
                      <span key={word} style={{ ["--i" as string]: i }}>
                        {word}.
                      </span>
                    ))}
                  </span>
                </span>{" "}
              </span>
              {/* ⚠ THE UNDERLINE IS ON ONE WORD, NOT THE LINE. The line is now a
                  sentence rather than a single word, and a rule drawn under all
                  of "Understand what changed." reads as a border on the heading
                  instead of as emphasis. `w-fit` on an inline-block keeps the
                  drawing the width of the word it is marking. */}
              <span className="cl-settle block" style={delay(STEP.headline2)}>
                Understand what{" "}
                <span className="relative inline-block w-fit">
                  changed.
                  {/* The underline draws itself, on the same easing and in the
                      same accent as the metric line in the panel beside it — the
                      two are the same gesture, which is the point the section is
                      making. Decorative, so `aria-hidden`. */}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-x-0 -bottom-[0.06em] h-[0.16em] w-full"
                  >
                    <path
                      d="M2,9 C52,3 104,2.5 198,6"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      style={{
                        strokeDasharray: 240,
                        // Reduced motion collapses this to its end state, which
                        // is the finished underline rather than no underline.
                        animation: "cl-draw 900ms cubic-bezier(0.22, 1, 0.36, 1) 520ms both",
                        ["--dash" as string]: "240",
                      }}
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* ── The cycling noun ──────────────────────────────────────────
                ⚠ THE SENTENCE IS WRITTEN OUT ONCE FOR SCREEN READERS AND ONCE
                FOR EYES. A reader hearing this would otherwise get the prefix
                followed by all four words run together — "back to the
                deployment image build commit" — which is not a sentence. The
                spoken copy names them as the list it is; the animated copy is
                `aria-hidden` and exists only to be looked at. */}
            <p style={delay(STEP.trace)} className="cl-enter mt-5 font-mono text-[13px] text-[color:var(--color-fg-subtle)] sm:text-[13.5px]">
              <span className="sr-only">
                Trace a regression back to the deployment, image, build or commit behind it.
              </span>
              <span aria-hidden>
                Trace a regression back to the{" "}
                <span className="cl-rotator font-semibold text-[color:var(--color-fg)]">
                  {TRACE_NOUNS.map((noun, i) => (
                    <span key={noun} style={{ ["--i" as string]: i }}>
                      {noun}
                    </span>
                  ))}
                </span>
              </span>
            </p>

            <p
              style={delay(STEP.lede)}
              className="cl-enter mt-6 max-w-[34rem] text-[17px] leading-relaxed text-[color:var(--color-fg-muted)] sm:text-[18px]"
            >
              ClueLake connects{" "}
              <span className="cl-marching">
                {LEDE_SIGNALS.map((sig, i) => (
                  <span key={sig} style={{ ["--i" as string]: i }}>
                    {sig}
                    {i < LEDE_SIGNALS.length - 2 ? ", " : i === LEDE_SIGNALS.length - 2 ? ", and " : ""}
                  </span>
                ))}
              </span>{" "}
              so you can monitor your systems, investigate performance changes, and trace
              regressions back to the deployment, image, build, or commit behind them.
            </p>

            {/* ⚠ FULL-WIDTH BUTTONS ON A PHONE, AUTO FROM `sm`. A 44px-tall
                control the width of the thumb's reach is the difference between
                a tap and a careful tap. */}
            <div
              style={delay(STEP.ctas)}
              className="cl-enter mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button href="/get-started" className="group w-full sm:w-auto">
                Get started
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Button>
              <Button href="#what-changed" variant="secondary" className="w-full sm:w-auto">
                See how it works
              </Button>
            </div>

            {/* ⚠ THE DELAY IS PER CHIP, NOT ON THE LIST. Animating the <ul>
                brought all four in as one block, which reads as a single
                element arriving late rather than as a sequence. Each chip now
                carries its own offset from `STEP.proof`, 70ms apart — the same
                interval the STEP table uses between the elements above. */}
            <ul className="mt-9 grid list-none gap-2.5 p-0 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {PROOF.map((p, i) => (
                <li
                  key={p}
                  style={delay(`${parseInt(STEP.proof, 10) + i * 70}ms`)}
                  className="cl-enter flex items-center gap-2 font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]"
                >
                  <span
                    aria-hidden
                    className="size-1 shrink-0 rounded-full bg-[color:var(--color-accent)] opacity-70"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* ── The product ───────────────────────────────────────────────── */}
          {/* ⚠ THE PRODUCT, NOT AN ILLUSTRATION. Built from the same components
              used elsewhere on the site, so what a visitor evaluates is the real
              interface rather than a drawing of one. */}
          <div className="relative">
            {/* Depth under the panel, drawn as a gradient rather than a
                `blur()` — a blur filter over an element this size is a repaint
                on every frame of the drift behind it, for the same picture. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(55%_50%_at_50%_45%,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent_72%)]"
            />
            <div className="cl-enter" style={delay(STEP.panel)}>
              <WhatChangedPanel className="shadow-[0_28px_70px_-32px_rgba(0,0,0,0.75)]" />
            </div>

            {/* ⚠ SAYING IT IS INTERACTIVE IS THE WHOLE POINT OF BUILDING IT
                INTERACTIVE. The rows are buttons, and a visitor who reads the
                panel as a screenshot never finds that out. "Demonstration" is
                not modesty either — this is one fixed scenario from
                lib/demo/data, and the site does not imply otherwise. */}
            <p
              style={delay(STEP.caption)}
              className="cl-enter mt-3 flex items-center gap-2 font-mono text-[11px] text-[color:var(--color-fg-subtle)]"
            >
              <span aria-hidden className="cl-beacon" />
              Interactive demonstration — select a row
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
