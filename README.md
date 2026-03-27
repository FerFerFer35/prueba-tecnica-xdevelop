# 🧱 Fase 1 - Configuración Base del Proyecto

En esta fase se estableció la arquitectura base del proyecto utilizando **Next.js con App Router**, junto con herramientas modernas para manejo de estado y datos asincrónicos.

El objetivo principal es contar con una base sólida, escalable y organizada que facilite el desarrollo de las siguientes funcionalidades.

---

## 📁 Estructura de Carpetas

Ubicación: `src/`

* `app/` → Contiene las rutas de la aplicación (pages y layouts).
* `components/` → Componentes reutilizables de UI.
* `hooks/` → Hooks personalizados para lógica reutilizable.
* `lib/` → Funciones utilitarias y helpers (por ejemplo, manejo de peticiones HTTP).
* `providers/` → Proveedores globales de la aplicación.
* `services/` → Funciones encargadas de consumir APIs externas.
* `store/` → Manejo de estado global con Zustand.
* `types/` → Definición de tipos globales con TypeScript.

---

## ⚙️ Configuración de React Query

📄 Ubicación: `src/providers/query-provider.tsx`

Se implementa un proveedor global para **React Query**, encargado de gestionar:

* Peticiones asincrónicas
* Cache de datos
* Estados de carga, error y éxito
* Optimización de refetch

Este provider permite centralizar el manejo de datos en toda la aplicación.

---

## 🌐 Layout Global

📄 Ubicación: `src/app/layout.tsx`

Archivo principal que envuelve toda la aplicación.

Aquí se integra el provider de React Query, permitiendo que todos los componentes y páginas tengan acceso a sus funcionalidades.

---

## 🧠 Estado Global (Zustand)

📄 Ubicación: `src/store/auth.store.ts`

Se define un store global para manejar el estado de autenticación de la aplicación.

Responsabilidades principales:

* Almacenar información del usuario autenticado
* Manejar el rol del usuario (admin o user)
* Controlar el estado de autenticación
* Proveer funciones para actualizar el estado (login, logout, cambio de rol)

Este enfoque permite acceder al estado desde cualquier parte de la aplicación sin necesidad de props drilling.

---

## 🧾 Tipos Globales

📄 Ubicación: `src/types/auth.ts`

Se definen tipos reutilizables para mantener consistencia en el manejo de datos.

Beneficios:

* Mejora la legibilidad del código
* Reduce errores en tiempo de desarrollo
* Facilita el mantenimiento del proyecto

---

## 🔧 Helper de API

📄 Ubicación: `src/lib/api.ts`

Se implementa una función utilitaria para centralizar las peticiones HTTP.

Responsabilidades:

* Ejecutar peticiones a APIs externas
* Manejar errores de forma uniforme
* Evitar duplicación de lógica en múltiples archivos

---

## 🧠 Decisiones Técnicas

* **React Query** se utiliza para el manejo de estado asincrónico y cacheo de datos.
* **Zustand** se selecciona como solución ligera para el estado global.
* **TypeScript** garantiza tipado fuerte y mayor confiabilidad.
* **Separación por capas** (store, services, hooks, lib) para una arquitectura escalable y mantenible.

---

## ✅ Resultado de la Fase

* Configuración global de manejo de datos asincrónicos
* Estado de autenticación centralizado
* Estructura de proyecto limpia y organizada
* Base lista para implementar autenticación, consumo de APIs y lógica de negocio
