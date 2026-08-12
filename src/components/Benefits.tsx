"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { benefits } from "@/data/content";
import Counter from "./Counter";

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-chica-carbon px-6 py-24 text-white md:px-10">
      <h2 className="font-display text-4xl tracking-widest md:text-6xl">BENEFICIOS</h2>

      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
        {benefits.map((benefit, i) => (
          <div key={benefit.number} className="benefit-card border-t border-white/10 pt-6">
            <Counter to={i + 1} className="font-display text-3xl text-chica-rose" />
            <h3 className="mt-2 font-display text-2xl uppercase tracking-wide md:text-3xl">
              {benefit.title}
            </h3>
            <p className="mt-2 text-white/70">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
