import { useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, markReady, prefersReducedMotion } from "@/lib/motion";

/**
 * Sipario d'apertura: solo al primo caricamento della home.
 * Coperto dal CSS (.preloader) anche se il JS non parte.
 */
export function Preloader() {
  const initialPath = useRouterState({ select: (s) => s.location.pathname });
  const [show, setShow] = useState(() => initialPath === "/");
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!show || !root.current) {
        if (!show) markReady();
        return;
      }
      if (prefersReducedMotion()) {
        markReady();
        setShow(false);
        return;
      }

      const html = document.documentElement;
      html.style.overflow = "hidden";

      const word = root.current.querySelector(".preloader-word") as HTMLElement;
      const line = root.current.querySelector(".preloader-line") as HTMLElement;
      const split = SplitText.create(word, { type: "chars", mask: "chars" });

      const tl = gsap.timeline({
        onComplete: () => {
          html.style.overflow = "";
          setShow(false);
        },
      });
      tl.from(
        split.chars,
        { yPercent: 110, duration: 0.9, stagger: 0.045, ease: "power4.out" },
        0.2,
      )
        .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, 0.3)
        .to([word, line], { opacity: 0, duration: 0.4, ease: "power2.in" }, 1.55)
        .add(() => markReady(), 1.7)
        .to(root.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, 1.7);

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: root, dependencies: [] },
  );

  if (!show) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night text-background"
    >
      <p className="preloader-word heading-wide text-[clamp(1.4rem,5vw,3rem)] tracking-[0.45em]">
        Flair Avenue
      </p>
      <span className="preloader-line mt-8 block h-px w-40 origin-left bg-background/60" />
    </div>
  );
}
