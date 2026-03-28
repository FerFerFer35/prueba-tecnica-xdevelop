# Prueba Técnica — XDevelop (Next.js App Router)

Aplicación construida con **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, **TanStack Query (React Query)** y **Zustand**.  
Incluye autenticación (cookies), un BFF interno en `/api`, y pantallas para Users / Posts / Post Detail + Comments.

---

## Stack
- Next.js **16.2.1**
- React **19.2.4**
- TypeScript
- TailwindCSS **v4**
- TanStack Query `@tanstack/react-query`
- TanStack Table `@tanstack/react-table`
- Zustand

Ver dependencias en `package.json`.

---

## Desarrollo asistido por IA (GitHub Copilot + Claude)

Este proyecto fue desarrollado con apoyo de asistentes de IA como parte del flujo de trabajo:

- **GitHub Copilot**: se utilizó para acelerar la escritura de componentes, refactors y utilidades, así como para proponer estructuras de carpetas y snippets repetitivos (UI, TanStack Query/Table, etc.).
- **Claude**: se utilizó como apoyo para revisión de enfoques, generación de borradores de documentación y verificación de consistencia en decisiones de arquitectura.

### Archivos de guía para agentes
En el repositorio se incluyen archivos específicos para orientar a herramientas/agents durante el desarrollo:

- `AGENTS.md`: contiene reglas y advertencias para agentes (por ejemplo, cambios/breaking changes de Next.js y la recomendación de revisar la documentación local en `node_modules/next/dist/docs/` antes de escribir código).
- `CLAUDE.md`: referencia a `AGENTS.md` para mantener consistencia en las reglas aplicadas durante el trabajo asistido por IA.

> Nota: El uso de IA fue **asistido** (no automático). La integración final, decisiones técnicas y validación del comportamiento quedaron a cargo del desarrollador.

---

## Instalación y ejecución

### 1) Instalar dependencias
```bash
npm install
```

### 2) Variables de entorno
Crea `.env.local` (si tu integración con ReqRes/API Key lo requiere):

```env
REQRES_API_KEY=...
REQRES_BASE_URL=https://reqres.in
```

> Sin la API_KEY no funcionara el proyecto.

### 3) Desarrollo
```bash
npm run dev
```

App en:
- http://localhost:3000

### 4) Build / producción
```bash
npm run build
npm run start
```

### Scripts disponibles (package.json)
- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint`

---

## Arquitectura del proyecto

Carpeta base: `src/`

- `src/app/` → Rutas, layouts y páginas (App Router)
- `src/app/api/` → Endpoints internos (BFF)
- `src/components/` → UI por dominio (auth, layout, posts, users, ui)
- `src/providers/` → Providers globales
- `src/lib/` → helpers (fetch, utils)
- `src/store/` → estado global (Zustand)
- `src/types/` → tipos globales

---

## Providers globales (TanStack Query)

### `src/providers/query-provider.tsx`
Provider global que inicializa un `QueryClient` y monta `ReactQueryDevtools`.

- Se usa `useState(() => new QueryClient())` para mantener un único `QueryClient` estable durante el ciclo de vida del cliente.
- Permite usar `useQuery` / `useMutation` en cualquier componente dentro del árbol.

### `src/app/layout.tsx`
Envuelve toda la app con `QueryProvider`.

**Importante:** cualquier página/componente que use `useQuery` necesita estar bajo este provider.

---

## Helper de HTTP

### `src/lib/api.ts`
`fetcher<T>(url)` centraliza el fetch básico:

- Realiza `fetch(url)`
- Si `!res.ok` lanza error
- Retorna `res.json()` tipado con genéricos

Uso típico:
```ts
const data = await fetcher<MyResponse>('/api/algo')
```

> Nota: si tu app usa cookies/sesión, usualmente conviene incluir `credentials: 'include'` en algunos fetch. Si en tu proyecto ya lo haces en otros lugares, documéntalo en la sección de Auth.

---

## Autenticación (visión general)

La app incluye un flujo de autenticación típico:

- Pantalla `/login` con formulario (email/password)
- Endpoints internos `/api/auth/*`
- El header revisa si el usuario está autenticado para mostrar Login/Logout
- Rutas protegidas: redirigen a `/login` si no hay sesión

### Endpoints esperados
(Confirma nombres exactos en tu repo; documenta si difieren)

- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Setea cookie(s) de sesión/token
- `POST /api/auth/logout`
  - Limpia cookie(s)
- `GET /api/auth/me`
  - Retorna estado de sesión: `{ authenticated: boolean, user?: ... }`

### Cómo se usa en UI
- `LoginForm` hace `fetch('/api/auth/login', { method: 'POST', ... })`
- `Header` consulta `/api/auth/me` para render condicional (Login/Logout)
- `Logout` llama `/api/auth/logout` y luego redirige a `/login`

> Recomendación de implementación: cuando se use cookie auth, preferir `fetch(..., { credentials: 'include' })` para que el navegador envíe cookies al BFF.

---

## API interna (BFF) — cómo está organizada

La idea del BFF (`src/app/api/*`) es:
- Evitar pegarle directo desde el browser a proveedores externos
- Centralizar headers, API keys, y formateo de respuestas
- Mantener el frontend consumiendo **solo** `/api/*`

### Users (ReqRes)
- Endpoint interno: `GET /api/users?page=1`
- Upstream: `GET https://reqres.in/api/users?page=1`
- Respuesta: `{ page, per_page, total, total_pages, data: [...] }`

### Posts (JSONPlaceholder)
- JSONPlaceholder `/posts` devuelve un **array**, sin paginación real.
- Endpoint interno típico: `GET /api/posts?page=1&limit=10`
  - Hace fetch a `/posts`
  - Paginación “simulada” (slice en backend)
  - Respuesta paginada: `{ page, per_page, total, total_pages, data: Post[] }`

### Post Detail + Comments
- `GET /api/posts/:id` → post individual
- `GET /api/posts/:id/comments` → comments array
  - Upstream ejemplo: `https://jsonplaceholder.typicode.com/posts/3/comments`

---

## UI por módulos (components)

En `src/components/` se organiza UI por dominio:

### `components/ui` (átomos reutilizables)
Ejemplos típicos:
- `Button`
- `InputField`
- `Pagination`
- etc.

Objetivo: componentes sin lógica de negocio, reutilizables en posts/users/auth.

### `components/auth`
- `AuthCard`
- `LoginForm`
Objetivo: encapsular UI de autenticación.

### `components/users`
- Toolbar (búsqueda, filtros, bulk actions)
- Table (render TanStack Table)
- helpers (badge/clases, etc.)
Objetivo: UI específica de la vista de usuarios.

### `components/posts`
- List item
- Header
- Detail header
- Comments list y comment card
Objetivo: UI específica para posts y comments.

---

## Data Fetching (TanStack Query)

Se usa `useQuery` para:
- cache por `queryKey`
- loading/error states
- refetch controlado
- paginación (queryKey incluye page/limit)

Buenas prácticas usadas:
- `keepPreviousData: true` para que no parpadee al cambiar página
- `staleTime` para reducir requests repetidos

---

## Estilos (TailwindCSS v4)
El proyecto usa Tailwind para:
- Layout consistente
- Cards, bordes, sombras, spacing
- estados (hover/focus/disabled)
- skeletons de loading

---
