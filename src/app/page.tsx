import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hero } from "@/data/content";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="top" className="flex-1">
        <section className="relative flex h-screen items-end overflow-hidden bg-chica-carbon px-6 pb-16 md:px-10">
          <div className="absolute inset-0 bg-linear-to-t from-chica-carbon via-chica-carbon/40 to-transparent" />
          <div className="relative z-10 max-w-3xl">
            <h1 className="font-display text-6xl tracking-widest text-white md:text-8xl">
              {hero.title}
            </h1>
            <p className="mt-4 whitespace-pre-line text-lg text-white/80 md:text-2xl">
              {hero.subtitle}
            </p>
            <a
              href="#contacto"
              className="mt-8 inline-block rounded-full bg-chica-rose px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105"
            >
              {hero.cta}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
