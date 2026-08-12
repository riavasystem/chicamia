# Avances — Chica Mia

> Este documento se actualiza en cada sesión de trabajo. Léelo primero antes de retomar el proyecto: dice qué está hecho, qué falta y por dónde seguir. El detalle de reglas y especificación completa vive en `CLAUDE.md`.

## Estado actual

**Fase completada:** Fase 1 — Base (parcial, ver pendientes)

## Hecho

- Proyecto Next.js 16 + React 19 + TypeScript scaffoldeado con Tailwind CSS v4, ESLint y App Router (`src/` dir, alias `@/*`).
- Dependencias de animación instaladas: `gsap` y `lenis` (aún no integradas — eso es Fase 2).
- Estructura de carpetas creada según CLAUDE.md: `src/components`, `src/animations` (vacía, pendiente Fase 2), `src/data`, `src/lib`, `public/images`.
- Contenido centralizado:
  - `src/data/content.ts` — config del sitio, contacto (WhatsApp/Instagram/email vacíos, pendientes de datos reales), nav, hero, manifiesto, how-it-works, beneficios, CTA final, footer.
  - `src/data/services.ts` — los 3 servicios (Toro Mecánico, Cámara 360, Reloj Derribador) con `SceneEffect` tipado.
  - `src/data/gallery.ts` — galería cinematográfica (8 imágenes, efectos variados sin repetir más de 2 seguidos) y galería horizontal.
- `src/lib/utils.ts` — helper `cn()` mínimo.
- `Navbar.tsx` — fija, desktop con links + CTA, menú mobile full-screen con clip-path.
- `Footer.tsx` — usa `contact` y `footer` de content.ts, oculta links vacíos.
- `layout.tsx` — metadata SEO (title, description, OpenGraph, Twitter, robots), fuentes `Inter` (texto) + `Bebas Neue` (display/editorial), `prefers-reduced-motion` respetado en `globals.css`.
- `globals.css` — paleta de marca (rosa, magenta, morado, coral, carbón) como CSS vars/`@theme`, regla global de `prefers-reduced-motion`.
- `page.tsx` — Hero **placeholder estático** (sin animación todavía) usando Navbar + Footer, para tener algo visible y validar el build.
- `.github/workflows/ci.yml` — CI simple: install → lint → typecheck → build (push/PR a `main`).
- Build, lint y typecheck verificados en local: **pasan sin errores**.
- Git inicializado localmente, remoto `origin` apuntando a `git@github.com:riavasystem/chicamia.git` (**aún no hay commits ni push**).

## Pendiente inmediato (siguiente sesión)

1. Hacer el primer commit y push a `main` (branch, `.gitignore` ya está listo — confirmar con el usuario antes de hacer push).
2. Confirmar en Vercel el import del repo `riavasystem/chicamia` (el usuario está creándolo) y verificar el primer deploy.
3. Cargar imágenes reales en `public/images/` (hero, toro-mecanico, camara-360, reloj-derribador, gallery-01..08, cta) — actualmente los `data/*.ts` referencian rutas que no existen todavía.
4. Completar datos reales de contacto en `src/data/content.ts` (`contact.whatsapp`, `instagram`, `email`, `phone`) — **no inventar números/redes**, pedirlos al usuario.

## Próximas fases (orden del CLAUDE.md, sección 65)

- **Fase 2 — Motor de animación:** integrar GSAP + ScrollTrigger + Lenis en `src/animations/*.ts`, respetar `prefers-reduced-motion`, crear sistema de efectos reutilizable (rise, reveal, zoom, parallax, horizontal, split, float, depth, clip, stack, push, fade, scale, rotate, blur, brightness).
- **Fase 3 — Hero:** Preloader real (animación "CHICA MIA"), Hero cinematográfico con SplitText + parallax + scroll sticky (reemplaza el placeholder actual de `page.tsx`).
- **Fase 4 — Servicios:** `ImageReveal`, `ImageStack`, `StorySection`, escenas de Toro Mecánico (rise), Cámara 360 (clip+zoom+rotate), Reloj Derribador (horizontal+push).
- **Fase 5 — Galerías:** `HorizontalGallery` (pinned, ScrollTrigger), galería cinematográfica con efectos variados, Image Stack de "experiencia de evento".
- **Fase 6 — Conversión:** sección "Cómo funciona", Beneficios (con Counter), CTA final, sección de contacto con WhatsApp.
- **Fase 7 — Performance:** optimización de imágenes (`next/image`, WebP/AVIF), lazy loading, ajuste mobile, accesibilidad, reduced motion en todas las escenas.
- **Fase 8 — CI/CD:** ya iniciado (`ci.yml`), falta verificar deploy Vercel end-to-end.

## Decisiones tomadas

- Tipografía: `Inter` para texto de cuerpo, `Bebas Neue` (Google Fonts) para títulos editoriales/display — cumple "bold, grande, editorial, geométrico" del CLAUDE.md §29.
- Paleta: rosa `#ff2f7e`, magenta `#d6178f`, morado `#6b1fb3`, coral `#ff6f5e`, sobre fondo carbón `#0a0a0a` — definida como tokens Tailwind (`chica-rose`, `chica-magenta`, `chica-purple`, `chica-coral`, `chica-carbon`) en `globals.css`.
- Lenis se instaló como paquete `lenis` (no `@studio-freight/lenis`, que está deprecado/renombrado).
- No se implementa backend ni formulario propio — contacto vía enlaces externos (WhatsApp/Instagram/email) configurados en `data/content.ts`.

## Notas / cuidado

- El scaffold inicial de `create-next-app` sobrescribió el `CLAUDE.md` original una vez (generó uno propio de 1 línea apuntando a `AGENTS.md`). Se restauró el contenido completo. **Si se vuelve a correr un scaffold o generador en la raíz del proyecto, verificar que no pise `CLAUDE.md` ni `avances.md`.**
- El nombre del paquete en `package.json` es `"chicamia"` (el nombre de carpeta "Chica mia" con espacio/mayúsculas no es válido para npm).
