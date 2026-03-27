type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

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