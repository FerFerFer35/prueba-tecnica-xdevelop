import CommentCard from '@/components/posts/CommentCard'

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

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