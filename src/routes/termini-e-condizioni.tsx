import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageSection, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/termini-e-condizioni")({
  head: () => ({
    meta: [
      { title: "Termini e condizioni | Flair Avenue" },
      { name: "description", content: "Termini e condizioni di vendita della boutique online Flair Avenue." },
      { property: "og:title", content: "Termini e condizioni | Flair Avenue" },
      { property: "og:description", content: "Condizioni di vendita e pagamenti." },
      { property: "og:url", content: "/termini-e-condizioni" },
    ],
    links: [{ rel: "canonical", href: "/termini-e-condizioni" }],
  }),
  component: TerminiPage,
});

function TerminiPage() {
  return (
    <>
      <PageHeader title="Termini e condizioni" />
      <PageSection>
        <Prose>
          <p>Gli acquisti effettuati su flairavenue.it sono regolati dalle presenti condizioni di vendita.</p>
          <p>I pagamenti sono gestiti tramite circuiti protetti con carta e Klarna. I prezzi indicati sono comprensivi di IVA.</p>
          <p>I tempi e i costi di spedizione sono sempre visibili prima della conferma dell'ordine.</p>
        </Prose>
      </PageSection>
    </>
  );
}
