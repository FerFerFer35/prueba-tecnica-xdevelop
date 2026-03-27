'use client'

import * as React from 'react'

type ButtonVariant = 'primary' | 'danger' | 'ghost'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    fullWidth?: boolean
    isLoading?: boolean
}

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(' ')
}

export default function Button({
    variant = 'primary',
    fullWidth,
    isLoading,
    className,
    disabled,
    children,
    ...props
}: Props) {
    const base =
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-black text-white hover:bg-zinc-800 focus:ring-black',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
        ghost:
            'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 focus:ring-black',
    }

    return (
        <button
            className={cx(base, variants[variant], fullWidth && 'w-full', className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Cargando…' : children}
        </button>
    )
}