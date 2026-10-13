import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, splitLinesReveal } from "@/lib/motion";
import t1a from "@/assets/t1-a.jpg";
import p3b from "@/assets/p3-b.jpg";

/** Epilogo: il racconto si chiude e passa la penna a chi legge. */
export function Epilogue() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);
      splitLinesReveal(q(".e-title")[0], { duration: 1.4 });
      gsap.from(q(".e-copy"), {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".e-title")[0], start: "top 75%", once: true },
      });
      const drift = (target: string, yPercent: number) =>
        gsap.fromTo(
          q(target),
          { yPercent: -yPercent },
          {
            yPercent,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      drift(".e-img-a", 18);
      drift(".e-img-b", 34);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-chapter="—"
      data-chapter-title="Epilogo"
      className="relative z-10 overflow-hidden bg-night px-6 py-36 text-background md:py-56"
    >
      <div className="e-img-a absolute left-[5%] top-[12%] hidden w-[14vw] max-w-[220px] md:block">
        <img
          src={t1a}
          alt=""
          width={900}
          height={1200}
          loading="lazy"
          className="w-full object-cover opacity-80"
        />
      </div>
      <div className="e-img-b absolute bottom-[8%] right-[6%] hidden w-[16vw] max-w-[260px] md:block">
        <img
          src={p3b}
          alt=""
          width={900}
          height={1200}
          loading="lazy"
          className="w-full object-cover opacity-80"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="e-copy label-wide text-sun">Epilogo</p>
        <h2 className="e-title story-title mt-8 text-[clamp(3rem,9vw,8rem)]">
          Il resto della storia
          <br />
          lo scrivi <em>tu.</em>
        </h2>
        <p className="e-copy mx-auto mt-8 max-w-md text-base leading-relaxed text-background/75">
          Ogni settimana arrivano nuovi capi. Scegline uno, portalo con te e fallo diventare un
          ricordo.
        </p>
        <Link
          to="/shop"
          className="e-copy label-wide mt-10 inline-flex bg-background px-10 py-4 text-foreground transition-colors hover:bg-sand"
        >
          Entra in boutique
        </Link>
      </div>
    </section>
  );
}
