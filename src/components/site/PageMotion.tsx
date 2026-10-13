import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  scrollToTop,
  splitLinesReveal,
} from "@/lib/motion";

/**
 * Effetti globali pilotati da attributi data-*, usabili in qualsiasi pagina:
 *  - data-split           → titolo a righe mascherate
 *  - data-reveal          → fade-up all'ingresso (a gruppi, con stagger)
 *  - data-parallax="8"    → l'<img> dentro .parallax-frame scorre più lento del contenitore
 */
/** Riporta in cima a ogni cambio pagina (Lenis incluso). */
export function ScrollReset() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    scrollToTop();
  }, [pathname]);

  return null;
}

/**
 * Va renderizzato DENTRO la pagina che usa gli attributi (non nel root):
 * così l'effetto parte solo dopo l'hydration di quella pagina e GSAP non
 * modifica il DOM prima che React lo abbia riconciliato.
 */
export function PageMotion() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("main [data-split]").forEach((el) => {
        splitLinesReveal(el, { delay: Number(el.dataset.delay ?? 0) });
      });

      const reveals = gsap.utils.toArray<HTMLElement>("main [data-reveal]");
      if (reveals.length) {
        gsap.set(reveals, { opacity: 0, y: 40 });
        ScrollTrigger.batch(reveals, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      }

      gsap.utils.toArray<HTMLElement>("main [data-parallax]").forEach((frame) => {
        const img = frame.querySelector("img");
        if (!img) return;
        const amount = Number(frame.dataset.parallax || 8);
        gsap.fromTo(
          img,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      const late = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(late);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
