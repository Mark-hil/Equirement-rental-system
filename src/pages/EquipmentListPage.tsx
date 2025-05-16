import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEquipment, EquipmentFilters as FiltersType } from '../context/EquipmentContext';
import EquipmentCard from '../components/equipment/EquipmentCard';
import EquipmentFilters from '../components/equipment/EquipmentFilters';
import { Grid, List, Sliders, LayoutGrid } from 'lucide-react';

const EquipmentListPage: React.FC = () => {
  const { equipment, isLoading, filterEquipment } = useEquipment();
  const [filters, setFilters] = useState<FiltersType>({});
  const [filteredEquipment, setFilteredEquipment] = useState(equipment);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const location = useLocation();

  // Parse URL parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters: FiltersType = {};

    const categoryParam = params.get('category');
    if (categoryParam) {
      newFilters.category = categoryParam;
    }

    const locationParam = params.get('location');
    if (locationParam) {
      newFilters.location = locationParam;
    }

    const searchParam = params.get('search');
    if (searchParam) {
      newFilters.searchTerm = searchParam;
    }

    setFilters(newFilters);
  }, [location.search]);

  // Apply filters whenever they change
  useEffect(() => {
    if (!isLoading) {
      setFilteredEquipment(filterEquipment(filters));
    }
  }, [filters, equipment, isLoading, filterEquipment]);

  const handleFilterChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Browse Our Equipment
            </h1>
            <p className="mt-4 text-xl text-white/80">
              Find the perfect equipment for your next project. Use the filters to narrow down your search.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
          {/* Filters */}
          <div className="lg:col-span-4 mb-8">
            <EquipmentFilters filters={filters} onChangeFilters={handleFilterChange} />
          </div>

          {/* Results Header */}
          <div className="lg:col-span-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredEquipment.length}</span>{' '}
                {filteredEquipment.length === 1 ? 'result' : 'results'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-gray-500'
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-gray-500'
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Equipment grid */}
          <div className="lg:col-span-4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="animate-pulse bg-white rounded-lg shadow h-96">
                      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                          <div className="h-4 bg-gray-300 rounded w-2/5"></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : filteredEquipment.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEquipment.map((item) => (
                    <EquipmentCard key={item.id} equipment={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEquipment.map((item) => (
                    <EquipmentCard 
                      key={item.id} 
                      equipment={item} 
                      className="!flex-row h-auto overflow-hidden"
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <Sliders className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No equipment found</h3>
                <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                  Try adjusting your filters or search term to find what you're looking for.
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pagination - For future implementation */}
        {filteredEquipment.length > 0 && (
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">{Math.min(filteredEquipment.length, 20)}</span> of{' '}
                  <span className="font-medium">{filteredEquipment.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button aria-current="page" className="relative z-10 inline-flex items-center bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    2
                  </button>
                  <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                  <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentListPage;