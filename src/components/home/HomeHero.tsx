import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { media, sized } from "@/lib/media";

/** Apertura della home: tre look della collezione Fall/Winter 2026 e un invito chiaro agli acquisti. */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q(".hero-photo"), { scale: 1.12, opacity: 0, duration: 1.4, stagger: 0.12 }, 0)
        .from(q(".hero-in"), { y: 28, opacity: 0, duration: 1, stagger: 0.12 }, 0.35);

      // La hero resta ferma e si abbassa di luce mentre la pagina le scorre sopra.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: true,
          },
        })
        .to(q(".hero-photo img"), { scale: 1.15, ease: "none" }, 0)
        .to(q(".hero-text"), { yPercent: -30, opacity: 0, ease: "none" }, 0)
        .to(q(".hero-shade"), { opacity: 0.7, ease: "none" }, 0);
    },
    { scope: root },
  );

  const looks = [media.heroLeft, media.hero, media.heroRight];

  return (
    <section
      ref={root}
      className="relative z-0 h-svh min-h-[560px] w-full overflow-hidden bg-night text-background"
    >
      <div className="absolute inset-0 grid grid-cols-1 gap-px md:grid-cols-3">
        {looks.map((src, i) => (
          <div
            key={src}
            className={`hero-photo overflow-hidden ${i === 0 ? "" : "hidden md:block"} ${
              i === 1 ? "md:order-none" : ""
            }`}
          >
            <img
              src={sized(src, 1000)}
              alt=""
              width={1000}
              height={1333}
              loading="eager"
              fetchPriority={i === 1 ? "high" : "auto"}
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-night/75 via-night/10 to-night/40" />
      <div className="hero-shade absolute inset-0 bg-night opacity-0" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="hero-text mx-auto max-w-[1400px] px-6 pb-14 text-center md:pb-20">
          <p className="hero-in label-wide text-background/90">Fall/Winter 2026</p>
          <h1 className="hero-in story-title mt-4 text-[clamp(3rem,10vw,8.5rem)]">
            Your favorite <em>fit</em>
          </h1>
          <div className="hero-in mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/novita"
              className="label-wide inline-flex bg-background px-9 py-4 text-foreground transition-colors hover:bg-sand"
            >
              Scopri i nuovi arrivi
            </Link>
            <Link
              to="/shop"
              className="label-wide inline-flex border border-background px-9 py-4 transition-colors hover:bg-background hover:text-foreground"
            >
              Vai allo shop
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
