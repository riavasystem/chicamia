"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { experiencesIntro } from "@/data/content";
import { services } from "@/data/services";

export default function ExperiencesIntro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experiences-title",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".experiences-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 55%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experiencias"
      ref={sectionRef}
      className="flex min-h-screen flex-col items-center justify-center gap-16 bg-white px-6 py-24 text-chica-carbon md:px-10"
    >
      <div className="text-center">
        <p className="experiences-title text-sm uppercase tracking-[0.4em] text-chica-magenta">
          {experiencesIntro.eyebrow}
        </p>
        <h2 className="experiences-title font-display text-6xl tracking-widest md:text-8xl">
          {experiencesIntro.title}
        </h2>
      </div>

      <ol className="flex w-full max-w-2xl flex-col gap-6">
        {services.map((service) => (
          <li
            key={service.id}
            className="experiences-item flex items-baseline justify-between border-b border-chica-carbon/10 pb-4"
          >
            <span className="font-display text-xl text-chica-magenta">
              {service.number}
            </span>
            <span className="font-display text-2xl tracking-wide md:text-4xl">
              {service.title.toUpperCase()}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
