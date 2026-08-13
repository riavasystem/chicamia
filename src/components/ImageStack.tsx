"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { buildImageStackTimeline } from "@/animations/stack";
import type { EventScene } from "@/data/gallery";
import PlaceholderMedia from "./PlaceholderMedia";

interface ImageStackProps {
  scenes: EventScene[];
}

export default function ImageStack({ scenes }: ImageStackProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dimmerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // useLayoutEffect (no useEffect): aplica la posición inicial de forma
  // síncrona, antes de que el navegador pinte, así nunca hay un frame sin
  // animar que se vea como parpadeo. GSAP debe ser el único que toque
  // `transform` en estos elementos — mezclarlo con un `style` de React
  // rompe su caché interna de xPercent/yPercent y las escenas dejan de
  // moverse (bug detectado y corregido en esta sesión).
  useLayoutEffect(() => {
    const outer = outerRef.current;
    const els = sceneRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    const dimmers = dimmerRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (!outer || els.length < 2) return;

    const ctx = gsap.context(() => {
      gsap.set(els[0], { yPercent: 0 });
      els.slice(1).forEach((el) => gsap.set(el, { yPercent: 100 }));
      buildImageStackTimeline(els, dimmers, outer);
    }, outer);

    return () => ctx.revert();
  }, [scenes]);

  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ height: `${scenes.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-chica-carbon">
        {scenes.map((scene, i) => (
          <div
            key={scene.image + i}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="absolute inset-0 h-full w-full will-change-transform"
          >
            <PlaceholderMedia
              src={scene.image}
              alt={scene.label}
              label={scene.label}
              priority={i === 0}
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-chica-carbon/70 via-transparent to-transparent" />
            {/* Oscurece la escena saliente (reemplaza al antiguo filter:
                brightness — ver comentario en animations/stack.ts). */}
            <div
              ref={(el) => {
                dimmerRefs.current[i] = el;
              }}
              className="absolute inset-0 bg-black opacity-0 will-change-[opacity]"
            />
            <p className="absolute bottom-16 left-6 font-display text-4xl text-white md:left-10 md:text-6xl">
              {scene.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
