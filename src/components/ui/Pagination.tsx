'use client'

import * as React from 'react'

/**
 * Componente de paginación para navegar entre páginas.
 * 
 * Muestra el número de página actual y el total de páginas, además de proporcionar
 * botones para navegar a la página anterior o siguiente.
 * 
 * @component
 * @example
 * ```tsx
 * <Pagination
 *   page={1}
 *   totalPages={10}
 *   onPrev={() => setPage(page - 1)}
 *   onNext={() => setPage(page + 1)}
 * />
 * ```
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {number} props.page - Número de página actual (comienza desde 1)
 * @param {number} props.totalPages - Número total de páginas disponibles
 * @param {() => void} props.onPrev - Función callback ejecutada al hacer clic en el botón "Anterior"
 * @param {() => void} props.onNext - Función callback ejecutada al hacer clic en el botón "Siguiente"
 * 
 * @returns {JSX.Element} Un elemento div que contiene el indicador de página y los botones de navegación
 */

export default function Pagination({
    page,
    totalPages,
    onPrev,
    onNext,
}: {
    page: number
    totalPages: number
    onPrev: () => void
    onNext: () => void
}) {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-zinc-200 p-6">
            <div className="text-sm text-zinc-600">
                Page <span className="font-semibold tabular-nums text-zinc-900">{page}</span> /{' '}
                <span className="font-semibold tabular-nums text-zinc-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onPrev}
                    disabled={page <= 1}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                    Prev
                </button>

                <button
                    onClick={onNext}
                    disabled={page >= totalPages}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
}