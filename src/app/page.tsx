import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import ManifestoSection from "@/components/ManifestoSection";
import ExperiencesIntro from "@/components/ExperiencesIntro";
import HorizontalGallery from "@/components/HorizontalGallery";
import EventExperienceSection from "@/components/EventExperienceSection";
import CinematicGallery from "@/components/CinematicGallery";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import { cinematicGallery } from "@/data/gallery";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ManifestoSection />
        <ExperiencesIntro />
        <HowItWorks />
        <EventExperienceSection />
        <HorizontalGallery services={services} />
        <CinematicGallery items={cinematicGallery} />
        <Benefits />
        <TestimonialsSection />
        <FinalCTA />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
