import { Fragment } from "react";
import { PageHeader, PageSection } from "@/components/site/PageShell";
import type { LegalPage } from "@/data/legal";

const EMAIL = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;

/** Rende un testo trasformando gli indirizzi email in link. */
function Text({ children }: { children: string }) {
  return (
    <>
      {children.split(EMAIL).map((part, i) =>
        i % 2 === 1 ? (
          <a key={i} href={`mailto:${part}`} className="link-underline text-foreground">
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Pagina di testo (resi, termini, privacy, FAQ) con intestazione editoriale. */
export function LegalContent({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHeader title={page.title} subtitle={page.lead} />
      <PageSection>
        <div
          data-reveal
          className="mx-auto max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {page.blocks.map((block, i) => {
            if (block.t === "h2")
              return (
                <h2 key={i} className="story-title pt-8 text-3xl text-foreground md:text-4xl">
                  {block.x}
                </h2>
              );
            if (block.t === "ul")
              return (
                <ul key={i} className="list-disc space-y-2 pl-5">
                  {block.x.map((item, j) => (
                    <li key={j}>
                      <Text>{item}</Text>
                    </li>
                  ))}
                </ul>
              );
            return (
              <p key={i}>
                <Text>{block.x}</Text>
              </p>
            );
          })}
        </div>
      </PageSection>
    </>
  );
}
