import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageSection, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi siamo | Flair Avenue" },
      {
        name: "description",
        content:
          "Flair Avenue è una boutique fashion femminile italiana online: selezione curata, nuovi arrivi ogni settimana.",
      },
      { property: "og:title", content: "Chi siamo | Flair Avenue" },
      { property: "og:description", content: "La storia della boutique Flair Avenue." },
      { property: "og:url", content: "/chi-siamo" },
    ],
    links: [{ rel: "canonical", href: "/chi-siamo" }],
  }),
  component: ChiSiamoPage,
});

function ChiSiamoPage() {
  return (
    <>
      <PageHeader
        title="Chi siamo"
        subtitle="Una boutique femminile pensata per chi cerca capi eleganti e facili da indossare."
      />
      <PageSection>
        <Prose>
          <p>
            Flair Avenue nasce in Italia con un'idea semplice: rendere accessibile una moda
            femminile curata, senza rinunciare alla qualità dei tessuti e all'attenzione ai
            dettagli.
          </p>
          <p>
            Ogni settimana selezioniamo nuovi capi — abiti, top, giacche, gonne e shorts — pensati
            per costruire un guardaroba versatile, adatto sia al giorno che alla sera.
          </p>
          <p>
            Lavoriamo con spedizioni tracciate, pagamenti protetti e una procedura di reso chiara,
            perché acquistare online deve essere semplice quanto entrare in negozio.
          </p>
        </Prose>
      </PageSection>
    </>
  );
}
