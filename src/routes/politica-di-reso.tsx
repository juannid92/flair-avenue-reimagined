import { createFileRoute } from "@tanstack/react-router";
import { LegalContent } from "@/components/site/LegalContent";
import { RESI } from "@/data/legal";

export const Route = createFileRoute("/politica-di-reso")({
  head: () => ({
    meta: [
      { title: "Politica di reso | Flair Avenue" },
      {
        name: "description",
        content: "Come richiedere un reso su Flair Avenue: tempi, condizioni e rimborsi.",
      },
      { property: "og:title", content: "Politica di reso | Flair Avenue" },
      { property: "og:description", content: "Tempi, condizioni e rimborsi dei resi." },
      { property: "og:url", content: "/politica-di-reso" },
    ],
    links: [{ rel: "canonical", href: "/politica-di-reso" }],
  }),
  component: ResoPage,
});

function ResoPage() {
  return <LegalContent page={RESI} />;
}
