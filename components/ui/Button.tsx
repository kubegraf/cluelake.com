import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

/**
 * ⚠ ONE BUTTON, THREE VARIANTS, TWO SIZES. Consistent control sizing is most of
 * what separates a considered interface from a template, and it only holds if
 * there is a single place that decides it.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-accent)] text-[#04141c] hover:bg-[color:var(--color-accent-hover)]",
  secondary:
    "border border-[color:var(--color-line-strong)] text-[color:var(--color-fg)] hover:bg-[color:var(--color-surface-2)]",
  ghost: "text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13.5px]",
  md: "h-11 px-5 text-[15px]",
};

export function Button({
  href, variant = "primary", size = "md", className, children, ...rest
}: {
  href?: string; variant?: Variant; size?: Size; className?: string; children: ReactNode;
} & Omit<ComponentProps<"button">, "className" | "children">) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    const external = href.startsWith("http");
    return external ? (
      <a href={href} className={cls} rel="noreferrer noopener" target="_blank">{children}</a>
    ) : (
      <Link href={href} className={cls}>{children}</Link>
    );
  }
  return <button className={cls} {...rest}>{children}</button>;
}
