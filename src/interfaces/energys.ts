export interface Energy {
    timestamp: string
    total: number
    sources: EnergyData[]
}

export interface EnergyData {
    type: string
    value: number // Indicador del consumo de energetico
    percentage: number // Indicador de porcentaje del consunmo
}

export interface ApiResponse {
    data: {
        from: string
        to: string
        generationmix: Array<{
            fuel: string
            perc: number
        }>
    }
}