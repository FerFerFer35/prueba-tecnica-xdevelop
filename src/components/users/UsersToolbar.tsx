'use client'

import * as React from 'react'
import Button from '@/components/ui/Button'
import type { Role } from './roleBadge'

/**
 * Barra de herramientas para la gestión de usuarios.
 * Proporciona funcionalidades de búsqueda, filtrado por rol y acciones en lote.
 *
 * @component
 * @param {Object} props - Las propiedades del componente
 * @param {string} props.search - Valor actual del campo de búsqueda
 * @param {(value: string) => void} props.onSearchChange - Callback ejecutado cuando cambia el valor de búsqueda
 * @param {Role | 'all'} props.roleFilter - Filtro de rol actualmente seleccionado
 * @param {(value: Role | 'all') => void} props.onRoleFilterChange - Callback ejecutado cuando cambia el filtro de rol
 * @param {number} props.selectedCount - Cantidad de usuarios seleccionados
 * @param {() => void} props.onBulkDelete - Callback para eliminar usuarios seleccionados en lote
 * @param {() => void} props.onBulkRoleAdmin - Callback para asignar rol de administrador a usuarios seleccionados
 * @param {() => void} props.onBulkRoleUser - Callback para asignar rol de usuario a usuarios seleccionados
 *
 * @returns {JSX.Element} Elemento JSX que renderiza la barra de herramientas de usuarios
 *
 * @example
 * <UsersToolbar
 *   search={search}
 *   onSearchChange={setSearch}
 *   roleFilter={roleFilter}
 *   onRoleFilterChange={setRoleFilter}
 *   selectedCount={3}
 *   onBulkDelete={handleDelete}
 *   onBulkRoleAdmin={handleRoleAdmin}
 *   onBulkRoleUser={handleRoleUser}
 * />
 */

export default function UsersToolbar({
    search,
    onSearchChange,
    roleFilter,
    onRoleFilterChange,
    selectedCount,
    onBulkDelete,
    onBulkRoleAdmin,
    onBulkRoleUser,
}: {
    search: string
    onSearchChange: (value: string) => void
    roleFilter: Role | 'all'
    onRoleFilterChange: (value: Role | 'all') => void
    selectedCount: number
    onBulkDelete: () => void
    onBulkRoleAdmin: () => void
    onBulkRoleUser: () => void
}) {
    return (
        <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <div className="w-full sm:max-w-sm">
                    <label className="sr-only" htmlFor="user-search">
                        Buscar
                    </label>
                    <input
                        id="user-search"
                        placeholder="Buscar por nombre, email o ID…"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    />
                </div>

                <div>
                    <label className="sr-only" htmlFor="role-filter">
                        Rol
                    </label>
                    <select
                        id="role-filter"
                        value={roleFilter}
                        onChange={(e) => onRoleFilterChange(e.target.value as any)}
                        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
                    >
                        <option value="all">Todos los roles</option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>
                </div>

                <span className="text-sm text-zinc-600">
                    Seleccionados:{' '}
                    <span className="font-semibold tabular-nums text-zinc-900">{selectedCount}</span>
                </span>
            </div>

            <div className="flex flex-wrap gap-2">
                <Button
                    variant="danger"
                    onClick={onBulkDelete}
                    disabled={selectedCount === 0}
                >
                    Borrar seleccionados
                </Button>

                <Button
                    variant="primary"
                    onClick={onBulkRoleAdmin}
                    disabled={selectedCount === 0}
                >
                    Rol: admin
                </Button>

                <Button
                    className="bg-zinc-900 hover:bg-zinc-800 focus:ring-zinc-900"
                    variant="primary"
                    onClick={onBulkRoleUser}
                    disabled={selectedCount === 0}
                >
                    Rol: user
                </Button>
            </div>
        </div>
    )
}