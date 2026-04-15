import type { FoodDetail } from '@/types/food'

/**
 * Encabezado del detalle de un alimento con botón de volver y datos principales.
 *
 * @param props.food - Detalle del alimento
 * @param props.onBack - Callback para volver atrás
 */
export default function FoodDetailHeader({
    food,
    onBack,
}: {
    food: FoodDetail
    onBack: () => void
}) {
    return (
        <div className="border-b border-zinc-200 p-6">
            <button
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900"
            >
                <span>←</span> Volver
            </button>

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                {food.description}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                <span>
                    FDC ID:{' '}
                    <span className="font-semibold tabular-nums text-zinc-900">{food.fdcId}</span>
                </span>

                {food.dataType ? (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700 ring-1 ring-inset ring-zinc-200">
                        {food.dataType}
                    </span>
                ) : null}

                {food.brandOwner ? (
                    <span>
                        Marca: <span className="text-zinc-700">{food.brandOwner}</span>
                    </span>
                ) : null}

                {food.servingSize ? (
                    <span>
                        Porción:{' '}
                        <span className="font-semibold text-zinc-900">
                            {food.servingSize} {food.servingSizeUnit ?? 'g'}
                        </span>
                    </span>
                ) : null}
            </div>

            {food.ingredients ? (
                <div className="mt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Ingredientes
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-700">{food.ingredients}</p>
                </div>
            ) : null}
        </div>
    )
}
