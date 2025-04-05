import type { Energy, EnergyData, ApiResponse } from '../interfaces/energys';

export async function fetchEnergy(): Promise<Energy> {
    try {
        const response = await fetch('https://api.carbonintensity.org.uk/generation', {
            headers: {
                Accept: 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data: ApiResponse = await response.json()

        // Para esta demostracion se asumira un total de 40 mil MegaWatts
        const estimatedTotalMW = 40000

        const sources: EnergyData[] = data.data.generationmix.map((item) => ({
            type: item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1),
            percentage: item.perc,
            value: (item.perc / 100) * estimatedTotalMW,
        }))

        const total = sources.reduce((sum, source) => sum + source.value, 0)

        return {
            timestamp: data.data.from,
            total,
            sources,
        }
    } catch (error) {
        console.error('Error fetching energy data:', error)
        throw new Error('Failed to fetch energy data')
    }
}