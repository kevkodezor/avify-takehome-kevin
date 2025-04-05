import React from  'react';
import { Energy } from '../interfaces/energys';
import { getEnergyColor } from '../helpers/icons';
import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EnergyTilesProps {
    data: Energy | null;
}

export const Charts = ({ data }: EnergyTilesProps) => {

    const sortedSources = [...data.sources].sort((a, b) => b.percentage - a.percentage);

    const chartData = sortedSources.map((source) => ({
        name: source.type,
        value: source.value,
        percentage: source.percentage,
        color: getEnergyColor(source.type),
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload?.length) {
            return (
                <div className='bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md'>
                    <p className='font-medium'>{payload[0].name}</p>
                    <p className='text-sm'>
                        <span className='font-medium'>{payload[0].value.toLocaleString()}</span> MW
                    </p>
                    <p className='text-sm'>
                        <span className='font-medium'>{payload[0].payload.percentage.toFixed(1)}</span>%
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout='vertical' margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <XAxis type='number' />
                <YAxis type='category' dataKey='name' width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey='value' name='Megawatts (MW)' radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>

    );
}