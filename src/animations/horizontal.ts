import { gsap } from "@/lib/gsap";

/**
 * Convierte el scroll vertical de una sección pinned en desplazamiento
 * horizontal del `track` (CLAUDE.md §15). `container` define cuánto dura el
 * pin en scroll vertical.
 */
export function buildHorizontalScroll(track: HTMLElement, container: Element) {
  const distance = () => track.scrollWidth - window.innerWidth;

  return gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${distance()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}
