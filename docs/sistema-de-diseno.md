# Sistema de Diseño — IJUS

Referencia de los tokens visuales del sitio. Todos los valores viven en
[`visuals/src/index.css`](../visuals/src/index.css) (bloque `@theme` de Tailwind v4)
y se usan como utilidades de Tailwind (`bg-primary`, `text-dark`, `font-serif`, etc.).

## Colores

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#002bba` | Azul de marca. Fondos de secciones destacadas, botones, footer, enlaces. |
| `dark` | `#050505` | Texto principal sobre fondos claros; fondos oscuros (Hero, Impact). |
| `light` | `#fbfbfb` | Fondo general del sitio y texto sobre fondos oscuros. |

**Cómo usarlos en Tailwind:**

```html
<div class="bg-primary text-light">…</div>
<p class="text-dark">…</p>
<section class="bg-light">…</section>
```

Para opacidades usar la sintaxis de Tailwind: `bg-primary/40`, `text-dark/70`, `border-light/20`.

## Tipografía

Dos familias, cargadas desde Google Fonts en [`visuals/index.html`](../visuals/index.html).

| Token | Fuente | Uso |
|---|---|---|
| `font-sans` | **Inter** (400, 500, 600) | Cuerpo de texto, navegación, botones, UI general. |
| `font-serif` | **Libre Baskerville** (400, 700, itálica) | Títulos grandes y énfasis de marca. La itálica es la firma visual ("IJUS", "Eventos", "Próximamente"). |

**Convenciones:**

- Títulos de sección grandes → `font-serif italic` (ej. `text-5xl md:text-[4.5rem] font-serif italic`).
- Las itálicas de Libre Baskerville se recortan abajo: agregar `pb-2` en títulos grandes.
- Cuerpo y etiquetas → `font-sans`, con `tracking-widest uppercase` para las etiquetas pequeñas.

## Espaciado y contenedores

- Ancho máximo de secciones: `max-w-screen-2xl mx-auto` (1536px). Mantener consistente entre secciones.
- Padding lateral estándar: `px-6 md:px-12`.
- El sitio es **mobile-first**: definir primero el estilo móvil y luego los breakpoints `md:` / `lg:`.

## Animación

- Librería: **`motion/react`** para animaciones; **`lenis`** para scroll suave.
- Curvas de easing usadas en el sitio (mantener la consistencia):
  - `[0.22, 1, 0.36, 1]` — entradas y transiciones generales.
  - `[0.16, 1, 0.3, 1]` — aparición de texto (Hero, títulos).
  - `[0.76, 0, 0.24, 1]` — cortinas y overlays (preloader, menú móvil, transición de página).
- Duración de transiciones de UI: 200–500 ms. Evitar más de 500 ms en interacciones.

## Buenas prácticas heredadas

- **Sin emojis como iconos** — usar SVG (el proyecto usa `lucide-react`).
- Todo elemento clickeable lleva `cursor-pointer` y feedback visual en hover.
- Las imágenes siempre con `alt` descriptivo; las de más abajo con `loading="lazy"`.
