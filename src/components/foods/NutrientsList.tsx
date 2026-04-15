import type { FoodDetailNutrient } from '@/types/food'

/**
 * Lista de nutrientes para el detalle de un alimento.
 *
 * Muestra los nutrientes en una tabla con nombre, valor y unidad.
 *
 * @param props.nutrients - Array de nutrientes del alimento
 */
export default function NutrientsList({ nutrients }: { nutrients: FoodDetailNutrient[] }) {
    if (nutrients.length === 0) {
        return (
            <div className="p-6 text-sm text-zinc-500">
                No hay datos nutricionales disponibles para este alimento.
            </div>
        )
    }

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                Información nutricional
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
                {nutrients.length} nutrientes registrados
            </p>

            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            <th className="pb-2 pr-4">Nutriente</th>
                            <th className="pb-2 pr-4 text-right">Valor</th>
                            <th className="pb-2">Unidad</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {nutrients.map((n) => (
                            <tr key={n.nutrientId} className="hover:bg-zinc-50">
                                <td className="py-2 pr-4 text-zinc-900">{n.nutrientName}</td>
                                <td className="py-2 pr-4 text-right font-semibold tabular-nums text-zinc-900">
                                    {n.value}
                                </td>
                                <td className="py-2 text-zinc-500">{n.unitName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
