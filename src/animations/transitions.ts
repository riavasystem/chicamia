import { gsap } from "@/lib/gsap";

/**
 * Transición Push entre dos escenas (CLAUDE.md §27): la escena saliente
 * pierde escala/brillo y se desplaza mientras la entrante toma el control.
 * Pensada para usarse dentro de un ScrollTrigger con scrub, ligada al
 * progreso de la sección siguiente.
 */
export function pushOut(el: gsap.TweenTarget, trigger: Element, axis: "y" | "x" = "y") {
  const offset = axis === "y" ? { yPercent: -8 } : { xPercent: -8 };

  return gsap.to(el, {
    scale: 0.94,
    filter: "brightness(0.75)",
    ...offset,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });
}
