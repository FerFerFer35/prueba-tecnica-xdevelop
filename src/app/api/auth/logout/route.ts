import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revokeRefreshToken } from '@/lib/server/session-store'

/**
 * Maneja la solicitud POST para cerrar la sesión del usuario.
 * 
 * Esta función realiza las siguientes acciones:
 * 1. Obtiene el token de actualización de las cookies
 * 2. Revoca el token de actualización si existe
 * 3. Limpia las cookies de autenticación (accessToken, refreshToken y role)
 * 4. Retorna una respuesta JSON con el estado de éxito
 * 
 * @async
 * @function POST
 * @returns {Promise<NextResponse>} Respuesta JSON con { success: true } y cookies limpias.
 *          Las cookies se configuran con maxAge: 0 para ser borradas del navegador.
 *          - accessToken: cookie sin protección httpOnly
 *          - refreshToken: cookie protegida con httpOnly
 *          - role: cookie sin protección httpOnly
 * 
 * @remarks
 * - Las cookies se establecen como seguras en entornos de producción
 * - Utiliza SameSite: 'lax' para protección CSRF
 * - El token de actualización se revoca en la base de datos antes de limpiar la cookie
 */

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

    res.cookies.set('refreshToken', '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    })

    res.cookies.set('role', '', {
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 0,
    })

    return res
}