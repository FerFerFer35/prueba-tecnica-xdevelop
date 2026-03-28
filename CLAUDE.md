# Claude Instructions

Sigue todas las reglas de `AGENTS.md`.

## Preferencias para este repo
1) Prioriza soluciones simples (nivel trainee) pero correctas:
   - claridad > complejidad
   - UX decente (loaders/errores) sin sobre-ingeniería

2) Cuando propongas cambios de autenticación:
   - No cambies el nombre de la cookie sin actualizar también `src/middleware.ts`.
   - No elimines `refreshToken` httpOnly (aunque sea simulado).

3) Cuando propongas cambios de data fetching:
   - Mantén `useQuery` con `queryKey` estable.
   - En paginación, usa `placeholderData: keepPreviousData`.

4) Antes de sugerir refactors grandes:
   - Proponer primero una versión mínima.
   - Mantener rutas y exports existentes.

5) Cuando generes documentación:
   - Referenciar archivos reales del repo (rutas exactas).
   - Evitar prometer features no implementadas.
