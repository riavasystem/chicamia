"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { manifesto } from "@/data/content";
import PlaceholderMedia from "./PlaceholderMedia";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".manifesto-line",
        { opacity: 0, y: 40, letterSpacing: "0.08em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0em",
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 65%" },
        },
      );

      gsap.fromTo(
        ".manifesto-bg",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 0.35,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 65%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-chica-carbon px-6 py-24 md:px-10"
    >
      <PlaceholderMedia
        src="/images/reloj-derribador/action-02.webp"
        alt=""
        label="Chica Mia"
        className="manifesto-bg absolute inset-0"
      />
      <div className="absolute inset-0 bg-chica-carbon/70" />

      <div className="relative z-10 text-center">
        {manifesto.lines.map((line, i) => (
          <p
            key={line + i}
            className="manifesto-line font-display text-4xl leading-tight tracking-wide text-white md:text-7xl"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
