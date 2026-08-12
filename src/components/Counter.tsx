"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const proxy = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        value: to,
        duration: 1.1,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.value)).padStart(2, "0");
        },
      });
    });

    return () => ctx.revert();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      00
    </span>
  );
}
