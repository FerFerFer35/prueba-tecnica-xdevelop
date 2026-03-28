'use client'

import * as React from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetcher } from '@/lib/api'
import PostsHeader from '@/components/posts/PostsHeader'
import PostListItem from '@/components/posts/PostListItem'
import Pagination from '@/components/ui/Pagination'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

type PostsResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Post[]
}

/**
 * Página de listado de posts con paginación.
 * 
 * Componente que muestra una lista de posts obtenidos de la API con soporte para paginación.
 * Implementa estados de carga, error y visualización de datos utilizando React Query.
 * 
 * @component
 * @returns {React.ReactElement} El componente renderizado con la lista de posts paginada,
 *                               o un skeleton loader durante la carga, o un mensaje de error
 *                               en caso de fallo en la solicitud.
 * 
 * @example
 * // Uso básico
 * <PostsPage />
 * 
 * @remarks
 * - Utiliza React Query para gestionar la obtención y caché de datos
 * - La página se mantiene fresca durante 60 segundos (staleTime)
 * - Soporta navegación entre páginas con límite de 10 posts por página
 * - Muestra un skeleton loader mientras carga los datos
 * - Implementa manejo de errores con mensaje descriptivo
 * - Utiliza keepPreviousData para mantener datos previos durante la carga de nueva página
 */

export default function PostsPage() {
    const [page, setPage] = React.useState(1)
    const limit = 10

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['posts', page, limit],
        queryFn: () => fetcher<PostsResponse>(`/api/posts?page=${page}&limit=${limit}`),
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    })

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-36 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-6 space-y-3">
                        <div className="h-16 animate-pulse rounded bg-zinc-100" />
                        <div className="h-16 animate-pulse rounded bg-zinc-100" />
                        <div className="h-16 animate-pulse rounded bg-zinc-100" />
                    </div>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    <div className="text-lg font-semibold">Error cargando posts</div>
                    <div className="mt-1 text-sm opacity-90">{(error as Error).message}</div>
                </div>
            </div>
        )
    }

    if (!data) return null

    const totalPages = data.total_pages
    const currentPage = data.page

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <PostsHeader
                    total={data.total}
                    page={currentPage}
                    totalPages={totalPages}
                    isFetching={isFetching}
                />

                <ul className="divide-y divide-zinc-200">
                    {data.data.map((p) => (
                        <PostListItem key={p.id} post={p} />
                    ))}
                </ul>

                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                    onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
            </div>
        </div>
    )
}