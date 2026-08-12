"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/reduced-motion";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const root = rootRef.current;
    if (!root || done) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      tl.fromTo(
        ".preloader-word",
        { opacity: 0, y: 16, letterSpacing: "0.25em" },
        { opacity: 1, y: 0, letterSpacing: "0.05em", duration: 0.7, stagger: 0.15, ease: "power2.out" },
      )
        .to(".preloader-word", { duration: 0.5 })
        .fromTo(
          ".preloader-tagline",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        )
        .to({}, { duration: 0.4 })
        .to(root, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.7,
          ease: "power3.inOut",
        });
    }, root);

    return () => ctx.revert();
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-chica-carbon [clip-path:inset(0%_0%_0%_0%)]"
      aria-hidden="true"
    >
      <p className="font-display text-5xl tracking-widest text-white md:text-7xl">
        <span className="preloader-word inline-block">CHICA</span>{" "}
        <span className="preloader-word inline-block">MIA</span>
      </p>
      <p className="preloader-tagline mt-4 text-sm uppercase tracking-[0.3em] text-white/60">
        Juegos y experiencias para hacer inolvidable tu evento
      </p>
    </div>
  );
}
