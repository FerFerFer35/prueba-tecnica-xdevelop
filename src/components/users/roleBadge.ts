export type Role = 'admin' | 'user'

/**
 * Genera las clases de estilo Tailwind CSS para un badge de rol.
 * 
 * @param role - El rol del usuario, puede ser 'admin' u otro tipo de rol.
 * @returns Una cadena de clases Tailwind CSS que define el estilo del badge.
 *          Si el rol es 'admin', retorna estilos con colores índigo.
 *          Si el rol es otro tipo, retorna estilos con colores verde esmeralda.
 * 
 * @example
 * // Para un admin
 * roleBadgeClass('admin')
 * // Retorna: 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset bg-indigo-50 text-indigo-700 ring-indigo-200'
 * 
 * @example
 * // Para otro rol
 * roleBadgeClass('user')
 * // Retorna: 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset bg-emerald-50 text-emerald-700 ring-emerald-200'
 */

export function roleBadgeClass(role: Role) {
    const base =
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset'
    return role === 'admin'
        ? `${base} bg-indigo-50 text-indigo-700 ring-indigo-200`
        : `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`
}