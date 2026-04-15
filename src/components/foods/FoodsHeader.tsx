/**
 * Encabezado de la sección de alimentos que muestra información de búsqueda y paginación.
 *
 * @param props.query - Término de búsqueda actual
 * @param props.total - Número total de resultados
 * @param props.page - Número de página actual
 * @param props.totalPages - Número total de páginas
 * @param props.isFetching - Indica si hay una petición en curso
 */
export default function FoodsHeader({
    query,
    total,
    page,
    totalPages,
    isFetching,
}: {
    query: string
    total: number
    page: number
    totalPages: number
    isFetching?: boolean
}) {
    return (
        <div className="flex flex-col gap-3 border-b border-zinc-200 p-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    Alimentos — USDA
                </h1>
                {query ? (
                    <div className="mt-2 text-xs text-zinc-500">
                        Resultados para &ldquo;<span className="font-medium text-zinc-700">{query}</span>&rdquo;
                        {' · '}
                        Total:{' '}
                        <span className="font-semibold tabular-nums text-zinc-900">{total}</span>
                        {isFetching ? <> • Actualizando…</> : null}
                    </div>
                ) : (
                    <p className="mt-2 text-xs text-zinc-500">
                        Busca alimentos en la base de datos USDA FoodData Central
                    </p>
                )}
            </div>

            {query && totalPages > 0 ? (
                <div className="text-sm text-zinc-600">
                    Página{' '}
                    <span className="font-semibold tabular-nums text-zinc-900">{page}</span> /{' '}
                    <span className="font-semibold tabular-nums text-zinc-900">{totalPages}</span>
                </div>
            ) : null}
        </div>
    )
}
