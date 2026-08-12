"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { testimonials } from "@/data/testimonials";
import Marquee from "./Marquee";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ name, event, quote }: (typeof testimonials)[number]) {
  return (
    <div className="w-52 shrink-0 rounded-lg border border-white/10 bg-chica-carbon p-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-chica-rose to-chica-purple text-xs font-semibold text-white">
          {initials(name)}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs font-medium text-white/50">{event}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-xs text-white/70">&ldquo;{quote}&rdquo;</blockquote>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 text-chica-carbon">
      <div className="testimonials-reveal px-6 md:px-10">
        <p className="text-sm uppercase tracking-[0.4em] text-chica-rose">Testimonios</p>
        <h2 className="mt-3 font-display text-4xl tracking-wide md:text-6xl">
          LO QUE DICEN
          <br />
          DE NOSOTROS
        </h2>
      </div>

      <div className="testimonials-reveal relative mt-24 flex h-96 w-full flex-row items-center overflow-hidden perspective-near md:mt-28">
        <div
          className="flex w-full flex-row items-center justify-between gap-4 px-6 transform-none md:px-10 md:transform-[translateY(0px)_translateZ(-100px)_rotateX(20deg)_rotateY(-10deg)_rotateZ(10deg)]"
        >
          <Marquee vertical pauseOnHover repeat={3} className="flex-1 [--duration:40s]">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="flex-1 [--duration:40s]">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover repeat={3} className="flex-1 [--duration:40s]">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="flex-1 [--duration:40s]">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover repeat={3} className="hidden flex-1 [--duration:40s] lg:flex">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="hidden flex-1 [--duration:40s] lg:flex">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-white" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-white" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-white" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-white" />
        </div>
      </div>
    </section>
  );
}
