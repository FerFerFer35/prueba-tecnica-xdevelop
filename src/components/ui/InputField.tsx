'use client'

import * as React from 'react'

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(' ')
}

type Props = {
    label: string
    name: string
    type?: React.HTMLInputTypeAttribute
    value: string
    onChange: (value: string) => void
    required?: boolean
    placeholder?: string
    autoComplete?: string
    error?: string
    disabled?: boolean
}

export default function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required,
    placeholder,
    autoComplete,
    error,
    disabled,
}: Props) {
    const describedBy = error ? `${name}-error` : undefined

    return (
        <div className="space-y-1.5">
            <label htmlFor={name} className="block text-sm font-medium text-zinc-700">
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                className={cx(
                    'w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2',
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-zinc-300 focus:border-black focus:ring-black/20',
                    disabled && 'opacity-60'
                )}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={placeholder}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                aria-describedby={describedBy}
                disabled={disabled}
            />

            {error ? (
                <p id={describedBy} className="text-xs text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    )
}