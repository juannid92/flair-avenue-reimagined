import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageSection, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Flair Avenue" },
      { name: "description", content: "Informativa sul trattamento dei dati personali di Flair Avenue." },
      { property: "og:title", content: "Privacy | Flair Avenue" },
      { property: "og:description", content: "Come trattiamo i tuoi dati personali." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy" />
      <PageSection>
        <Prose>
          <p>I dati personali raccolti servono esclusivamente a gestire ordini, spedizioni e assistenza.</p>
          <p>Non cediamo i dati a terzi per finalità di marketing. Puoi richiederne modifica o cancellazione scrivendo a info@flairavenue.it.</p>
          <p>I cookie di analisi vengono attivati solo dopo il tuo consenso tramite il banner presente sul sito.</p>
        </Prose>
      </PageSection>
    </>
  );
}
