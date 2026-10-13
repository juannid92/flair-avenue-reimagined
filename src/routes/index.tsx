import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { media, sized } from "@/lib/media";
import { SHOP } from "@/lib/shop-config";
import { categories } from "@/data/products";
import { HeroStory } from "@/components/story/HeroStory";
import { Manifesto } from "@/components/story/Manifesto";
import { ChapterWardrobe } from "@/components/story/ChapterWardrobe";
import { ChapterLace } from "@/components/story/ChapterLace";
import { ChapterColors } from "@/components/story/ChapterColors";
import { Selezione } from "@/components/story/Selezione";
import { Marquee } from "@/components/story/Marquee";
import { Epilogue } from "@/components/story/Epilogue";
import { PageMotion } from "@/components/site/PageMotion";
import { StoryProgress } from "@/components/story/StoryProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flair Avenue — Boutique fashion femminile online" },
      {
        name: "description",
        content:
          "Abiti, top e collezioni femminili con nuovi arrivi ogni settimana. Spedizione gratuita in Italia, pagamenti sicuri e resi entro 14 giorni.",
      },
      { property: "og:title", content: "Flair Avenue — Boutique fashion femminile online" },
      {
        property: "og:description",
        content:
          "Nuovi arrivi ogni settimana. Spedizione gratuita in Italia e resi entro 14 giorni.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const trust = [
  {
    icon: Truck,
    title: "Spedizione gratuita",
    text: "In tutta Italia, senza importo minimo. Consegna in 2-5 giorni lavorativi.",
  },
  {
    icon: ShieldCheck,
    title: "Pagamenti sicuri",
    text: "Transazioni protette: i metodi attivi sono mostrati al checkout.",
  },
  {
    icon: RotateCcw,
    title: "Resi semplici",
    text: "Recesso entro 14 giorni dalla consegna, senza dover dare una motivazione.",
  },
  {
    icon: Headset,
    title: "Assistenza rapida",
    text: "Scrivici su WhatsApp o via email per ordini, taglie e resi.",
  },
];

const writtenNumber: Record<number, string> = {
  1: "una",
  2: "due",
  3: "tre",
  4: "quattro",
};

function Home() {
  const withProducts = categories.filter((c) => c.count > 0 && !c.comingSoon);
  const catCount = withProducts.length;
  const catText =
    catCount >= 1 && catCount <= 4
      ? `${writtenNumber[catCount] || catCount} punti di partenza per costruire un look femminile, facile da acquistare.`
      : "Punti di partenza per costruire un look femminile, facile da acquistare.";

  return (
    <>
      <HeroStory />
      <Manifesto />
      <ChapterWardrobe />
      <ChapterLace />
      <ChapterColors />
      <Selezione />

      <div className="relative z-10 bg-background">
        <Marquee />

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 md:grid-cols-4 md:px-6">
            {trust.map((item) => (
              <div key={item.title} data-reveal className="text-center">
                <item.icon size={26} strokeWidth={1} className="mx-auto" />
                <h3 className="label-wide mt-4">{item.title}</h3>
                <p className="mx-auto mt-3 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          data-parallax="10"
          className="parallax-frame h-[70svh] min-h-[460px] w-full bg-night"
        >
          <img
            src={sized(media.banner, 1800)}
            alt="Modella con canotta e jeans con frange"
            width={1800}
            height={2400}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-background">
            <p data-reveal className="label-wide text-background/85">
              Ogni giorno, una nuova scena
            </p>
            <h2 data-split className="story-title mt-5 text-[clamp(2.8rem,8vw,7rem)]">
              Ispirati <em>ogni giorno</em>
            </h2>
            <a
              data-reveal
              href={`https://www.instagram.com/${SHOP.instagram}/`}
              target="_blank"
              rel="noreferrer"
              className="label-wide mt-8 inline-flex border border-background px-10 py-4 transition-colors hover:bg-background hover:text-foreground"
            >
              Seguici su Instagram ⭐
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-32">
          <h2 data-split className="story-title text-center text-[clamp(2.4rem,6vw,5rem)]">
            Le collezioni <em>essenziali</em>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-muted-foreground"
          >
            {catText}
          </p>

          <div className="mt-14 grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
            {categories.map((category, i) => {
              const hasProducts = category.count > 0 && !category.comingSoon;
              const productLabel = category.count === 1 ? "prodotto" : "prodotti";
              const offset = i % 3 === 1 ? "lg:mt-20" : "";
              return hasProducts ? (
                <Link
                  key={category.slug}
                  to="/product-category/$slug"
                  params={{ slug: category.slug }}
                  data-reveal
                  className={`group block ${offset}`}
                >
                  <div data-parallax="6" className="parallax-frame aspect-3/4 bg-sand">
                    <img
                      src={sized(category.image, 1000)}
                      alt={category.name}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="transition-[filter] duration-700 group-hover:brightness-95"
                    />
                  </div>
                  <h3 className="heading-wide mt-5 text-sm">
                    {category.name}
                    <sup className="ml-1 text-[10px] text-muted-foreground">
                      {category.count} {productLabel}
                    </sup>
                  </h3>
                </Link>
              ) : (
                <div
                  key={category.slug}
                  data-reveal
                  className={`flex aspect-3/4 flex-col items-center justify-center bg-sand p-4 ${offset}`}
                >
                  <h3 className="heading-wide text-center text-sm">{category.name}</h3>
                  <p className="label-wide mt-2 text-muted-foreground">In arrivo</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Epilogue />
      <StoryProgress />
      <PageMotion />
    </>
  );
}
