import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";

const panels = [
  {
    id: "3532",
    word: "Coffee",
    note: "Il primo caffè, la luce bassa di ottobre.",
    bg: "bg-coffee text-background",
  },
  {
    id: "3525",
    word: "Bordeaux",
    note: "La sera che arriva presto.",
    bg: "bg-bordeaux text-background",
  },
  {
    id: "3536",
    word: "Militare",
    note: "Il verde della strada, sempre di corsa.",
    bg: "bg-olive text-background",
  },
  { id: "3535", word: "Nero", note: "Quello che va bene sempre.", bg: "bg-night text-background" },
];

/** Capitolo III — Pomeriggio. Scroll orizzontale pinned: ogni capo ha il suo colore, la sua scena. */
export function ChapterColors() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !track.current) return;
      const q = gsap.utils.selector(root);
      const trackEl = track.current;
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

      const scroller = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        q(".c-bar"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      q(".c-panel").forEach((panel: Element) => {
        const word = panel.querySelector(".c-word");
        const img = panel.querySelector(".c-img");
        const common = {
          trigger: panel,
          containerAnimation: scroller,
          start: "left right",
          end: "right left",
          scrub: true,
        };
        if (word)
          gsap.fromTo(
            word,
            { xPercent: 22 },
            { xPercent: -22, ease: "none", scrollTrigger: common },
          );
        if (img)
          gsap.fromTo(img, { xPercent: -9 }, { xPercent: 9, ease: "none", scrollTrigger: common });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-chapter="III"
      data-chapter-title="Pomeriggio"
      className="relative z-10 h-svh min-h-[560px] overflow-hidden bg-cream"
    >
      <div ref={track} className="flex h-full w-max will-change-transform">
        <div className="relative flex h-full w-screen shrink-0 flex-col justify-center bg-cream px-6 md:px-20">
          <p className="label-wide text-terracotta">Capitolo III · Pomeriggio</p>
          <h2 className="story-title mt-6 max-w-4xl text-[clamp(3rem,9vw,8.5rem)]">
            Il colore arriva
            <br />
            con <em>l'autunno.</em>
          </h2>
          <p className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="label-wide">Scorri</span>
            <span className="block h-px w-16 bg-foreground/40" />
            <span aria-hidden>→</span>
          </p>
        </div>

        {panels.map((panel, index) => {
          const product = products.find((p) => p.id === panel.id)!;
          return (
            <div
              key={panel.id}
              className={`c-panel relative flex h-full w-screen shrink-0 items-center overflow-hidden px-6 md:px-20 ${panel.bg}`}
            >
              <span
                aria-hidden
                className="c-word story-title pointer-events-none absolute left-[4%] top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(7rem,30vw,28rem)] opacity-25"
              >
                {panel.word}
              </span>

              <div className="relative z-10 grid w-full items-center gap-6 md:grid-cols-[minmax(0,420px)_1fr] md:gap-20">
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="group block overflow-hidden"
                  aria-label={product.name}
                >
                  <div className="relative mx-auto aspect-3/4 h-[48svh] overflow-hidden md:h-[68svh]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      width={900}
                      height={1200}
                      loading="lazy"
                      className="c-img absolute left-[-10%] top-0 h-full w-[120%] max-w-none object-cover"
                    />
                  </div>
                </Link>

                <div className="max-w-md">
                  <p className="label-wide opacity-70">
                    {String(index + 1).padStart(2, "0")} / {String(panels.length).padStart(2, "0")}
                  </p>
                  <h3 className="story-title mt-4 text-[clamp(2.6rem,6vw,5.4rem)]">
                    <em>{panel.word}.</em>
                  </h3>
                  <p className="mt-4 text-base leading-relaxed opacity-85 md:text-lg">
                    {panel.note}
                  </p>
                  <p className="mt-6 line-clamp-2 text-sm opacity-80">{product.name}</p>
                  <p className="mt-2 text-lg">{formatPrice(product.price)}</p>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="label-wide mt-6 inline-flex border border-current px-8 py-4 transition-opacity hover:opacity-70"
                  >
                    Scegli
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <span className="absolute inset-x-0 bottom-0 z-20 block h-[3px] bg-foreground/10">
        <span className="c-bar block h-full origin-left bg-terracotta" />
      </span>
    </section>
  );
}
