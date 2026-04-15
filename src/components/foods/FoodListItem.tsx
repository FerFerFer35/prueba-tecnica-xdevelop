import Link from 'next/link'
import type { FoodSearchItem } from '@/types/food'

/**
 * Componente que renderiza un alimento individual en la lista de resultados de búsqueda.
 *
 * Muestra la información principal del alimento incluyendo:
 * - FDC ID como etiqueta
 * - Nombre/descripción del alimento con enlace al detalle
 * - Tipo de dato (dataType) y marca (brandOwner) si existe
 * - Hasta 5 nutrientes principales
 * - Botón para ver el detalle completo
 *
 * @param props.food - Objeto del alimento de tipo FoodSearchItem
 */
export default function FoodListItem({ food }: { food: FoodSearchItem }) {
    return (
        <li className="p-6 hover:bg-zinc-50">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-zinc-900">
                        <span className="mr-2 font-mono text-xs text-zinc-500">
                            #{food.fdcId}
                        </span>

                        <Link
                            href={`/foods/${food.fdcId}`}
                            className="underline-offset-4 hover:underline"
                        >
                            {food.description}
                        </Link>
                    </h2>

                    {food.brandOwner ? (
                        <p className="mt-1 text-xs text-zinc-500">
                            Marca: <span className="text-zinc-700">{food.brandOwner}</span>
                        </p>
                    ) : null}

                    {food.foodNutrients.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {food.foodNutrients.map((n) => (
                                <span
                                    key={n.nutrientId}
                                    className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-800 ring-1 ring-inset ring-emerald-200"
                                >
                                    {n.nutrientName}:{' '}
                                    <span className="font-semibold tabular-nums">
                                        {n.value} {n.unitName}
                                    </span>
                                </span>
                            ))}
                        </div>
                    ) : null}

                    <div className="mt-4 flex items-center gap-2">
                        <Link
                            href={`/foods/${food.fdcId}`}
                            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                        >
                            Ver detalle
                        </Link>
                    </div>
                </div>

                <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 ring-1 ring-inset ring-zinc-200">
                    {food.dataType}
                </span>
            </div>
        </li>
    )
}
