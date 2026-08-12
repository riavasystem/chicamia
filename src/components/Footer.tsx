import Link from "next/link";
import { contact, footer } from "@/data/content";

export default function Footer() {
  const links = [
    contact.whatsapp && { label: "WhatsApp", href: contact.whatsapp },
    contact.instagram && { label: "Instagram", href: contact.instagram },
    contact.email && { label: "Email", href: `mailto:${contact.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer id="contacto" className="bg-chica-carbon px-6 md:px-10 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-4xl tracking-widest text-white">
          {footer.brand}
        </h2>
        <p className="mt-4 whitespace-pre-line text-white/70">
          {footer.tagline}
        </p>

        {links.length > 0 && (
          <nav className="mt-8 flex justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-wide text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <p className="mt-12 text-xs text-white/40">
          © {new Date().getFullYear()} Chica Mia
        </p>
      </div>
    </footer>
  );
}
