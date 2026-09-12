import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * The chrome every product interface on this site sits in.
 *
 * ⚠ ONE FRAME, SO THE DEMOS LOOK LIKE ONE PRODUCT. Nine interfaces each with
 * their own border radius, header height and title treatment read as nine
 * screenshots from nine tools. The consistency is most of what makes them look
 * real.
 */
export function Frame({
  title, meta, children, className, bodyClassName,
}: {
  title: ReactNode; meta?: ReactNode; children: ReactNode;
  className?: string; bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-[color:var(--color-line)] px-3.5 py-2.5">
        <span className="font-mono text-[12px] text-[color:var(--color-fg-muted)]">{title}</span>
        {meta ? <span className="ml-auto font-mono text-[11.5px] text-[color:var(--color-fg-subtle)]">{meta}</span> : null}
      </div>
      <div className={cn("p-3.5", bodyClassName)}>{children}</div>
    </div>
  );
}
