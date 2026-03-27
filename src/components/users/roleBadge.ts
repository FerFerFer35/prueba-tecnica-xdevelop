export type Role = 'admin' | 'user'

export function roleBadgeClass(role: Role) {
    const base =
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset'
    return role === 'admin'
        ? `${base} bg-indigo-50 text-indigo-700 ring-indigo-200`
        : `${base} bg-emerald-50 text-emerald-700 ring-emerald-200`
}