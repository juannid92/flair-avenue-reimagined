import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import p4b from "@/assets/p4-b.jpg";

/** Capitolo II — Mezzogiorno. Pinned: il pizzo si apre a cerchio, poi sale il sipario sull'abito. */
export function ChapterLace() {
  const root = useRef<HTMLElement>(null);
  const product = products.find((p) => p.id === "1")!;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        gsap.set(q(".l-circle"), { clipPath: "circle(0% at 50% 50%)" });
        gsap.set(q(".l-panel"), { yPercent: 100 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to(
          q(".l-circle"),
          { clipPath: "circle(80% at 50% 50%)", duration: 1.3, ease: "power2.inOut" },
          0,
        )
          .fromTo(q(".l-img"), { scale: 1.5 }, { scale: 1.05, duration: 2.6 }, 0)
          .fromTo(
            q(".l-text > *"),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 },
            0.9,
          )
          .to(q(".l-text"), { opacity: 0, y: -60, duration: 0.5 }, 2.05)
          .to(q(".l-panel"), { yPercent: 0, duration: 1, ease: "power3.inOut" }, 2)
          .fromTo(q(".l-photo-a"), { yPercent: 18 }, { yPercent: -6, duration: 1.2 }, 2.1)
          .fromTo(q(".l-photo-b"), { yPercent: 40 }, { yPercent: 6, duration: 1.2 }, 2.1)
          .fromTo(
            q(".l-copy > *"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
            2.6,
          )
          .to({}, { duration: 0.4 });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-chapter="II"
      data-chapter-title="Mezzogiorno"
      className="relative z-10 h-svh min-h-[560px] overflow-hidden bg-night text-background"
    >
      <div className="l-circle absolute inset-0">
        <img
          src={p4b}
          alt="Dettaglio del pizzo su un abito marrone"
          width={900}
          height={1200}
          loading="lazy"
          className="l-img h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-night/50" />
      </div>

      <div className="l-text absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <p className="label-wide text-background/80">Capitolo II · Mezzogiorno</p>
        <h2 className="story-title mt-6 text-[clamp(3.2rem,10vw,9rem)]">
          Il pizzo,
          <br />
          <em>da vicino.</em>
        </h2>
        <p className="mt-8 max-w-sm text-base leading-relaxed text-background/85">
          Scegliamo i capi per come stanno addosso, non per come stanno in foto.
        </p>
      </div>

      <div className="l-panel absolute inset-0 z-20 flex flex-col justify-center gap-8 bg-night px-6 py-10 md:grid md:grid-cols-2 md:items-center md:gap-16 md:px-16 lg:px-28">
        <div className="relative order-1 grid h-[38svh] grid-cols-2 gap-3 md:order-2 md:h-[72svh] md:gap-6">
          <div className="l-photo-a overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              width={900}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="l-photo-b mt-10 overflow-hidden md:mt-24">
            <img
              src={product.images[1]}
              alt={`${product.name} — vista posteriore`}
              width={900}
              height={1200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="l-copy order-2 md:order-1">
          <p className="label-wide text-sun">L'abito di mezzogiorno</p>
          <h3 className="story-title mt-4 text-[clamp(2.2rem,5vw,4.6rem)]">
            Azzurro, <em>con lo spacco.</em>
          </h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-background/75 md:text-base">
            {product.description}
          </p>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="label-wide mt-8 inline-flex border border-background px-8 py-4 transition-colors hover:bg-background hover:text-foreground"
          >
            Scoprilo · {formatPrice(product.price)}
          </Link>
        </div>
      </div>
    </section>
  );
}
