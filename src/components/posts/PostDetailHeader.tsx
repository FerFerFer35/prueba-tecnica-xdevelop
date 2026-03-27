'use client'

import * as React from 'react'
import Button from '@/components/ui/Button'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

export default function PostDetailHeader({
    post,
    onBack,
}: {
    post: Post
    onBack: () => void
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6">
            <div className="min-w-0">
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                    <span className="mr-2 font-mono text-xs text-zinc-500">#{post.id}</span>
                    {post.title}
                </h1>

                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-700">
                    {post.body}
                </p>

                <div className="mt-3 text-xs text-zinc-500">
                    userId: <span className="font-semibold text-zinc-900">{post.userId}</span>
                </div>
            </div>

            <Button variant="ghost" type="button" onClick={onBack}>
                Volver
            </Button>
        </div>
    )
}