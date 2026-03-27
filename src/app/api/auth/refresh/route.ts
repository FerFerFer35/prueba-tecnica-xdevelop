import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByRefreshToken } from '@/lib/server/session-store'

export async function POST() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
    }

    const session = getSessionByRefreshToken(refreshToken)
    if (!session) {
        return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 })
    }

    // Emite un nuevo access token (simulado)
    const newAccessToken = crypto.randomUUID()

    const res = NextResponse.json({
        success: true,
        user: session.user, // útil para el frontend
    })

    res.cookies.set('accessToken', newAccessToken, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    // opcional: mantener cookie role sincronizada
    res.cookies.set('role', session.user.role, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    return res
}