import { NextResponse } from 'next/server'

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

/**
 * Obtiene un post específico por su ID desde JSONPlaceholder.
 * 
 * @param _request - La solicitud HTTP recibida (no utilizada).
 * @param context - Contexto que contiene los parámetros de la ruta.
 * @param context.params - Promesa que resuelve a un objeto con el parámetro `id` de la ruta.
 * 
 * @returns {Promise<NextResponse>} Una respuesta JSON con los datos del post.
 * 
 * @throws {NextResponse} Retorna un error 400 si el ID del post es inválido o menor o igual a 0.
 * @throws {NextResponse} Retorna un error 502 si falla la solicitud al servicio upstream.
 * 
 * @example
 * // GET /api/posts/1
 * // Retorna: { userId: 1, id: 1, title: "...", body: "..." }
 */

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
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        { cache: 'no-store' }
    )

    if (!upstream.ok) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 502 })
    }

    const data = (await upstream.json()) as Comment[]
    return NextResponse.json(data)
}