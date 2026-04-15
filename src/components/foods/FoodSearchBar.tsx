'use client'

import * as React from 'react'

/**
 * Barra de búsqueda para alimentos USDA.
 *
 * Permite al usuario escribir un término y buscar al presionar Enter o el botón.
 *
 * @param props.onSearch - Callback invocado con el término de búsqueda
 * @param props.initialQuery - Valor inicial del campo de búsqueda
 */
export default function FoodSearchBar({
    onSearch,
    initialQuery = '',
}: {
    onSearch: (query: string) => void
    initialQuery?: string
}) {
    const [input, setInput] = React.useState(initialQuery)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = input.trim()
        if (trimmed) {
            onSearch(trimmed)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 border-b border-zinc-200 p-6">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Buscar alimento (ej: apple, chicken, rice…)"
                className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            >
                Buscar
            </button>
        </form>
    )
}
