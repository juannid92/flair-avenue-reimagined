import { createFileRoute, Link } from "@tanstack/react-router";
import { PageMotion } from "@/components/site/PageMotion";
import { media, sized } from "@/lib/media";

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

const chapters = [
  {
    n: "I",
    title: "Una idea semplice",
    text: [
      "Flair Avenue nasce in Italia con un'idea semplice: rendere accessibile una moda femminile curata, senza rinunciare alla qualità dei tessuti e all'attenzione ai dettagli.",
    ],
    image: sized(media.dress, 1000),
    alt: "Abito lungo azzurro in pizzo con spacco",
  },
  {
    n: "II",
    title: "Ogni settimana, una scena nuova",
    text: [
      "Ogni settimana selezioniamo nuovi capi — abiti, top, giacche, gonne e shorts — pensati per costruire un guardaroba versatile, adatto sia al giorno che alla sera.",
    ],
    image: sized(media.laceBrown, 1000),
    alt: "Abito lungo in pizzo marrone",
  },
  {
    n: "III",
    title: "Come entrare in negozio",
    text: [
      "Lavoriamo con spedizioni tracciate, pagamenti protetti e una procedura di reso chiara, perché acquistare online deve essere semplice quanto entrare in negozio.",
    ],
    image: sized(media.topSun, 1000),
    alt: "Top bianco con stampa sole",
  },
];

function ChiSiamoPage() {
  return (
    <>
      <PageMotion />
      <section className="relative">
        <div data-parallax="10" className="parallax-frame h-[75svh] min-h-[460px] bg-night">
          <img
            src={sized(media.topHalterBrown, 1800)}
            alt="Modella con top halter marrone"
            width={1200}
            height={1600}
            loading="eager"
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-background">
            <p data-reveal className="label-wide text-background/85">
              Chi siamo
            </p>
            <h1 data-split className="story-title mt-6 text-[clamp(3rem,9vw,8rem)]">
              Una boutique, <em>una storia.</em>
            </h1>
            <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-background/85">
              Una boutique femminile pensata per chi cerca capi eleganti e facili da indossare.
            </p>
          </div>
        </div>
      </section>

      {chapters.map((c, i) => (
        <section key={c.n} className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-36">
          <div
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-24 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div data-parallax="8" className="parallax-frame aspect-4/5 w-full bg-sand">
              <img src={c.image} alt={c.alt} width={900} height={1200} loading="lazy" />
            </div>
            <div>
              <p data-reveal className="label-wide text-terracotta">
                Capitolo {c.n}
              </p>
              <h2 data-split className="story-title mt-5 text-[clamp(2.4rem,5vw,4.6rem)]">
                {c.title}
              </h2>
              {c.text.map((t) => (
                <p
                  key={t}
                  data-reveal
                  className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
                >
                  {t}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="grain relative overflow-hidden bg-night px-6 py-28 text-center text-background md:py-44">
        <h2 data-split className="story-title relative z-10 text-[clamp(2.6rem,7vw,6rem)]">
          Adesso tocca <em>a te.</em>
        </h2>
        <Link
          to="/shop"
          data-reveal
          className="label-wide relative z-10 mt-10 inline-flex bg-background px-10 py-4 text-foreground transition-colors hover:bg-sand"
        >
          Entra in boutique
        </Link>
      </section>
    </>
  );
}
