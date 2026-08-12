"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "200 top", scrub: true },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-xs uppercase tracking-[0.3em] text-white/70"
    >
      Scroll
      <div className="mx-auto mt-2 h-8 w-px animate-pulse bg-white/50" />
    </div>
  );
}
