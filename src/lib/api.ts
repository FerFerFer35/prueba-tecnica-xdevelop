type ApiError = Error & { status?: number }

async function refreshSession(): Promise<boolean> {
    const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
    })
    return res.ok
}

/**
 * Realiza una solicitud fetch con soporte para reintentos automáticos en caso de sesión expirada.
 * 
 * @param input - La URL o recurso a solicitar
 * @param init - Opciones de configuración para la solicitud fetch. Por defecto es un objeto vacío
 * @param retry - Indica si se debe reintentar la solicitud en caso de error 401. Por defecto es true
 * 
 * @returns Una promesa que se resuelve con la respuesta de la solicitud fetch
 * 
 * @example
 * // Solicitud simple
 * const response = await apiFetch('/api/users');
 * 
 * @example
 * // Solicitud con opciones personalizadas
 * const response = await apiFetch('/api/users', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John' })
 * });
 * 
 * @remarks
 * - La función incluye automáticamente las credenciales en cada solicitud
 * - Si la respuesta es 401 (No autorizado) y retry es true, intenta refrescar la sesión
 * - Si el refresco de sesión es exitoso, reintentar la solicitud una única vez más
 * - Las credenciales se incluyen mediante la propiedad 'credentials: include'
 */

export async function apiFetch(input: string, init: RequestInit = {}, retry = true) {
    const res = await fetch(input, {
        ...init,
        credentials: 'include',
        headers: {
            ...(init.headers ?? {}),
        },
    })

    if (res.status === 401 && retry) {
        const refreshed = await refreshSession()
        if (refreshed) {
            return apiFetch(input, init, false)
        }
    }

    return res
}

export async function fetcher<T>(url: string): Promise<T> {
    const res = await apiFetch(url, { method: 'GET' })

    if (!res.ok) {
        const err: ApiError = new Error('Error en la petición')
        err.status = res.status
        throw err
    }

    return res.json() as Promise<T>
}

// Helpers opcionales (útiles para mutations)
export async function postJSON<T>(url: string, body: unknown): Promise<T> {
    const res = await apiFetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const err: ApiError = new Error('Error en la petición')
        err.status = res.status
        throw err
    }

    return res.json() as Promise<T>
}

export async function putJSON<T>(url: string, body: unknown): Promise<T> {
    const res = await apiFetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        const err: ApiError = new Error('Error en la petición')
        err.status = res.status
        throw err
    }

    return res.json() as Promise<T>
}