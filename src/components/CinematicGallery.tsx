"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  riseIn,
  clipRevealIn,
  horizontalIn,
  floatIn,
  splitReveal,
  depthIn,
  fadeIn,
} from "@/animations/reveal";
import { zoomIn } from "@/animations/zoom";
import { parallaxY } from "@/animations/parallax";
import type { GalleryImage } from "@/data/gallery";
import PlaceholderMedia from "./PlaceholderMedia";

function GalleryItem({ item }: { item: GalleryImage }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: wrap, start: "top 75%" };

      switch (item.effect) {
        case "rise":
          if (imageRef.current) riseIn(imageRef.current, { scrollTrigger });
          break;
        case "clip":
          if (imageRef.current) clipRevealIn(imageRef.current, { scrollTrigger });
          break;
        case "zoom":
          if (imageRef.current) zoomIn(imageRef.current, { scrollTrigger });
          break;
        case "horizontal":
          if (imageRef.current) horizontalIn(imageRef.current, { scrollTrigger });
          break;
        case "float":
          if (imageRef.current) floatIn(imageRef.current, { scrollTrigger });
          break;
        case "split":
          if (panelLeftRef.current && panelRightRef.current) {
            splitReveal(panelLeftRef.current, panelRightRef.current, { scrollTrigger });
          }
          break;
        case "depth":
          if (backRef.current && frontRef.current) {
            depthIn(backRef.current, frontRef.current, { scrollTrigger });
          }
          break;
        case "parallax":
          if (imageRef.current) {
            fadeIn(imageRef.current, { scrollTrigger });
            parallaxY(imageRef.current, wrap, 0.2);
          }
          break;
      }
    }, wrap);

    return () => ctx.revert();
  }, [item.effect]);

  if (item.effect === "split") {
    return (
      <div ref={wrapRef} className="relative h-[80vh] w-full overflow-hidden rounded-2xl md:h-[90vh]">
        <PlaceholderMedia src={item.image} alt={item.alt} label={item.alt} className="absolute inset-0 h-full w-full" />
        <div ref={panelLeftRef} className="absolute inset-y-0 left-0 w-1/2 bg-chica-purple" />
        <div ref={panelRightRef} className="absolute inset-y-0 right-0 w-1/2 bg-chica-rose" />
      </div>
    );
  }

  if (item.effect === "depth") {
    return (
      <div ref={wrapRef} className="relative h-[80vh] w-full overflow-hidden rounded-2xl md:h-[90vh]">
        <div ref={backRef} className="absolute inset-0 blur-sm brightness-75">
          <PlaceholderMedia src={item.image} alt="" label="" className="absolute inset-0 h-full w-full" />
        </div>
        <div ref={frontRef} className="absolute inset-8 md:inset-16">
          <PlaceholderMedia src={item.image} alt={item.alt} label={item.alt} className="absolute inset-0 h-full w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative h-[80vh] w-full overflow-hidden rounded-2xl md:h-[90vh]">
      <PlaceholderMedia
        ref={imageRef}
        src={item.image}
        alt={item.alt}
        label={item.alt}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

export default function CinematicGallery({ items }: { items: GalleryImage[] }) {
  return (
    <section className="flex flex-col gap-16 bg-chica-carbon px-6 py-24 md:px-10 md:py-32">
      <h2 className="font-display text-4xl tracking-widest text-white md:text-6xl">
        GALERÍA CINEMATOGRÁFICA
      </h2>
      <div className="flex flex-col gap-20">
        {items.map((item, i) => (
          <GalleryItem key={item.image + i} item={item} />
        ))}
      </div>
    </section>
  );
}
