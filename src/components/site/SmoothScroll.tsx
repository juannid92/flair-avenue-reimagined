import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, setLenis } from "@/lib/motion";

/**
 * Smooth scroll con Lenis, agganciato al ticker di GSAP così ScrollTrigger
 * (pin, scrub, parallasse) resta sincronizzato con lo scroll "inerziale".
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Quando un dialog/drawer Radix blocca lo scroll del body, ferma anche Lenis.
    const syncLock = () => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
