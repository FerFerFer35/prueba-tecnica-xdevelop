import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByRefreshToken } from '@/lib/server/session-store'

export async function GET() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    const session = getSessionByRefreshToken(refreshToken)
    if (!session) {
        // refresh token inválido/expirado
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    return NextResponse.json({
        authenticated: true,
        user: session.user, // { email, role }
    })
}