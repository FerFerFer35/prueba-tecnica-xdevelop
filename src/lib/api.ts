type ApiError = Error & { status?: number }

async function refreshSession(): Promise<boolean> {
    const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
    })
    return res.ok
}

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