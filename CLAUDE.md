CLAUDE.md --- Chica Mia

1. Propósito del proyecto

Este repositorio contiene el desarrollo desde cero de la página webChica Mia, una experiencia web cinematográfica y premium orientadaal arriendo de juegos y experiencias para eventos.

La página debe inspirarse en el lenguaje de interacción de sitiosinmobiliarios premium como ERA Residence, especialmente en su narrativamediante scroll, transiciones cinematográficas, imágenes de granformato, parallax, stacking, galerías horizontales, tipografía animada ycambios de escena.

No se debe realizar una copia literal del diseño, textos, identidadvisual, código ni assets de ningún sitio de referencia. La inspiraciónse limita a patrones de interacción, ritmo, storytelling y técnicas deanimación.

La página debe comunicar que Chica Mia ofrece experiencias paracumpleaños, celebraciones, eventos familiares, eventos corporativos yotras actividades.

Servicios principales

Toro mecánico.

Tarima / plataforma de cámara 360.

Juego inflable "Reloj Derribador".

Otros juegos o experiencias que puedan incorporarse posteriormente.

El sitio debe quedar preparado para agregar nuevos servicios sin tenerque modificar la arquitectura de animaciones.

2. Restricciones de infraestructura

Frontend

Next.js.

React.

TypeScript.

Despliegue en Vercel.

Utilizar únicamente el plan gratuito de Vercel.

El frontend debe ser completamente responsive.

Optimizar especialmente para dispositivos móviles.

Backend

Actualmente no existe backend.

No crear una API, servidor independiente, base de datos, servidor VPS niinfraestructura externa salvo que sea estrictamente necesario para unafuncionalidad futura.

Si una funcionalidad puede resolverse desde frontend utilizandoservicios gratuitos o APIs externas públicas/seguras, priorizar esasolución.

Repositorio

GitHub.

GitHub Actions.

Utilizar las capacidades gratuitas disponibles.

Mantener CI/CD sencillo.

No agregar pipelines innecesariamente complejos.

Objetivo de arquitectura

Usuario
   ↓
Next.js / React
   ↓
Vercel
   ↓
GitHub
   ↓
GitHub Actions

La primera versión debe poder funcionar sin backend propio.

3. Objetivo visual

Chica Mia debe sentirse:

Divertida.

Premium.

Moderna.

Familiar.

Energética.

Colorida.

Fotográfica.

Dinámica.

Fácil de entender.

Profesional.

Con sensación de evento y celebración.

La página no debe parecer una plantilla tradicional de empresa deeventos.

Evitar:

Bloques genéricos de texto.

Sliders tradicionales sin narrativa.

Animaciones excesivas sin propósito.

Botones con efectos aleatorios.

Secciones idénticas entre sí.

Una fotografía estática seguida de texto estático repetidamente.

La experiencia debe sentirse como una historia visual controlada porel scroll.

4. Concepto principal: Cinematic Scroll Experience

El scroll es el mecanismo narrativo principal.

La experiencia general debe seguir esta lógica:

SCROLL
   ↓
movimiento
   ↓
transición
   ↓
nueva imagen
   ↓
texto
   ↓
cambio de escala
   ↓
parallax
   ↓
nueva escena

Cada nueva imagen debe tener una entrada visual propia.

No utilizar el mismo efecto de entrada para todas las imágenes.

La página debe disponer de una biblioteca de efectos reutilizables:

Rise.

Reveal.

Zoom.

Parallax.

Horizontal.

Split.

Float.

Depth.

Clip Reveal.

Image Stack.

Push.

Fade.

Scale.

Rotation sutil.

Blur.

Brightness.

Typography Reveal.

Counter.

Day/Night transition.

Transiciones combinadas.

5. Stack tecnológico

Utilizar:

Next.js.

React.

TypeScript.

GSAP.

GSAP ScrollTrigger.

GSAP SplitText cuando sea apropiado y esté disponible/licenciadopara el entorno del proyecto.

GSAP Observer cuando sea útil para interacciones controladas.

Lenis para smooth scrolling, si su integración no perjudicaaccesibilidad o rendimiento.

CSS moderno.

Tailwind CSS si simplifica la implementación.

Vercel.

GitHub Actions.

Regla de animaciones

Las animaciones deben estar centralizadas y reutilizables.

No escribir animaciones complejas directamente dentro de cadacomponente.

Crear una arquitectura semejante a:

src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── StorySection.tsx
│   ├── ImageReveal.tsx
│   ├── ImageStack.tsx
│   ├── HorizontalGallery.tsx
│   ├── ParallaxImage.tsx
│   ├── ServiceSection.tsx
│   ├── ServiceShowcase.tsx
│   ├── Amenities.tsx
│   ├── Gallery.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
│
├── animations/
│   ├── hero.ts
│   ├── reveal.ts
│   ├── stack.ts
│   ├── horizontal.ts
│   ├── parallax.ts
│   ├── typography.ts
│   ├── zoom.ts
│   └── transitions.ts
│
├── data/
│   ├── services.ts
│   ├── gallery.ts
│   └── content.ts
│
└── lib/
    └── utils.ts

6. Principio fundamental de las imágenes

Las imágenes son protagonistas.

Cada imagen debe poder definir:

{
  image: "/images/toro-mecanico.webp",
  title: "Toro Mecánico",
  subtitle: "La experiencia que todos quieren probar",
  effect: "rise",
  scale: 1.15,
  parallax: 0.3,
  position: "center"
}

Los servicios deben poder cambiar de imagen o agregar imágenes nuevassin modificar la lógica de animación.

Crear una configuración centralizada para las escenas.

Ejemplo conceptual:

type SceneEffect =
  | "rise"
  | "reveal"
  | "zoom"
  | "parallax"
  | "horizontal"
  | "split"
  | "float"
  | "depth"
  | "clip"
  | "stack"
  | "push"
  | "fade"
  | "scale"
  | "rotate"
  | "blur"
  | "brightness";

7. Estructura completa de la página

La página debe contener las siguientes grandes escenas:

01. Preloader / intro
02. Hero
03. Manifiesto Chica Mia
04. Presentación de experiencias
05. Toro mecánico
06. Cámara 360
07. Reloj Derribador
08. Galería horizontal de experiencias
09. Experiencia de evento
10. Comparativa / selección de juegos
11. Galería cinematográfica
12. Cómo funciona el arriendo
13. Beneficios
14. CTA de reserva
15. Contacto
16. Footer

Cada sección debe sentirse conectada con la anterior.

8. PRELOADER / INTRO

Crear una introducción breve.

No debe retrasar innecesariamente el acceso al contenido.

Concepto:

CHICA
MIA

La palabra puede aparecer mediante:

Opacity.

Scale.

Letter spacing.

SplitText.

Movimiento vertical muy pequeño.

Después:

CHICA MIA
Juegos y experiencias para hacer inolvidable tu evento

La transición hacia el Hero debe realizarse mediante:

Fade.

Scale.

Clip reveal.

Movimiento vertical.

Duración breve.

En conexiones lentas, mostrar el contenido progresivamente y no bloquearal usuario esperando todas las imágenes.

9. HERO --- "CHICA MIA"

El Hero debe ocupar aproximadamente una pantalla completa.

Contenido:

CHICA MIA

Juegos y experiencias
para momentos inolvidables.

[ RESERVAR AHORA ]

Imagen principal:

Una fotografía espectacular de un evento donde el servicio seaprotagonista.

Animación de entrada

La imagen:

opacity: 0 → 1
scale: 1.15 → 1

El texto:

opacity: 0 → 1
y: 80px → 0

El título puede utilizar SplitText.

El botón aparece después del título.

Scroll

Al comenzar el scroll:

Hero debe permanecer sticky durante una parte de la escena.

Imagen: scale 1 → 1.10.

Imagen: translateY sutil.

Texto: translateY hacia arriba.

Overlay: cambia progresivamente.

Botón puede reducir opacity.

La siguiente imagen debe empezar a subir desde la parte inferior.

La transición debe ser cinematográfica.

10. MANIFIESTO CHICA MIA

Mensaje conceptual:

NO ALQUILAMOS
SOLO JUEGOS.

CREAMOS
MOMENTOS.

o equivalente.

Esta sección debe comunicar que Chica Mia no vende solamenteequipamiento, sino experiencias.

Efecto

Utilizar tipografía grande.

Cada línea entra de forma independiente:

NO ALQUILAMOS

después:

SOLO JUEGOS.

después:

CREAMOS

después:

MOMENTOS.

Efecto:

SplitText.

TranslateY.

Opacity.

Letter spacing.

Pequeño scale.

Mientras aparece el texto, una fotografía puede comenzar a subir desdeel fondo.

11. PRESENTACIÓN DE EXPERIENCIAS

Introducir:

NUESTRAS
EXPERIENCIAS

Las tres principales:

01 — TORO MECÁNICO
02 — CÁMARA 360
03 — RELOJ DERRIBADOR

Esta sección debe preparar visualmente al usuario para la secuenciaprincipal.

Usar una imagen por experiencia.

No presentar las tres como tarjetas tradicionales.

Crear una transición de escenas.

12. SERVICIO 01 --- TORO MECÁNICO

Esta debe ser una de las escenas más impactantes.

Entrada

Imagen del toro mecánico sube desde abajo:

translateY(100vh) → translateY(0)
opacity: 0 → 1
scale: 1.15 → 1

La imagen ocupa aproximadamente 80--100vh.

Texto

Mientras la imagen termina de subir:

01

TORO
MECÁNICO

El texto entra desde la izquierda.

Después:

¿Quién logra mantenerse?

entra desde abajo.

Interacción

Mientras el usuario sigue haciendo scroll:

Imagen se mantiene parcialmente fija.

El fondo realiza parallax.

El texto se desplaza ligeramente a distinta velocidad.

La imagen hace un zoom mínimo.

Aparece un pequeño indicador de experiencia.

Salida

No hacer un simple fade.

La escena debe ser empujada por la siguiente:

Toro:
scale 1 → .94
brightness 1 → .75
translateY 0 → -8%

La siguiente imagen comienza:

translateY 100% → 0

13. SERVICIO 02 --- TARIMA / CÁMARA 360

La cámara 360 debe sentirse más elegante y tecnológica.

Entrada

No utilizar Rise nuevamente.

Utilizar:

Clip Reveal + Zoom.

Imagen comienza:

clip-path: inset(100% 0 0 0)
scale: 1.12

y termina:

clip-path: inset(0)
scale: 1

Texto

02

CÁMARA
360

Las palabras aparecen en diferentes momentos.

Efecto de rotación

La imagen puede tener una rotación muy leve:

rotate: 2deg → 0deg

No exagerar.

Parallax

La cámara o persona protagonista debe moverse ligeramente a unavelocidad distinta del fondo.

Salida

Utilizar:

scale
brightness
translateY

y dejar entrar la siguiente escena desde un lateral.

14. SERVICIO 03 --- RELOJ DERRIBADOR

Esta sección debe tener una energía más lúdica.

Entrada

Utilizar:

Horizontal + Push.

La imagen entra desde la derecha:

translateX(100vw) → 0

Mientras la sección anterior se desplaza hacia la izquierda.

Texto

03

RELOJ
DERRIBADOR

El texto aparece con:

SplitText.

Scale.

Opacity.

Efecto visual

Agregar pequeños movimientos de elementos decorativos.

Por ejemplo:

círculos;

líneas;

pequeñas formas;

indicadores;

confeti sutil.

No utilizar elementos que puedan distraer del producto.

Salida

La imagen debe hacer:

scale 1 → .92
rotate 0 → -1deg

mientras desaparece.

15. GALERÍA HORIZONTAL DE EXPERIENCIAS

Esta sección debe convertir el scroll vertical en movimiento horizontal.

Conceptualmente:

SCROLL ↓

[ TORO ] → [ CÁMARA 360 ] → [ RELOJ ] → [ EVENTO ] → [ DIVERSIÓN ]

La sección debe permanecer pinned durante el recorrido.

GSAP ScrollTrigger debe controlar:

translateX

según el progreso del scroll.

Cada imagen

Debe tener:

escala distinta.

posición distinta.

pequeña diferencia de velocidad.

parallax interno.

No usar

Un slider con flechas tradicional.

La sensación debe ser:

el usuario está recorriendo una galería físicamente.

16. EXPERIENCIA DE EVENTO

Mostrar cómo se ve Chica Mia dentro de un evento real.

Escenas posibles:

Cumpleaños
Celebración familiar
Evento corporativo
Fiesta
Evento infantil

No inventar servicios que Chica Mia no ofrezca.

Efecto

Crear un Image Stack.

La primera imagen está visible.

La siguiente comienza:

translateY(100%)

y sube hasta:

translateY(0)

La anterior:

scale(1) → scale(.94)

y pierde un poco de brillo.

Esto debe producir la sensación de que una fotografía está empujando ala anterior.

17. IMAGE STACK --- SISTEMA PRINCIPAL

Implementar un componente reutilizable:

<ImageStack />

Cada escena debe tener:

position: sticky
height: 100vh

Las imágenes estarán superpuestas.

Escena A

y: 0
scale: 1
brightness: 1

Escena B

y: 100vh

Al hacer scroll:

B y: 100vh → 0
A scale: 1 → .94
A brightness: 1 → .75

Escena C

C y: 100vh → 0
B scale: 1 → .94

Esto debe convertirse en uno de los efectos principales de Chica Mia.

18. SELECCIÓN DE EXPERIENCIAS

Crear una sección donde el usuario pueda comprender rápidamente cuálexperiencia puede interesarle.

No utilizar tarjetas rígidas.

Mostrar:

¿QUÉ ESTÁS BUSCANDO?

DIVERSIÓN
ADRENALINA
RECUERDOS
EXPERIENCIA

Cada opción puede activar una fotografía diferente.

Hover

En desktop:

imagen aparece;

scale 1 → 1.04;

texto cambia ligeramente;

cursor puede reaccionar.

En móvil:

sustituir hover por interacción de tap o scroll.

19. GALERÍA CINEMATOGRÁFICA

Crear una secuencia de fotografías de eventos.

Cada imagen debe tener un efecto distinto.

Ejemplo:

IMG 01 → Rise
IMG 02 → Clip Reveal
IMG 03 → Zoom
IMG 04 → Horizontal
IMG 05 → Parallax
IMG 06 → Split
IMG 07 → Float
IMG 08 → Depth

No utilizar el mismo efecto consecutivamente.

Imagen 01 --- Rise

y: 100%
→
0

Imagen 02 --- Clip

clip-path inset(100% 0 0 0)
→
inset(0)

Imagen 03 --- Zoom

scale 1.25
→
1

Imagen 04 --- Horizontal

x: 100%
→
0

Imagen 05 --- Parallax

El contenido se mueve a velocidad distinta del contenedor.

Imagen 06 --- Split

La imagen se divide visualmente en dos paneles que se encuentran.

Imagen 07 --- Float

Entrada suave y movimiento vertical continuo muy leve.

Imagen 08 --- Depth

Escala y movimiento de capas para simular profundidad.

20. SECCIÓN "CÓMO FUNCIONA"

Presentar el proceso:

01
ELIGE TU EXPERIENCIA

02
RESERVA TU FECHA

03
NOS ENCARGAMOS DE TODO

04
DISFRUTA TU EVENTO

No mostrar como cuatro cajas.

Crear una narrativa vertical.

Cada paso ocupa aproximadamente una pantalla.

Paso 01

Imagen sube.

Paso 02

Imagen entra lateralmente.

Paso 03

Imagen hace clip reveal.

Paso 04

Imagen realiza zoom.

Cada texto aparece con SplitText.

21. BENEFICIOS

Mostrar beneficios reales y únicamente beneficios que Chica Mia puedagarantizar.

Ejemplos posibles:

Experiencias entretenidas.

Opciones para diferentes tipos de eventos.

Equipamiento preparado para eventos.

Experiencia visual para fotografías y videos.

Reserva coordinada.

Atención personalizada.

No afirmar certificaciones, seguros, medidas de seguridad, tiempos deinstalación o características técnicas que no hayan sido confirmadas.

Animación

Cada beneficio aparece de forma progresiva.

01 — EXPERIENCIA
02 — DIVERSIÓN
03 — RECUERDOS
04 — EVENTO

El número puede utilizar un Counter.

22. CTA PRINCIPAL

Crear una gran escena final:

¿LISTO PARA
HACER TU EVENTO
INOLVIDABLE?

La imagen de fondo ocupa toda la pantalla.

Efecto

Inicial:

scale: 1.15
brightness: .75

Con scroll:

scale: 1
brightness: 1

El texto aparece mediante:

SplitText
opacity
translateY

Botón:

RESERVAR AHORA

El botón aparece después del mensaje.

23. CONTACTO

Como no existe backend, evitar crear un formulario que requiera una APIpropia.

La primera versión puede usar:

enlace de WhatsApp;

teléfono;

Instagram;

correo electrónico;

enlaces externos configurables.

Si se implementa un formulario, usar una solución compatible con Vercely el plan gratuito o una integración externa apropiada.

La información de contacto debe estar centralizada en configuración:

const contact = {
  whatsapp: "...",
  instagram: "...",
  email: "...",
  phone: "..."
}

No hardcodear estos valores en múltiples componentes.

24. FOOTER

Footer limpio.

Contenido:

CHICA MIA

Juegos y experiencias
para momentos inolvidables.

[ WhatsApp ]
[ Instagram ]
[ Email ]

© Chica Mia

Efecto

El footer puede aparecer lentamente con:

opacity: 0 → 1
y: 40px → 0

No sobreanimar el footer.

25. SISTEMA DE EFECTOS

Crear funciones reutilizables.

Rise

from y: 100%
to y: 0
opacity: 0 → 1

Reveal

clip-path
inset(100% 0 0 0)
→
inset(0)

Zoom

scale: 1.2
→
1

Parallax

backgroundY ≠ contentY

Horizontal

x: 100vw
→
0

Split

Dividir visualmente una imagen en paneles.

Float

Movimiento continuo muy pequeño.

Depth

Utilizar varias capas con distintas velocidades.

Stack

Nueva imagen sube y desplaza visualmente a la anterior.

Push

Una escena empuja a otra lateral o verticalmente.

Blur

Usar blur únicamente como transición:

blur(8px)
→
blur(0)

Brightness

Usar como profundidad:

brightness(.7)
→
brightness(1)

No abusar del blur.

26. COMBINACIONES DE EFECTOS

Los efectos pueden combinarse.

Ejemplo:

Rise
+
Scale
+
Opacity
+
Parallax

Otro:

Clip Reveal
+
Zoom
+
Brightness

Otro:

Horizontal
+
SplitText
+
Parallax

Otro:

Stack
+
Scale
+
Brightness
+
Blur

No combinar más efectos de los necesarios.

El objetivo es crear sensación cinematográfica, no demostrar cantidad deanimaciones.

27. TRANSICIÓN ENTRE SECCIONES

Nunca utilizar únicamente:

opacity: 0 → 1

como transición principal.

Las secciones deben convivir brevemente.

Patrón recomendado:

SECCIÓN A
       ↓
A comienza a salir
       +
B comienza a entrar
       ↓
A pierde escala/brillo
       +
B gana escala/brillo
       ↓
B toma el control

Esto debe repetirse como lenguaje visual del sitio.

28. PARALLAX

Usar diferentes velocidades.

Ejemplo:

Background: 0.15
Image:      0.35
Decoration: 0.50
Text:       0.70

La diferencia debe ser sutil.

No generar mareo.

En móviles reducir el movimiento.

29. TIPOGRAFÍA

Utilizar una tipografía moderna y muy legible.

El título puede ser:

Bold.

Grande.

Editorial.

Geométrico.

La combinación debe transmitir diversión y calidad.

Los títulos principales pueden utilizar:

SplitText
chars
words
lines

No animar cada letra en exceso.

Preferir animación por palabras o líneas.

30. CURSOR

En desktop se puede crear un cursor personalizado muy discreto.

Por ejemplo:

VIEW
DRAG
EXPLORE

dependiendo del contexto.

No implementar cursor personalizado en móvil.

No debe impedir el uso normal de enlaces.

31. MENÚ

Navbar fija.

Desktop:

CHICA MIA

Experiencias
Cómo funciona
Galería
Contacto

RESERVAR

Mobile:

CHICA MIA
        ☰

El menú móvil debe aparecer mediante una animación full-screen.

Efecto:

clip-path
+
opacity
+
translateY

Cada elemento del menú aparece secuencialmente.

32. SCROLL INDICATOR

Agregar un indicador sutil:

SCROLL
↓

Al comenzar a desplazarse:

opacity: 1 → 0

No mantenerlo durante toda la página.

33. PROGRESS INDICATOR

En desktop puede aparecer:

01 / 08

o:

01
──────
08

El número debe actualizarse según la escena.

La barra de progreso debe crecer según:

scrollProgress

34. RESPONSIVE

La versión móvil no debe ser una versión reducida sin criterio.

Debe rediseñarse.

Desktop

Full-screen.

Parallax más marcado.

Horizontal scrolling.

Image stacking.

Cursor interactivo.

Más elementos superpuestos.

Tablet

Reducir distancia de movimiento.

Simplificar escenas horizontales.

Mobile

Reducir o eliminar efectos 3D pesados.

Reducir parallax.

Evitar horizontal scroll si afecta la navegación.

Mantener Rise, Reveal, Zoom y Stack.

Priorizar legibilidad.

Botones grandes.

Navegación sencilla.

35. ACCESIBILIDAD

Debe existir:

prefers-reduced-motion

Cuando el usuario prefiera menos movimiento:

reducir animaciones;

evitar parallax;

evitar grandes desplazamientos;

mantener fades simples;

no bloquear el contenido.

Las animaciones nunca deben impedir acceder a información.

Todas las imágenes deben tener alt.

Los botones deben ser accesibles mediante teclado.

36. PERFORMANCE

La página tendrá muchas imágenes, por lo que el rendimiento es crítico.

Utilizar:

next/image.

WebP/AVIF cuando corresponda.

Lazy loading.

dimensiones correctas.

imágenes optimizadas.

evitar imágenes gigantes innecesarias.

preload únicamente de imágenes críticas.

no cargar toda la galería al mismo tiempo si no es necesario.

El Hero debe tener prioridad.

No cargar librerías innecesarias.

No utilizar videos pesados si una imagen puede generar el mismo efecto.

37. GSAP Y SCROLLTRIGGER

Cada animación basada en scroll debe:

utilizar ScrollTrigger;

limpiar correctamente sus instancias;

evitar memory leaks;

utilizar gsap.context() cuando sea apropiado;

soportar resize;

recalcular medidas cuando sea necesario.

Evitar:

window.addEventListener(...)

sin cleanup.

Evitar crear cientos de ScrollTriggers innecesarios.

Agrupar animaciones cuando tenga sentido.

38. LENIS

Si se utiliza Lenis:

integrar con GSAP;

sincronizar correctamente con ScrollTrigger;

no bloquear scroll nativo;

desactivar o reducir efectos si causa problemas en móvil;

respetar prefers-reduced-motion.

39. CONTENIDO CONFIGURABLE

Los servicios no deben estar escritos directamente dentro de lasanimaciones.

Crear:

const services = [
  {
    id: "toro-mecanico",
    number: "01",
    title: "Toro Mecánico",
    description: "...",
    image: "/images/toro-mecanico.webp",
    effect: "rise"
  },
  {
    id: "camara-360",
    number: "02",
    title: "Cámara 360",
    description: "...",
    image: "/images/camara-360.webp",
    effect: "clip"
  },
  {
    id: "reloj-derribador",
    number: "03",
    title: "Reloj Derribador",
    description: "...",
    image: "/images/reloj-derribador.webp",
    effect: "horizontal"
  }
];

Esto permitirá agregar:

04 — Nuevo juego
05 — Nuevo juego
06 — Nueva experiencia

sin modificar los componentes.

40. IMÁGENES POR SERVICIO

Cada servicio debe poder tener:

hero image
detail image
action image
event image
gallery images

Ejemplo:

toro-mecanico/
├── hero.webp
├── action-01.webp
├── action-02.webp
├── event-01.webp
└── detail.webp

La galería puede usar diferentes fotografías del mismo servicio.

41. EFECTO POR IMAGEN

Cada imagen debe poder definir su propia animación.

Ejemplo:

{
  image: "/images/toro-01.webp",
  effect: "rise"
}

{
  image: "/images/toro-02.webp",
  effect: "zoom"
}

{
  image: "/images/toro-03.webp",
  effect: "parallax"
}

No limitar todas las fotografías a una sola animación.

42. REGLA DE VARIEDAD

No repetir el mismo efecto más de dos veces consecutivamente.

Ejemplo incorrecto:

Rise
Rise
Rise
Rise

Ejemplo correcto:

Rise
Clip
Zoom
Horizontal
Stack
Parallax

La secuencia debe tener ritmo.

43. RITMO CINEMATOGRÁFICO

Alternar:

escena intensa
↓
escena tranquila
↓
escena intensa
↓
escena tipográfica
↓
escena fotográfica
↓
escena interactiva

No hacer que todas las escenas sean visualmente agresivas.

Debe existir respiración.

44. COLOR

La identidad visual debe ser propia de Chica Mia.

El sistema de color puede combinar:

tonos cálidos;

rosa;

magenta;

morado;

coral;

blanco;

negro o carbón para contraste.

No saturar toda la página.

Las fotografías deben ser las protagonistas.

Utilizar fondos neutros en algunas secciones para que las imágenesdestaquen.

45. DECORACIONES

Se pueden usar:

círculos;

líneas;

pequeños puntos;

estrellas;

confeti;

números gigantes;

formas geométricas.

Deben aparecer de manera sutil.

Pueden utilizar:

scale
rotate
opacity
parallax

No convertir la web en una página infantil sobrecargada.

46. MICROINTERACCIONES

Botones:

RESERVAR AHORA →

Hover:

arrow x: 0 → 8px

El botón puede tener:

background transition
scale 1 → 1.03

Sin exagerar.

Las microinteracciones deben reforzar la percepción premium.

47. SEO

Configurar:

title.

description.

Open Graph.

Twitter/X metadata.

favicon.

robots.

sitemap.

Title sugerido:

Chica Mia | Juegos y experiencias para eventos

Description sugerida:

Haz de tu evento una experiencia inolvidable con Chica Mia: toro mecánico, cámara 360, reloj derribador y más.

No inventar ubicaciones, cobertura geográfica o características que noestén confirmadas.

48. ANALYTICS

La arquitectura debe permitir agregar analytics posteriormente.

No agregar servicios de pago innecesarios.

Si se incorpora analytics, priorizar alternativas compatibles con elplan gratuito y Vercel.

Medir como mínimo:

page_view
service_view
cta_click
whatsapp_click
contact_click

49. GITHUB ACTIONS

Crear un workflow sencillo.

Objetivo:

push
 ↓
install
 ↓
lint
 ↓
typecheck
 ↓
build

No implementar infraestructura compleja.

La integración con Vercel debe permanecer sencilla.

50. VARIABLES DE ENTORNO

No guardar secretos en GitHub.

Utilizar:

.env.local

y variables de entorno de Vercel cuando corresponda.

Nunca subir:

.env
.env.local
tokens
API keys
passwords
secrets

al repositorio.

51. ESTRUCTURA DE DATOS

Centralizar textos:

src/data/content.ts

Centralizar servicios:

src/data/services.ts

Centralizar galería:

src/data/gallery.ts

Esto permite modificar contenido sin tocar animaciones.

52. COMPONENTE IMAGE REVEAL

Debe aceptar propiedades como:

<ImageReveal
  src="..."
  alt="..."
  effect="rise"
  scale={1.15}
  parallax={0.3}
/>

La implementación debe seleccionar automáticamente el efecto.

53. COMPONENTE IMAGE STACK

Debe permitir:

<ImageStack
  scenes={[
    {...},
    {...},
    {...}
  ]}
/>

Cada escena puede definir:

image
title
description
effect
scale
brightness
parallax
position

54. COMPONENTE HORIZONTAL GALLERY

Debe aceptar una lista:

<HorizontalGallery items={galleryItems} />

El componente controla:

pin
horizontal movement
image scale
parallax
text
progress

No crear un slider separado para cada sección.

55. COMPONENTE STORY SECTION

Crear un componente reutilizable:

<StorySection
  number="01"
  title="Toro Mecánico"
  description="..."
  image="..."
  effect="rise"
/>

El componente debe poder reutilizarse para:

Toro mecánico.

Cámara 360.

Reloj Derribador.

Nuevos servicios.

56. ESTADO DE RESERVA

Como no existe backend, el CTA debe dirigir a un canal externoconfigurado.

Prioridad sugerida:

RESERVAR AHORA
        ↓
WhatsApp

El número debe ser configurable.

No escribir números de contacto ficticios.

57. REGLAS DE SEGURIDAD

No almacenar información sensible del usuario.

No crear una base de datos sin necesidad.

No pedir información personal que no sea necesaria.

No incluir credenciales en el código.

No incluir tokens de WhatsApp, Instagram, Google u otros serviciosdirectamente en el frontend.

58. REGLAS DE DESARROLLO

Antes de crear un nuevo componente:

Revisar si ya existe un componente reutilizable.

Revisar si el efecto ya existe en animations/.

Revisar si el contenido debe ir en data/.

Evitar duplicación.

Mantener TypeScript estricto.

Mantener componentes pequeños.

Evitar lógica de negocio dentro de componentes visuales.

Mantener animaciones independientes del contenido.

59. REGLAS DE UX

La animación nunca debe estar por encima de:

Contenido.

Legibilidad.

Navegación.

Conversión.

Performance.

Accesibilidad.

Si una animación hace que el usuario no pueda entender un servicio, debesimplificarse.

60. OBJETIVO DE CONVERSIÓN

La página tiene una finalidad comercial.

El usuario debe comprender rápidamente:

¿Qué es Chica Mia?
↓
¿Qué puedo arrendar?
↓
¿Cómo se ve?
↓
¿Cómo funciona?
↓
¿Cómo reservo?

Debe existir un CTA visible pero no invasivo.

Los CTA principales:

RESERVAR AHORA
CONSULTAR DISPONIBILIDAD
HABLAR POR WHATSAPP

61. SECUENCIA VISUAL FINAL

La experiencia completa debe sentirse aproximadamente así:

PRELOADER
    ↓
CHICA MIA
    ↓
HERO CINEMATOGRÁFICO
    ↓
MANIFIESTO
    ↓
EXPERIENCIAS
    ↓
TORO MECÁNICO
    ↓
CÁMARA 360
    ↓
RELOJ DERRIBADOR
    ↓
GALERÍA HORIZONTAL
    ↓
IMAGE STACK
    ↓
EXPERIENCIA DE EVENTO
    ↓
SELECCIÓN
    ↓
GALERÍA CINEMATOGRÁFICA
    ↓
CÓMO FUNCIONA
    ↓
BENEFICIOS
    ↓
GRAN CTA
    ↓
CONTACTO
    ↓
FOOTER

62. MAPA DE EFECTOS

Implementar como mínimo esta distribución:

Sección                   Efecto principal    Efectos secundarios

Preloader                 Fade / Scale        SplitTextHero                      Zoom                Parallax + SplitTextManifiesto                Typography Reveal   RiseExperiencias              Rise                ScaleToro mecánico             Rise                Parallax + BrightnessCámara 360                Clip Reveal         Zoom + RotateReloj Derribador          Horizontal          Push + SplitTextGalería                   Horizontal Scroll   ParallaxEventos                   Image Stack         Scale + BrightnessSelección                 Hover/Reveal        ScaleGalería cinematográfica   Variado             ParallaxCómo funciona             Rise / Horizontal   SplitTextBeneficios                Counter             FadeCTA                       Zoom                Brightness + SplitTextContacto                  Reveal              FadeFooter                    Fade / Rise         ---

63. EFECTOS QUE DEBEN ESTAR PRESENTES EN EL PROYECTO

No eliminar los siguientes patrones porque forman parte del lenguajevisual solicitado:

Rise.

Reveal.

Zoom.

Parallax.

Horizontal scrolling.

Split.

Float.

Depth.

Clip-path reveal.

Image stacking.

Push transitions.

Fade.

Scale.

Rotation sutil.

Blur.

Brightness.

SplitText.

Counter.

Sticky sections.

Pinned sections.

Scroll progress.

Day/Night como patrón opcional reutilizable.

Microinteracciones de botones.

Transiciones entre imágenes.

Diferentes velocidades de elementos.

No significa que todos deban utilizarse indiscriminadamente. Debenutilizarse donde tengan sentido narrativo.

64. CALIDAD VISUAL

La página terminada debe evitar la apariencia de:

Template.

Landing page genérica.

Portafolio básico.

Galería de productos tradicional.

Debe sentirse como:

marca
+
evento
+
fotografía
+
storytelling
+
movimiento
+
experiencia

65. PRIORIDAD DE IMPLEMENTACIÓN

Implementar en este orden:

Fase 1 --- Base

Next.js.

TypeScript.

Tailwind/CSS.

Estructura de componentes.

Navbar.

Footer.

Datos.

SEO.

Fase 2 --- Motor de animación

GSAP.

ScrollTrigger.

Lenis.

prefers-reduced-motion.

Sistema de efectos.

Fase 3 --- Hero

Preloader.

Hero.

Parallax.

SplitText.

CTA.

Fase 4 --- Servicios

ImageReveal.

ImageStack.

Toro mecánico.

Cámara 360.

Reloj Derribador.

Fase 5 --- Galerías

Horizontal gallery.

Parallax gallery.

Cinematic gallery.

Fase 6 --- Conversión

Cómo funciona.

Beneficios.

CTA.

Contacto.

WhatsApp.

Fase 7 --- Performance

Optimización de imágenes.

Lazy loading.

Mobile.

Accessibility.

Reduced motion.

Fase 8 --- CI/CD

GitHub Actions.

Lint.

Typecheck.

Build.

Deploy en Vercel.

66. CRITERIO DE ACEPTACIÓN

La primera versión se considera correcta cuando:

La página funciona sin backend propio.

Se puede desplegar en Vercel.

El código está en GitHub.

GitHub Actions ejecuta validaciones.

La página es responsive.

Las imágenes utilizan optimización.

El Hero tiene animaciones cinematográficas.

Cada servicio tiene una escena diferenciada.

Las imágenes suben desde abajo en las escenas donde corresponda.

Existe Image Stack.

Existe al menos una galería horizontal.

Existe parallax.

Existe Clip Reveal.

Existe Zoom.

Existe SplitText o equivalente.

Existe transición Push.

Existe una galería con efectos variados.

Existe contacto.

La página puede funcionar sin backend.

Las animaciones respetan prefers-reduced-motion.

No existen errores de TypeScript.

No existen errores de lint.

El build de producción funciona.

67. REGLA PRINCIPAL PARA CLAUDE CODE

Antes de implementar cualquier sección, pensar en ella como una escenacinematográfica, no como un bloque HTML.

Para cada nueva sección responder internamente:

¿Qué ve el usuario?
¿Qué imagen es protagonista?
¿Cómo entra la imagen?
¿Cómo sale?
¿Qué hace el texto?
¿Qué elemento permanece sticky?
¿Qué elemento se mueve más rápido?
¿Qué elemento se mueve más lento?
¿Qué ocurre cuando comienza la siguiente escena?
¿El efecto es diferente al anterior?
¿Cómo funciona en móvil?
¿Qué ocurre con prefers-reduced-motion?

Cada sección debe tener una intención visual clara.

68. REGLA FINAL

Chica Mia no debe sentirse como una página que tiene animaciones.

Debe sentirse como:

Una experiencia que se descubre mediante el scroll.

El usuario debe sentir que cada movimiento revela una nueva parte delevento.

La fotografía debe ser protagonista.

El movimiento debe guiar la mirada.

La tipografía debe reforzar el mensaje.

El CTA debe aparecer naturalmente después de que el usuario hayaexperimentado la propuesta.

La prioridad absoluta es crear una experiencia visual memorable, rápida,responsive, accesible y orientada a convertir visitas en reservas.
