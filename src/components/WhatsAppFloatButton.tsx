"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { contact } from "@/data/content";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloatButton() {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.6, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 1.4, ease: "back.out(1.7)" },
      );
    });

    return () => ctx.revert();
  }, []);

  if (!contact.whatsapp) return null;

  return (
    <a
      ref={ref}
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110 md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
