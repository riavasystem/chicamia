import { eventScenes } from "@/data/gallery";
import ImageStack from "./ImageStack";

export default function EventExperienceSection() {
  return (
    <section className="relative bg-chica-carbon">
      <div className="px-6 py-16 text-center md:px-10">
        <p className="text-sm uppercase tracking-[0.4em] text-chica-magenta">
          Chica Mia en acción
        </p>
        <h2 className="font-display text-4xl tracking-widest text-white md:text-6xl">
          TU EVENTO, TU ESTILO
        </h2>
      </div>
      <ImageStack scenes={eventScenes} />
    </section>
  );
}
