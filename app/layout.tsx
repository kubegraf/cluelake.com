import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/config/site";
import "./globals.css";

/**
 * ⚠ FONTS ARE SELF-HOSTED BY next/font. It downloads and serves them from our
 * own origin at build time, so there is no request to a third party on any page
 * load — which removes a render-blocking cross-origin round trip and a
 * third-party dependency from the critical path at once.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * ⚠ `adjustFontFallback` IS OFF FOR THE MONO FACE, AND IT HAS TO BE.
 *
 * next/font's automatic fallback knows exactly two local fonts — Arial and
 * Times New Roman — so it gave a MONOSPACE family a PROPORTIONAL stand-in:
 *
 *     @font-face{font-family:JetBrains Mono Fallback;src:local("Arial");
 *       ascent-override:75.79%;descent-override:22.29%;size-adjust:134.59%}
 *
 * The overrides correct the VERTICAL metrics. Advance widths are not corrected
 * and cannot be, because Arial is not fixed-advance. So during the swap window
 * every mono string on the site is laid out at Arial widths scaled 134.59% and
 * then reflows when the real face lands: the hero eyebrow, the trace line, the
 * four proof chips, every chart figcaption and the whole product panel.
 *
 * The worst of it is `.cl-rotator`, which sizes its grid cell to its widest
 * child — so the rotator's box is computed in fake-Arial and jumps. That is
 * horizontal CLS on the one element whose stated design brief, in globals.css,
 * is that the sentence never reflows as it cycles.
 *
 * An explicit monospace stack is a better stand-in than a corrected Arial: the
 * metrics are not identical either, but every font in it is fixed-advance, so
 * the failure is a slightly different glyph width rather than a reflow.
 */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Know What Changed`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.company }],
  icons: { icon: "/favicon.ico", apple: "/brand/cluelake-symbol-180.png" },
  openGraph: { type: "website", siteName: site.name, url: site.url },
};

export const viewport: Viewport = {
  themeColor: "#080b0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* ⚠ A REAL SKIP LINK. Visually hidden until focused, then the first
            thing a keyboard user reaches — without it they tab the whole header
            on every page before reaching content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[color:var(--color-accent)] focus:px-4 focus:py-2 focus:text-[#04141c]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Organisation identity, so search engines attribute the product to
            the company that actually publishes it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: site.name,
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Kubernetes",
              description: site.description,
              url: site.url,
              publisher: { "@type": "Organization", name: site.company },
            }),
          }}
        />
      </body>
    </html>
  );
}
