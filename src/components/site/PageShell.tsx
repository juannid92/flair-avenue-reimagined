import type { ReactNode } from "react";
import { PageMotion } from "@/components/site/PageMotion";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="grain relative overflow-hidden border-b border-border bg-cream">
      <PageMotion />
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 text-center md:px-6 md:py-28">
        <h1 data-split className="story-title text-[clamp(3rem,8vw,7rem)]">
          {title}
        </h1>
        {subtitle && (
          <p
            data-reveal
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export function PageSection({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 md:py-20">{children}</div>;
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      data-reveal
      className="mx-auto max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground"
    >
      {children}
    </div>
  );
}
