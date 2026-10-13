import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Evita ricalcoli continui quando la barra del browser mobile compare/scompare
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText };

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ---------- Lenis (smooth scroll) ---------- */

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTop() {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/* ---------- Gate di avvio: l'intro dell'hero parte quando il sipario si alza ---------- */

declare global {
  interface Window {
    __flairReady?: boolean;
  }
}

export function markReady() {
  window.__flairReady = true;
  window.dispatchEvent(new Event("flair:ready"));
}

export function onReady(callback: () => void): () => void {
  if (window.__flairReady) {
    callback();
    return () => {};
  }
  window.addEventListener("flair:ready", callback, { once: true });
  return () => window.removeEventListener("flair:ready", callback);
}

/* ---------- Helper di animazione ---------- */

/**
 * Titoli a righe mascherate che salgono dal basso.
 * Con `scroll: true` l'animazione parte quando l'elemento entra in viewport.
 */
export function splitLinesReveal(
  el: Element,
  options: {
    scroll?: boolean;
    delay?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {},
) {
  const { scroll = true, delay = 0, duration = 1.2, stagger = 0.12, start = "top 88%" } = options;
  return SplitText.create(el, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 115,
        duration,
        stagger,
        delay,
        ease: "power4.out",
        scrollTrigger: scroll ? { trigger: el, start, once: true } : undefined,
      });
    },
  });
}

/** Testo che si "accende" parola per parola mentre si scorre. */
export function splitWordsScrub(
  el: Element,
  options: { start?: string; end?: string; from?: number } = {},
) {
  const { start = "top 80%", end = "bottom 45%", from = 0.14 } = options;
  return SplitText.create(el, {
    type: "words",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.words,
        { opacity: from },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start, end, scrub: true },
        },
      );
    },
  });
}
