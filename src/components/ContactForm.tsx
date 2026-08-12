"use client";

import { useRef } from "react";
import { contact, contactFormServices } from "@/data/content";

function buildMessage(data: FormData) {
  const nombre = data.get("nombre")?.toString().trim() ?? "";
  const apellido = data.get("apellido")?.toString().trim() ?? "";
  const empresa = data.get("empresa")?.toString().trim();
  const telefono = data.get("telefono")?.toString().trim() ?? "";
  const servicio = data.get("servicio")?.toString().trim() ?? "";

  const lines = [
    "Hola, quiero cotizar una experiencia Chica Mia para mi evento.",
    "",
    `Nombre: ${nombre} ${apellido}`,
    empresa ? `Empresa: ${empresa}` : null,
    `Teléfono/WhatsApp: ${telefono}`,
    `Servicio de interés: ${servicio}`,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const send = (channel: "email" | "whatsapp") => {
    const form = formRef.current;
    if (!form) return;

    if (!form.reportValidity()) return;

    const message = buildMessage(new FormData(form));

    if (channel === "whatsapp") {
      const url = `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const subject = "Cotización — Chica Mia";
      const url = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = url;
    }
  };

  const inputClass =
    "w-full rounded-lg border border-chica-carbon/15 bg-white px-4 py-2.5 text-chica-carbon placeholder:text-chica-carbon/40 outline-none transition-colors focus:border-chica-rose";

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
      className="contact-fade mx-auto mt-8 grid max-w-2xl gap-4 text-left"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-1 block text-xs uppercase tracking-wide text-chica-carbon/60">
            Nombre *
          </label>
          <input id="nombre" name="nombre" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="apellido" className="mb-1 block text-xs uppercase tracking-wide text-chica-carbon/60">
            Apellido *
          </label>
          <input id="apellido" name="apellido" type="text" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="empresa" className="mb-1 block text-xs uppercase tracking-wide text-chica-carbon/60">
            Empresa (opcional)
          </label>
          <input id="empresa" name="empresa" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="telefono" className="mb-1 block text-xs uppercase tracking-wide text-chica-carbon/60">
            Teléfono / WhatsApp *
          </label>
          <input id="telefono" name="telefono" type="tel" required className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="servicio" className="mb-1 block text-xs uppercase tracking-wide text-chica-carbon/60">
          Servicio de interés *
        </label>
        <select id="servicio" name="servicio" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Selecciona un servicio
          </option>
          {contactFormServices.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => send("email")}
          className="flex-1 rounded-full border-2 border-chica-carbon px-8 py-2.5 text-sm font-semibold uppercase tracking-wide text-chica-carbon transition-transform hover:scale-105"
        >
          Enviar por correo
        </button>
        <button
          type="button"
          onClick={() => send("whatsapp")}
          className="flex-1 rounded-full bg-[#25D366] px-8 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105"
        >
          Enviar por WhatsApp
        </button>
      </div>
    </form>
  );
}
