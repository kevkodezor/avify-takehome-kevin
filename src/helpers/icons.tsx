import { Wind, Sun, Droplets, Flame, Atom, Factory, Leaf, Cable, HelpCircle, type LucideIcon } from 'lucide-react'

export function getEnergyIcon(type: string): LucideIcon {
    switch (type.toLowerCase()) {
        case 'wind':
            return Wind
        case 'solar':
            return Sun
        case 'hydro':
            return Droplets
        case 'gas':
            return Flame
        case 'nuclear':
            return Atom
        case 'coal':
            return Factory
        case 'biomass':
            return Leaf
        case 'imports':
            return Cable
        case 'other':
            return HelpCircle
        default:
            return HelpCircle
    }
}

export function getEnergyColor(type: string): string {
    switch (type.toLowerCase()) {
        case 'wind':
            return '#3b82f6'
        case 'solar':
            return '#f59e0b'
        case 'hydro':
            return '#06b6d4'
        case 'gas':
            return '#ef4444' 
        case 'nuclear':
            return '#8b5cf6'
        case 'coal':
            return '#6b7280'
        case 'biomass':
            return '#10b981'
        case 'imports':
            return '#ec4899'
        case 'other':
            return '#9ca3af'
        default:
            return '#6b7280'
    }
}

