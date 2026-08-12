# Imágenes — Chica Mia

## Estado actual: fotos reales de los 4 servicios

```
public/images/
├── logo/
│   └── logo.png                  # Logo de Chica Mia (ideal: reemplazar por logo.svg si aparece versión vectorial)
│
├── toro-mecanico/
│   ├── hero.webp                 # EN USO — escena 01 (StorySection)
│   ├── action-01.webp            # EN USO — Selección, Galería, Image Stack, Cómo funciona
│   └── action-02.webp            # EN USO — Galería, Cómo funciona
│
├── camara-360/
│   ├── hero.webp                 # EN USO — escena 02, CTA final
│   ├── action-01.webp            # EN USO — Selección, Galería, Image Stack
│   └── action-02.webp            # EN USO — Galería, Cómo funciona
│
├── reloj-derribador/
│   ├── hero.webp                 # EN USO — escena 03, Image Stack, Galería
│   ├── action-01.webp            # EN USO — Selección, Galería, Cómo funciona
│   └── action-02.webp            # EN USO — Galería, Manifiesto
│
└── tagada-dual/
    ├── hero.webp                 # EN USO — escena 04, Galería
    ├── action-01.webp            # EN USO — Selección, Galería, Image Stack
    └── action-02.webp            # EN USO — Galería, Cómo funciona
```

## Servicios nuevos — pendientes de foto real

Pedidos por el cliente, ya conectados en `src/data/services.ts` (aparecen en "Nuestras experiencias" y en el Footer) pero mostrando el placeholder de marca hasta que se suba la foto real con el nombre exacto indicado en el README de cada carpeta:

```
public/images/
├── taca-taca/            (05 — Taca Taca)
├── algodon-azucar/       (06 — Algodón de Azúcar)
├── cabritas/             (07 — Cabritas)
├── animacion-eventos/    (08 — Animación de Eventos)
└── pinta-caritas/        (09 — Pinta Caritas)
```

Cada carpeta espera `hero.webp`, `action-01.webp` y `action-02.webp` (mismo formato: WebP, ~2000px, calidad 80). En cuanto el archivo exista con ese nombre exacto, reemplaza el placeholder automáticamente — no hace falta tocar código.

**Una sola fuente por foto:** cada archivo vive en una sola carpeta y se referencia por ruta desde varias secciones (`src/data/services.ts`, `src/data/gallery.ts`, `src/data/content.ts`, `ManifestoSection.tsx`) — no hay archivos binarios duplicados. Si necesitas cambiar una foto, basta con reemplazar ese único archivo.

Formato: **WebP**, ~2000px de ancho, calidad 80 (~250-300KB c/u).

## Carpetas todavía sin foto dedicada

El sitio hoy **no** usa fotos de `hero/`, `eventos/`, `galeria/` ni `cta/` — esas secciones reutilizan las fotos de servicio de arriba. Si en el futuro llegan fotos específicas para estos usos, avisa para reconectarlas (son mejoras, no bloqueantes):

- **Hero principal del sitio** (portada, antes de que cargue el video) — hoy usa `toro-mecanico/hero.webp`.
- **CTA final de reserva** — hoy usa `camara-360/hero.webp`.
- **Manifiesto** (fondo de "NO ALQUILAMOS SOLO JUEGOS...") — hoy usa `reloj-derribador/action-02.webp`.
- **Galería cinematográfica y galería de experiencias** — hoy muestran las 12 fotos de los 4 servicios.
- **Image Stack "experiencia de evento"** — hoy reutiliza 4 de las 12 fotos (una por servicio).

No inventar ubicaciones, personas o eventos que Chica Mia no haya realizado.
