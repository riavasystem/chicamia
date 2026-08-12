"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { riseIn, clipRevealIn, horizontalIn } from "@/animations/reveal";
import { zoomIn } from "@/animations/zoom";
import { parallaxY } from "@/animations/parallax";
import type { Service } from "@/data/services";
import PlaceholderMedia from "./PlaceholderMedia";

interface StorySectionProps {
  service: Service;
  /** Decoración lúdica extra (círculos/líneas), pensada para Reloj Derribador. */
  decorated?: boolean;
}

export default function StorySection({ service, decorated }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const question = questionRef.current;
    if (!section || !image || !title || !question) return;

    const ctx = gsap.context(() => {
      const scrollIn = { trigger: section, start: "top 70%" };

      if (service.effect === "rise") {
        riseIn(image, { scrollTrigger: scrollIn });
      } else if (service.effect === "clip") {
        gsap.set(image, { rotate: 2 });
        clipRevealIn(image, { scrollTrigger: scrollIn });
        gsap.to(image, {
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: scrollIn,
        });
      } else if (service.effect === "horizontal") {
        horizontalIn(image, { scrollTrigger: scrollIn });
      } else if (service.effect === "zoom") {
        zoomIn(image, { from: 1.25, scrollTrigger: scrollIn });
      }

      gsap.fromTo(
        title,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.9, delay: 0.3, ease: "power3.out", scrollTrigger: { ...scrollIn } },
      );
      gsap.fromTo(
        question,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.55, ease: "power2.out", scrollTrigger: { ...scrollIn } },
      );

      // Parallax interno de la imagen mientras la sección atraviesa el viewport.
      parallaxY(image, section, 0.15);

      // Salida: la escena se atenúa y encoge mientras la siguiente toma el control.
      gsap.to(image, {
        scale: 0.94,
        filter: "brightness(0.75)",
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      if (decorated) {
        gsap.to(".story-decor", {
          y: -30,
          rotate: 15,
          opacity: 0.8,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [service.effect, decorated]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-end overflow-hidden bg-chica-carbon"
    >
      <PlaceholderMedia
        ref={imageRef}
        src={service.heroImage}
        alt={service.title}
        label={service.title}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-linear-to-t from-chica-carbon via-chica-carbon/30 to-transparent" />

      {decorated && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <span className="story-decor absolute right-[12%] top-[18%] h-16 w-16 rounded-full border-2 border-chica-coral/60" />
          <span className="story-decor absolute right-[25%] top-[35%] h-3 w-3 rounded-full bg-chica-rose" />
          <span className="story-decor absolute right-[8%] top-[45%] h-24 w-px bg-chica-coral/40" />
        </div>
      )}

      <div className="relative z-10 max-w-2xl px-6 pb-20 md:px-10">
        <span className="font-display text-2xl text-chica-rose">{service.number}</span>
        <h2
          ref={titleRef}
          className="font-display text-5xl uppercase leading-[0.95] tracking-wide text-white md:text-7xl"
        >
          {service.title}
        </h2>
        <p ref={questionRef} className="mt-4 text-lg text-white/80 md:text-xl">
          {service.question}
        </p>
      </div>
    </section>
  );
}
