"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav } from "@/data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link href="#top" aria-label={nav.brand} className="shrink-0">
          <Image
            src="/images/logo/logo.png"
            alt={nav.brand}
            width={173}
            height={32}
            priority
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-wide text-chica-rose transition-colors [-webkit-text-stroke:0.5px_white] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            className="rounded-full bg-chica-rose px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105"
          >
            {nav.cta}
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white text-2xl"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-chica-carbon transition-[clip-path,opacity] duration-500 ease-out ${
          open
            ? "opacity-100 [clip-path:circle(150%_at_100%_0%)]"
            : "opacity-0 [clip-path:circle(0%_at_100%_0%)] pointer-events-none"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-bold uppercase tracking-wide text-chica-rose"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contacto"
            onClick={() => setOpen(false)}
            className="rounded-full bg-chica-rose px-8 py-3 text-lg font-semibold uppercase tracking-wide text-white"
          >
            {nav.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
