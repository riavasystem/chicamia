// Contenido centralizado de la página. Editar aquí, no dentro de componentes.

export const siteConfig = {
  name: "Chica Mia",
  title: "Chica Mia | Juegos y experiencias para eventos",
  description:
    "Haz de tu evento una experiencia inolvidable con Chica Mia: toro mecánico, cámara 360, reloj derribador y más.",
  // Actualizar si el dominio final (custom domain en Vercel) cambia.
  url: "https://chicamia.vercel.app",
};

export const contact = {
  whatsapp: "https://wa.me/56929954196",
  instagram: "https://www.instagram.com/chicamia.juegosimflables?utm_source=qr",
  facebook: "https://www.facebook.com/share/19E58pRVyx/?mibextid=wwXIfr",
  email: "flavia.calderon@chicamia.cl",
  phone: "",
};

export const nav = {
  brand: "CHICA MIA",
  links: [
    { label: "Experiencias", href: "#experiencias" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: "RESERVAR",
};

export const hero = {
  title: "CHICA MIA",
  subtitle: "Juegos y experiencias\npara momentos inolvidables.",
  cta: "RESERVAR AHORA",
  // Reutiliza la foto de Toro Mecánico como poster/fallback (misma fuente,
  // sin duplicar archivo) — en desktop/tablet se ve el video de fondo.
  image: "/images/toro-mecanico/hero.webp",
  video: "/videos/hero/video_hero.mp4",
};

export const manifesto = {
  lines: ["NO ALQUILAMOS", "SOLO JUEGOS.", "CREAMOS", "MOMENTOS."],
};

export const experiencesIntro = {
  eyebrow: "NUESTRAS",
  title: "EXPERIENCIAS",
};

export const selection = {
  title: "¿QUÉ ESTÁS BUSCANDO?",
  options: [
    { label: "DIVERSIÓN", image: "/images/tagada-dual/action-01.webp" },
    { label: "ADRENALINA", image: "/images/toro-mecanico/action-01.webp" },
    { label: "RECUERDOS", image: "/images/camara-360/action-01.webp" },
    { label: "EXPERIENCIA", image: "/images/reloj-derribador/action-01.webp" },
  ],
};

export const howItWorks = [
  {
    number: "01",
    title: "ELIGE TU EXPERIENCIA",
    image: "/images/camara-360/action-02.webp",
    effect: "rise" as const,
  },
  {
    number: "02",
    title: "RESERVA TU FECHA",
    image: "/images/reloj-derribador/action-01.webp",
    effect: "horizontal" as const,
  },
  {
    number: "03",
    title: "NOS ENCARGAMOS DE TODO",
    image: "/images/tagada-dual/action-02.webp",
    effect: "clip" as const,
  },
  {
    number: "04",
    title: "DISFRUTA TU EVENTO",
    image: "/images/toro-mecanico/action-02.webp",
    effect: "zoom" as const,
  },
];

export const benefits = [
  { number: "01", title: "EXPERIENCIA", description: "Experiencias entretenidas para todo tipo de evento." },
  { number: "02", title: "DIVERSIÓN", description: "Opciones para diferentes tipos de celebraciones." },
  { number: "03", title: "RECUERDOS", description: "Momentos pensados para fotos y video." },
  { number: "04", title: "EVENTO", description: "Atención personalizada y reserva coordinada." },
];

export const finalCta = {
  title: "¿LISTO PARA\nHACER TU EVENTO\nINOLVIDABLE?",
  cta: "RESERVAR AHORA",
  image: "/images/camara-360/hero.webp",
};

export const contactSection = {
  eyebrow: "HABLEMOS",
  title: "¿CONVERSAMOS\nDE TU EVENTO?",
  description:
    "Cuéntanos qué estás celebrando y armamos la experiencia perfecta para tu fecha.",
};

/** Opciones del selector de servicio en el formulario de contacto. */
export const contactFormServices = [
  "Toro Mecánico",
  "Tarima Foto 360",
  "Reloj Demoledor",
  "Base Tagada",
  "Taca Taca",
  "Algodón de Azúcar",
  "Cabritas",
  "Animación de Eventos",
  "Pinta Caritas",
  "Paquete Mix",
];

export const footer = {
  brand: "CHICA MIA",
  tagline: "Juegos y experiencias\npara momentos inolvidables.",
};
