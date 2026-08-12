"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(bar, { scaleY: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <div className="h-32 w-px bg-white/20">
        <div ref={barRef} className="h-full w-full origin-top scale-y-0 bg-chica-rose" />
      </div>
    </div>
  );
}
