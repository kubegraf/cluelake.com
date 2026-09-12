import Image from "next/image";
import symbol from "@/public/brand/cluelake-symbol.png";
import { cn } from "@/lib/utils/cn";

/**
 * The ClueLake logo.
 *
 * ⚠ THE MARK IS SUPPLIED ARTWORK AND IS NEVER REDRAWN, RECOLOURED OR PLACED IN
 * A CONTAINER. It is the folded bird already live on cluelake.com, rendered
 * from the same file at every size. No glow, no backing shape, no filter, no
 * text substitute. The wordmark beside it is live text so it stays crisp at any
 * DPI and remains selectable and indexable — with `Clue` set solid and `Lake`
 * lighter, exactly as the supplied artwork sets it.
 *
 * The square export is padded around the mark's true bounds, so `object-contain`
 * preserves its proportions and clear space at any box size.
 */

export function LogoSymbol({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <Image
      src={symbol}
      alt=""
      width={size}
      height={size}
      className={cn("object-contain", className)}
      priority
      sizes={`${size}px`}
    />
  );
}

export function Wordmark({ size = 19, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("whitespace-nowrap leading-none tracking-[-0.022em]", className)}
      style={{ fontSize: size }}
    >
      <span className="font-bold text-[color:var(--color-fg)]">Clue</span>
      <span className="font-normal text-[color:var(--color-fg-muted)]">Lake</span>
    </span>
  );
}

export function Logo({ size = 19, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)} style={{ gap: size * 0.42 }}>
      <LogoSymbol size={Math.round(size * 1.5)} />
      <Wordmark size={size} />
      <span className="sr-only">ClueLake</span>
    </span>
  );
}
