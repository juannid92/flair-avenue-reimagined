import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

/**
 * "Selezione Flair": su desktop la sezione resta ferma e i capi scorrono in orizzontale
 * mentre scorri la pagina; su mobile è un carosello da sfogliare col dito.
 */
export function SelectionRail({ items }: { items: Product[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !track.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 96);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [items.length] },
  );

  return (
    <section
      ref={root}
      className="relative z-10 flex flex-col justify-center overflow-hidden bg-background py-16 md:h-svh md:py-0"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-4 px-4 md:px-6">
        <div>
          <p className="label-wide text-muted-foreground">Fall/Winter 2026</p>
          <h2 className="story-title mt-2 text-[clamp(2.2rem,5vw,4rem)]">Selezione Flair</h2>
        </div>
        <Link to="/novita" className="link-underline label-wide">
          Vedi tutti i nuovi arrivi
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto px-4 pb-4 md:overflow-visible md:px-12 md:pb-0 [scrollbar-width:none]">
        <div ref={track} className="flex w-max gap-4 md:gap-8">
          {items.map((product) => (
            <div
              key={product.id}
              className="w-[62vw] shrink-0 sm:w-[44vw] md:w-[24vw] md:max-w-[340px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
          <Link
            to="/shop"
            className="label-wide flex w-[62vw] shrink-0 items-center justify-center border border-border sm:w-[44vw] md:w-[16vw]"
          >
            Vai allo shop →
          </Link>
        </div>
      </div>
    </section>
  );
}
