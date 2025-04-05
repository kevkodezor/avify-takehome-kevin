import React, { useEffect, useState } from 'react';
import { fetchEnergy } from '../helpers/fetch';
import { Energy } from '../interfaces/energys';

import { AlertCircle, RefreshCw } from 'lucide-react'

const tabsData = [
    { id: 'todas', label: 'Todas', Componente: <div>Tab1</div> },
    { id: 'graficos', label: 'Graficos', Componente: <div>Tab1</div> },
    { id: 'bandas', label: 'Bandas', Componente: <div>Tab1</div> },
    { id: 'numeros', label: 'Por numeros', Componente: <div>Tab1</div> },
];

export function Dasshboard () {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [activeTabId, setActiveTabId] = useState<string>(tabsData[0].id);

    const [energyData, setEnergyData] = useState<Energy | null>(null);

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

    const handleTabClick = (tabId: string) => {
        setActiveTabId(tabId);
    };

    const activeTabData = tabsData.find(tab => tab.id === activeTabId);

    return (
        <div className='my-4'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                {lastUpdated && (
                    <div className='space-y-1'>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>Ultima actulizacion : {lastUpdated.toLocaleTimeString()}</p>
                        {energyData && (
                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                Fecha: {new Date(energyData.timestamp).toLocaleString()}
                            </p>
                        )}
                    </div>
                )}
                <button type='button' onClick={loadData} className='flex items-center gap-2 cursor-pointer shadow-sm p-2 rounded hover:shadow-md transition duration-200'>
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
            {!error && (energyData || loading) && (
                <div className='tabs-container mt-4'>
                    <div className='flex border-b border-gray-200 dark:border-gray-700' role='tablist' aria-label='Datos Energéticos'>
                        {tabsData.map((tab) => (
                            <button
                                key={tab.id}
                                className={`py-2 px-4 text-sm font-medium text-center border-b-2 focus:outline-none transition duration-150 ease-in-out ${activeTabId === tab.id
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
                                    }`}
                                onClick={() => handleTabClick(tab.id)}
                                role='tab'
                                aria-selected={activeTabId === tab.id}
                                aria-controls={`panel-${tab.id}`}
                                id={`tab-${tab.id}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className='tab-content mt-4'>
                        {activeTabData?.Componente && (
                            <div
                                id={`panel-${activeTabData.id}`}
                                role='tabpanel'
                                aria-labelledby={`tab-${activeTabData.id}`}
                                tabIndex={0}
                                className='focus:outline-none'
                            >
                                Tab
                                {/* <activeTabData.Componente data={energyData} /> */}
                            </div>
                        )}
                        {loading && energyData && (
                            <div className='text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center'>
                                <RefreshCw className='h-3 w-3 animate-spin mr-1' /> Actualizando...
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!loading && !error && !energyData && (
                <p className='text-center text-gray-500 dark:text-gray-400 mt-8'>No hay datos energéticos para mostrar.</p>
            )}
        </div>
    );
}