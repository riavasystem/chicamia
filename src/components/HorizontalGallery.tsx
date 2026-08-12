"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { buildHorizontalScroll } from "@/animations/horizontal";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/services";
import PlaceholderMedia from "./PlaceholderMedia";
import ServiceGalleryModal from "./ServiceGalleryModal";

interface HorizontalGalleryProps {
  services: Service[];
}

export default function HorizontalGallery({ services }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      buildHorizontalScroll(track, container);
    }, container);

    return () => ctx.revert();
  }, [services]);

  return (
    <section
      ref={containerRef}
      id="galeria"
      className="relative h-screen overflow-hidden bg-chica-carbon"
    >
      <p className="absolute left-6 top-8 z-10 font-display text-2xl tracking-widest text-white md:left-10">
        GALERÍA DE EXPERIENCIAS
      </p>
      <div
        ref={trackRef}
        data-cursor="ARRASTRA"
        className="flex h-full w-max items-center gap-6 px-[10vw] will-change-transform"
      >
        {services.map((service, i) => (
          <button
            key={service.id}
            type="button"
            data-cursor="VER"
            onClick={() => setActiveService(service)}
            className={cn(
              "group relative h-[70vh] w-[60vw] flex-none appearance-none overflow-hidden rounded-2xl bg-transparent p-0 text-left md:w-[38vw]",
              i % 2 === 1 && "md:mt-16 md:h-[58vh]",
            )}
          >
            <PlaceholderMedia
              src={service.heroImage}
              alt={service.title}
              label={service.title}
              sizes="(min-width: 768px) 38vw, 60vw"
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-chica-carbon/85 via-chica-carbon/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6">
              <span className="font-display text-sm text-chica-rose">{service.number}</span>
              <h3 className="font-display text-2xl text-white md:text-3xl">{service.title}</h3>
            </div>
          </button>
        ))}
      </div>

      <ServiceGalleryModal service={activeService} onClose={() => setActiveService(null)} />
    </section>
  );
}
