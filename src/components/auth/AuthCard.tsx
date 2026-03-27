'use client'

import * as React from 'react'

export default function AuthCard({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-center text-2xl font-bold text-zinc-900">{title}</h2>
            <div className="mt-5">{children}</div>
        </div>
    )
}