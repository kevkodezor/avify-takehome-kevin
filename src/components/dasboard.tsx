import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@heroui/tabs';
import { AlertCircle, RefreshCw } from 'lucide-react';  

import { fetchEnergy } from '../helpers/fetch';
import { Energy } from '../interfaces/energys';

import { Energytiles } from './energy-tiles';
import { Charts } from './charts';
import { Bands } from './bands';
import { Numbers } from './numbers';

export function Dasshboard () {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const [energyData, setEnergyData] = useState<Energy>({
        timestamp: '',
        total: 0,
        sources: []
    });

    const loadData = async () => {
        try {
            if (!energyData) setLoading(true)
            setError(null)
            const data = await fetchEnergy();
            setEnergyData(data)
            setLastUpdated(new Date())
        } catch (err) {
            setError('Error al obtener datos. Intente de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
        const interval = setInterval(loadData, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, []);

    return (
        <div className='my-4'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                {lastUpdated && (
                    <div className='space-y-1'>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>Last update : {lastUpdated.toLocaleTimeString()}</p>
                        {energyData && (
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                Date: {new Date(energyData.timestamp).toLocaleString()}
                            </p>
                        )}
                    </div>
                )}
                <button type='button' onClick={loadData} className='flex items-center gap-2 bg-white cursor-pointer shadow-sm p-2 rounded hover:shadow-md transition duration-200'>
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    <span className='text-sm text-gray-500 dark:text-gray-400 ml-2'>
                        {loading ? 'Actualizando' : 'Actualizar'}
                    </span>
                </button>
            </div>

            {error && !loading && (
                <div className='flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4' role='alert'>
                    <AlertCircle className='h-4 w-4 mr-2' />
                    <span className='block sm:inline'>Error: </span>
                    <span className='text-red-500'>{error}</span>
                </div>
            )}

            {loading && !energyData && (
                <div className='flex justify-center items-center p-10'>
                    <RefreshCw className='h-8 w-8 animate-spin text-blue-500' />
                    <span className='ml-3 text-gray-600 dark:text-gray-300'>Cargando datos iniciales...</span>
                </div>
            )}

            <Tabs aria-label='Options' variant='underlined' color='secondary' 
                classNames={{
                    tabList: 'gap-5 w-full rounded-lg bg-white shadow-sm',
                    cursor: 'bg-[#8b5cf6] w-full rounded-lg',
                    tab: 'h-12 active:bg-[#8b5cf650] focus:bg-[#8b5cf620] rounded-sm',
                    tabContent: 'group-data-[selected=true]:text-[#8b5cf6]'
            }} 
                fullWidth
            >
                <Tab key='all' title='All'>
                    <Energytiles data={energyData} />
                </Tab>
                <Tab key='graphics' title='Graphics'>
                    <Charts data={energyData} />
                </Tab>
                <Tab key='bands' title='Bands'>
                    <Bands data={energyData} />
                </Tab>
                <Tab key='numbers' title='Numbers'>
                    <Numbers data={energyData} />
                </Tab>
            </Tabs>

            {!loading && !error && !energyData && (
                <p className='text-center text-gray-500 dark:text-gray-400 mt-8'>No hay datos energéticos para mostrar.</p>
            )}
        </div>
    );
}