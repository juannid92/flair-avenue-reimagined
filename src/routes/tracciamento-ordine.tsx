import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/tracciamento-ordine")({
  head: () => ({
    meta: [
      { title: "Tracciamento dell'ordine | Flair Avenue" },
      {
        name: "description",
        content: "Inserisci il numero d'ordine e l'email per seguire la spedizione del tuo ordine.",
      },
      { property: "og:title", content: "Tracciamento dell'ordine | Flair Avenue" },
      { property: "og:description", content: "Segui la spedizione del tuo ordine." },
      { property: "og:url", content: "/tracciamento-ordine" },
    ],
    links: [{ rel: "canonical", href: "/tracciamento-ordine" }],
  }),
  component: TrackingPage,
});

function TrackingPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        title="Tracciamento dell'ordine"
        subtitle="Inserisci il numero d'ordine e l'email usata per l'acquisto."
      />
      <div className="mx-auto max-w-md px-4 py-14 md:px-6">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label htmlFor="ordine" className="label-wide mb-2 block">
              Numero d'ordine
            </label>
            <input
              id="ordine"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
              placeholder="FA-000000"
            />
          </div>
          <div>
            <label htmlFor="email-ordine" className="label-wide mb-2 block">
              Email
            </label>
            <input
              id="email-ordine"
              type="email"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <button type="submit" className="label-wide w-full bg-primary py-4 text-primary-foreground">
            Traccia l'ordine
          </button>
        </form>
        {sent && (
          <p className="mt-6 border border-border p-4 text-sm text-muted-foreground">
            Abbiamo ricevuto la richiesta: ti invieremo via email lo stato aggiornato della
            spedizione.
          </p>
        )}
      </div>
    </>
  );
}
