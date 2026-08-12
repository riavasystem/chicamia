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
  description: string;
  image: string;
  effect: SceneEffect;
}

export const services: Service[] = [
  {
    id: "toro-mecanico",
    number: "01",
    title: "Toro Mecánico",
    subtitle: "La experiencia que todos quieren probar",
    description: "¿Quién logra mantenerse?",
    image: "/images/toro-mecanico.webp",
    effect: "rise",
  },
  {
    id: "camara-360",
    number: "02",
    title: "Cámara 360",
    subtitle: "Elegancia y tecnología para tu evento",
    description: "Captura cada momento desde todos los ángulos.",
    image: "/images/camara-360.webp",
    effect: "clip",
  },
  {
    id: "reloj-derribador",
    number: "03",
    title: "Reloj Derribador",
    subtitle: "Energía y diversión sin límites",
    description: "El juego inflable que pone a prueba tu equilibrio.",
    image: "/images/reloj-derribador.webp",
    effect: "horizontal",
  },
];
