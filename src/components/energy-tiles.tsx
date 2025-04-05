import React from  'react';
import { Energy } from '../interfaces/energys';
import { getEnergyColor, getEnergyIcon } from '../helpers/icons';

interface EnergyTilesProps {
    data: Energy | null;
}

export const Energytiles = ({ data }: EnergyTilesProps) => {

    const sortedSources = [...data.sources].sort((a, b) => b.percentage - a.percentage);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {sortedSources.map((source) => {
                const Icon = getEnergyIcon(source.type)
                const color = getEnergyColor(source.type)

                return (
                    <div key={source.type} className="overflow-hidden shadow-lg rounded-lg bg-white dark:bg-gray-800">
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
                                    <Icon className="h-6 w-6" style={{ color }} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">{source.type}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold" style={{ color }}>
                                            {source.percentage.toFixed(1)}%
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{source.value.toLocaleString()} MW</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}