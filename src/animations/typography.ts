import { gsap, SplitText } from "@/lib/gsap";

interface SplitOpts {
  delay?: number;
  stagger?: number;
}

/**
 * Revela un elemento de texto línea por línea (SplitText), con opacity +
 * translateY. Preferir animación por líneas/palabras, no por letra
 * (CLAUDE.md §29). Devuelve el SplitText para poder hacer `.revert()`.
 */
export function splitLinesReveal(el: Element, opts: SplitOpts = {}) {
  const split = SplitText.create(el, { type: "lines", linesClass: "line" });

  gsap.set(split.lines, { overflow: "hidden" });
  gsap.fromTo(
    split.lines,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      delay: opts.delay ?? 0,
      stagger: opts.stagger ?? 0.12,
      ease: "power3.out",
    },
  );

  return split;
}

/** Revela palabra por palabra (usado en títulos cortos / manifiesto). */
export function splitWordsReveal(el: Element, opts: SplitOpts = {}) {
  const split = SplitText.create(el, { type: "words", wordsClass: "word" });

  gsap.fromTo(
    split.words,
    { opacity: 0, y: 24, letterSpacing: "0.05em" },
    {
      opacity: 1,
      y: 0,
      letterSpacing: "0em",
      duration: 0.8,
      delay: opts.delay ?? 0,
      stagger: opts.stagger ?? 0.08,
      ease: "power2.out",
    },
  );

  return split;
}
