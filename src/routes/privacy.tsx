import { createFileRoute } from "@tanstack/react-router";
import { LegalContent } from "@/components/site/LegalContent";
import { PRIVACY } from "@/data/legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Flair Avenue" },
      {
        name: "description",
        content: "Informativa sul trattamento dei dati personali di Flair Avenue.",
      },
      { property: "og:title", content: "Privacy | Flair Avenue" },
      { property: "og:description", content: "Come trattiamo i tuoi dati personali." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <LegalContent page={PRIVACY} />;
}
