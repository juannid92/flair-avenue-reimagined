import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, onReady, prefersReducedMotion, splitLinesReveal } from "@/lib/motion";
import { media, sized } from "@/lib/media";

/** Apertura: l'immagine resta ferma mentre il racconto le scorre sopra come un sipario. */
export function HeroStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion() || !root.current || !contextSafe) return;
      const el = root.current;
      const q = gsap.utils.selector(el);

      const stopWaiting = onReady(
        contextSafe(() => {
          splitLinesReveal(q(".hero-title")[0], { scroll: false, duration: 1.5, stagger: 0.16 });
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .fromTo(q(".hero-img"), { scale: 1.35 }, { scale: 1.05, duration: 2.6 }, 0)
            .from(q(".hero-kicker"), { opacity: 0, y: 16, duration: 1 }, 0.5)
            .from(q(".hero-cta"), { opacity: 0, y: 20, duration: 1 }, 1)
            .from(q(".hero-cue"), { opacity: 0, duration: 1 }, 1.5);
        }),
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: true,
          },
        })
        .to(q(".hero-media"), { scale: 1.2, yPercent: 8, ease: "none" }, 0)
        .to(q(".hero-content"), { yPercent: -22, opacity: 0, ease: "none" }, 0)
        .to(q(".hero-shade"), { opacity: 0.75, ease: "none" }, 0);

      return stopWaiting;
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative z-0 h-svh min-h-[560px] w-full overflow-hidden bg-night text-background"
    >
      <div className="hero-media absolute inset-0 md:left-[32%]">
        <img
          src={sized(media.hero, 1800)}
          alt="Modella con giacca in pelle marrone e pantalone beige ampio"
          width={1200}
          height={1600}
          loading="eager"
          fetchPriority="high"
          className="hero-img h-full w-full object-cover object-[50%_6%]"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-night/70 via-night/5 to-night/35" />
      <div className="hero-shade absolute inset-0 bg-night opacity-0" />

      <div className="hero-content absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1400px] px-6 pb-14 md:pb-20">
          <p className="hero-kicker label-wide mb-6 text-background/85">
            Fall/Winter 2026 · nuovi arrivi ogni settimana
          </p>
          <h1 className="hero-title story-title text-[clamp(3rem,12vw,11rem)]">
            <span className="block">Ogni abito</span>
            <span className="block">
              ha una <em>storia.</em>
            </span>
          </h1>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <Link
              to="/shop"
              className="hero-cta label-wide inline-flex bg-background px-10 py-4 text-foreground transition-colors hover:bg-sand"
            >
              Acquista ora
            </Link>
            <div className="hero-cue hidden items-center gap-4 md:flex" aria-hidden>
              <span className="label-wide text-background/80">Scorri per leggere</span>
              <span className="block h-14 w-px overflow-hidden bg-background/25">
                <span className="scroll-line block h-full w-full bg-background" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
