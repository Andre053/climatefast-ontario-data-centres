'use client';

import DatacenterMap from './components/GeoJSONMap';
import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Ontario Data Centre Map
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3">
              Click on a point to view detailed information. Pink points are confirmed data centres.
            </p>
          </div>
          <DatacenterMap />
        </div>
      </div>
    </main>
  );
}
