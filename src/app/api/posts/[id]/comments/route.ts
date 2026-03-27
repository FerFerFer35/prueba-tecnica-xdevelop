import { NextResponse } from 'next/server'

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export async function GET(
    _request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const postId = Number(id)

    if (!Number.isFinite(postId) || postId <= 0) {
        return NextResponse.json({ error: 'Invalid post id' }, { status: 400 })
    }

    const upstream = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        { cache: 'no-store' }
    )

    if (!upstream.ok) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 502 })
    }

    const data = (await upstream.json()) as Comment[]
    return NextResponse.json(data)
}