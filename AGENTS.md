<!-- BEGIN:repo-agent-rules -->
# Agent Rules (Repository)

Este repositorio contiene una prueba técnica en **Next.js App Router** con TypeScript.
Estas reglas aplican para cualquier herramienta asistida por IA (GitHub Copilot, Claude, etc.)
y para cualquier contribución.

## 1) Objetivo del proyecto
- Implementar autenticación por cookies (accessToken + refreshToken simulado).
- Proteger rutas con `src/middleware.ts`.
- Consumir APIs públicas mediante un BFF interno en `src/app/api/*`.
- UI con Tailwind + TanStack Query + TanStack Table + Zustand.
- Mantener documentación clara en `README.md`.

## 2) Reglas de arquitectura (NO romper)
- App Router vive en `src/app/*`.
- API (BFF) vive en `src/app/api/*`.
- Providers globales viven en `src/providers/*`.
- Helpers/clients de fetch viven en `src/lib/*`.
- Estado global en `src/store/*`.
- Componentes por dominio en `src/components/*` (auth/users/posts/ui).

## 3) Reglas de autenticación / cookies
- Cookie **accessToken**: accesible por JS (httpOnly: false).
- Cookie **refreshToken**: httpOnly: true, sameSite=lax, secure en producción.
- `src/middleware.ts` debe validar **accessToken** (mismo nombre exacto).
- Tras login/logout, refrescar navegación con `router.refresh()` cuando aplique.

## 4) Reglas de TanStack Query (v5)
- No usar `keepPreviousData: true` (v4). En v5 usar:
  - `placeholderData: keepPreviousData`

## 5) Estándares de código
- TypeScript estricto: no introducir `any` salvo justificación.
- Manejar estados: loading, error, empty.
- Evitar duplicación: mover UI repetida a `components/ui` y componentes de dominio.
- Mantener imports consistentes y sin imports sin uso.

## 6) Comandos de verificación (antes de push)
- `npm run build` (obligatorio, evita errores en Vercel)
- `npm run lint` (si aplica)

## 7) Documentación
- Cualquier feature importante debe reflejarse en `README.md`:
  - endpoints agregados en `/api`
  - rutas protegidas
  - decisiones de arquitectura relevantes
<!-- END:repo-agent-rules -->
