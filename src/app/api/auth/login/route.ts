import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRefreshSession } from '@/lib/server/session-store'

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

    // Access token simulado (cookie accesible por JS)
    const accessToken = crypto.randomUUID()

    // Refresh token in-memory (para refresh)
    const session = createRefreshSession({ email: found.email, role: found.role })

    // ✅ NO va con await
    const cookieStore = await cookies()

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