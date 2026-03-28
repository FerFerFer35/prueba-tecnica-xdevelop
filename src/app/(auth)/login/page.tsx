import * as React from 'react'
import LoginForm from '@/components/auth/LoginForm'

/**
 * Página de inicio de sesión de la aplicación.
 * 
 * Renderiza el formulario de login en un contenedor centrado que ocupa
 * la altura completa de la pantalla. El formulario se carga de forma lazy
 * utilizando Suspense para mejorar el rendimiento.
 * 
 * @returns {JSX.Element} Elemento JSX que contiene la página de login
 * 
 * @example
 * // Uso en el enrutador de la aplicación
 * <Route path="/login" component={LoginPage} />
 */

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-zinc-50">
            <div className="mx-auto flex min-h-screen items-center justify-center px-4">
                <React.Suspense fallback={null}>
                    <LoginForm />
                </React.Suspense>
            </div>
        </main>
    )
}