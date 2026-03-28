export type CsvValue = string | number | boolean | null | undefined | Date

function escapeCsv(value: CsvValue) {
    if (value === null || value === undefined) return ''
    const str = value instanceof Date ? value.toISOString() : String(value)

    const mustQuote = /[",\n\r]/.test(str)
    const escaped = str.replace(/"/g, '""')
    return mustQuote ? `"${escaped}"` : escaped
}

export function toCsv<T extends Record<string, CsvValue>>(
    rows: T[],
    columns: Array<{ key: keyof T; header: string }>
) {
    const headerLine = columns.map((c) => escapeCsv(c.header)).join(',')
    const lines = rows.map((row) =>
        columns.map((c) => escapeCsv(row[c.key])).join(',')
    )
    return [headerLine, ...lines].join('\n')
}

/**
 * Descarga un archivo de texto en el navegador del usuario.
 * 
 * @param filename - El nombre del archivo a descargar (incluyendo extensión).
 * @param content - El contenido del archivo a descargar.
 * @param mime - El tipo MIME del archivo. Por defecto es 'text/csv;charset=utf-8;'.
 * 
 * @example
 * ```typescript
 * downloadTextFile('datos.csv', 'nombre,edad\nJuan,30\nMaría,25');
 * ```
 * 
 * @remarks
 * Esta función crea un blob con el contenido proporcionado, genera una URL temporal,
 * simula un clic en un elemento ancla para iniciar la descarga y luego limpia los recursos.
 */

export function downloadTextFile(filename: string, content: string, mime = 'text/csv;charset=utf-8;') {
    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
}