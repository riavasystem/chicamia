# Videos — Chica Mia

Carpeta reservada para videos cortos opcionales (loops de fondo sin sonido, ej. el toro mecánico en movimiento). CLAUDE.md §36 pide evitar video pesado si una imagen puede lograr el mismo efecto — usar solo donde aporte claramente.

Formato recomendado: **MP4 (H.264)**, sin audio, loop corto (3-8s), comprimido, con un poster/frame en WebP de respaldo en `public/images/`.

```
public/videos/
├── hero/
│   └── video_hero.mp4        # EN USO — fondo del Hero en desktop/tablet (ver src/components/Hero.tsx)
├── toro-mecanico/
│   └── action-loop.mp4       # opcional, no integrado todavía
├── camara-360/
│   └── action-loop.mp4       # opcional, no integrado todavía
├── reloj-derribador/
│   └── action-loop.mp4       # opcional, no integrado todavía
└── tagada-dual/
    └── action-loop.mp4       # opcional, no integrado todavía
```

Solo el video del Hero está conectado hoy. Los de cada servicio son opcionales — avisar cuando se suban para integrarlos en `StorySection.tsx`.
