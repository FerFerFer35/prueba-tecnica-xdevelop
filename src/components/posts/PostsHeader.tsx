export default function PostsHeader({
    total,
    page,
    totalPages,
    isFetching,
}: {
    total: number
    page: number
    totalPages: number
    isFetching?: boolean
}) {
    return (
        <div className="flex flex-col gap-3 border-b border-zinc-200 p-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Posts</h1>
                <div className="mt-2 text-xs text-zinc-500">
                    Total:{' '}
                    <span className="font-semibold tabular-nums text-zinc-900">{total}</span>
                    {isFetching ? <> • Actualizando…</> : null}
                </div>
            </div>

            <div className="text-sm text-zinc-600">
                Page <span className="font-semibold tabular-nums text-zinc-900">{page}</span> /{' '}
                <span className="font-semibold tabular-nums text-zinc-900">{totalPages}</span>
            </div>
        </div>
    )
}