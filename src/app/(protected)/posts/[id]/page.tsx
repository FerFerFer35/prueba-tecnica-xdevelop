'use client'

import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/lib/api'
import PostDetailHeader from '@/components/posts/PostDetailHeader'
import CommentsList from '@/components/posts/CommentsList'

type Post = {
    userId: number
    id: number
    title: string
    body: string
}

type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export default function PostDetailPage() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const postId = Number(params?.id)

    const postQuery = useQuery({
        queryKey: ['post', postId],
        enabled: Number.isFinite(postId) && postId > 0,
        queryFn: () => fetcher<Post>(`/api/posts/${postId}`),
        staleTime: 60_000,
    })

    const commentsQuery = useQuery({
        queryKey: ['post-comments', postId],
        enabled: Number.isFinite(postId) && postId > 0,
        queryFn: () => fetcher<Comment[]>(`/api/posts/${postId}/comments`),
        staleTime: 60_000,
    })

    if (!Number.isFinite(postId) || postId <= 0) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    Invalid post id
                </div>
            </div>
        )
    }

    if (postQuery.isLoading || commentsQuery.isLoading) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="h-6 w-48 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-3 h-20 w-full animate-pulse rounded bg-zinc-100" />
                    <div className="mt-6 h-5 w-32 animate-pulse rounded bg-zinc-100" />
                    <div className="mt-3 space-y-3">
                        <div className="h-16 animate-pulse rounded bg-zinc-100" />
                        <div className="h-16 animate-pulse rounded bg-zinc-100" />
                        <div className="h-16 animate-pulse rounded bg-zinc-100" />
                    </div>
                </div>
            </div>
        )
    }

    if (postQuery.isError) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    Error loading post: {(postQuery.error as Error).message}
                </div>
            </div>
        )
    }

    if (commentsQuery.isError) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
                    Error loading comments: {(commentsQuery.error as Error).message}
                </div>
            </div>
        )
    }

    const post = postQuery.data!
    const comments = commentsQuery.data ?? []

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-10">
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <PostDetailHeader post={post} onBack={() => router.back()} />
                <CommentsList comments={comments} />
            </div>
        </div>
    )
}