"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { splitLinesReveal } from "@/animations/typography";
import { finalCta } from "@/data/content";
import PlaceholderMedia from "./PlaceholderMedia";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const cta = ctaRef.current;
    if (!section || !image || !title || !cta) return;

    let split: ReturnType<typeof splitLinesReveal> | undefined;

    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: section, start: "top 65%" };
      gsap.fromTo(
        image,
        { scale: 1.15, filter: "brightness(0.75)" },
        { scale: 1, filter: "brightness(1)", duration: 1.3, ease: "power2.out", scrollTrigger },
      );

      split = splitLinesReveal(title, { delay: 0.1 });

      gsap.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: "power2.out", scrollTrigger },
      );
    }, section);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex h-screen items-center justify-center overflow-hidden bg-chica-carbon">
      <PlaceholderMedia
        ref={imageRef}
        src={finalCta.image}
        alt=""
        label="Chica Mia"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-chica-carbon/60" />

      <div className="relative z-10 text-center">
        <h2
          ref={titleRef}
          className="whitespace-pre-line font-display text-5xl leading-[0.95] tracking-wide text-white md:text-8xl"
        >
          {finalCta.title}
        </h2>
        <a
          ref={ctaRef}
          href="#contacto"
          className="mt-10 inline-block rounded-full bg-chica-rose px-10 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105"
        >
          {finalCta.cta}
        </a>
      </div>
    </section>
  );
}
