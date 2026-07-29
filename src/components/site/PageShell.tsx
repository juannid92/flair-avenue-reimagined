import type { ReactNode } from "react";

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-border bg-sand">
      <div className="mx-auto max-w-[1400px] px-4 py-14 text-center md:px-6 md:py-20">
        <h1 className="heading-wide text-xl md:text-3xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export function PageSection({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 md:py-20">{children}</div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}
