import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionByRefreshToken } from '@/lib/server/session-store'

/**
 * Obtiene la información de la sesión autenticada del usuario actual.
 * 
 * Este endpoint verifica la validez del token de refresco almacenado en las cookies
 * y retorna el estado de autenticación junto con la información del usuario si existe
 * una sesión válida.
 * 
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} Respuesta JSON con el estado de autenticación.
 *   - Si no hay token de refresco: `{ authenticated: false }` (status 200)
 *   - Si el token es inválido: `{ authenticated: false }` (status 200)
 *   - Si la autenticación es válida: `{ authenticated: true, user: {...} }` (status 200)
 * 
 * @example
 * // Ejemplo de respuesta cuando está autenticado
 * {
 *   authenticated: true,
 *   user: { id: "123", email: "user@example.com", name: "John Doe" }
 * }
 * 
 * @example
 * // Ejemplo de respuesta cuando no está autenticado
 * {
 *   authenticated: false
 * }
 */


export async function GET() {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    const session = getSessionByRefreshToken(refreshToken)
    if (!session) {
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }

    return NextResponse.json({
        authenticated: true,
        user: session.user,
    })
}