"use client";

import { useState } from "react";
import { selection } from "@/data/content";
import { cn } from "@/lib/utils";
import PlaceholderMedia from "./PlaceholderMedia";

export default function SelectionSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative flex min-h-screen flex-col justify-center gap-12 bg-white px-6 py-24 text-chica-carbon md:px-10">
      <h2 className="font-display text-4xl tracking-widest md:text-6xl">
        {selection.title}
      </h2>

      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <ul className="flex flex-col">
          {selection.options.map((option, i) => (
            <li key={option.label}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full border-b border-chica-carbon/10 py-6 text-left font-display text-4xl uppercase tracking-wide transition-colors md:text-6xl",
                  active === i
                    ? "text-chica-rose"
                    : "text-chica-carbon/40 hover:text-chica-carbon",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
          {selection.options.map((option, i) => (
            <div
              key={option.label}
              className={cn(
                "absolute inset-0 h-full w-full transition-all duration-500 ease-out",
                active === i ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
            >
              <PlaceholderMedia
                src={option.image}
                alt={option.label}
                label={option.label}
                sizes="(min-width: 768px) 45vw, 100vw"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
