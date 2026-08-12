# Avances — Chica Mia

> Este documento se actualiza en cada sesión de trabajo. Léelo primero antes de retomar el proyecto: dice qué está hecho, qué falta y por dónde seguir. El detalle de reglas y especificación completa vive en `CLAUDE.md`.

## Estado actual

**Fases completadas:** 1 (Base), 2 (Motor de animación), 3 (Hero), 4 (Servicios), 5 (Galerías), 6 (Conversión), 7 (Performance). **Ya no queda ninguna sección con placeholder** — las 12 fotos reales de los 4 servicios (Toro Mecánico, Cámara 360, Reloj Derribador, Tagada Dual) se reutilizan en todas las secciones del sitio (Hero, CTA, galerías, Image Stack, selección, cómo funciona, manifiesto).
**Fase pendiente:** 8 (deploy Vercel en producción — el usuario pidió primero validar todo en localhost).

La página corre en **http://localhost:3000** (`npm run dev`). Build, lint y typecheck pasan sin errores. `robots.txt` y `sitemap.xml` se generan y responden 200.

## Hecho en esta sesión (18ª sesión — footer rediseñado a 4 columnas)

El usuario adjuntó una captura del footer de otro sitio (SDC Producciones) como **referencia de estructura/layout** — se replicó el patrón visual (4 columnas + barra de copyright), no el texto ni la identidad de esa empresa, con contenido 100% de Chica Mia.

- **`Footer.tsx`** reescrito con 4 columnas en desktop (`grid md:grid-cols-[1.3fr_1fr_1fr_1fr]`):
  1. Logo + tagline.
  2. **Navegación** — Inicio + los mismos links del navbar (`nav.links` de `content.ts`).
  3. **Servicios** — los 4 servicios (`services` de `services.ts`: Toro Mecánico, Cámara 360, Reloj Derribador, Tagada Dual), todos apuntan a `#experiencias`.
  4. **Contacto** — email y WhatsApp como texto/link, más íconos circulares de Instagram/Facebook (reutiliza `icons.tsx` de la sesión del botón flotante de WhatsApp).
  - Barra inferior con separador y copyright (`© {año} CHICA MIA. Todos los derechos reservados.`) — **sin** línea de crédito tipo "Hecho por X" (no se inventó una agencia/atribución que no se pidió).
- Verificado visualmente con navegador headless (mismo método de sesiones anteriores): capturé el footer real renderizado y confirmé que coincide con la estructura pedida.

## Hecho en la sesión anterior (17ª sesión — la sección de Contacto no cabía en pantalla)

El usuario reportó (con captura) que al hacer clic en "Contacto" del menú, los botones "Enviar por correo/WhatsApp" quedaban cortados abajo — la sección completa era más alta que el viewport típico de escritorio.

- **`ContactForm.tsx`** — reorganizado a 3 filas en vez de 4 en escritorio: Nombre/Apellido siguen en la misma fila, pero ahora **Empresa y Teléfono también comparten fila** (antes cada uno ocupaba una fila completa). Además se redujeron gaps (`gap-5`→`gap-4`) y el padding vertical de inputs/botones (`py-3`→`py-2.5`).
- **`ContactSection.tsx`** — título reducido de `text-5xl md:text-7xl` a `text-4xl md:text-6xl` (mismo tamaño que el resto de encabezados de sección tipo "GALERÍA CINEMATOGRÁFICA", más consistente), padding vertical de la sección de `py-24` a `py-14 md:py-16`, y menos margen entre el título/descripción/formulario.
- **Verificado con navegador headless** (mismo método que la sesión anterior): simulé el clic real en "Contacto" del navbar y medí que el último botón queda 100% dentro del viewport (antes se salía). Screenshot de confirmación revisado visualmente.
- Los scripts de depuración (`puppeteer-core`) se instalaron y desinstalaron solo para verificar, no quedan en el proyecto.

## Hecho en la sesión anterior (16ª sesión — bug real: el Image Stack se quedaba pegado en "Cumpleaños")

El usuario reportó (con captura) que la sección "Chica Mia en acción" solo mostraba "Cumpleaños" y no avanzaba a las demás escenas. Para diagnosticarlo sin adivinar, instalé temporalmente `puppeteer-core` (apuntando al Chrome ya instalado en el sistema, sin descargar un Chromium propio) y navegué/scrolleé la página en un navegador headless real para inspeccionar el DOM y los `transform` computados en cada escena.

**Causa raíz encontrada:** el fix del "parpadeo negro" de la sesión anterior agregó `style={{ transform: "translateY(...)" }}` directo por React en cada escena. GSAP maneja `yPercent`/`xPercent`/`scale` con su **propio caché interno de transform**, separado del `transform` que pone el navegador. Al mezclar un `transform` puesto por React con el `gsap.set(el, { yPercent: ... })` que corre después, GSAP pierde la pista del valor real de `yPercent` de esa escena — el tween de "scale/brightness" (dimming de la escena anterior) seguía funcionando porque es una propiedad distinta, pero el tween que debía deslizar la escena hacia arriba (`yPercent: 100 → 0`) dejaba de aplicarse. Resultado: la escena quedaba invisible/atascada detrás de "Cumpleaños" para siempre.

**Fix aplicado** (`src/components/ImageStack.tsx`):
- Se quitó el `style={{ transform: ... }}` de React.
- El efecto que fija la posición inicial y arma el timeline pasó de `useEffect` a **`useLayoutEffect`** (corre de forma síncrona antes de que el navegador pinte) — esto logra el mismo objetivo que el `style` manual (nunca se ve un frame sin animar) pero dejando que **GSAP sea el único dueño de `transform`** en estos elementos, sin conflicto de caché.
- Verificado con el navegador headless: ahora las 6 escenas (Cumpleaños → Matrimonios → Fiestas → Celebración familiar → Evento corporativo → Fiesta infantil) se deslizan correctamente una tras otra al hacer scroll.
- `puppeteer-core` se desinstaló al terminar (era solo para depurar, no es dependencia del proyecto).

**Lección para futuras sesiones:** si se necesita fijar el estado inicial de un elemento animado por GSAP antes del primer paint (para evitar parpadeos), usar `useLayoutEffect` + `gsap.set()` — nunca un `style`/clase CSS manual en el mismo elemento que GSAP anima con `xPercent`/`yPercent`/`scale`.

## Hecho en la sesión anterior (15ª sesión — 2 escenas nuevas en "Chica Mia en acción")

- `src/data/gallery.ts` — `eventScenes` (Image Stack de "TU EVENTO, TU ESTILO") pasó de 4 a **6 escenas**:
  1. Cumpleaños — `toro-mecanico/action-01.webp`
  2. **Matrimonios** (nueva) — `camara-360/hero.webp` (foto de novios)
  3. **Fiestas** (nueva) — `reloj-derribador/action-01.webp` (foto navideña; confirmado con el usuario, había 4 fotos `action-01` candidatas y se eligió esta)
  4. Celebración familiar — `reloj-derribador/hero.webp`
  5. Evento corporativo — `camara-360/action-01.webp`
  6. Fiesta infantil — `tagada-dual/action-01.webp`
- Sigue reutilizando las mismas 12 fotos ya subidas — ningún archivo nuevo.

## Hecho en la sesión anterior (14ª sesión — borde al menú, reorden Image Stack, fix parpadeo)

- **`Navbar.tsx`** — los links del menú de escritorio (Experiencias/Cómo funciona/Galería/Contacto) tienen ahora un borde blanco fino (`-webkit-text-stroke: 0.5px white`) además del rosa+negrita de la sesión anterior, para que no se pierdan sobre fondos de distintos colores al hacer scroll. Solo en el menú de escritorio — el menú mobile full-screen ya tiene fondo sólido oscuro detrás, no lo necesita.
- **`page.tsx`** — `<EventExperienceSection />` ("Chica Mia en acción" / "TU EVENTO, TU ESTILO") se movió de después de la Galería Horizontal a **justo después de `<HowItWorks />`** (que termina en "04 — Disfruta tu evento"). Orden actual: Hero → Manifiesto → Experiencias → Cómo funciona → **Chica Mia en acción** → Galería horizontal → Galería cinematográfica → Beneficios → CTA final → Contacto.
- **`ImageStack.tsx`** (usado por `EventExperienceSection`) — arreglado el parpadeo a negro:
  - Antes, la posición inicial de cada escena (la primera visible, el resto oculta debajo) se aplicaba solo por JavaScript (`gsap.set` dentro de un `useEffect`), dejando una fracción de segundo donde el navegador pintaba el estado "sin animar" (todas las escenas superpuestas en su posición natural) antes de que GSAP corrigiera — eso se veía como un parpadeo.
  - Ahora esa posición inicial se aplica directo por `style` en el primer render (server + cliente), así nunca hay un frame "incorrecto" que mostrar.
  - Se agregó `priority` a las fotos del Image Stack (son solo 4, ~250-300KB c/u) para que carguen de inmediato en vez de esperar a que el scroll las acerque al viewport — evita el hueco negro por carga tardía.
  - Se agregó `bg-chica-carbon` explícito al contenedor sticky (antes heredaba el fondo, ahora está garantizado).

## Hecho en la sesión anterior (13ª sesión — se quitó "¿QUÉ ESTÁS BUSCANDO?")

- `src/app/page.tsx` — se quitó `<SelectionSection />` (la sección "¿QUÉ ESTÁS BUSCANDO?" con las 4 opciones DIVERSIÓN/ADRENALINA/RECUERDOS/EXPERIENCIA).
- **Orden actual:** Hero → Manifiesto → Experiencias → Cómo funciona → Galería horizontal → Image Stack de eventos → Galería cinematográfica → Beneficios → CTA final → Contacto → Footer.
- `src/components/SelectionSection.tsx` y el export `selection` en `data/content.ts` **no se borraron**, solo se dejaron de usar — mismo criterio que con `StorySection` (fácil de traer de vuelta si se quiere más adelante).

## Hecho en la sesión anterior (12ª sesión — bug del efecto "split" + menú en rosa)

- **Bug corregido:** en la Galería Cinematográfica, el ítem con efecto `split` (dos paneles de color que deberían abrirse para revelar la foto) se quedaba con los paneles morado/rosa cubriendo la imagen para siempre — se veía como un bloque de colores sólidos partido a la mitad, sin foto ni texto. Causa: `splitIn()` (en `animations/reveal.ts`) estaba pensada para paneles que entran desde afuera hacia el centro, pero `CinematicGallery.tsx` la usaba al revés (paneles que ya cubren la foto y deberían salir hacia los lados) — la dirección de la animación no coincidía con el estado inicial real de los paneles.
  - Se agregó `splitReveal()` (nueva función en `animations/reveal.ts`): los paneles arrancan cubriendo (su posición natural en el HTML, sin transform) y se deslizan hacia afuera al hacer scroll. Así, si por algún motivo el scroll-trigger no llega a disparar, el peor caso es que la foto quede cubierta — nunca un estado roto a medio animar.
  - `CinematicGallery.tsx` actualizado para usar `splitReveal` en vez de `splitIn`.
  - `splitIn()` se dejó intacta (sigue sirviendo para paneles que se "encuentran" desde los bordes, su uso original).
- **Menú principal** (`Navbar.tsx`) — los links "Experiencias / Cómo funciona / Galería / Contacto" ahora van en **rosa (`text-chica-rose`) y negrita**, tanto en el menú de escritorio como en el menú full-screen de mobile (antes eran blancos semi-transparentes, texto normal).

## Hecho en la sesión anterior (11ª sesión — se quitaron las 4 escenas grandes de servicio)

El usuario pidió eliminar las 4 escenas full-screen de servicio (`01 Toro Mecánico — ¿Quién logra mantenerse?`, `02 Cámara 360 — Captura cada momento...`, `03 Reloj Derribador — El juego inflable...`, `04 Tagada Dual — ¿Quién aguanta más tiempo arriba?`) y subir "Cómo funciona" a ese lugar.

- `src/app/page.tsx` — se quitó el `services.map(...)` que renderizaba `<StorySection />` por cada servicio; `<HowItWorks />` se movió justo después de `<ExperiencesIntro />` (antes iba después de la galería cinematográfica, casi al final).
- **Orden actual de la página:** Preloader → Navbar → Hero → Manifiesto → Experiencias (lista 01-04) → **Cómo funciona** → Galería horizontal → Image Stack de eventos → Selección → Galería cinematográfica → Beneficios → CTA final → Contacto → Footer.
- `src/components/StorySection.tsx` y sus animaciones (`animations/reveal.ts`, `zoom.ts`, `parallax.ts`) **no se borraron**, solo se dejó de usar en `page.tsx` — si más adelante se quiere traer de vuelta alguna escena grande por servicio, el componente sigue ahí y funciona igual.
- **Nota importante:** esto se aparta del criterio de aceptación original del CLAUDE.md §66 ("cada servicio tiene una escena diferenciada") — fue una decisión explícita del usuario en esta sesión, no un descuido. Las 12 fotos de servicio se siguen viendo en el resto del sitio (galerías, Image Stack, selección, cómo funciona), solo se quitaron las escenas dedicadas de scroll grande por servicio.

## Hecho en la sesión anterior (10ª sesión — una sola fuente de imágenes en todo el sitio)

El usuario confirmó que las 12 fotos ya subidas son todas las que hay por ahora, y pidió cerrar los huecos restantes **sin duplicar archivos** (reutilizar las mismas 12 fotos como única fuente) y que la galería mostrara las fotos de los 4 servicios en vez de los placeholders "Evento Chica Mia" / "Diversión asegurada".

- **`src/data/gallery.ts`**:
  - `cinematicGallery` (8 efectos: rise/clip/zoom/horizontal/parallax/split/float/depth) — antes apuntaba a `galeria/galeria-01..08.webp` (inexistentes); ahora cada efecto usa una foto real distinta de los 4 servicios.
  - `horizontalGallery` — eliminadas las 2 entradas de `eventos/` ("Evento Chica Mia", "Diversión asegurada"); **ahora muestra las 12 fotos** (hero + action-01 + action-02 de cada uno de los 4 servicios).
  - `eventScenes` (Image Stack "experiencia de evento") — antes `eventos/evento-01..04.webp` (inexistentes); ahora usa 4 fotos reales, una por servicio, mapeadas por contexto (Cumpleaños → toro, Celebración familiar → reloj derribador, Evento corporativo → cámara 360, Fiesta infantil → tagada dual).
- **`src/data/content.ts`**:
  - `hero.image` (poster del Hero principal) → `toro-mecanico/hero.webp` (antes `hero/hero.webp`, inexistente).
  - `finalCta.image` → `camara-360/hero.webp` (antes `cta/cta.webp`, inexistente).
  - `selection.options` "DIVERSIÓN" → `tagada-dual/action-01.webp` (antes `eventos/evento-01.webp`, inexistente) — de paso, la sección "¿Qué estás buscando?" ahora incluye las 4 experiencias, no solo 3.
  - `howItWorks` (las 4 fotos de "Cómo funciona") → repuntadas a fotos reales no usadas todavía en otras secciones (`camara-360/action-02`, `reloj-derribador/action-01`, `tagada-dual/action-02`, `toro-mecanico/action-02`), reemplazando rutas `detail.webp` / `eventos/evento-04.webp` que nunca existieron.
- **`ManifestoSection.tsx`** — el fondo (antes `eventos/evento-03.webp`, inexistente) ahora usa `reloj-derribador/action-02.webp`.
- **Resultado**: ya no hay ninguna referencia rota a imágenes faltantes en todo `src/` (verificado con grep). Cada una de las 12 fotos se referencia por su única ruta desde varias secciones — no se copió ningún archivo nuevo.
- `public/images/README.md` reescrito para reflejar el estado real: qué carpetas están en uso y qué secciones quedan pendientes de una foto dedicada (opcional, no bloqueante) si en el futuro llegan más fotos.

## Hecho en la sesión anterior (9ª sesión — fotos reales de los 4 servicios)

- El usuario subió 3 fotos por servicio (12 en total, JPEG ~2.7-3MB cada una) en `toro-mecanico/`, `camara-360/`, `reloj-derribador/` y `tagada-dual/`, con nombres descriptivos (`toro_mujer.jpeg`, `360_novios.jpeg`, etc.) que no coincidían con los nombres que el sitio espera.
- Revisé cada foto (contenido, encuadre, energía) y elegí la mejor como **hero** (escena principal de scroll) y las otras dos como **action-01 / action-02**:
  - **Toro Mecánico**: hero = mujer con sombrero en feria; action-01 = cumpleaños; action-02 = evento corporativo.
  - **Cámara 360**: hero = novios en salón elegante (mejor calce con "más elegante y tecnológica" del CLAUDE.md §13); action-01 = evento corporativo con luces RGB; action-02 = cumpleaños de amigas.
  - **Reloj Derribador**: hero = Fiestas Patrias al aire libre (identidad chilena fuerte); action-01 = Navidad; action-02 = plaza con niños.
  - **Tagada Dual**: hero = pareja riendo en el juego real (foto auténtica, no generada); action-01 = niños en piscina; action-02 = niñas jugando (foto auténtica).
- Cada foto se redujo de ~2.8MB a ~2000px de ancho y se convirtió a **WebP calidad 80** (`Pillow`/`numpy`, mismo enfoque que se usó con el logo) — de **~34MB → ~3.1MB en total** (91% menos), y se renombraron a `hero.webp` / `action-01.webp` / `action-02.webp` en cada carpeta.
- **Truco clave**: como `services.ts` ya apuntaba a `hero.webp` y `SelectionSection` (sección "¿Qué estás buscando?") ya apuntaba a `action-01.webp` para Toro/Cámara 360/Reloj Derribador, **no hubo que tocar ningún componente** — las fotos aparecen solas en cuanto quedaron con el nombre correcto (es el sistema que se diseñó desde la Fase 1).
- Los 12 JPEG originales quedaron de respaldo en el scratchpad de la sesión (`originales_fotos/`), no están en el repo. Se limpiaron los `.DS_Store` sueltos en `public/images/`.

**Pendiente:** todavía usan placeholder el Hero principal del sitio (`hero/hero.webp`), el CTA final (`cta/cta.webp`), la galería cinematográfica (`galeria/galeria-01..08.webp`) y el Image Stack de eventos (`eventos/evento-01..04.webp`) — son fotos distintas a las de servicio, avisar cuando estén.

## Hecho en la sesión anterior (8ª sesión — 4ª experiencia: Tagada Dual)

- Nuevo servicio agregado a `src/data/services.ts`: `04 — Tagada Dual` (id `tagada-dual`), efecto `zoom` (no se repite ningún efecto más de 2 veces seguidas, regla CLAUDE.md §42: rise → clip → horizontal → zoom).
- `StorySection.tsx` — se extendió el switch de efectos para soportar `zoom` (antes solo manejaba rise/clip/horizontal); reutiliza `animations/zoom.ts` ya existente. La escena `04` aparece automáticamente en `page.tsx` porque este itera sobre el array `services` — no hubo que tocar el ensamblado de la página.
- `ExperiencesIntro` (lista 01/02/03) también se actualiza sola por el mismo motivo (itera sobre `services`).
- `src/data/gallery.ts` — se agregó `Tagada Dual` a `horizontalGallery` para que la "Galería de experiencias" muestre las 4.
- Carpetas de medios creadas: `public/images/tagada-dual/` y `public/videos/tagada-dual/` (mismo patrón que las otras 3: `hero.webp`, `action-01.webp`, `action-02.webp`, `event-01.webp`, `detail.webp`), documentadas en los `README.md` de `public/images/` y `public/videos/`.
- Mientras no haya fotos reales, se ve con el placeholder de marca igual que el resto (componente `PlaceholderMedia`).

**Pendiente:** el usuario puede definir si "Tagada Dual" debe aparecer también en `contactFormServices` (el selector del formulario de contacto) — hoy esa lista sigue siendo la original (Toro Mecánico, Tarima Foto 360, Reloj Demoledor, Base Tagada, Paquete Mix) y no se tocó porque no fue parte de este pedido.

## Hecho en la sesión anterior (7ª sesión — video del Hero actualizado y recomprimido)

- El usuario reemplazó `public/videos/hero/video_hero.mp4` por una versión nueva (1280×720, 30fps, 28s, sin audio, 16.1MB).
- Se probaron varias combinaciones de compresión con `ffmpeg` (CRF 23/24/26, con y sin reducir resolución) comparando tamaño resultante y una verificación visual frame-a-frame contra el original.
- Se eligió **CRF 26, preset `slower`, resolución nativa 1280×720 sin recortar**, por dar la mejor relación calidad/peso: **16.1MB → 10.1MB (~37% menos)**, sin pérdida de calidad visible a simple vista (se comparó un frame a los 5s entre original y comprimido, prácticamente idénticos).
- Se eliminó también un `.DS_Store` que había quedado en `public/videos/hero/`.
- El original (16.1MB) quedó de respaldo en el scratchpad de la sesión (`video_hero_ORIGINAL_16MB_v2.mp4`), no está en el repo.

## Hecho en la sesión anterior (6ª sesión — formulario de contacto)

- `contact.email` completado: `flavia.calderon@chicamia.cl` (antes vacío).
- `contactFormServices` agregado a `data/content.ts` — lista de servicios para el selector del formulario: Toro Mecánico, Tarima Foto 360, Reloj Demoledor, Base Tagada (confirmado con el usuario, no es typo), Paquete Mix. **Es una lista independiente del catálogo `services` que usa el resto del sitio** — no reemplaza ni afecta las escenas de Toro Mecánico / Cámara 360 / Reloj Derribador.
- `src/components/ContactForm.tsx` (nuevo) — formulario sin backend (CLAUDE.md §23):
  - Campos: Nombre*, Apellido*, Empresa (opcional), Teléfono/WhatsApp*, Servicio de interés* (select).
  - Validación nativa del navegador (`required` + `form.reportValidity()`) antes de poder enviar.
  - Dos botones al final: **"Enviar por correo"** (abre `mailto:flavia.calderon@chicamia.cl` con asunto y cuerpo prellenados con los datos del formulario) y **"Enviar por WhatsApp"** (abre `wa.me/56929954196` con el mismo detalle como mensaje prellenado, en pestaña nueva). Cualquiera de los dos envía el detalle completo del formulario — no hay servidor de por medio.
- Integrado dentro de `ContactSection.tsx`, debajo de los botones rápidos de contacto existentes (WhatsApp/Instagram/Facebook/Email). También se agregó el link de Facebook a esos botones rápidos (antes faltaba, ya estaba configurado desde una sesión anterior).

## Hecho en la sesión anterior (2ª sesión — Fase 7 parcial)

- `src/app/robots.ts` y `src/app/sitemap.ts` (metadata routes de Next.js) — faltaban del §47 del CLAUDE.md.
- `siteConfig.url` centralizado en `data/content.ts`, reusado en `metadataBase`, `robots.ts` y `sitemap.ts` (antes estaba hardcodeado solo en `layout.tsx`). **Actualizar este valor cuando se confirme el dominio final en Vercel.**
- `animations/parallax.ts` — `parallaxY()` ahora reduce automáticamente la velocidad a 40% en viewports <768px (CLAUDE.md §28/§34, "en móviles reducir el movimiento"). Afecta a todos los usos existentes (StorySection, CinematicGallery) sin tocar cada componente.
- `sizes` de `next/image` afinado (antes todo pedía `100vw` sin importar cuánto ocupaba realmente en pantalla):
  - `HorizontalGallery`: `(min-width: 768px) 38vw, 60vw`
  - `SelectionSection`: `(min-width: 768px) 45vw, 100vw`
  - `HowItWorks`: `(min-width: 768px) 45vw, 100vw`

## Hecho en esta sesión (3ª sesión — botón WhatsApp + redes en Hero)

- `contact.whatsapp` en `data/content.ts` completado con el número real: `https://wa.me/56929954196`.
- `contact.facebook` agregado al objeto `contact` (antes solo existía `instagram`). **Ambos, `instagram` y `facebook`, siguen vacíos ("") — el usuario pidió dejarlos pendientes**; hoy los íconos del Hero enlazan a `#` como fallback hasta que se completen esos valores.
- `src/components/icons.tsx` — íconos SVG inline de WhatsApp/Instagram/Facebook (sin librería externa, cumple CLAUDE.md §36 "no cargar librerías innecesarias").
- `src/components/WhatsAppFloatButton.tsx` — botón flotante fijo (`bottom-right`, verde WhatsApp oficial `#25D366`), entrada con `back.out` tras el resto del Hero, renderizado globalmente en `layout.tsx` (visible en toda la página, no solo el Hero). Se auto-oculta si `contact.whatsapp` está vacío.
- `Hero.tsx` — íconos de Instagram y Facebook agregados arriba a la derecha, animados junto con el resto de la entrada cinematográfica del Hero (`animations/hero.ts` ahora acepta un `social` opcional en `heroEntrance`).

**Pendiente:** ~~cuando el usuario tenga las URLs/@usuario reales de Instagram y Facebook~~ → **completado**: `contact.instagram` = `https://www.instagram.com/chicamia.juegosimflables?utm_source=qr`, `contact.facebook` = `https://www.facebook.com/share/19E58pRVyx/?mibextid=wwXIfr`.

## Hecho en esta sesión (4ª sesión — video del Hero conectado)

- El usuario subió `public/videos/hero/video_hero.mp4` (16MB — pesado, ver nota de performance abajo).
- `hero.video` agregado a `data/content.ts` con esa ruta.
- `Hero.tsx` reestructurado: `PlaceholderMedia` (imagen) y `<video>` ahora viven dentro de un mismo contenedor (`mediaRef`) para que la animación de entrada/scroll (`animations/hero.ts`) escale y anime ambos juntos, en vez de solo la imagen.
- El video **solo se activa en desktop/tablet (`min-width: 768px`) y si NO hay `prefers-reduced-motion`** — en mobile se sigue mostrando la imagen estática para cuidar datos/batería (CLAUDE.md §36/§38). Usa `useSyncExternalStore` para leer `matchMedia` sin causar mismatch de hidratación (SSR siempre asume "sin video", el cliente resuelve el valor real al montar).
- Si el archivo de video fallara en cargar (`onError`), se oculta solo y queda la imagen de fondo — no rompe la escena.
- `autoPlay muted loop playsInline`, con `poster={hero.image}` como respaldo mientras carga.

**Compresión de video (resuelta):** `public/videos/hero/video_hero.mp4` se comprimió con `ffmpeg` (H.264, CRF 32, 1080px de ancho, 25fps, sin audio, `+faststart`) de **16.7MB → 3.5MB** (79% menos), misma duración (29s), sin recortar contenido. El archivo original queda de respaldo en el scratchpad de esta sesión (`video_hero_ORIGINAL_16MB.mp4`) por si se necesita volver a comprimir con otros parámetros — no está en el repo.

## Hecho en esta sesión (5ª sesión — logo limpiado y conectado)

- El usuario subió `public/images/logo/logochicamia.png` (507×94px, con fondo negro sólido, calidad pobre a cualquier tamaño mayor).
- Se limpió con Python/Pillow (no había ImageMagick disponible, se usó `numpy`+`PIL`): fondo removido por distancia de color al negro de fondo detectado (`rgb(31,29,28)`) con transición suave para conservar el antialiasing original de las letras (no es un recorte duro), recortado el margen sobrante, y reescalado 3x con Lanczos (507×94 → 1521×282) para que se vea nítido en pantallas retina/HiDPI.
- **Importante:** el upscale no "inventa" detalle que no existía en el original — solo evita que se vea peor al reescalarlo el navegador. La mejora real (nitidez de verdad) requiere que el usuario consiga una fuente en mayor resolución o vectorial (SVG/AI/EPS) de quien diseñó el logo.
- Archivo final: `public/images/logo/logo.png` (PNG con transparencia). El original con fondo negro quedó de respaldo en el scratchpad de la sesión (`logochicamia_ORIGINAL.png`), no está en el repo.
- Conectado en `Navbar.tsx` (reemplaza el texto "CHICA MIA", `priority` porque está above-the-fold) y `Footer.tsx` (reemplaza el texto del brand). Se ve bien tanto sobre fondo oscuro como claro gracias a la transparencia.
- De paso, `Footer.tsx` ahora también muestra el link de Facebook (antes solo tenía WhatsApp/Instagram/Email — Facebook ya está configurado en `contact.facebook` desde la sesión anterior).

**Pendiente si el usuario consigue mejor fuente:** reemplazar `public/images/logo/logo.png` por una versión de mayor resolución o `.svg` — el componente no necesita cambios, solo el archivo.

## Hecho en la sesión anterior (Fases 2–6)

### Motor de animación (Fase 2)
- `src/lib/gsap.ts` — instancia única de GSAP con `ScrollTrigger` y `SplitText` registrados (client-only guard).
- `src/lib/reduced-motion.ts` — helper `prefersReducedMotion()` + breakpoints para `gsap.matchMedia()`.
- `src/components/SmoothScrollProvider.tsx` — Lenis sincronizado con `gsap.ticker` + `ScrollTrigger.update`; **se desactiva por completo si `prefers-reduced-motion: reduce`** (scroll nativo).
- `src/animations/*.ts` completos, los 8 archivos que pide el CLAUDE.md: `hero.ts`, `reveal.ts` (rise/clip/horizontal/fade/float/split/depth), `stack.ts` (Image Stack), `horizontal.ts` (galería horizontal pinned), `parallax.ts`, `typography.ts` (SplitText por líneas/palabras), `zoom.ts`, `transitions.ts` (push).

### Componente clave: `PlaceholderMedia`
- `src/components/PlaceholderMedia.tsx` — envuelve `next/image`; si el archivo real no existe (404), degrada automáticamente a un placeholder con gradiente de marca + label "imagen referencial". **En cuanto se suba el archivo real a la ruta exacta, se muestra solo — no hay que tocar componentes.**

### Estructura de medios (para imágenes/videos reales)
- `public/images/{hero,toro-mecanico,camara-360,reloj-derribador,eventos,galeria,cta}/` con `.gitkeep` y `public/images/README.md` documentando el nombre exacto de cada archivo esperado.
- `public/videos/{hero,toro-mecanico,camara-360,reloj-derribador}/` con `.gitkeep` y `public/videos/README.md` (ningún componente carga video todavía).
- `src/data/services.ts` y `gallery.ts` actualizados para apuntar a esas rutas (`heroImage`, `actionImages[]`, `eventImage` por servicio).

### Secciones construidas (todas con animación GSAP + ScrollTrigger, ver mapeo completo abajo)
1. `Preloader.tsx` — "CHICA MIA" con SplitText-like stagger, clip-path exit; salta directo a `null` si `prefers-reduced-motion`.
2. `Hero.tsx` — zoom+parallax de entrada, pin de scroll (imagen escala y sube, texto sube más rápido), `ScrollIndicator.tsx` que se desvanece al primer scroll.
3. `ManifestoSection.tsx` — líneas del manifiesto con stagger + foto de fondo subiendo.
4. `ExperiencesIntro.tsx` — "NUESTRAS EXPERIENCIAS" + lista 01/02/03.
5. `StorySection.tsx` (reutilizable) × 3 — Toro Mecánico (`rise`), Cámara 360 (`clip` + rotate leve), Reloj Derribador (`horizontal` + decoración lúdica `story-decor`). Todas con parallax interno y salida `push` (scale/brightness/translateY) hacia la siguiente escena.
6. `HorizontalGallery.tsx` — scroll vertical → desplazamiento horizontal pinned (`buildHorizontalScroll`), `data-cursor="ARRASTRA"` para el cursor custom.
7. `EventExperienceSection.tsx` + `ImageStack.tsx` — sistema Image Stack reutilizable (`<ImageStack scenes={...} />`), sticky + scrub, cada escena empuja/atenúa a la anterior.
8. `SelectionSection.tsx` — "¿QUÉ ESTÁS BUSCANDO?", hover en desktop / tap en mobile (estado React + transición CSS, sin GSAP).
9. `CinematicGallery.tsx` — 8 imágenes, **los 8 efectos distintos** (rise, clip, zoom, horizontal, parallax, split, float, depth) sin repetir más de 2 seguidos.
10. `HowItWorks.tsx` — 4 pasos, narrativa vertical alternada, cada uno con su propio efecto (rise/horizontal/clip/zoom).
11. `Benefits.tsx` + `Counter.tsx` — 4 beneficios con contador animado + fade.
12. `FinalCTA.tsx` — zoom+brightness de fondo, título con SplitText por líneas, CTA con delay.
13. `ContactSection.tsx` — reveal (clip-path) + fade; renderiza botones de WhatsApp/Instagram/email **solo si están configurados** en `data/content.ts` (hoy están vacíos → muestra nota para completarlos).
14. `Footer.tsx` — ya existía, ajustado para no duplicar `id="contacto"` (ahora vive en `ContactSection`).

### Extras (§30, §32, §33 del CLAUDE.md)
- `ScrollProgress.tsx` — barra vertical fija del progreso de scroll (solo desktop).
- `CustomCursor.tsx` — cursor discreto solo en `(hover: hover) and (pointer: fine)`, muestra label desde `data-cursor` (hoy solo en la galería horizontal, "ARRASTRA").

### `page.tsx` y `layout.tsx`
- `page.tsx` ensambla **todas** las secciones en el orden exacto del CLAUDE.md §61.
- `layout.tsx` envuelve todo en `SmoothScrollProvider`, agrega `CustomCursor` y `ScrollProgress` globalmente.

### Fix de una función automática de Next.js 16
- `next dev` tiene una función nueva que auto-genera/anexa reglas de agente a `CLAUDE.md` ("Generated CLAUDE.md for AI agents"). Se desactivó con `agentRules: false` en `next.config.ts` — **no tocar ese flag**, si se quita volverá a anexar contenido no deseado a nuestro `CLAUDE.md` cada vez que corra `next dev`.

## Pendiente inmediato (siguiente sesión)

1. **Revisar visualmente en el navegador** (`npm run dev` → http://localhost:3000) — el usuario todavía no ha dado el visto bueno final antes de pasar a Vercel.
2. Cargar imágenes/videos reales en las rutas documentadas en `public/images/README.md` y `public/videos/README.md` — los placeholders se reemplazan solos, sin tocar componentes.
3. Completar `contact.whatsapp`, `instagram`, `email`, `phone` en `src/data/content.ts` (no inventar valores).
4. Cuando el usuario confirme que todo se ve bien en local: hacer push a `git@github.com:riavasystem/chicamia.git` y conectar el proyecto en Vercel (el usuario está creándolo). **No hacer push sin confirmación explícita** (ver sesión anterior).
5. Confirmar el dominio final una vez creado el proyecto en Vercel y actualizar `siteConfig.url` en `data/content.ts` si no queda como `chicamia.vercel.app`.
6. Fase 7 restante (requiere fotos reales puestas): medir peso real de imágenes, verificar LCP del Hero con Lighthouse/DevTools, y test manual en un dispositivo móvil real.

## Decisiones tomadas en esta sesión

- **Placeholders en vez de fotos de stock**: en lugar de usar fotos reales de internet (no autorizadas, no serían de Chica Mia), se optó por un componente `PlaceholderMedia` que degrada a un gradiente de marca cuando el archivo no existe. Esto cumple "coloca imágenes referenciales" sin inventar contenido visual que aparente ser real.
- **Image Stack sin `pin` de GSAP**: se usa `position: sticky` en CSS para el contenedor pinneado (en vez de `ScrollTrigger.pin`), y GSAP solo controla el scrub de las escenas apiladas — más simple y sin conflictos con el pin-spacer de ScrollTrigger.
- **"Split" y "Depth" en la galería cinematográfica** se resolvieron reutilizando la misma imagen (dos capas/paneles) ya que no hay pares de fotos específicos para esos efectos — válido como interpretación visual, no requiere assets adicionales.
- **Cursor personalizado**: implementado pero minimalista (solo un `data-cursor="ARRASTRA"` en la galería horizontal por ahora). Se puede extender agregando `data-cursor="VER"` a otros elementos si se quiere más adelante.

## Próximas fases (roadmap original, para referencia)

- **Fase 7 — Performance:** SEO técnico (robots/sitemap), reducción de movimiento en mobile y `sizes` de imágenes ya hechos. Falta lo que solo se puede medir con fotos reales puestas (peso, LCP, test en dispositivo real).
- **Fase 8 — CI/CD:** `ci.yml` ya existe y corre install→lint→typecheck→build; falta el primer deploy a Vercel (pendiente de aprobación del usuario para pasar a producción).

## Notas / cuidado

- El scaffold inicial de `create-next-app` sobrescribió el `CLAUDE.md` original una vez; se restauró completo. Next.js 16 también intenta anexar contenido a `CLAUDE.md` en cada `next dev` — **ya desactivado** (`agentRules: false` en `next.config.ts`), no revertir ese cambio.
- El nombre del paquete en `package.json` es `"chicamia"` (el nombre de carpeta "Chica mia" con espacio/mayúsculas no es válido para npm).
- Lenis se instaló como paquete `lenis` (no `@studio-freight/lenis`, que está deprecado).
- Aún no hay push a GitHub — el primer commit de Fase 1 quedó local. Todo el trabajo de esta sesión (Fases 2–6) todavía no está commiteado; hacerlo en la próxima sesión cuando el usuario confirme el contenido.
