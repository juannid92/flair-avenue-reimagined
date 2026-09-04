import { useRef } from "react";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "@/assets/hero.jpg";
import instagramBanner from "@/assets/instagram-banner.jpg";
import { SHOP } from "@/lib/shop-config";
import { categories, products, type CategorySlug } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { getProductsByCategory } from "@/data/products";
import { StoriaFlair } from "@/components/site/StoriaFlair";
import { prefersReducedMotion } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flair Avenue — Boutique fashion femminile online" },
      {
        name: "description",
        content:
          "Abiti, top e collezioni femminili con nuovi arrivi ogni settimana. Spedizione tracciata, pagamenti sicuri e resi semplici.",
      },
      { property: "og:title", content: "Flair Avenue — Boutique fashion femminile online" },
      {
        property: "og:description",
        content: "Nuovi arrivi ogni settimana. Spedizione tracciata e resi semplici.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const trust = [
  { icon: Truck, title: "Spedizione chiara", text: "Costi e tempi sempre visibili prima del checkout." },
  { icon: ShieldCheck, title: "Pagamenti sicuri", text: "Transazioni protette e metodi di pagamento affidabili." },
  { icon: RotateCcw, title: "Resi semplici", text: "Informazioni sul reso consultabili prima dell'acquisto." },
  { icon: Headset, title: "Assistenza rapida", text: "Supporto veloce per ordini, taglie e resi." },
];

const selezione = ["1", "2", "3", "4"];

const writtenNumber: Record<number, string> = {
  1: "una",
  2: "due",
  3: "tre",
  4: "quattro",
};

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<CategorySlug>("abiti");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.matchMedia("", () => {
        const mm = gsap.matchMedia({
          "(min-width: 768px)": "desktop",
        });

        mm.add("desktop", () => {
          if (!heroImgRef.current || !heroTextRef.current || !heroRef.current) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          tl.to(heroImgRef.current, { y: "12%", duration: 1 }, 0);
          tl.to(
            heroTextRef.current,
            { y: "-6%", opacity: 0.4, duration: 1 },
            0
          );
        });

        return () => {
          mm.revert();
        };
      });
    },
    { scope: heroRef }
  );

  const [tab, setTab] = useState<CategorySlug>("abiti");

  const featured = products.filter((p) => selezione.includes(p.id));
  const shown = tab === "abiti" ? featured : products.filter((p) => p.category === "top");

  const withProducts = categories.filter((c) => c.count > 0 && !c.comingSoon);
  const catCount = withProducts.length;
  const catText =
    catCount >= 1 && catCount <= 4
      ? `${writtenNumber[catCount] || catCount} punti di partenza per costruire un look femminile, facile da acquistare.`
      : "Punti di partenza per costruire un look femminile, facile da acquistare.";

  return (
    <>
      <section ref={heroRef} className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
        <div className="h-full overflow-hidden">
          <img
            ref={heroImgRef}
            src={hero}
            alt="Modella con abito lungo in una via mediterranea"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{ scale: "1.12" }}
          />
        </div>
        <div className="absolute inset-0 bg-foreground/25" />
        <div ref={heroTextRef} className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1400px] px-6 pb-16 md:pb-24">
            <h1 className="heading-wide max-w-3xl text-3xl leading-tight text-background sm:text-5xl md:text-6xl">
              Tutte le settimane nuovi arrivi
            </h1>
            <Link
              to="/shop"
              className="label-wide mt-8 inline-flex bg-primary px-10 py-4 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Acquista ora
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 md:grid-cols-4 md:px-6">
          {trust.map((item) => (
            <div key={item.title} className="text-center">
              <item.icon size={26} strokeWidth={1} className="mx-auto" />
              <h3 className="label-wide mt-4">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
        <h2 className="heading-wide text-center text-xl md:text-2xl">Selezione Flair</h2>
        <div className="mt-6 flex justify-center gap-8">
          {(["abiti", "top"] as const).map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => setTab(slug)}
              className={`label-wide border-b pb-2 transition-colors ${
                tab === slug
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {slug === "abiti" ? "Abiti" : "Top"}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <StoriaFlair />

      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={instagramBanner}
          alt="Due modelle con look minimali su fondo sabbia"
          width={1920}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="heading-wide text-2xl text-background sm:text-4xl">Ispirati ogni giorno</h2>
          <a
            href={`https://www.instagram.com/${SHOP.instagram}/`}
            target="_blank"
            rel="noreferrer"
            className="label-wide mt-8 inline-flex border border-background px-10 py-4 text-background transition-colors hover:bg-background hover:text-foreground"
          >
            Seguici su Instagram
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
        <h2 className="heading-wide text-center text-xl md:text-2xl">Le collezioni essenziali</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          {catText}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => {
            const hasProducts = category.count > 0 && !category.comingSoon;
            const productLabel = category.count === 1 ? "prodotto" : "prodotti";
            return hasProducts ? (
              <Link
                key={category.slug}
                to="/product-category/$slug"
                params={{ slug: category.slug }}
                className="group block"
              >
                <div className="overflow-hidden bg-sand">
                  <img
                    src={category.image}
                    alt={category.name}
                    width={900}
                    height={1200}
                    loading="lazy"
                    className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                className="flex aspect-3/4 flex-col items-center justify-center bg-sand p-4"
              >
                <h3 className="heading-wide text-center text-sm">{category.name}</h3>
                <p className="label-wide mt-2 text-muted-foreground">In arrivo</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
