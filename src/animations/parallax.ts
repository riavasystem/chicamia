import { gsap } from "@/lib/gsap";

/**
 * Mueve `el` a una velocidad distinta que el scroll natural mientras
 * `trigger` (normalmente el contenedor de la sección) está en viewport.
 * speed > 0 se mueve más lento que el scroll, speed < 0 más rápido / inverso.
 * Ver CLAUDE.md §28 — usar valores sutiles (0.15–0.7).
 * En móvil (<768px) el movimiento se reduce (CLAUDE.md §34) para evitar
 * mareo y jank en dispositivos con menos rendimiento.
 */
export function parallaxY(
  el: gsap.TweenTarget,
  trigger: Element,
  speed = 0.3,
) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const effectiveSpeed = isMobile ? speed * 0.4 : speed;

  return gsap.to(el, {
    yPercent: effectiveSpeed * 100,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
