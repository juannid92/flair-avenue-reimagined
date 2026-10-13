import { createFileRoute } from "@tanstack/react-router";
import { LegalContent } from "@/components/site/LegalContent";
import { FAQ } from "@/data/legal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Flair Avenue" },
      {
        name: "description",
        content:
          "Domande frequenti su spedizioni, resi, pagamenti e taglie per gli ordini su Flair Avenue.",
      },
      { property: "og:title", content: "FAQ | Flair Avenue" },
      { property: "og:description", content: "Risposte utili prima e dopo l'acquisto." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return <LegalContent page={FAQ} />;
}
