# Arquitectura — IJUS

Cómo está organizado el proyecto y cómo fluyen los datos.

## Panorama general

Aplicación de una sola página (SPA) construida con **React + Vite**, con dos
partes bien separadas:

- **Sitio público** — página de inicio, feed de eventos/noticias (`/novedades`)
  y formulario de contacto.
- **Área privada** — un panel interno protegido con Supabase Auth.

El backend es **Supabase** (base de datos PostgreSQL, autenticación,
almacenamiento y Edge Functions). El envío de correos usa **Resend**.

## Estructura de carpetas

```text
IJUS-Website/
├── docs/                         Documentación (este archivo y el sistema de diseño)
├── visuals/                      Aplicación frontend
│   └── src/
│       ├── App.tsx               Enrutador y layout general
│       ├── pages/                Home, Novedades, AdminLogin, AdminDashboard
│       ├── components/           UI reutilizable (Navbar, Hero, Footer, modales…)
│       ├── lib/                  Cliente de Supabase, helpers de datos, contexto de auth
│       └── utils/                Utilidades (cn)
└── supabase/
    └── functions/
        └── send-welcome-email/   Edge Function (Deno) que llama a Resend
```

## Rutas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Página de inicio |
| `/novedades` | Público | Feed completo de eventos y noticias |
| `*` | — | Redirige al inicio (404) |

Además existe un área privada protegida por autenticación (fuera del alcance
de esta documentación).

Las páginas secundarias se cargan con `React.lazy` (code-splitting): no viajan
en el paquete inicial de la home.

## Flujo de datos

**Lectura (eventos y noticias):**
`componente` → `lib/novedades.ts` → Supabase (`event`, `notice`) → se muestran
en la home y en `/novedades`.

**Formulario de visita:**
`VisitModal` → inserta en la tabla `subscriber` → un webhook de la base de datos
dispara la Edge Function `send-welcome-email` → esta llama a Resend y envía el
correo de bienvenida.

## Notas de seguridad

- La protección real de los datos depende de las políticas **RLS (Row Level
  Security)** de Supabase, no del frontend.
- La clave de Resend se lee de una variable de entorno
  (`Deno.env.get("RESEND_API_KEY")`), configurada como secreto en Supabase —
  nunca en el código.

## Esquema de base de datos

Ver la sección "Database Schema" en el [README](../README.md).
