import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageSection, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/politica-di-reso")({
  head: () => ({
    meta: [
      { title: "Politica di reso | Flair Avenue" },
      { name: "description", content: "Come richiedere un reso su Flair Avenue: tempi, condizioni e rimborsi." },
      { property: "og:title", content: "Politica di reso | Flair Avenue" },
      { property: "og:description", content: "Tempi, condizioni e rimborsi dei resi." },
      { property: "og:url", content: "/politica-di-reso" },
    ],
    links: [{ rel: "canonical", href: "/politica-di-reso" }],
  }),
  component: ResoPage,
});

function ResoPage() {
  return (
    <>
      <PageHeader title="Politica di reso" subtitle="Informazioni sul reso consultabili prima dell'acquisto." />
      <PageSection>
        <Prose>
          <p>Puoi richiedere il reso entro 14 giorni dalla consegna, scrivendo a info@flairavenue.it con il numero d'ordine.</p>
          <p>I capi devono essere restituiti integri, non indossati e con le etichette originali.</p>
          <p>Il rimborso viene emesso entro 10 giorni lavorativi dalla ricezione del reso, sullo stesso metodo di pagamento usato per l'acquisto.</p>
        </Prose>
      </PageSection>
    </>
  );
}
