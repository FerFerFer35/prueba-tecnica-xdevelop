import StatsCard from '@/components/ui/StatsCard'

export default function DashboardPage() {
    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-zinc-600">
                            Bienvenido, estás autenticado. Elige a dónde quieres ir.
                        </p>
                    </div>

                    <div className="mt-3 text-xs text-zinc-500 sm:mt-0">
                        Tip: Users usa ReqRes (paginación real) y Posts usa JSONPlaceholder.
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <StatsCard
                        title="Gestión de usuarios"
                        description="Tabla con paginación real (ReqRes), búsqueda, filtros y bulk actions simulados."
                        href="/users"
                        cta="Ir a Users"
                        badge="/users"
                    />

                    <StatsCard
                        title="Posts + Comments"
                        description="Listado paginado (simulado) y detalle por post con /posts/:id/comments."
                        href="/posts"
                        cta="Ir a Posts"
                        badge="/posts"
                    />
                </div>

                {/* <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-3 sm:p-5">
                    <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            Seguridad
                        </div>
                        <div className="mt-1 text-sm text-zinc-700">
                            Rutas protegidas por layouts server-side (Next 16).
                        </div>
                    </div>

                    <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            Datos
                        </div>
                        <div className="mt-1 text-sm text-zinc-700">
                            BFF interno en <span className="font-mono text-xs">/api</span> (no exponemos API keys).
                        </div>
                    </div>

                    <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                            UI
                        </div>
                        <div className="mt-1 text-sm text-zinc-700">
                            Componentes reutilizables (Atomic: ui/auth/layout/users/posts).
                        </div>
                    </div>
                </div> */}
            </div>
        </main>
    )
}