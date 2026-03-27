import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRefreshSession } from '@/lib/server/session-store'
import { LOCAL_USERS } from '@/data/local-users'

type Role = 'admin' | 'user'

const USERS: Array<{ email: string; password: string; role: Role }> = [
    { email: 'admin@demo.com', password: 'admin123', role: 'admin' },
    { email: 'user@demo.com', password: 'user123', role: 'user' },
]

export async function POST(request: Request) {
    const { email, password } = await request.json()

    const found = USERS.find((u) => u.email === email && u.password === password)
    if (!found) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    // Access token simulado (lo pide la prueba en cookie accesible por JS)
    const accessToken = crypto.randomUUID()

    // Refresh token real (in-memory) para poder hacer refresh
    const session = createRefreshSession({ email: found.email, role: found.role })

    const cookieStore = await cookies() // <-- NO await
    // <-- NO await

    cookieStore.set('accessToken', accessToken, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    cookieStore.set('refreshToken', session.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    // opcional: útil para hidratar Zustand
    cookieStore.set('role', found.role, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    return NextResponse.json({
        success: true,
        user: { email: found.email, role: found.role },
    })
}