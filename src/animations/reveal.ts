import { gsap, ScrollTrigger } from "@/lib/gsap";

interface EntranceOpts {
  delay?: number;
  duration?: number;
  scrollTrigger?: ScrollTrigger.Vars;
}

/** Rise: la imagen sube desde abajo mientras aparece (CLAUDE.md §25). */
export function riseIn(el: gsap.TweenTarget, opts: EntranceOpts = {}) {
  return gsap.fromTo(
    el,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: opts.duration ?? 1.1,
      delay: opts.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: opts.scrollTrigger,
    },
  );
}

/** Clip Reveal: revela la imagen desde un inset con un leve zoom. */
export function clipRevealIn(el: gsap.TweenTarget, opts: EntranceOpts = {}) {
  return gsap.fromTo(
    el,
    { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: 1,
      duration: opts.duration ?? 1.2,
      delay: opts.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: opts.scrollTrigger,
    },
  );
}

/** Horizontal: entra desde la derecha empujando lo anterior. */
export function horizontalIn(el: gsap.TweenTarget, opts: EntranceOpts = {}) {
  return gsap.fromTo(
    el,
    { xPercent: 100, opacity: 0 },
    {
      xPercent: 0,
      opacity: 1,
      duration: opts.duration ?? 1,
      delay: opts.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: opts.scrollTrigger,
    },
  );
}

/** Fade simple — usar con moderación (CLAUDE.md §27: nunca como transición principal única). */
export function fadeIn(el: gsap.TweenTarget, opts: EntranceOpts = {}) {
  return gsap.fromTo(
    el,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.9,
      delay: opts.delay ?? 0,
      ease: "power2.out",
    },
  );
}

/** Float: entrada suave + loop vertical continuo muy leve. */
export function floatIn(el: gsap.TweenTarget, opts: EntranceOpts = {}) {
  const tl = gsap.timeline({
    scrollTrigger: opts.scrollTrigger,
  });
  tl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
  tl.to(el, { y: "-=10", duration: 2.4, ease: "sine.inOut", repeat: -1, yoyo: true }, "-=0.2");
  return tl;
}

/** Split: dos paneles que se encuentran desde extremos opuestos. */
export function splitIn(
  panelLeft: gsap.TweenTarget,
  panelRight: gsap.TweenTarget,
  opts: EntranceOpts = {},
) {
  const tl = gsap.timeline({ delay: opts.delay ?? 0, scrollTrigger: opts.scrollTrigger });
  tl.fromTo(panelLeft, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: opts.duration ?? 1, ease: "power3.out" }, 0);
  tl.fromTo(panelRight, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1, duration: opts.duration ?? 1, ease: "power3.out" }, 0);
  return tl;
}

/**
 * Split Reveal: dos paneles que ya cubren una imagen (en reposo, sin JS)
 * se abren hacia los lados opuestos para revelarla. A diferencia de
 * `splitIn`, los paneles empiezan visibles/en su lugar — así, si el
 * scroll-trigger nunca dispara, la imagen queda cubierta en vez de
 * mostrarse en un estado a medio animar.
 */
export function splitReveal(
  panelLeft: gsap.TweenTarget,
  panelRight: gsap.TweenTarget,
  opts: EntranceOpts = {},
) {
  const tl = gsap.timeline({ delay: opts.delay ?? 0, scrollTrigger: opts.scrollTrigger });
  tl.to(panelLeft, { xPercent: -100, duration: opts.duration ?? 1, ease: "power3.inOut" }, 0);
  tl.to(panelRight, { xPercent: 100, duration: opts.duration ?? 1, ease: "power3.inOut" }, 0);
  return tl;
}

/** Depth: capas a distinta escala/velocidad para simular profundidad. */
export function depthIn(
  back: gsap.TweenTarget,
  front: gsap.TweenTarget,
  opts: EntranceOpts = {},
) {
  const tl = gsap.timeline({ delay: opts.delay ?? 0, scrollTrigger: opts.scrollTrigger });
  tl.fromTo(back, { scale: 1.3, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 1.3, ease: "power2.out" }, 0);
  tl.fromTo(front, { scale: 1.1, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.15);
  return tl;
}
