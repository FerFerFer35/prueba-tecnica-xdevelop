'use client'

import * as React from 'react'
import {
    ColumnDef,
    flexRender,
    Table as TanStackTable,
} from '@tanstack/react-table'

/**
 * Componente de tabla genérica para mostrar datos de usuarios.
 * 
 * @template T - Tipo genérico de datos que contiene la tabla
 * 
 * @param {Object} props - Propiedades del componente
 * @param {TanStackTable<T>} props.table - Instancia de la tabla TanStack configurada
 * @param {number} props.columnsLength - Cantidad total de columnas en la tabla
 * @param {string} [props.emptyText='Sin resultados.'] - Mensaje personalizado que se muestra cuando la tabla no tiene datos
 * 
 * @returns {JSX.Element} Elemento renderizado de la tabla con estilos de Tailwind CSS
 * 
 * @description
 * Renderiza una tabla responsiva con soporte para scroll horizontal.
 * Incluye encabezados estilizados y filas con hover effect.
 * Muestra un mensaje personalizado cuando no hay datos disponibles.
 * 
 * @example
 * ```tsx
 * <UsersTable 
 *   table={tableInstance} 
 *   columnsLength={5}
 *   emptyText="No hay usuarios disponibles"
 * />
 * ```
 */

export default function UsersTable<T>({
    table,
    columnsLength,
    emptyText = 'Sin resultados.',
}: {
    table: TanStackTable<T>
    columnsLength: number
    emptyText?: string
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-t border-zinc-200">
                <thead className="bg-zinc-50">
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((h) => (
                                <th
                                    key={h.id}
                                    className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600"
                                >
                                    {h.isPlaceholder
                                        ? null
                                        : flexRender(h.column.columnDef.header, h.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="divide-y divide-zinc-200 bg-white">
                    {table.getRowModel().rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columnsLength}
                                className="px-4 py-10 text-center text-sm text-zinc-600"
                            >
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        table.getRowModel().rows.map((r) => (
                            <tr key={r.id} className="hover:bg-zinc-50">
                                {r.getVisibleCells().map((c) => (
                                    <td
                                        key={c.id}
                                        className="whitespace-nowrap px-4 py-4 text-sm text-zinc-800"
                                    >
                                        {flexRender(c.column.columnDef.cell, c.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}