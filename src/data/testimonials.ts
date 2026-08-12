export interface Testimonial {
  name: string;
  event: string;
  quote: string;
}

/**
 * Contenido de ejemplo — reemplazar por reseñas reales de clientes de
 * Chica Mia (nombre, tipo de evento y comentario) apenas estén disponibles.
 */
export const testimonials: Testimonial[] = [
  { name: "Camila R.", event: "Cumpleaños 15", quote: "El toro mecánico fue lo más comentado de la fiesta, todos querían su turno." },
  { name: "Matías G.", event: "Evento corporativo", quote: "La cámara 360 dejó videos increíbles para mostrar en redes de la empresa." },
  { name: "Francisca P.", event: "Matrimonio", quote: "Llegaron a la hora, armaron rápido y no tuvimos que preocuparnos de nada." },
  { name: "Diego S.", event: "Cumpleaños infantil", quote: "El reloj derribador tuvo a los niños jugando toda la tarde, un éxito total." },
  { name: "Valentina O.", event: "Fiesta familiar", quote: "Muy buena disposición del equipo, quedamos felices con la experiencia completa." },
  { name: "Ignacio T.", event: "Celebración de fin de año", quote: "La tarima 360 terminó siendo el punto de encuentro de toda la fiesta." },
];
