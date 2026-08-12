import { gsap } from "@/lib/gsap";

/**
 * Sistema Image Stack (CLAUDE.md §17): cada escena entra desde abajo y
 * empuja/atenúa la anterior. `scrollContainer` debe medir
 * `scenes.length * 100vh` y contener un hijo `sticky top-0 h-screen` con
 * las escenas apiladas en `position: absolute`.
 */
export function buildImageStackTimeline(scenes: Element[], scrollContainer: Element) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  scenes.forEach((scene, i) => {
    if (i === 0) return;
    const prev = scenes[i - 1];
    const position = i - 1;

    tl.to(scene, { yPercent: 0, duration: 1, ease: "none" }, position).to(
      prev,
      { scale: 0.94, filter: "brightness(0.75)", duration: 1, ease: "none" },
      position,
    );
  });

  return tl;
}
