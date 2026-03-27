import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') ?? '1'

    const baseUrl = process.env.REQRES_BASE_URL ?? 'https://reqres.in'
    const apiKey = process.env.REQRES_API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: 'Missing REQRES_API_KEY server config' }, { status: 500 })
    }

    const upstream = await fetch(`${baseUrl}/api/users?page=${page}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
        },
        cache: 'no-store',
    })

    const data = await upstream.json()

    if (!upstream.ok) {
        return NextResponse.json(
            { error: data?.error ?? 'ReqRes error', upstreamStatus: upstream.status },
            { status: upstream.status }
        )
    }

    return NextResponse.json(data)
}