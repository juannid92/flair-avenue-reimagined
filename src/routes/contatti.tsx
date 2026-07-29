import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { PageHeader } from "@/components/site/PageShell";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti | Flair Avenue" },
      {
        name: "description",
        content: "Contatta Flair Avenue per informazioni su ordini, taglie, spedizioni e resi.",
      },
      { property: "og:title", content: "Contatti | Flair Avenue" },
      { property: "og:description", content: "Supporto per ordini, taglie e resi." },
      { property: "og:url", content: "/contatti" },
    ],
    links: [{ rel: "canonical", href: "/contatti" }],
  }),
  component: ContattiPage,
});

function ContattiPage() {
  return (
    <>
      <PageHeader title="Contatti" subtitle="Supporto veloce per ordini, taglie e resi." />
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 md:grid-cols-2 md:px-6">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="nome" className="label-wide mb-2 block">
              Nome
            </label>
            <input
              id="nome"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label htmlFor="email-contatti" className="label-wide mb-2 block">
              Email
            </label>
            <input
              id="email-contatti"
              type="email"
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label htmlFor="messaggio" className="label-wide mb-2 block">
              Messaggio
            </label>
            <textarea
              id="messaggio"
              rows={6}
              required
              className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <button type="submit" className="label-wide bg-primary px-10 py-4 text-primary-foreground">
            Invia messaggio
          </button>
        </form>

        <div className="space-y-6 text-sm text-muted-foreground">
          <a href="mailto:info@flairavenue.it" className="flex items-center gap-3 hover:text-foreground">
            <Mail size={18} strokeWidth={1.2} /> info@flairavenue.it
          </a>
          <a href="https://wa.me/393000000000" className="flex items-center gap-3 hover:text-foreground">
            <MessageCircle size={18} strokeWidth={1.2} /> Scrivici su WhatsApp
          </a>
          <a
            href="https://www.instagram.com/flair___avenue/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-foreground"
          >
            <Instagram size={18} strokeWidth={1.2} /> @flair___avenue
          </a>
          <p className="leading-relaxed">
            Rispondiamo dal lunedì al venerdì, dalle 9:00 alle 18:00. Per le richieste su ordini
            già effettuati indica sempre il numero d'ordine.
          </p>
        </div>
      </div>
    </>
  );
}
