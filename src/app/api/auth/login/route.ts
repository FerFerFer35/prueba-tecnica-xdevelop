import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRefreshSession } from '@/lib/server/session-store'

type Role = 'admin' | 'user'

const USERS: Array<{ email: string; password: string; role: Role }> = [
    { email: 'admin@demo.com', password: 'admin123', role: 'admin' },
    { email: 'user@demo.com', password: 'user123', role: 'user' },
]

/**
 * Maneja la solicitud POST para autenticación de usuario.
 * 
 * Autentica un usuario comparando las credenciales proporcionadas (email y contraseña)
 * contra una lista de usuarios predefinidos. Si las credenciales son válidas, genera
 * tokens de acceso y actualización, los almacena en cookies y retorna los datos del usuario.
 * 
 * @param request - La solicitud HTTP que contiene el email y contraseña en el cuerpo JSON
 * @returns Una respuesta JSON con:
 *   - Si es exitosa: objeto con `success: true` y datos del usuario (email y rol)
 *   - Si falla: objeto con error `Invalid credentials` y estado 400
 * 
 * @remarks
 * - El token de acceso es accesible por JavaScript (httpOnly: false)
 * - El token de actualización solo es accesible por HTTP (httpOnly: true)
 * - El rol del usuario se almacena en una cookie accesible por JavaScript
 * - Las cookies se configuran con sameSite: 'lax' y secure en producción
 * 
 * @throws No lanza excepciones explícitas, los errores se retornan en la respuesta JSON
 */

export async function POST(request: Request) {
    const { email, password } = await request.json()

    const found = USERS.find((u) => u.email === email && u.password === password)
    if (!found) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const accessToken = crypto.randomUUID()

    const session = createRefreshSession({ email: found.email, role: found.role })

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