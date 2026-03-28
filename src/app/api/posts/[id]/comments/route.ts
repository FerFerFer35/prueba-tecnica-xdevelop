import { NextResponse } from 'next/server'

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

/**
 * Obtiene los comentarios asociados a un post específico.
 * 
 * @param _request - La solicitud HTTP entrante (no utilizada).
 * @param context - Contexto que contiene los parámetros de la ruta.
 * @param context.params - Promesa que se resuelve con los parámetros de la ruta.
 * @param context.params.id - El identificador del post como cadena de texto.
 * 
 * @returns {Promise<NextResponse>} Una respuesta JSON con:
 *   - En caso de éxito (200): Un array de comentarios del post.
 *   - Si el ID es inválido (400): Un objeto de error indicando ID inválido.
 *   - Si la solicitud upstream falla (502): Un objeto de error indicando fallo en la obtención.
 * 
 * @throws Maneja errores de validación del ID del post y fallos en la solicitud HTTP.
 * 
 * @remarks
 * - Valida que el ID del post sea un número finito y positivo.
 * - Realiza una solicitud GET a JSONPlaceholder sin caché.
 * - Retorna la respuesta como un array de comentarios tipado como `Comment[]`.
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
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        { cache: 'no-store' }
    )

    if (!upstream.ok) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 502 })
    }

    const data = (await upstream.json()) as Comment[]
    return NextResponse.json(data)
}