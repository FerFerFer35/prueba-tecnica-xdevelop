import { NextResponse } from 'next/server'

type UpstreamNutrient = {
    nutrient?: {
        id?: number
        number?: string
        name?: string
        unitName?: string
    }
    amount?: number
}

type UpstreamFoodDetail = {
    fdcId: number
    description: string
    dataType?: string
    brandOwner?: string
    ingredients?: string
    servingSize?: number
    servingSizeUnit?: string
    foodNutrients?: UpstreamNutrient[]
}

/**
 * GET /api/foods/:fdcId
 *
 * BFF endpoint que obtiene el detalle de un alimento por su FDC ID desde USDA FoodData Central.
 * Requiere la variable de entorno USDA_API_KEY.
 *
 * @returns Respuesta JSON con los datos del alimento, incluyendo información nutricional.
 */
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ fdcId: string }> }
) {
    const { fdcId } = await params
    const id = Number(fdcId)

    if (!Number.isFinite(id) || id <= 0) {
        return NextResponse.json({ error: 'Invalid FDC ID' }, { status: 400 })
    }

    const apiKey = process.env.USDA_API_KEY
    if (!apiKey) {
        return NextResponse.json(
            { error: 'Missing USDA_API_KEY server config' },
            { status: 500 }
        )
    }

    const url = `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${encodeURIComponent(apiKey)}`

    const upstream = await fetch(url, {
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

    const raw = (await upstream.json()) as UpstreamFoodDetail

    const foodNutrients = (raw.foodNutrients ?? []).map((n) => ({
        nutrientId: n.nutrient?.id ?? 0,
        nutrientName: n.nutrient?.name ?? '',
        nutrientNumber: n.nutrient?.number ?? '',
        unitName: n.nutrient?.unitName ?? '',
        value: n.amount ?? 0,
    }))

    return NextResponse.json({
        fdcId: raw.fdcId,
        description: raw.description,
        dataType: raw.dataType ?? '',
        brandOwner: raw.brandOwner ?? undefined,
        ingredients: raw.ingredients ?? undefined,
        servingSize: raw.servingSize ?? undefined,
        servingSizeUnit: raw.servingSizeUnit ?? undefined,
        foodNutrients,
    })
}
