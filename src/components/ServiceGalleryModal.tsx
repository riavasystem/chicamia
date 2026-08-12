"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import PlaceholderMedia from "./PlaceholderMedia";

interface ServiceGalleryModalProps {
  service: Service | null;
  onClose: () => void;
}

/**
 * El padre debe montar este componente con `key={service.id}` — así React lo
 * remonta al cambiar de servicio y `index` arranca en 0 sin necesitar un
 * efecto que resetee estado.
 */
export default function ServiceGalleryModal({ service, onClose }: ServiceGalleryModalProps) {
  const [index, setIndex] = useState(0);
  const images = service ? [service.heroImage, ...service.actionImages] : [];

  useEffect(() => {
    if (!service) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [service, images.length, onClose]);

  if (!service) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de fotos — ${service.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-chica-carbon/95 px-6 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar galería"
        className="absolute right-6 top-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-chica-rose hover:text-chica-rose"
      >
        ✕
      </button>

      <div className="relative flex w-full max-w-4xl flex-col items-center gap-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-chica-rose">{service.number}</span>
          <h3 className="font-display text-2xl text-white md:text-3xl">{service.title}</h3>
        </div>

        <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl">
          <PlaceholderMedia
            src={images[index]}
            alt={`${service.title} — foto ${index + 1}`}
            label={service.title}
            sizes="(min-width: 1024px) 60vw, 90vw"
            className="absolute inset-0 h-full w-full"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-chica-carbon/70 text-white transition-colors hover:bg-chica-rose"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-chica-carbon/70 text-white transition-colors hover:bg-chica-rose"
              >
                ›
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1}`}
                className={cn("h-1.5 w-8 rounded-full transition-colors", i === index ? "bg-chica-rose" : "bg-white/30")}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
