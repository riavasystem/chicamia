import { gsap, ScrollTrigger } from "@/lib/gsap";

export function zoomIn(
  el: gsap.TweenTarget,
  opts: { from?: number; delay?: number; duration?: number; scrollTrigger?: ScrollTrigger.Vars } = {},
) {
  return gsap.fromTo(
    el,
    { scale: opts.from ?? 1.25 },
    {
      scale: 1,
      duration: opts.duration ?? 1.3,
      delay: opts.delay ?? 0,
      ease: "power2.out",
      scrollTrigger: opts.scrollTrigger,
    },
  );
}

/** Zoom + brightness combinado, usado en escenas de mayor impacto (CTA, Cámara 360). */
export function zoomBrightnessIn(el: gsap.TweenTarget, opts: { delay?: number } = {}) {
  return gsap.fromTo(
    el,
    { scale: 1.15, filter: "brightness(0.75)" },
    { scale: 1, filter: "brightness(1)", duration: 1.3, delay: opts.delay ?? 0, ease: "power2.out" },
  );
}
