import Link from 'next/link'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

export default function PostListItem({ post }: { post: Post }) {
    return (
        <li className="p-6 hover:bg-zinc-50">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-zinc-900">
                        <span className="mr-2 font-mono text-xs text-zinc-500">#{post.id}</span>

                        <Link href={`/posts/${post.id}`} className="underline-offset-4 hover:underline">
                            {post.title}
                        </Link>
                    </h2>

                    <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-zinc-700">
                        {post.body}
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                        <Link
                            href={`/posts/${post.id}`}
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                        >
                            Ver post
                        </Link>
                    </div>
                </div>

                <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 ring-1 ring-inset ring-zinc-200">
                    userId: {post.userId}
                </span>
            </div>
        </li>
    )
}