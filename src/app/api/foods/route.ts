import { NextResponse } from 'next/server'

type UpstreamNutrient = {
    nutrientId?: number
    nutrientName?: string
    nutrientNumber?: string
    unitName?: string
    value?: number
}

type UpstreamFood = {
    fdcId: number
    description: string
    dataType?: string
    brandOwner?: string
    ingredients?: string
    foodNutrients?: UpstreamNutrient[]
}

type UpstreamSearchResponse = {
    totalHits: number
    currentPage: number
    totalPages: number
    foods: UpstreamFood[]
}

/**
 * GET /api/foods?query=apple&page=1&pageSize=10
 *
 * BFF endpoint que busca alimentos en USDA FoodData Central.
 * Requiere la variable de entorno USDA_API_KEY.
 *
 * @param request - Solicitud HTTP con parámetros de consulta:
 *   - query (requerido): término de búsqueda
 *   - page (opcional, default 1): número de página
 *   - pageSize (opcional, default 10, max 50): resultados por página
 *
 * @returns Respuesta JSON paginada con los alimentos encontrados.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') ?? ''
    const pageRaw = Number(searchParams.get('page') ?? '1')
    const pageSizeRaw = Number(searchParams.get('pageSize') ?? '10')

    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1
    const pageSize =
        Number.isFinite(pageSizeRaw) && pageSizeRaw > 0 && pageSizeRaw <= 50 ? pageSizeRaw : 10

    if (!query.trim()) {
        return NextResponse.json(
            { query: '', page: 1, per_page: pageSize, total: 0, total_pages: 0, data: [] },
            { status: 200 }
        )
    }

    const apiKey = process.env.USDA_API_KEY
    if (!apiKey) {
        return NextResponse.json(
            { error: 'Missing USDA_API_KEY server config' },
            { status: 500 }
        )
    }

    const url = new URL('https://api.nal.usda.gov/fdc/v1/foods/search')
    url.searchParams.set('api_key', apiKey)
    url.searchParams.set('query', query)
    url.searchParams.set('pageNumber', String(page))
    url.searchParams.set('pageSize', String(pageSize))

    const upstream = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        cache: 'no-store',
    })

    if (!upstream.ok) {
        return NextResponse.json(
            { error: 'USDA API error', upstreamStatus: upstream.status },
            { status: upstream.status }
        )
    }

    const raw = (await upstream.json()) as UpstreamSearchResponse

    // Limit to top 5 nutrients in search results to keep payload small
    const MAX_SEARCH_NUTRIENTS = 5

    const data = (raw.foods ?? []).map((f) => ({
        fdcId: f.fdcId,
        description: f.description,
        dataType: f.dataType ?? '',
        brandOwner: f.brandOwner ?? undefined,
        ingredients: f.ingredients ?? undefined,
        foodNutrients: (f.foodNutrients ?? []).slice(0, MAX_SEARCH_NUTRIENTS).map((n) => ({
            nutrientId: n.nutrientId ?? 0,
            nutrientName: n.nutrientName ?? '',
            nutrientNumber: n.nutrientNumber ?? '',
            unitName: n.unitName ?? '',
            value: n.value ?? 0,
        })),
    }))

    return NextResponse.json({
        query,
        page: raw.currentPage ?? page,
        per_page: pageSize,
        total: raw.totalHits ?? 0,
        total_pages: raw.totalPages ?? 0,
        data,
    })
}
