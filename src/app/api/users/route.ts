import { NextResponse } from 'next/server'

/**
 * Obtiene una lista paginada de usuarios desde la API externa ReqRes.
 * 
 * @param {Request} request - Objeto de solicitud que contiene los parámetros de consulta.
 *                            Acepta el parámetro `page` para la paginación (por defecto: '1').
 * 
 * @returns {Promise<NextResponse>} Respuesta JSON con los datos de usuarios paginados.
 *                                   En caso de error, retorna un objeto con la propiedad
 *                                   `error` y el código de estado correspondiente.
 * 
 * @throws {NextResponse} Retorna estado 500 si falta la variable de entorno `REQRES_API_KEY`.
 * @throws {NextResponse} Retorna el estado HTTP de la API externa si la solicitud falla.
 * 
 * @example
 * // Solicitud exitosa
 * GET /api/users?page=1
 * // Respuesta: { data: [...], page: 1, per_page: 6, total: 12, total_pages: 2 }
 * 
 * @example
 * // Solicitud con error de configuración
 * GET /api/users
 * // Respuesta: { error: 'Missing REQRES_API_KEY server config', status: 500 }
 */

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') ?? '1'

    const baseUrl = process.env.REQRES_BASE_URL ?? 'https://reqres.in'
    const apiKey = process.env.REQRES_API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: 'Missing REQRES_API_KEY server config' }, { status: 500 })
    }

    const upstream = await fetch(`${baseUrl}/api/users?page=${page}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
        },
        cache: 'no-store',
    })

    const data = await upstream.json()

    if (!upstream.ok) {
        return NextResponse.json(
            { error: data?.error ?? 'ReqRes error', upstreamStatus: upstream.status },
            { status: upstream.status }
        )
    }

    return NextResponse.json(data)
}