'use client'

import * as React from 'react'

/**
 * Componente de tarjeta de autenticación que proporciona un contenedor estilizado para formularios de autenticación.
 * 
 * @component
 * @example
 * ```tsx
 * <AuthCard title="Iniciar Sesión">
 *   <LoginForm />
 * </AuthCard>
 * ```
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {string} props.title - El título que se muestra en la parte superior de la tarjeta
 * @param {React.ReactNode} props.children - El contenido hijo que se renderiza dentro de la tarjeta
 * 
 * @returns {React.ReactElement} Un elemento de tarjeta estilizado con el título y contenido proporcionado
 */

export default function AuthCard({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-center text-2xl font-bold text-zinc-900">{title}</h2>
            <div className="mt-5">{children}</div>
        </div>
    )
}