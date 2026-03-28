import { NextResponse } from 'next/server'

type UpstreamPost = {
    userId: number
    id: number
    title: string
    body: string
}

type PostsResponse = {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: UpstreamPost[]
}

/**
 * GET /api/posts?page=1&limit=10
 * JSONPlaceholder no pagina en /posts, así que paginamos en el backend.
 */
/**
 * Maneja solicitudes GET para obtener posts con paginación.
 * 
 * @param request - La solicitud HTTP que contiene parámetros de consulta opcionales
 * @param request.url - URL de la solicitud que incluye los parámetros `page` y `limit`
 * 
 * @returns Una promesa que se resuelve en una respuesta JSON con la siguiente estructura:
 *          - `page`: Número de página actual (por defecto 1)
 *          - `per_page`: Cantidad de posts por página (por defecto 10, máximo 50)
 *          - `total`: Número total de posts disponibles
 *          - `total_pages`: Número total de páginas
 *          - `data`: Array de posts para la página solicitada
 * 
 * @throws Retorna respuesta con estado 502 si la solicitud al servidor upstream falla
 * 
 * @remarks
 * - El parámetro `page` debe ser un número positivo mayor a 0. Por defecto es 1.
 * - El parámetro `limit` debe estar entre 1 y 50. Por defecto es 10.
 * - Los parámetros inválidos se normalizan a valores seguros.
 * - La solicitud al servidor upstream desactiva el almacenamiento en caché.
 * - Si la página solicitada excede el total de páginas disponibles, se devuelve la última página.
 * 
 * @example
 * // Obtener la primera página con 10 posts
 * GET /api/posts
 * 
 * @example
 * // Obtener la página 2 con 25 posts por página
 * GET /api/posts?page=2&limit=25
 */

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const pageRaw = Number(searchParams.get('page') ?? '1')
    const limitRaw = Number(searchParams.get('limit') ?? '10')

    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1
    const limit = Number.isFinite(limitRaw) && limitRaw > 0 && limitRaw <= 50 ? limitRaw : 10

    const upstream = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store',
    })

    if (!upstream.ok) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 502 })
    }

    const all = (await upstream.json()) as UpstreamPost[]

    const total = all.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const safePage = Math.min(page, totalPages)

    const start = (safePage - 1) * limit
    const data = all.slice(start, start + limit)

    const payload: PostsResponse = {
        page: safePage,
        per_page: limit,
        total,
        total_pages: totalPages,
        data,
    }

    return NextResponse.json(payload)
}