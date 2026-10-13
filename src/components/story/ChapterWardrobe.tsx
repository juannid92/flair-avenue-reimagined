import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { media, sized } from "@/lib/media";

/** Capitolo I — Mattina. Sezione pinned: due immagini e due passaggi di testo si danno il cambio. */
export function ChapterWardrobe() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(q(".w-img-1"), { scale: 1.25 }, { scale: 1, duration: 2 }, 0)
          .fromTo(q(".w-bar"), { scaleX: 0 }, { scaleX: 1, duration: 2 }, 0)
          .to(q(".w-step-1"), { opacity: 0, y: -30, duration: 0.4 }, 0.9)
          .fromTo(
            q(".w-layer-2"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power2.inOut" },
            0.8,
          )
          .fromTo(q(".w-img-2"), { scale: 1.35 }, { scale: 1, duration: 0.9 }, 0.8)
          .fromTo(q(".w-step-2"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 1.45)
          .to({}, { duration: 0.35 });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from(q(".w-text > *"), {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: q(".w-text")[0], start: "top 82%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-chapter="I"
      data-chapter-title="Mattina"
      className="relative z-10 grid bg-cream md:h-svh md:grid-cols-2"
    >
      <div className="relative aspect-4/5 overflow-hidden md:aspect-auto">
        <img
          src={sized(media.dress, 1000)}
          alt="Vestito lungo marrone in pizzo, indossato"
          width={900}
          height={1200}
          loading="lazy"
          className="w-img-1 absolute inset-0 h-full w-full object-cover"
        />
        <div className="w-layer-2 absolute inset-0 hidden md:block">
          <img
            src={sized(media.topSun, 1000)}
            alt="Body a camicia bianco"
            width={900}
            height={1200}
            loading="lazy"
            className="w-img-2 h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative flex flex-col justify-center overflow-hidden px-6 py-16 md:px-16 lg:px-24">
        <span
          aria-hidden
          className="story-title pointer-events-none absolute -right-4 -top-6 select-none text-[28vw] text-terracotta/10 md:text-[16vw]"
        >
          I
        </span>

        <div className="w-text relative">
          <p className="label-wide text-terracotta">Capitolo I · Mattina</p>
          <h2 className="story-title mt-5 text-[clamp(2.8rem,6vw,5.6rem)]">
            Il <em>guardaroba</em>
          </h2>

          <div className="relative mt-8 max-w-md md:min-h-36">
            <p className="w-step-1 text-base leading-relaxed text-muted-foreground md:text-lg">
              Si comincia sempre da lì: un abito scelto la sera prima, la luce che entra di sbieco,
              quel marrone che sa già d'autunno.
            </p>
            <p className="w-step-2 mt-5 text-base leading-relaxed text-muted-foreground md:absolute md:inset-x-0 md:top-0 md:mt-0 md:text-lg">
              Poi qualcosa di semplice da abbinare. Pochi pezzi, provati e scelti a mano: solo
              quello che serve a una giornata che comincia bene.
            </p>
          </div>

          <Link
            to="/novita"
            className="link-underline label-wide mt-10 inline-block text-foreground"
          >
            Guarda le novità
          </Link>
        </div>

        <span className="absolute inset-x-6 bottom-8 hidden h-px bg-border md:inset-x-16 md:block lg:inset-x-24">
          <span className="w-bar block h-full origin-left bg-terracotta" />
        </span>
      </div>
    </section>
  );
}
