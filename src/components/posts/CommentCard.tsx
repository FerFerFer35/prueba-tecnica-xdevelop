type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

/**
 * Componente que renderiza una tarjeta de comentario individual.
 * 
 * Muestra la información del comentario incluyendo el nombre del autor,
 * correo electrónico, identificador único y el cuerpo del comentario.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente
 * @param {Comment} props.comment - Objeto de comentario que contiene:
 *   - id: Identificador único del comentario
 *   - name: Nombre del autor del comentario
 *   - email: Correo electrónico del autor
 *   - body: Contenido del comentario
 * @returns {JSX.Element} Una tarjeta de comentario estilizada con la información del comentario
 * 
 * @example
 * ```tsx
 * const comment = {
 *   id: 1,
 *   name: "Juan Pérez",
 *   email: "juan@example.com",
 *   body: "Este es un comentario de ejemplo"
 * };
 * 
 * <CommentCard comment={comment} />
 * ```
 */

export default function CommentCard({ comment }: { comment: Comment }) {
    return (
        <li className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="font-medium text-zinc-900">{comment.name}</div>
                    <div className="truncate text-sm text-zinc-600">{comment.email}</div>
                </div>

                <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 ring-1 ring-inset ring-zinc-200">
                    #{comment.id}
                </span>
            </div>

            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-700">
                {comment.body}
            </p>
        </li>
    )
}