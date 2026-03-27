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

    const all = (await upstream.json()) as UpstreamPost[] // <-- array como el que pegaste

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