import React from 'react';
import { Dasshboard } from './components/dasboard';

const App = () => {
    return (
        <main className='min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-3xl md:text-5xl font-bold text-gray-900 dark:text-white'>
                    Energy generation in the UK
                </h1>
                <span className='text-gray-600 dark:text-gray-300 mb-8'>
                    Data in real time
                </span>
                <Dasshboard />
            </div>
        </main>
    );
}

export {
    App
}