'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthCard from '@/components/auth/AuthCard'
import InputField from '@/components/ui/InputField'
import Button from '@/components/ui/Button'

/**
 * Componente de formulario para inicio de sesión.
 * 
 * Gestiona el inicio de sesión de usuarios mediante email y contraseña.
 * Realiza una solicitud POST a `/api/auth/login` y redirige al usuario
 * al dashboard o a la URL especificada en el parámetro `next` de la consulta.
 * 
 * @component
 * @returns {JSX.Element} Formulario de inicio de sesión con validación de errores
 * 
 * @example
 * ```tsx
 * <LoginForm />
 * ```
 * 
 * @state {string} email - Email del usuario
 * @state {string} password - Contraseña del usuario
 * @state {string} error - Mensaje de error del formulario
 * @state {boolean} isSubmitting - Indica si el formulario está siendo enviado
 * 
 * @function handleSubmit - Gestiona el envío del formulario
 * @async
 * @param {React.FormEvent} e - Evento del formulario
 * @throws {Error} Error de conexión o respuesta inválida del servidor
 */

export default function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        try {
            setIsSubmitting(true)

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok) {
                setError(data?.error || 'Error al iniciar sesión')
                return
            }

            const next = searchParams.get('next') || '/dashboard'
            router.refresh()
            router.push(next)
        } catch {
            setError('Error de conexión')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthCard title="Iniciar sesión">
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {error ? (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                    autoComplete="email"
                    placeholder="admin@demo.com"
                    disabled={isSubmitting}
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    required
                    autoComplete="current-password"
                    placeholder="admin123"
                    disabled={isSubmitting}
                />

                <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Entrar
                </Button>
            </form>
        </AuthCard>
    )
}