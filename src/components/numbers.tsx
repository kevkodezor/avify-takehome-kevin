import React from  'react';
import { Energy } from '../interfaces/energys';
import { getEnergyColor, getEnergyIcon } from '../helpers/icons';

interface EnergyTilesProps {
    data: Energy | null;
}

export const Numbers = ({ data }: EnergyTilesProps) => {

    const sortedSources = [...data.sources].sort((a, b) => b.percentage - a.percentage);
    const topSources = sortedSources.slice(0, 3);

    return (
        <div className='grid gap-4'>
            <div className='shadow bg-white rounded-lg p-5'>
                <strong className='text-2xl text-left'>Total</strong>
                <div className='text-center text-5xl md:text-7xl font-bold text-gray-900 dark:text-white'>
                    {Math.round(data.total).toLocaleString()}
                </div>
                <div className=' text-center text-xl md:text-2xl text-gray-500 dark:text-gray-400 mt-2'>Megawatts</div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {topSources.map((source) => {
                    const Icon = getEnergyIcon(source.type)
                    const color = getEnergyColor(source.type)

                    return (
                        <div key={source.type} className='shadow bg-white rounded-lg p-5'>
                            <div className='pb-2'>
                                <p className='flex items-center gap-2'>
                                    <Icon className='h-5 w-5' style={{ color }} />
                                    {source.type}
                                </p>
                            </div>
                            <div>
                                <div className='text-center'>
                                    <div className='text-4xl md:text-5xl font-bold' style={{ color }}>
                                        {source.percentage.toFixed(1)}%
                                    </div>
                                    <div className='text-xl md:text-2xl font-medium mt-2'>
                                        {Math.round(source.value).toLocaleString()} MW
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}