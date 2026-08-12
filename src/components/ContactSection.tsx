"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { contactSection } from "@/data/content";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: section, start: "top 70%" };

      gsap.fromTo(
        ".contact-reveal",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out", scrollTrigger },
      );

      gsap.fromTo(
        ".contact-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: "power2.out", scrollTrigger },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={sectionRef} className="bg-white px-6 py-14 text-chica-carbon md:px-10 md:py-16">
      <div className="contact-reveal mx-auto max-w-3xl text-center">
        <p className="contact-fade text-sm uppercase tracking-[0.4em] text-chica-magenta">
          {contactSection.eyebrow}
        </p>
        <h2 className="contact-fade whitespace-pre-line font-display text-4xl tracking-wide md:text-6xl">
          {contactSection.title}
        </h2>
        <p className="contact-fade mt-3 text-base text-chica-carbon/70 md:text-lg">
          {contactSection.description}
        </p>

        <ContactForm />
      </div>
    </section>
  );
}
