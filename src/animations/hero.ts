import { gsap } from "@/lib/gsap";

interface HeroRefs {
  image: Element;
  title: Element;
  subtitle: Element;
  cta: Element;
  social?: Element;
}

/** Entrada cinematográfica del Hero (CLAUDE.md §9). */
export function heroEntrance({ image, title, subtitle, cta, social }: HeroRefs) {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(image, { opacity: 0, scale: 1.15 }, { opacity: 1, scale: 1, duration: 1.6 })
    .fromTo(title, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1 }, "-=1.1")
    .fromTo(subtitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
    .fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

  if (social) {
    tl.fromTo(social, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 }, "-=1.2");
  }

  return tl;
}

/** Animación ligada al scroll mientras el Hero permanece sticky. */
export function heroScrollPin({ image, title }: Pick<HeroRefs, "image" | "title">, trigger: Element) {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  })
    .to(image, { scale: 1.1, yPercent: 8, ease: "none" }, 0)
    .to(title, { yPercent: -30, ease: "none" }, 0);
}
