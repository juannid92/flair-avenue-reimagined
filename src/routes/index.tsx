import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { media, sized } from "@/lib/media";
import { SHOP } from "@/lib/shop-config";
import { CURRENT_SEASON, categories, products } from "@/data/products";
import { HomeHero } from "@/components/home/HomeHero";
import { SelectionRail } from "@/components/home/SelectionRail";
import { PageMotion } from "@/components/site/PageMotion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flair Avenue — Abbigliamento donna online" },
      {
        name: "description",
        content:
          "Abiti, top, jeans e giacche da donna. Collezione Fall/Winter 2026, spedizione gratuita in Italia e resi entro 14 giorni.",
      },
      { property: "og:title", content: "Flair Avenue — Abbigliamento donna online" },
      {
        property: "og:description",
        content: "Nuovi arrivi Fall/Winter 2026. Spedizione gratuita in Italia.",
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
    title: "Spedizione chiara",
    text: "Spedizione standard gratuita in Italia, senza minimo d'ordine.",
  },
  {
    icon: ShieldCheck,
    title: "Pagamenti sicuri",
    text: "Transazioni protette e metodi di pagamento affidabili.",
  },
  {
    icon: RotateCcw,
    title: "Resi semplici",
    text: "Recesso entro 14 giorni dalla consegna.",
  },
  { icon: Headset, title: "Assistenza rapida", text: "Supporto veloce per ordini, taglie e resi." },
];

function Home() {
  const selection = products
    .filter((p) => p.season === CURRENT_SEASON)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || Number(b.id) - Number(a.id))
    .slice(0, 8);
  const shownCategories = categories.filter((c) => c.count > 0);

  return (
    <>
      <PageMotion />
      <HomeHero />

      <section className="relative z-10 border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
          {trust.map((item) => (
            <div key={item.title} data-reveal className="flex items-start gap-3">
              <item.icon size={22} strokeWidth={1.2} className="mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">{item.title}</span>
                <span className="block text-muted-foreground">{item.text}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <SelectionRail items={selection} />

      <section className="relative z-10 bg-cream">
        <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
          <h2 data-reveal className="story-title text-[clamp(2.2rem,5vw,4rem)]">
            Cerca per categoria
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {shownCategories.map((category) => (
              <Link
                key={category.slug}
                to="/product-category/$slug"
                params={{ slug: category.slug }}
                data-reveal
                className="group block"
              >
                <div data-parallax="6" className="parallax-frame aspect-3/4 bg-sand">
                  <img
                    src={sized(category.image, 600)}
                    alt={category.name}
                    width={600}
                    height={800}
                    loading="lazy"
                    className="transition-[filter] duration-700 group-hover:brightness-95"
                  />
                </div>
                <h3 className="heading-wide mt-4 text-sm">
                  {category.name}
                  <sup className="ml-1 text-[10px] text-muted-foreground">{category.count}</sup>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 grid md:grid-cols-2">
        <div
          data-parallax="8"
          className="parallax-frame order-1 aspect-4/5 bg-night md:order-none md:aspect-auto md:min-h-[560px]"
        >
          <img
            src={sized(media.banner, 1400)}
            alt="Giacca in pelle marrone"
            width={1200}
            height={1600}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-6 bg-night px-6 py-16 text-background md:px-16 lg:px-24">
          <h2 data-split className="story-title text-[clamp(2.4rem,5vw,4.6rem)]">
            Scopri Flair Avenue su <em>Instagram</em>
          </h2>
          <p data-reveal className="max-w-sm text-base leading-relaxed text-background/80">
            Look, novità e nuovi arrivi: li trovi prima di tutto sul nostro profilo.
          </p>
          <a
            data-reveal
            href={`https://www.instagram.com/${SHOP.instagram}/`}
            target="_blank"
            rel="noreferrer"
            className="label-wide inline-flex border border-background px-9 py-4 transition-colors hover:bg-background hover:text-foreground"
          >
            Seguici su Instagram
          </a>
        </div>
      </section>
    </>
  );
}
