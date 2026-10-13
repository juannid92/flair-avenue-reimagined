import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageShell";
import { media, sized } from "@/lib/media";

export const Route = createFileRoute("/chi-siamo")({
  head: () => ({
    meta: [
      { title: "Chi siamo | Flair Avenue" },
      {
        name: "description",
        content:
          "Flair Avenue è un negozio online di abbigliamento donna di Putignano (BA): nuovi arrivi ogni settimana, spedizione gratuita in Italia.",
      },
      { property: "og:title", content: "Chi siamo | Flair Avenue" },
      { property: "og:description", content: "Chi c'è dietro Flair Avenue." },
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
        subtitle="Abbigliamento donna online, con nuovi arrivi ogni settimana."
      />
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-14 md:grid-cols-2 md:gap-20 md:px-6 md:py-24">
        <div data-parallax="6" className="parallax-frame aspect-4/5 w-full bg-sand">
          <img
            src={sized(media.hero, 1000)}
            alt="Look Flair Avenue Fall/Winter 2026"
            width={1000}
            height={1250}
            loading="eager"
          />
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p data-reveal>
            Flair Avenue è un negozio online di abbigliamento donna con sede a Putignano (BA). Ogni
            settimana aggiungiamo nuovi capi — abiti, top, jeans, giacche, gonne e shorts — pensati
            per i look di tutti i giorni.
          </p>
          <p data-reveal>
            Spedizione gratuita in Italia senza minimo d'ordine, recesso entro 14 giorni dalla
            consegna e assistenza via email e WhatsApp: acquistare deve essere facile.
          </p>
          <div data-reveal className="flex flex-wrap gap-3 pt-4">
            <Link
              to="/shop"
              className="label-wide inline-flex bg-primary px-9 py-4 text-primary-foreground"
            >
              Vai allo shop
            </Link>
            <Link
              to="/contatti"
              className="label-wide inline-flex border border-foreground px-9 py-4"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
