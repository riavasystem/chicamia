import Link from "next/link";
import Image from "next/image";
import { contact, footer, nav } from "@/data/content";
import { services } from "@/data/services";
import { InstagramIcon, FacebookIcon } from "./icons";

export default function Footer() {
  const socialLinks = [
    contact.instagram && { label: "Instagram", href: contact.instagram, Icon: InstagramIcon },
    contact.facebook && { label: "Facebook", href: contact.facebook, Icon: FacebookIcon },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof InstagramIcon }[];

  return (
    <footer className="bg-chica-carbon px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo/logo.png"
              alt={footer.brand}
              width={173}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs whitespace-pre-line text-sm text-white/60">
              {footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Navegación
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link href="#top" className="text-sm text-white/60 transition-colors hover:text-chica-rose">
                  Inicio
                </Link>
              </li>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-chica-rose"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Servicios
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href="#experiencias"
                    className="text-sm text-white/60 transition-colors hover:text-chica-rose"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-white/60">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-chica-rose">
                  {contact.email}
                </a>
              )}
              {contact.whatsapp && (
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-chica-rose"
                >
                  WhatsApp
                </a>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-chica-rose hover:text-chica-rose"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {footer.brand}. Todos los derechos reservados.
          </p>
          <a
            href="https://www.riava.cl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 transition-colors hover:text-chica-rose"
          >
            Página hecha con precisión por riava.cl
          </a>
        </div>
      </div>
    </footer>
  );
}
