'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'

type MeResponse =
    | { authenticated: false }
    | { authenticated: true; user?: { email?: string; role?: string } }

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
        // 1) al montar
        checkAuth()
    }, [checkAuth])

    React.useEffect(() => {
        // 2) al cambiar de ruta (por ejemplo después de login/logout)
        checkAuth()
    }, [pathname, checkAuth])

    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })

        // no confíes solo en el setState: revalida + navega
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