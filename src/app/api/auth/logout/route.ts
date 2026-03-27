import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revokeRefreshToken } from '@/lib/server/session-store'

export async function POST() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (refreshToken) {
        revokeRefreshToken(refreshToken)
    }

    const res = NextResponse.json({ success: true })

    res.cookies.set('accessToken', '', {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    })

    // Borra refreshToken (HttpOnly)
    res.cookies.set('refreshToken', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    })

    // Si estás guardando rol en cookie (opcional)
    res.cookies.set('role', '', {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    })

    return res
}