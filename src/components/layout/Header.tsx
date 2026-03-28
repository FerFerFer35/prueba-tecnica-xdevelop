'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

type MeResponse =
    | { authenticated: false }
    | { authenticated: true; user?: { email?: string; role?: string } }

/**
 * Componente de encabezado de la aplicación
 * 
 * Renderiza la barra de navegación principal con autenticación de usuario.
 * 
 * Características:
 * - Verifica el estado de autenticación del usuario mediante la API `/api/auth/me`
 * - Muestra el email y rol del usuario autenticado
 * - Proporciona botón de logout para usuarios autenticados
 * - Proporciona botón de login para usuarios no autenticados
 * - Re-valida la autenticación cuando cambia la ruta
 * - Muestra un skeleton loading mientras se verifica la autenticación
 * 
 * Estados:
 * @state {boolean} isAuth - Indica si el usuario está autenticado
 * @state {string | null} userEmail - Email del usuario autenticado
 * @state {string | null} role - Rol del usuario autenticado
 * @state {boolean} loading - Indica si se está verificando la autenticación
 * 
 * Efectos:
 * - Se ejecuta `checkAuth()` al montar el componente
 * - Se re-ejecuta `checkAuth()` cuando cambia la ruta (pathname)
 * 
 * @component
 * @returns {JSX.Element} Encabezado con navegación y controles de autenticación
 */

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()

    const [isAuth, setIsAuth] = React.useState<boolean>(false)
    const [userEmail, setUserEmail] = React.useState<string | null>(null)
    const [role, setRole] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState(true)

    const checkAuth = React.useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            const data = (await res.json()) as MeResponse

            if (data.authenticated) {
                setIsAuth(true)
                setUserEmail(data.user?.email ?? null)
                setRole(data.user?.role ?? null)
            } else {
                setIsAuth(false)
                setUserEmail(null)
                setRole(null)
            }
        } catch {
            setIsAuth(false)
            setUserEmail(null)
            setRole(null)
        } finally {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        checkAuth()
    }, [checkAuth])

    React.useEffect(() => {
        checkAuth()
    }, [pathname, checkAuth])

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })

        await checkAuth()
        router.push('/login')
        router.refresh()
    }

    return (
        <header className="w-full border-b bg-white">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/dashboard" className="font-bold text-xl text-gray-800">
                    MyApp
                </Link>

                <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
                    <Link className="hover:text-gray-900" href="/dashboard">
                        Dashboard
                    </Link>
                    <Link className="hover:text-gray-900" href="/users">
                        Users
                    </Link>
                    <Link className="hover:text-gray-900" href="/posts">
                        Posts
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    {loading ? (
                        <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
                    ) : isAuth ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                <span className="truncate max-w-[180px]">{userEmail ?? 'Logged in'}</span>
                                {role ? (
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 ring-1 ring-inset ring-gray-200">
                                        {role}
                                    </span>
                                ) : null}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                router.push('/login')
                                router.refresh()
                            }}
                            className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-800"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}