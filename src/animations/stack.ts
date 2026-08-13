import { gsap } from "@/lib/gsap";

/**
 * Sistema Image Stack (CLAUDE.md §17): cada escena entra desde abajo y
 * empuja/atenúa la anterior. `scrollContainer` debe medir
 * `scenes.length * 100vh` y contener un hijo `sticky top-0 h-screen` con
 * las escenas apiladas en `position: absolute`.
 */
export function buildImageStackTimeline(
  scenes: Element[],
  dimmers: Element[],
  scrollContainer: Element,
) {
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
    const prevDimmer = dimmers[i - 1];
    const position = i - 1;

    // `scale` y `opacity` son las únicas propiedades animadas: ambas las
    // maneja el compositor sin repintar píxeles. El oscurecimiento del
    // brillo antiguo usaba `filter: brightness()`, que fuerza un repintado
    // completo de la capa en cada frame de scroll y producía el parpadeo
    // visible en Chrome/Safari con 6 imágenes a pantalla completa apiladas.
    tl.to(scene, { yPercent: 0, duration: 1, ease: "none" }, position)
      .to(prev, { scale: 0.94, duration: 1, ease: "none" }, position)
      .to(prevDimmer, { opacity: 0.35, duration: 1, ease: "none" }, position);
  });

  return tl;
}
