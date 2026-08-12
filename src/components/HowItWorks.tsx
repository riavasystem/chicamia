"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { riseIn, clipRevealIn, horizontalIn } from "@/animations/reveal";
import { zoomIn } from "@/animations/zoom";
import { howItWorks } from "@/data/content";
import { cn } from "@/lib/utils";
import PlaceholderMedia from "./PlaceholderMedia";

function Step({
  step,
  index,
}: {
  step: (typeof howItWorks)[number];
  index: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    if (!wrap || !image || !title) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: wrap, start: "top 70%" };

      if (step.effect === "rise") riseIn(image, { scrollTrigger });
      else if (step.effect === "clip") clipRevealIn(image, { scrollTrigger });
      else if (step.effect === "horizontal") horizontalIn(image, { scrollTrigger });
      else if (step.effect === "zoom") zoomIn(image, { scrollTrigger });

      gsap.fromTo(
        title,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out", scrollTrigger },
      );
    }, wrap);

    return () => ctx.revert();
  }, [step.effect]);

  const imageFirst = index % 2 === 0;

  return (
    <div
      ref={wrapRef}
      className="grid min-h-screen items-center gap-10 py-16 md:grid-cols-2 md:gap-16"
    >
      <div
        className={cn(
          "relative aspect-4/5 w-full overflow-hidden rounded-2xl",
          imageFirst ? "md:order-1" : "md:order-2",
        )}
      >
        <PlaceholderMedia
          ref={imageRef}
          src={step.image}
          alt={step.title}
          label={step.title}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div className={cn(imageFirst ? "md:order-2" : "md:order-1")}>
        <span className="font-display text-3xl text-chica-rose">{step.number}</span>
        <h3 ref={titleRef} className="font-display text-4xl uppercase tracking-wide md:text-6xl">
          {step.title}
        </h3>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white px-6 text-chica-carbon md:px-10">
      <div className="pt-24 text-center">
        <h2 className="font-display text-4xl tracking-widest md:text-6xl">
          ¿CÓMO FUNCIONA?
        </h2>
      </div>
      {howItWorks.map((step, i) => (
        <Step key={step.number} step={step} index={i} />
      ))}
    </section>
  );
}
