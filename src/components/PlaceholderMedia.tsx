"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface PlaceholderMediaProps {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Envoltorio de imagen que degrada a un placeholder de marca cuando el
 * archivo real todavía no existe en /public. En cuanto se coloque la foto
 * real en la misma ruta (ver public/images/README.md), se muestra sola —
 * no hay que tocar ningún componente.
 */
const PlaceholderMedia = forwardRef<HTMLDivElement, PlaceholderMediaProps>(
  ({ src, alt, label, priority, sizes, className }, ref) => {
    const [failed, setFailed] = useState(false);

    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        {!failed ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes ?? "100vw"}
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-chica-purple via-chica-magenta to-chica-rose">
            <span className="-rotate-6 px-6 text-center font-display text-sm uppercase tracking-[0.3em] text-white/70">
              {label ?? alt}
              <br />
              <span className="text-[10px] tracking-widest text-white/50">
                imagen referencial
              </span>
            </span>
          </div>
        )}
      </div>
    );
  },
);

PlaceholderMedia.displayName = "PlaceholderMedia";

export default PlaceholderMedia;
