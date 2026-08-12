import type { SceneEffect } from "./services";

export interface GalleryImage {
  image: string;
  alt: string;
  effect: SceneEffect;
}

// Todas las imágenes reutilizan las fotos ya subidas en cada carpeta de
// servicio (services.ts) — una sola fuente por foto, sin duplicar archivos.
// Reglas de variedad (CLAUDE.md #42): no repetir el mismo efecto más de dos veces seguidas.
export const cinematicGallery: GalleryImage[] = [
  { image: "/images/toro-mecanico/action-01.webp", alt: "Cumpleaños con toro mecánico", effect: "rise" },
  { image: "/images/camara-360/hero.webp", alt: "Boda con cámara 360", effect: "clip" },
  { image: "/images/reloj-derribador/hero.webp", alt: "Fiestas Patrias con reloj derribador", effect: "zoom" },
  { image: "/images/tagada-dual/action-01.webp", alt: "Fiesta en piscina con Tagada Dual", effect: "horizontal" },
  { image: "/images/toro-mecanico/action-02.webp", alt: "Evento corporativo con toro mecánico", effect: "parallax" },
  { image: "/images/camara-360/action-01.webp", alt: "Evento corporativo con cámara 360", effect: "split" },
  { image: "/images/reloj-derribador/action-02.webp", alt: "Niños jugando en el reloj derribador", effect: "float" },
  { image: "/images/tagada-dual/hero.webp", alt: "Adultos disfrutando Tagada Dual", effect: "depth" },
];

export interface EventScene {
  image: string;
  label: string;
}

export const eventScenes: EventScene[] = [
  { image: "/images/toro-mecanico/action-01.webp", label: "Cumpleaños" },
  { image: "/images/camara-360/hero.webp", label: "Matrimonios" },
  { image: "/images/reloj-derribador/action-01.webp", label: "Fiestas" },
  { image: "/images/reloj-derribador/hero.webp", label: "Celebración familiar" },
  { image: "/images/camara-360/action-01.webp", label: "Evento corporativo" },
  { image: "/images/tagada-dual/action-01.webp", label: "Fiesta infantil" },
];
