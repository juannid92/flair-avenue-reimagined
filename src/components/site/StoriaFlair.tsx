"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";
import { prefersReducedMotion } from "@/lib/animation";

import instagramBanner from "@/assets/instagram-banner.jpg";
import p1a from "@/assets/p1-a.jpg";
import p2a from "@/assets/p2-a.jpg";
import p4a from "@/assets/p4-a.jpg";
import t1a from "@/assets/t1-a.jpg";

gsap.registerPlugin(ScrollTrigger);

export function StoriaFlair() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLImageElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);
  const imgs3Ref = useRef<(HTMLImageElement | null)[]>([]);
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
          [text1Ref, text2Ref, text3Ref].forEach((ref) => {
            if (!ref.current) return;
            gsap.fromTo(
              ref.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: ref.current,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
          ScrollTrigger.refresh();
        });

        mm.add("(min-width: 768px)", () => {
          if (!panelRef.current || !containerRef.current) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              pin: panelRef.current,
              anticipatePin: 1,
            },
          });

          tl.fromTo(img1Ref.current, { scale: 1.15 }, { scale: 1, duration: 1 }, 0);
          tl.fromTo(overlay1Ref.current, { opacity: 0.55 }, { opacity: 0.2, duration: 1 }, 0);
          tl.fromTo(text1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0);

          tl.fromTo(
            img2Ref.current,
            { scale: 1.7, x: "-3%" },
            { scale: 1.4, x: "3%", duration: 1 },
            "-=0.2"
          );
          tl.fromTo(
            text2Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.7"
          );

          tl.fromTo(
            imgs3Ref.current.filter(Boolean),
            { x: "8%" },
            { x: "-8%", stagger: 0.08, duration: 1 },
            "-=0.2"
          );
          tl.fromTo(
            text3Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.7"
          );
          tl.fromTo(ctaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3");

          ScrollTrigger.refresh();
        });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div
        ref={panelRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Atto 1 */}
        <div className="absolute inset-0">
          <img
            ref={img1Ref}
            src={instagramBanner}
            alt="Due modelle con look minimali su fondo sabbia"
            width={1920}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div ref={overlay1Ref} className="absolute inset-0 bg-foreground/55" />
        </div>
        <div ref={text1Ref} className="relative z-10 text-center text-background">
          <p className="label-wide">La selezione</p>
          <h2 className="heading-wide mt-3 text-3xl sm:text-5xl">Ogni capo, scelto a mano</h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed">
            Non una collezione infinita. Pochi pezzi, provati e scelti.
          </p>
        </div>

        {/* Atto 2 */}
        <div className="absolute inset-0">
          <img
            ref={img2Ref}
            src={p1a}
            alt="Dettaglio del pizzo dell'abito in pizzo azzurro"
            width={900}
            height={1200}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
          <div className="absolute inset-0 bg-foreground/25" />
        </div>
        <div ref={text2Ref} className="relative z-10 text-center text-background">
          <h2 className="heading-wide text-3xl sm:text-5xl">Il pizzo, da vicino</h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed">
            Scegliamo i capi per come stanno addosso, non per come stanno in foto.
          </p>
        </div>

        {/* Atto 3 */}
        <div className="absolute inset-0 bg-sand">
          <div className="absolute inset-0 flex items-center justify-center gap-6 px-8">
            {[
              { src: p2a, alt: "Abito corto voulant giallo" },
              { src: p4a, alt: "Abito lungo pizzo marrone" },
              { src: t1a, alt: "Top in raso avorio" },
            ].map(({ src, alt }, i) => (
              <div key={src} className="aspect-3/4 w-1/3 max-w-[240px] overflow-hidden">
                <img
                  ref={(el) => {
                    imgs3Ref.current[i] = el;
                  }}
                  src={src}
                  alt={alt}
                  width={720}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          ref={text3Ref}
          className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 text-center"
        >
          <h2 className="heading-wide text-3xl sm:text-5xl">Il tuo, adesso</h2>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            La selezione cambia ogni settimana.
          </p>
          <div ref={ctaRef} className="mt-8">
            <Link
              to="/shop"
              className="label-wide inline-flex bg-primary px-10 py-4 text-primary-foreground"
            >
              Scopri la boutique
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
