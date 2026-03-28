'use client'

import * as React from 'react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { fetcher } from '@/lib/api'
import { downloadTextFile, toCsv } from '@/lib/csv'

import UsersToolbar from '@/components/users/UsersToolbar'
import UsersTable from '@/components/users/UsersTable'
import { roleBadgeClass, type Role } from '@/components/users/roleBadge'
import Button from '@/components/ui/Button'

type ReqResUser = {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

type ReqResUsersResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: ReqResUser[]
    support?: unknown
    _meta?: unknown
}

type Row = ReqResUser & { role: Role }

/**
 * Página de gestión de usuarios del sistema.
 * 
 * Proporciona una interfaz completa para administrar usuarios incluyendo:
 * - Visualización paginada de usuarios desde la API ReqRes
 * - Búsqueda por nombre completo, email o ID
 * - Filtrado por rol (admin, user o todos)
 * - Selección múltiple de registros
 * - Operaciones en lote: eliminar usuarios y cambiar roles
 * - Exportación de datos a CSV
 * - Estados simulados de eliminación y cambios de rol (sin persistencia)
 * 
 * @component
 * @returns {React.ReactNode} Página renderizada con tabla de usuarios, filtros y controles
 * 
 * @example
 * // Uso en el enrutador
 * import UsersPage from '@/app/(protected)/users/page'
 * 
 * @remarks
 * - Los cambios de rol y eliminaciones son simulados en el estado local
 * - Los datos se cachean durante 60 segundos
 * - La paginación se controla mediante el estado local de `page`
 * - Utiliza React Query para la obtención y caché de datos
 * - Utiliza TanStack React Table para la gestión avanzada de tablas
 * 
 * @state
 * - `page` - Número de página actual
 * - `search` - Término de búsqueda
 * - `roleFilter` - Filtro de rol seleccionado
 * - `deletedIds` - IDs de usuarios marcados como eliminados
 * - `roleOverrides` - Cambios de rol aplicados
 */

export default function UsersPage() {
    const [page, setPage] = React.useState(1)

    const [search, setSearch] = React.useState('')
    const [roleFilter, setRoleFilter] = React.useState<Role | 'all'>('all')

    // simulated bulk state
    const [deletedIds, setDeletedIds] = React.useState<Record<number, true>>({})
    const [roleOverrides, setRoleOverrides] = React.useState<Record<number, Role>>({})

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['reqres-users', page],
        queryFn: () => fetcher<ReqResUsersResponse>(`/api/users?page=${page}`),
        staleTime: 60_000,
        placeholderData: keepPreviousData,
    })

    const getRole = React.useCallback(
        (id: number): Role => roleOverrides[id] ?? (id % 2 === 0 ? 'admin' : 'user'),
        [roleOverrides]
    )

    const rows: Row[] = React.useMemo(() => {
        const base: Row[] = (data?.data ?? [])
            .filter((u) => !deletedIds[u.id])
            .map((u) => ({ ...u, role: getRole(u.id) }))

        const q = search.trim().toLowerCase()
        const afterSearch = q
            ? base.filter((u) => {
                const fullName = `${u.first_name} ${u.last_name}`.toLowerCase()
                return (
                    fullName.includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    String(u.id).includes(q)
                )
            })
            : base

        return roleFilter === 'all' ? afterSearch : afterSearch.filter((u) => u.role === roleFilter)
    }, [data?.data, deletedIds, getRole, roleFilter, search])

    const handleExportCsv = React.useCallback(() => {
        const csv = toCsv(
            rows.map((r) => ({
                id: r.id,
                fullName: `${r.first_name} ${r.last_name}`,
                email: r.email,
                role: r.role,
            })),
            [
                { key: 'id', header: 'ID' },
                { key: 'fullName', header: 'Nombre' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Rol' },
            ]
        )

        const filename = `users_page-${page}.csv`
        downloadTextFile(filename, '\uFEFF' + csv)
    }, [rows, page])

    const columns = React.useMemo<ColumnDef<Row>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <div className="flex items-center justify-center">
                        <input
                            aria-label="Select all rows"
                            type="checkbox"
                            className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600"
                            checked={table.getIsAllPageRowsSelected()}
                            onChange={table.getToggleAllPageRowsSelectedHandler()}
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center justify-center">
                        <input
                            aria-label={`Select row ${row.original.id}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-600"
                            checked={row.getIsSelected()}
                            onChange={row.getToggleSelectedHandler()}
                        />
                    </div>
                ),
                enableSorting: false,
                size: 40,
            },
            {
                accessorKey: 'id',
                header: 'ID',
                cell: ({ row }) => <span className="font-mono text-xs text-zinc-600">{row.original.id}</span>,
            },
            {
                id: 'user',
                header: 'Usuario',
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <div className="leading-tight">
                            <div className="font-medium text-zinc-900">
                                {row.original.first_name} {row.original.last_name}
                            </div>
                            <div className="text-sm text-zinc-600">{row.original.email}</div>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: 'role',
                header: 'Rol',
                cell: ({ row }) => (
                    <span className={roleBadgeClass(row.original.role)}>{row.original.role}</span>
                ),
            },
        ],
        []
    )

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
    })

    const selectedIds = table.getSelectedRowModel().rows.map((r) => r.original.id)

    const totalPages = data?.total_pages ?? 1
    const currentPage = data?.page ?? page
    const perPage = data?.per_page
    const total = data?.total

    function bulkDeleteSelected() {
        if (selectedIds.length === 0) return
        setDeletedIds((prev) => {
            const next = { ...prev }
            selectedIds.forEach((id) => (next[id] = true))
            return next
        })
        table.resetRowSelection()
    }

    function bulkSetRole(role: Role) {
        if (selectedIds.length === 0) return
        setRoleOverrides((prev) => {
            const next = { ...prev }
            selectedIds.forEach((id) => (next[id] = role))
            return next
        })
        table.resetRowSelection()
    }

    function resetSimulatedState() {
        setDeletedIds({})
        setRoleOverrides({})
        table.resetRowSelection()
    }

    if (isLoading) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-40 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-6 h-10 w-full animate-pulse rounded bg-zinc-100" />
                    <div className="mt-4 h-64 w-full animate-pulse rounded bg-zinc-100" />
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="mx-auto w-full max-w-6xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    <div className="text-lg font-semibold">Error cargando usuarios</div>
                    <div className="mt-1 text-sm opacity-90">{(error as Error).message}</div>
                </div>
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-zinc-200 p-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Gestión de usuarios</h1>
                        <div className="mt-2 text-xs text-zinc-500">
                            {typeof total === 'number' ? <>Total: {total}</> : null}
                            {typeof perPage === 'number' ? <> • per_page: {perPage}</> : null}
                            {isFetching ? <> • Actualizando…</> : null}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" onClick={resetSimulatedState}>
                            Reset
                        </Button>
                        <Button onClick={handleExportCsv} variant="ghost">
                            Exportar CSV
                        </Button>
                    </div>
                </div>

                <UsersToolbar
                    search={search}
                    onSearchChange={setSearch}
                    roleFilter={roleFilter}
                    onRoleFilterChange={setRoleFilter}
                    selectedCount={selectedIds.length}
                    onBulkDelete={bulkDeleteSelected}
                    onBulkRoleAdmin={() => bulkSetRole('admin')}
                    onBulkRoleUser={() => bulkSetRole('user')}
                />

                <UsersTable
                    table={table}
                    columnsLength={columns.length}
                    emptyText="Sin resultados (por filtros/borrado simulado)."
                />

                <div className="flex items-center justify-between gap-3 border-t border-zinc-200 p-6">
                    <div className="text-sm text-zinc-600">
                        Page <span className="font-semibold text-zinc-900 tabular-nums">{currentPage}</span> /{' '}
                        <span className="font-semibold text-zinc-900 tabular-nums">{totalPages}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage <= 1}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Prev
                        </button>

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage >= totalPages}
                            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}