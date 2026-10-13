import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, splitWordsScrub } from "@/lib/motion";
import { media, sized } from "@/lib/media";

/** Prologo: il manifesto si "accende" parola per parola mentre si scorre. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const q = gsap.utils.selector(root);

      splitWordsScrub(q(".manifesto-text")[0]);

      gsap.to(q(".float-a"), {
        yPercent: -55,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q(".float-b"), {
        yPercent: -90,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="grain relative z-10 overflow-hidden bg-cream px-6 py-36 md:py-60"
    >
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <p className="label-wide text-terracotta">Prologo</p>
        <p className="manifesto-text story-title mt-8 text-[clamp(2.1rem,5.4vw,4.8rem)]">
          Non vendiamo soltanto abiti. Raccontiamo giornate: la luce di un <em>vicolo</em> al
          mattino, il fruscio del <em>pizzo</em> a mezzogiorno, il <em>rosso</em> di una sera che
          non vuole finire.
        </p>
      </div>

      <img
        src={sized(media.dress, 500)}
        alt=""
        width={900}
        height={1200}
        loading="lazy"
        className="float-a absolute left-[3%] top-[55%] hidden w-[13vw] max-w-[200px] object-cover md:block"
      />
      <img
        src={sized(media.topHalter, 500)}
        alt=""
        width={900}
        height={1200}
        loading="lazy"
        className="float-b absolute right-[4%] top-[70%] hidden w-[11vw] max-w-[170px] object-cover md:block"
      />
    </section>
  );
}
