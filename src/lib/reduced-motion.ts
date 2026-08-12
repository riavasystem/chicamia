export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Breakpoints usados por gsap.matchMedia() para adaptar animaciones (CLAUDE.md §34). */
export const breakpoints = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
  motionOk: "(prefers-reduced-motion: no-preference)",
  motionReduced: REDUCED_MOTION_QUERY,
};
