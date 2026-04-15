'use client'

import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/api'
import type { FoodDetail } from '@/types/food'
import FoodDetailHeader from '@/components/foods/FoodDetailHeader'
import NutrientsList from '@/components/foods/NutrientsList'

/**
 * Página de detalle de un alimento.
 *
 * Renderiza los datos completos de un alimento obtenido desde USDA FoodData Central,
 * incluyendo descripción, marca, ingredientes y tabla de información nutricional.
 *
 * @component
 * @remarks
 * - Obtiene el FDC ID desde los parámetros de la ruta
 * - Los datos se cachean durante 60 segundos (staleTime)
 * - Maneja estados de carga, error e ID inválido
 */
export default function FoodDetailPage() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const fdcId = Number(params?.id)

    const foodQuery = useQuery({
        queryKey: ['food', fdcId],
        enabled: Number.isFinite(fdcId) && fdcId > 0,
        queryFn: () => fetcher<FoodDetail>(`/api/foods/${fdcId}`),
        staleTime: 60_000,
    })

    if (!Number.isFinite(fdcId) || fdcId <= 0) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    ID de alimento inválido
                </div>
            </div>
        )
    }

    if (foodQuery.isLoading) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-48 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-3 h-20 w-full animate-pulse rounded bg-zinc-100" />
                    <div className="mt-6 h-5 w-32 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-3 space-y-3">
                        <div className="h-10 animate-pulse rounded bg-zinc-100" />
                        <div className="h-10 animate-pulse rounded bg-zinc-100" />
                        <div className="h-10 animate-pulse rounded bg-zinc-100" />
                    </div>
                </div>
            </div>
        )
    }

    if (foodQuery.isError) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    Error cargando alimento: {(foodQuery.error as Error).message}
                </div>
            </div>
        )
    }

    const food = foodQuery.data!

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <FoodDetailHeader food={food} onBack={() => router.back()} />
                <NutrientsList nutrients={food.foodNutrients} />
            </div>
        </div>
    )
}
