"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Cursor discreto solo en desktop (hover fino). No se activa en móvil/tablet táctil. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
      setVisible(true);
    };
    const hide = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-[10px] uppercase tracking-widest text-white transition-[width,height,opacity] duration-200 md:flex",
        visible ? "opacity-100" : "opacity-0",
        label ? "h-16 w-16 bg-chica-rose/80" : "h-3 w-3 bg-white",
      )}
    >
      {label}
    </div>
  );
}
