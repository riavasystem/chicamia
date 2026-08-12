export type SceneEffect =
  | "rise"
  | "reveal"
  | "zoom"
  | "parallax"
  | "horizontal"
  | "split"
  | "float"
  | "depth"
  | "clip"
  | "stack"
  | "push"
  | "fade"
  | "scale"
  | "rotate"
  | "blur"
  | "brightness";

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  question: string;
  /** Imagen protagonista de la escena (sección 12-14 del CLAUDE.md). */
  heroImage: string;
  /** Fotos adicionales del mismo servicio (galería cinematográfica, selección, etc.). */
  actionImages: string[];
  eventImage: string;
  effect: SceneEffect;
}

export const services: Service[] = [
  {
    id: "toro-mecanico",
    number: "01",
    title: "Toro Mecánico",
    subtitle: "La experiencia que todos quieren probar",
    question: "¿Quién logra mantenerse?",
    heroImage: "/images/toro-mecanico/hero.webp",
    actionImages: [
      "/images/toro-mecanico/action-01.webp",
      "/images/toro-mecanico/action-02.webp",
    ],
    eventImage: "/images/toro-mecanico/event-01.webp",
    effect: "rise",
  },
  {
    id: "camara-360",
    number: "02",
    title: "Cámara 360",
    subtitle: "Elegancia y tecnología para tu evento",
    question: "Captura cada momento desde todos los ángulos.",
    heroImage: "/images/camara-360/hero.webp",
    actionImages: [
      "/images/camara-360/action-01.webp",
      "/images/camara-360/action-02.webp",
    ],
    eventImage: "/images/camara-360/event-01.webp",
    effect: "clip",
  },
  {
    id: "reloj-derribador",
    number: "03",
    title: "Reloj Derribador",
    subtitle: "Energía y diversión sin límites",
    question: "El juego inflable que pone a prueba tu equilibrio.",
    heroImage: "/images/reloj-derribador/hero.webp",
    actionImages: [
      "/images/reloj-derribador/action-01.webp",
      "/images/reloj-derribador/action-02.webp",
    ],
    eventImage: "/images/reloj-derribador/event-01.webp",
    effect: "horizontal",
  },
  {
    id: "tagada-dual",
    number: "04",
    title: "Tagada Dual",
    subtitle: "El doble de adrenalina, cara a cara",
    question: "¿Quién aguanta más tiempo arriba?",
    heroImage: "/images/tagada-dual/hero.webp",
    actionImages: [
      "/images/tagada-dual/action-01.webp",
      "/images/tagada-dual/action-02.webp",
    ],
    eventImage: "/images/tagada-dual/event-01.webp",
    effect: "zoom",
  },
  {
    id: "taca-taca",
    number: "05",
    title: "Taca Taca",
    subtitle: "El clásico que nunca falla en la previa",
    question: "¿Quién arma la mejor dupla?",
    heroImage: "/images/taca-taca/hero.webp",
    actionImages: [
      "/images/taca-taca/action-01.webp",
      "/images/taca-taca/action-02.webp",
    ],
    eventImage: "/images/taca-taca/event-01.webp",
    effect: "reveal",
  },
  {
    id: "algodon-azucar",
    number: "06",
    title: "Algodón de Azúcar",
    subtitle: "Dulce y color para cualquier celebración",
    question: "El infaltable de las fiestas.",
    heroImage: "/images/algodon-azucar/hero.webp",
    actionImages: [
      "/images/algodon-azucar/action-01.webp",
      "/images/algodon-azucar/action-02.webp",
    ],
    eventImage: "/images/algodon-azucar/event-01.webp",
    effect: "parallax",
  },
  {
    id: "cabritas",
    number: "07",
    title: "Cabritas",
    subtitle: "El aroma que hace más rica la fiesta",
    question: "Crocantes, calientes y listas al momento.",
    heroImage: "/images/cabritas/hero.webp",
    actionImages: [
      "/images/cabritas/action-01.webp",
      "/images/cabritas/action-02.webp",
    ],
    eventImage: "/images/cabritas/event-01.webp",
    effect: "split",
  },
  {
    id: "animacion-eventos",
    number: "08",
    title: "Animación de Eventos",
    subtitle: "Alguien que mantenga la energía arriba",
    question: "Juegos, dinámicas y diversión guiada.",
    heroImage: "/images/animacion-eventos/hero.webp",
    actionImages: [
      "/images/animacion-eventos/action-01.webp",
      "/images/animacion-eventos/action-02.webp",
    ],
    eventImage: "/images/animacion-eventos/event-01.webp",
    effect: "depth",
  },
  {
    id: "pinta-caritas",
    number: "09",
    title: "Pinta Caritas",
    subtitle: "Color y creatividad para los más pequeños",
    question: "Cada niño se transforma en su personaje favorito.",
    heroImage: "/images/pinta-caritas/hero.webp",
    actionImages: [
      "/images/pinta-caritas/action-01.webp",
      "/images/pinta-caritas/action-02.webp",
    ],
    eventImage: "/images/pinta-caritas/event-01.webp",
    effect: "float",
  },
];
