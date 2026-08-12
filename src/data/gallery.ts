import type { SceneEffect } from "./services";

export interface GalleryImage {
  image: string;
  alt: string;
  effect: SceneEffect;
  scale?: number;
  parallax?: number;
}

// Reglas de variedad (CLAUDE.md #42): no repetir el mismo efecto más de dos veces seguidas.
export const cinematicGallery: GalleryImage[] = [
  { image: "/images/gallery-01.webp", alt: "Evento con toro mecánico", effect: "rise" },
  { image: "/images/gallery-02.webp", alt: "Cámara 360 en fiesta", effect: "clip" },
  { image: "/images/gallery-03.webp", alt: "Celebración familiar", effect: "zoom" },
  { image: "/images/gallery-04.webp", alt: "Evento corporativo", effect: "horizontal" },
  { image: "/images/gallery-05.webp", alt: "Detalle de decoración", effect: "parallax" },
  { image: "/images/gallery-06.webp", alt: "Reloj derribador en acción", effect: "split" },
  { image: "/images/gallery-07.webp", alt: "Invitados disfrutando", effect: "float" },
  { image: "/images/gallery-08.webp", alt: "Ambiente del evento", effect: "depth" },
];

export const horizontalGallery: GalleryImage[] = [
  { image: "/images/toro-mecanico.webp", alt: "Toro mecánico", effect: "rise" },
  { image: "/images/camara-360.webp", alt: "Cámara 360", effect: "zoom" },
  { image: "/images/reloj-derribador.webp", alt: "Reloj derribador", effect: "float" },
  { image: "/images/gallery-evento.webp", alt: "Evento Chica Mia", effect: "parallax" },
  { image: "/images/gallery-diversion.webp", alt: "Diversión asegurada", effect: "scale" },
];
