import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/** Barra di avanzamento in alto + etichetta del capitolo corrente in basso a sinistra. */
export function StoryProgress() {
  const [chapter, setChapter] = useState<{ n: string; t: string } | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.fromTo(
      ".story-bar",
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      },
    );

    // Il capitolo attivo è quello che contiene la linea mediana del viewport.
    // Si legge dal rect: funziona anche quando la sezione è pinned.
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const mid = window.innerHeight * 0.5;
        const found = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).find(
          (el) => {
            const r = el.getBoundingClientRect();
            return r.top <= mid && r.bottom >= mid;
          },
        );
        setChapter((prev) => {
          const next = found
            ? { n: found.dataset.chapter ?? "", t: found.dataset.chapterTitle ?? "" }
            : null;
          if (prev?.n === next?.n && prev?.t === next?.t) return prev;
          return next;
        });
      },
    });
  });

  return (
    <>
      <span
        aria-hidden
        className="story-bar pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-terracotta"
      />
      <div
        aria-hidden
        className={`pointer-events-none fixed bottom-5 left-4 z-40 text-white mix-blend-difference transition-opacity duration-500 md:bottom-7 md:left-7 ${
          chapter ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="label-wide flex items-center gap-3">
          <span className="story-title text-2xl italic leading-none">{chapter?.n}</span>
          <span className="h-px w-8 bg-white" />
          <span>{chapter?.t}</span>
        </p>
      </div>
    </>
  );
}
