import Link from 'next/link'

type Props = {
    title: string
    description: string
    href: string
    cta: string
    badge?: string
}

/**
 * Componente de tarjeta de estadísticas.
 *
 * Renderiza una tarjeta interactiva que funciona como un enlace navegable.
 * Incluye título, descripción, badge opcional y un llamado a la acción.
 * Cuenta con animaciones suaves de hover y un efecto de acento sutil.
 *
 * @component
 * @example
 * ```tsx
 * <StatsCard
 *   title="Usuarios Activos"
 *   description="Total de usuarios en el sistema"
 *   href="/dashboard/users"
 *   cta="Ver más"
 *   badge="Pro"
 * />
 * ```
 *
 * @param {Props} props - Las propiedades del componente
 * @param {string} props.title - Título principal de la tarjeta
 * @param {string} props.description - Descripción secundaria de la tarjeta
 * @param {string} props.href - URL de destino del enlace
 * @param {string} props.cta - Texto del llamado a la acción
 * @param {string} [props.badge] - Etiqueta opcional de estado o categoría
 *
 * @returns {JSX.Element} Elemento de tarjeta de estadísticas interactiva
 */

export default function StatsCard({ title, description, href, cta, badge }: Props) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-950">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">{description}</p>
                </div>

                {badge ? (
                    <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 ring-1 ring-inset ring-zinc-200">
                        {badge}
                    </span>
                ) : null}
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                {cta}
                <span className="transition group-hover:translate-x-0.5">→</span>
            </div>

            {/* subtle accent */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-600/10 blur-2xl" />
        </Link>
    )
}