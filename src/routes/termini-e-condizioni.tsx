import { createFileRoute } from "@tanstack/react-router";
import { LegalContent } from "@/components/site/LegalContent";
import { TERMINI } from "@/data/legal";

export const Route = createFileRoute("/termini-e-condizioni")({
  head: () => ({
    meta: [
      { title: "Termini e condizioni | Flair Avenue" },
      {
        name: "description",
        content: "Termini e condizioni di vendita del negozio online Flair Avenue.",
      },
      { property: "og:title", content: "Termini e condizioni | Flair Avenue" },
      { property: "og:description", content: "Condizioni di vendita e pagamenti." },
      { property: "og:url", content: "/termini-e-condizioni" },
    ],
    links: [{ rel: "canonical", href: "/termini-e-condizioni" }],
  }),
  component: TerminiPage,
});

function TerminiPage() {
  return <LegalContent page={TERMINI} />;
}
