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

/**
 * Componente de campo de entrada de texto reutilizable
 * 
 * @param label - Etiqueta visible del campo de entrada
 * @param name - Identificador único del campo (usado en id y name)
 * @param type - Tipo de entrada HTML (por defecto: 'text')
 * @param value - Valor actual del campo
 * @param onChange - Callback ejecutado cuando el valor cambia
 * @param required - Indica si el campo es obligatorio
 * @param placeholder - Texto de ayuda mostrado cuando el campo está vacío
 * @param autoComplete - Atributo de autocompletado del navegador
 * @param error - Mensaje de error a mostrar (si existe)
 * @param disabled - Indica si el campo está deshabilitado
 * 
 * @returns Componente de entrada con estilos Tailwind, validación y accesibilidad integrada
 * 
 * @example
 * ```tsx
 * <InputField
 *   label="Correo electrónico"
 *   name="email"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   placeholder="ejemplo@correo.com"
 *   error={emailError}
 *   required
 * />
 * ```
 */

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