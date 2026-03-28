'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { useState } from "react"

/**
 * Proveedor de cliente de consultas para la aplicación.
 * 
 * Envuelve la aplicación con el contexto de QueryClient de React Query,
 * permitiendo el uso de hooks de consultas en toda la aplicación.
 * 
 * @param props - Props del componente
 * @param props.children - Elementos hijos a envolver con el proveedor
 * @returns Componente proveedor de React Query con herramientas de desarrollo
 * 
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}