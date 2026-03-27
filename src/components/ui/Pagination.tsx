'use client'

import * as React from 'react'

export default function Pagination({
    page,
    totalPages,
    onPrev,
    onNext,
}: {
    page: number
    totalPages: number
    onPrev: () => void
    onNext: () => void
}) {
    return (
        <div className="flex items-center justify-between gap-3 border-t border-zinc-200 p-6">
            <div className="text-sm text-zinc-600">
                Page <span className="font-semibold tabular-nums text-zinc-900">{page}</span> /{' '}
                <span className="font-semibold tabular-nums text-zinc-900">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onPrev}
                    disabled={page <= 1}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                    Prev
                </button>

                <button
                    onClick={onNext}
                    disabled={page >= totalPages}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
}