import CommentCard from '@/components/posts/CommentCard'

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

/**
 * Lista de comentarios para mostrar en una publicación.
 * 
 * Renderiza un contenedor con un título que muestra la cantidad de comentarios
 * y una lista de tarjetas de comentarios individuales.
 * 
 * @component
 * @param {Object} props - Props del componente
 * @param {Comment[]} props.comments - Array de comentarios a mostrar
 * @returns {JSX.Element} Elemento JSX que contiene la lista formateada de comentarios
 * 
 * @example
 * const comentarios = [
 *   { id: 1, texto: "Gran post!", autor: "Juan" },
 *   { id: 2, texto: "Muy útil", autor: "María" }
 * ];
 * return <CommentsList comments={comentarios} />
 */

export default function CommentsList({ comments }: { comments: Comment[] }) {
    return (
        <div className="p-6">
            <h2 id="comments" className="text-base font-semibold text-zinc-900">
                Comments{' '}
                <span className="text-sm font-normal text-zinc-500">
                    ({comments.length})
                </span>
            </h2>

            <ul className="mt-4 space-y-3">
                {comments.map((c) => (
                    <CommentCard key={c.id} comment={c} />
                ))}
            </ul>
        </div>
    )
}