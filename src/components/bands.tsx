import React from  'react';
import { Energy } from '../interfaces/energys';
import { getEnergyColor } from '../helpers/icons';

interface EnergyTilesProps {
    data: Energy | null;
}

export const Bands = ({ data }: EnergyTilesProps) => {

    const sortedSources = [...data.sources].sort((a, b) => b.percentage - a.percentage);

    return (
        <div className='space-y-8'>
            <div className='h-24 md:h-32 w-full flex rounded-lg overflow-hidden'>
                {sortedSources.map((source) => (
                    <div
                        key={source.type}
                        style={{
                            backgroundColor: getEnergyColor(source.type),
                            width: `${source.percentage}%`,
                        }}
                        className='h-full transition-all duration-500 ease-in-out hover:opacity-90'
                        title={`${source.type}: ${source.percentage.toFixed(1)}%`}
                    />
                ))}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {sortedSources.map((source) => (
                    <div key={source.type} className='flex items-center gap-2'>
                        <div className='w-4 h-4 rounded-full' style={{ backgroundColor: getEnergyColor(source.type) }} />
                        <span className='text-sm font-medium'>
                            {source.type} ({source.percentage.toFixed(1)}%)
                        </span>
                    </div>
                ))}
            </div>

            <div className='relative h-64 md:h-80 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center z-10'>
                        <h3 className='text-2xl md:text-3xl font-bold text-white drop-shadow-md'>UK Energy Mix</h3>
                        <p className='text-white text-lg md:text-xl drop-shadow-md'>Total: {data.total.toLocaleString()} MW</p>
                    </div>
                </div>
                <div className='absolute inset-0'>
                    <svg width='100%' height='100%' viewBox='0 0 100 100' preserveAspectRatio='none'>
                        {sortedSources.map((source, index, array) => {
                            const previousPercentage = array.slice(0, index).reduce((sum, s) => sum + s.percentage, 0)

                            return (
                                <path
                                    key={source.type}
                                    d={`
                                        M 0,100
                                        L 100,100
                                        L 100,${100 - previousPercentage - source.percentage}
                                        L 0,${100 - previousPercentage}
                                        Z
                                    `}
                                    fill={getEnergyColor(source.type)}
                                    opacity='0.9'
                                />
                            )
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}