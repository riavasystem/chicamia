"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { heroEntrance, heroScrollPin } from "@/animations/hero";
import { hero, contact } from "@/data/content";
import { prefersReducedMotion } from "@/lib/reduced-motion";
import PlaceholderMedia from "./PlaceholderMedia";
import ScrollIndicator from "./ScrollIndicator";
import { InstagramIcon, FacebookIcon } from "./icons";

const noopSubscribe = () => () => {};
const getShowVideoSnapshot = () =>
  window.matchMedia("(min-width: 768px)").matches && !prefersReducedMotion();
const getShowVideoServerSnapshot = () => false;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  // Video de fondo solo en pantallas grandes y sin prefers-reduced-motion
  // (CLAUDE.md §36/§38: cuidar el peso en móvil y respetar reduced motion).
  // useSyncExternalStore evita el mismatch de hidratación: el server siempre
  // asume "sin video" y el cliente resuelve el valor real tras montar.
  const showVideo = useSyncExternalStore(
    noopSubscribe,
    getShowVideoSnapshot,
    getShowVideoServerSnapshot,
  );
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const social = socialRef.current;
    if (!section || !media || !title || !subtitle || !cta) return;

    const ctx = gsap.context(() => {
      heroEntrance({ image: media, title, subtitle, cta, social: social ?? undefined });
      heroScrollPin({ image: media, title }, section);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-screen items-end overflow-hidden bg-chica-carbon"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <PlaceholderMedia
          src={hero.image}
          alt="Evento con juegos y experiencias Chica Mia"
          label="Chica Mia — Hero"
          priority
          className="absolute inset-0 h-full w-full"
        />
        {showVideo && !videoFailed && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.image}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-chica-carbon via-chica-carbon/50 to-transparent" />

      <div
        ref={socialRef}
        className="absolute right-6 top-24 z-10 flex items-center gap-4 md:right-10 md:top-28"
      >
        <a
          href={contact.instagram || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de Chica Mia"
          className="text-white/80 transition-colors hover:text-white"
        >
          <InstagramIcon className="h-6 w-6" />
        </a>
        <a
          href={contact.facebook || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook de Chica Mia"
          className="text-white/80 transition-colors hover:text-white"
        >
          <FacebookIcon className="h-6 w-6" />
        </a>
      </div>

      <div className="relative z-10 max-w-3xl px-6 pb-16 md:px-10">
        <h1
          ref={titleRef}
          className="font-display text-6xl tracking-widest text-white md:text-8xl"
        >
          {hero.title}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 whitespace-pre-line text-lg text-white/80 md:text-2xl"
        >
          {hero.subtitle}
        </p>
        <a
          ref={ctaRef}
          href="#contacto"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-chica-rose px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105"
        >
          {hero.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>

      <ScrollIndicator />
    </section>
  );
}
