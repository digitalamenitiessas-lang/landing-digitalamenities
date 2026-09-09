# Digital Amenities Landing

Landing institucional en Next.js (App Router) para Digital Amenities.

## Requisitos

- Node.js 20+
- npm

## Desarrollo

```bash
npm install
npm run dev
```

Scripts: `dev`, `build`, `start`, `lint` (ESLint 9 con `eslint-config-next`).

## Variables de entorno

Copiar `.env.local.example` a `.env.local`. Sin `RESEND_API_KEY` el formulario
responde 503 y no envía nada; el resto del sitio funciona igual.

## Estructura

- `src/app/page.tsx` — home (hero, productos, amenity digital, capacidades, casos, contacto)
- `src/app/layout.tsx` — metadata, Open Graph, JSON-LD y tipografía
- `src/app/globals.css` — hoja de estilos única, ordenada por bloques
- `src/app/opengraph-image.tsx` — imagen de compartido generada en build
- `src/app/{robots,sitemap,manifest}.ts` — archivos de indexación
- `src/app/api/contact/route.ts` — envío de mails con Resend (honeypot + rate limit)
- `src/data/site-content.ts` — todos los textos, links y casos en un solo lugar
- `src/components/` — header, modal de contacto, marquesina de logos, reveal, lottie
- `public/assets` — marca, productos, clientes y la animación del hero

## Notas de implementación

- **Hero**: el título y la animación comparten fila en todos los anchos. Lo único
  que cambia por breakpoint es el reparto de columnas (`--hero-visual-bleed`
  controla cuánto se derrama la animación fuera de su columna).
- **Lottie**: `lottie-web` se importa de forma diferida y sólo cuando el hero
  está por entrar en viewport; se pausa fuera de pantalla, con la pestaña oculta
  o si el usuario pidió menos movimiento.
- **Contenido**: para agregar un caso o cambiar un texto, editar
  `src/data/site-content.ts`. Los logos van en `public/assets/clients`.

## Pendientes conocidos

- Las tipografías Karla están en `.ttf`; convertirlas a `.woff2` bajaría ~45% el
  peso. Hay 8 variantes en `src/app/fonts` que no se registran en `layout.tsx`.
- `npm audit` reporta 2 vulnerabilidades de `postcss` que sólo se resuelven
  actualizando a Next 16 (cambio mayor, pendiente de evaluar).
