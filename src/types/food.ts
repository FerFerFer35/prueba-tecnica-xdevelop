/** Nutriente individual en los resultados de búsqueda de USDA FoodData Central */
export type FoodNutrient = {
    nutrientId: number
    nutrientName: string
    nutrientNumber: string
    unitName: string
    value: number
}

/** Alimento retornado por el endpoint de búsqueda */
export type FoodSearchItem = {
    fdcId: number
    description: string
    dataType: string
    brandOwner?: string
    ingredients?: string
    foodNutrients: FoodNutrient[]
}

/** Respuesta paginada del BFF /api/foods */
export type FoodsSearchResponse = {
    query: string
    page: number
    per_page: number
    total: number
    total_pages: number
    data: FoodSearchItem[]
}

/** Nutriente en el detalle de un alimento */
export type FoodDetailNutrient = {
    nutrientId: number
    nutrientName: string
    nutrientNumber: string
    unitName: string
    value: number
}

/** Detalle completo de un alimento retornado por /api/foods/[fdcId] */
export type FoodDetail = {
    fdcId: number
    description: string
    dataType: string
    brandOwner?: string
    ingredients?: string
    servingSize?: number
    servingSizeUnit?: string
    foodNutrients: FoodDetailNutrient[]
}
