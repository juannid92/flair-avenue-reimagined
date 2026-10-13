import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, splitLinesReveal } from "@/lib/motion";
import { products, type CategorySlug } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

const FEATURED = ["2540", "2538", "3525", "2518"];

/** Capitolo IV — Sera. La boutique: dopo la storia, la scelta. */
export function Selezione() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<CategorySlug>("abiti");

  const shown =
    tab === "abiti"
      ? products.filter((p) => FEATURED.includes(p.id))
      : products.filter((p) => p.category === "top");

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      splitLinesReveal(q(".s-title")[0]);
      gsap.from(q(".s-intro, .s-tabs"), {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".s-title")[0], start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  // Ad ogni cambio di tab le card rientrano in sequenza
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.selector(root)(".s-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current.querySelector(".s-grid"),
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: root, dependencies: [tab], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      data-chapter="IV"
      data-chapter-title="Sera"
      className="relative z-10 bg-background"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-6 md:py-36">
        <p className="label-wide text-center text-terracotta">Capitolo IV · Sera</p>
        <h2 className="s-title story-title mt-6 text-center text-[clamp(3rem,8vw,7rem)]">
          Selezione <em>Flair</em>
        </h2>
        <p className="s-intro mx-auto mt-6 max-w-md text-center text-base leading-relaxed text-muted-foreground">
          Dopo la storia, la scelta. Ogni capo è un finale possibile: il tuo, adesso.
        </p>

        <div className="s-tabs mt-10 flex justify-center gap-10">
          {(["abiti", "top"] as const).map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => setTab(slug)}
              className={`label-wide border-b pb-2 transition-colors ${
                tab === slug
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {slug === "abiti" ? "Abiti" : "Top"}
            </button>
          ))}
        </div>

        <div className="s-grid mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {shown.map((product, i) => (
            <div key={product.id} className={`s-card ${i % 2 === 1 ? "lg:mt-16" : ""}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
