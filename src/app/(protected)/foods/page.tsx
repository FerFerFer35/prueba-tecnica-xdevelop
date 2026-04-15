'use client'

import * as React from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetcher } from '@/lib/api'
import type { FoodsSearchResponse } from '@/types/food'
import FoodsHeader from '@/components/foods/FoodsHeader'
import FoodSearchBar from '@/components/foods/FoodSearchBar'
import FoodListItem from '@/components/foods/FoodListItem'
import Pagination from '@/components/ui/Pagination'

/**
 * Página de búsqueda de alimentos en USDA FoodData Central.
 *
 * Permite buscar alimentos por nombre/término, muestra resultados paginados
 * con información nutricional básica y enlace al detalle de cada alimento.
 *
 * @component
 * @remarks
 * - Usa React Query para gestionar la obtención y caché de datos
 * - Los datos se mantienen frescos durante 60 segundos (staleTime)
 * - Soporta paginación con límite de 10 resultados por página
 * - Utiliza keepPreviousData para mantener datos previos durante cambio de página
 */
export default function FoodsPage() {
    const [query, setQuery] = React.useState('')
    const [page, setPage] = React.useState(1)
    const pageSize = 10

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['foods', query, page, pageSize],
        queryFn: () =>
            fetcher<FoodsSearchResponse>(
                `/api/foods?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
            ),
        enabled: query.length > 0,
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    })

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery)
        setPage(1)
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <FoodsHeader
                    query={query}
                    total={data?.total ?? 0}
                    page={data?.page ?? page}
                    totalPages={data?.total_pages ?? 0}
                    isFetching={isFetching}
                />

                <FoodSearchBar onSearch={handleSearch} initialQuery={query} />

                {isLoading ? (
                    <div className="p-6">
                        <div className="space-y-3">
                            <div className="h-16 animate-pulse rounded bg-zinc-100" />
                            <div className="h-16 animate-pulse rounded bg-zinc-100" />
                            <div className="h-16 animate-pulse rounded bg-zinc-100" />
                        </div>
                    </div>
                ) : isError ? (
                    <div className="p-6">
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                            <div className="text-lg font-semibold">Error buscando alimentos</div>
                            <div className="mt-1 text-sm opacity-90">
                                {(error as Error).message}
                            </div>
                        </div>
                    </div>
                ) : data && data.data.length > 0 ? (
                    <>
                        <ul className="divide-y divide-zinc-200">
                            {data.data.map((food) => (
                                <FoodListItem key={food.fdcId} food={food} />
                            ))}
                        </ul>

                        <Pagination
                            page={data.page}
                            totalPages={data.total_pages}
                            onPrev={() => setPage((p) => Math.max(1, p - 1))}
                            onNext={() =>
                                setPage((p) => Math.min(data.total_pages, p + 1))
                            }
                        />
                    </>
                ) : query ? (
                    <div className="p-6 text-center text-sm text-zinc-500">
                        No se encontraron alimentos para &ldquo;{query}&rdquo;.
                    </div>
                ) : (
                    <div className="p-6 text-center text-sm text-zinc-500">
                        Escribe un término de búsqueda para comenzar.
                    </div>
                )}
            </div>
        </div>
    )
}
