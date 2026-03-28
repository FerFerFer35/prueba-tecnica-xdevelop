import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByRefreshToken } from '@/lib/server/session-store'

/**
 * Maneja la solicitud POST para refrescar el token de acceso.
 * 
 * Este endpoint valida el token de refresco almacenado en las cookies,
 * genera un nuevo token de acceso y actualiza las cookies de sesión.
 * 
 * @async
 * @function POST
 * @returns {Promise<NextResponse>} Respuesta JSON con los siguientes casos:
 *   - Si no hay token de refresco: {error: 'No refresh token'} con status 401
 *   - Si el token es inválido: {error: 'Invalid refresh token'} con status 401
 *   - Si es exitosa: {success: true, user: session.user} con cookies actualizadas
 * 
 * @remarks
 * - Extrae el token de refresco de las cookies de la solicitud
 * - Valida el token contra la sesión existente
 * - Genera un nuevo UUID como token de acceso
 * - Establece dos cookies en la respuesta:
 *   - accessToken: nuevo token de acceso (no httpOnly)
 *   - role: rol del usuario desde la sesión (no httpOnly)
 * - Las cookies se configuran con sameSite 'lax' y secure según el ambiente
 * 
 * @security
 * - Requiere un token de refresco válido en las cookies
 * - Las cookies se marcan como secure en producción
 * - AccessToken y role están expuestos al cliente (httpOnly: false)
 */

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

    const newAccessToken = crypto.randomUUID()

    const res = NextResponse.json({
        success: true,
        user: session.user,
    })

    res.cookies.set('accessToken', newAccessToken, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    res.cookies.set('role', session.user.role, {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    })

    return res
}