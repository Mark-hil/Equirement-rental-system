import React, { useState } from 'react';
import { Filter, Search, Check, X, ChevronDown } from 'lucide-react';
import { EquipmentFilters as FiltersType } from '../../context/EquipmentContext';
import { useEquipment } from '../../context/EquipmentContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface EquipmentFiltersProps {
  filters: FiltersType;
  onChangeFilters: (filters: FiltersType) => void;
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({ filters, onChangeFilters }) => {
  const { categories, locations } = useEquipment();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    locations: true,
    availability: true,
    condition: true,
    price: true
  });

  const availabilityStatuses = [
    { id: 'available', name: 'Available' },
    { id: 'reserved', name: 'Reserved' },
    { id: 'rented', name: 'Rented' },
    { id: 'maintenance', name: 'Under Maintenance' },
  ];

  const conditionStatuses = [
    { id: 'excellent', name: 'Excellent' },
    { id: 'good', name: 'Good' },
    { id: 'fair', name: 'Fair' },
    { id: 'poor', name: 'Poor' },
  ];

  const priceRanges = [
    { id: '0-50', name: 'Under $50', min: 0, max: 50 },
    { id: '50-100', name: '$50 - $100', min: 50, max: 100 },
    { id: '100-200', name: '$100 - $200', min: 100, max: 200 },
    { id: '200-500', name: '$200 - $500', min: 200, max: 500 },
    { id: '500-1000', name: 'Over $500', min: 500, max: 99999 },
  ];

  const handleCategoryChange = (categoryId: string) => {
    onChangeFilters({
      ...filters,
      category: filters.category === categoryId ? undefined : categoryId,
    });
  };

  const handleLocationChange = (locationId: string) => {
    onChangeFilters({
      ...filters,
      location: filters.location === locationId ? undefined : locationId,
    });
  };

  const handleAvailabilityChange = (status: string) => {
    onChangeFilters({
      ...filters,
      availabilityStatus: filters.availabilityStatus === status ? undefined : status,
    });
  };

  const handleConditionChange = (status: string) => {
    onChangeFilters({
      ...filters,
      conditionStatus: filters.conditionStatus === status ? undefined : status,
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onChangeFilters({
      ...filters,
      priceRange: filters.priceRange?.min === min && filters.priceRange?.max === max 
        ? undefined 
        : { min, max },
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeFilters({
      ...filters,
      searchTerm: searchTerm.trim() === '' ? undefined : searchTerm,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    onChangeFilters({});
  };

  const hasActiveFilters = () => {
    return (
      !!filters.category ||
      !!filters.location ||
      !!filters.availabilityStatus ||
      !!filters.conditionStatus ||
      !!filters.priceRange ||
      !!filters.searchTerm
    );
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Mobile filter dialog */}
      <div
        className={`fixed inset-0 flex z-40 lg:hidden ${
          mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } transition-opacity ease-in-out duration-300`}
        aria-hidden="true"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={toggleMobileFilters}></div>
        <div
          className={`relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transform ${
            mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform ease-in-out duration-300`}
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
              onClick={toggleMobileFilters}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile filters */}
          <div className="mt-4 border-t border-gray-200">
            <div className="px-4 py-6">
              <h3 className="text-sm font-medium text-gray-900">Categories</h3>
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`mobile-category-${category.id}`}
                      name={`mobile-category-${category.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.category === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={`mobile-category-${category.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Locations</h3>
              <div className="mt-4 space-y-2">
                {locations.map((location) => (
                  <div key={location.id} className="flex items-center">
                    <input
                      id={`mobile-location-${location.id}`}
                      name={`mobile-location-${location.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.location === location.id}
                      onChange={() => handleLocationChange(location.id)}
                    />
                    <label
                      htmlFor={`mobile-location-${location.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {location.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Availability</h3>
              <div className="mt-4 space-y-2">
                {availabilityStatuses.map((status) => (
                  <div key={status.id} className="flex items-center">
                    <input
                      id={`mobile-availability-${status.id}`}
                      name={`mobile-availability-${status.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.availabilityStatus === status.id}
                      onChange={() => handleAvailabilityChange(status.id)}
                    />
                    <label
                      htmlFor={`mobile-availability-${status.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {status.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Condition</h3>
              <div className="mt-4 space-y-2">
                {conditionStatuses.map((status) => (
                  <div key={status.id} className="flex items-center">
                    <input
                      id={`mobile-condition-${status.id}`}
                      name={`mobile-condition-${status.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={filters.conditionStatus === status.id}
                      onChange={() => handleConditionChange(status.id)}
                    />
                    <label
                      htmlFor={`mobile-condition-${status.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {status.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
              <div className="mt-4 space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input
                      id={`mobile-price-${range.id}`}
                      name={`mobile-price-${range.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      checked={
                        filters.priceRange?.min === range.min && filters.priceRange?.max === range.max
                      }
                      onChange={() => handlePriceRangeChange(range.min, range.max)}
                    />
                    <label
                      htmlFor={`mobile-price-${range.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto px-4">
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={clearFilters}
              disabled={!hasActiveFilters()}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftAddon={<Search className="h-5 w-5" />}
                className="w-full"
              />
              <Button type="submit" className="ml-2">
                Search
              </Button>
            </form>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={toggleMobileFilters}
              className="lg:hidden"
            >
              Filter
            </Button>
            {hasActiveFilters() && (
              <Button
                variant="outline"
                leftIcon={<X className="h-4 w-4" />}
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active filters */}
        {hasActiveFilters() && (
          <div className="py-3 px-4">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {categories.find((c) => c.id === filters.category)?.name}
                  <button
                    type="button"
                    className="ml-1 inline-flex"
                    onClick={() => handleCategoryChange(filters.category!)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {locations.find((l) => l.id === filters.location)?.name}
                  <button
                    type="button"
                    className="ml-1 inline-flex"
                    onClick={() => handleLocationChange(filters.location!)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {filters.availabilityStatus && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {
                    availabilityStatuses.find((s) => s.id === filters.availabilityStatus)
                      ?.name
                  }
                  <button
                    type="button"
                    className="ml-1 inline-flex"
                    onClick={() => handleAvailabilityChange(filters.availabilityStatus!)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {filters.conditionStatus && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {
                    conditionStatuses.find((s) => s.id === filters.conditionStatus)?.name
                  }
                  <button
                    type="button"
                    className="ml-1 inline-flex"
                    onClick={() => handleConditionChange(filters.conditionStatus!)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {filters.priceRange && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {`$${filters.priceRange.min} - $${filters.priceRange.max === 99999 ? '+' : filters.priceRange.max}`}
                  <button
                    type="button"
                    className="ml-1 inline-flex"
                    onClick={() => onChangeFilters({ ...filters, priceRange: undefined })}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
              {filters.searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  Search: {filters.searchTerm}
                  <button
                    type="button"
                    className="ml-1 inline-flex"
                    onClick={() => {
                      setSearchTerm('');
                      onChangeFilters({ ...filters, searchTerm: undefined });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block p-4">
        <div className="grid grid-cols-4 gap-x-8 gap-y-6">
          {/* Categories Section */}
          <div>
            <button 
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-sm font-medium text-gray-900">Categories</h3>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.categories ? 'transform rotate-180' : ''}`} 
              />
            </button>
            
            {expandedSections.categories && (
              <ul className="mt-4 space-y-3">
                {categories.map((category) => (
                  <li key={category.id} className="flex items-center">
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex items-center text-sm ${
                        filters.category === category.id
                          ? 'font-medium text-primary-700'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <div className={`h-4 w-4 mr-2 rounded-sm flex items-center justify-center ${
                        filters.category === category.id 
                          ? 'bg-primary-600 border border-primary-600' 
                          : 'border border-gray-300'
                      }`}>
                        {filters.category === category.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Locations Section */}
          <div>
            <button 
              onClick={() => toggleSection('locations')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-sm font-medium text-gray-900">Locations</h3>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.locations ? 'transform rotate-180' : ''}`} 
              />
            </button>
            
            {expandedSections.locations && (
              <ul className="mt-4 space-y-3">
                {locations.map((location) => (
                  <li key={location.id} className="flex items-center">
                    <button
                      onClick={() => handleLocationChange(location.id)}
                      className={`flex items-center text-sm ${
                        filters.location === location.id
                          ? 'font-medium text-primary-700'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <div className={`h-4 w-4 mr-2 rounded-sm flex items-center justify-center ${
                        filters.location === location.id 
                          ? 'bg-primary-600 border border-primary-600' 
                          : 'border border-gray-300'
                      }`}>
                        {filters.location === location.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      {location.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filters Section */}
          <div>
            <button 
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-sm font-medium text-gray-900">Availability & Condition</h3>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.availability ? 'transform rotate-180' : ''}`} 
              />
            </button>
            
            {expandedSections.availability && (
              <div className="mt-4 space-y-5">
                <div>
                  <h4 className="text-sm text-gray-700 font-medium mb-2">Availability</h4>
                  <ul className="space-y-2">
                    {availabilityStatuses.map((status) => (
                      <li key={status.id} className="flex items-center">
                        <button
                          onClick={() => handleAvailabilityChange(status.id)}
                          className={`flex items-center text-sm ${
                            filters.availabilityStatus === status.id
                              ? 'font-medium text-primary-700'
                              : 'text-gray-600 hover:text-gray-800'
                          }`}
                        >
                          <div className={`h-4 w-4 mr-2 rounded-sm flex items-center justify-center ${
                            filters.availabilityStatus === status.id 
                              ? 'bg-primary-600 border border-primary-600' 
                              : 'border border-gray-300'
                          }`}>
                            {filters.availabilityStatus === status.id && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          {status.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm text-gray-700 font-medium mb-2">Condition</h4>
                  <ul className="space-y-2">
                    {conditionStatuses.map((status) => (
                      <li key={status.id} className="flex items-center">
                        <button
                          onClick={() => handleConditionChange(status.id)}
                          className={`flex items-center text-sm ${
                            filters.conditionStatus === status.id
                              ? 'font-medium text-primary-700'
                              : 'text-gray-600 hover:text-gray-800'
                          }`}
                        >
                          <div className={`h-4 w-4 mr-2 rounded-sm flex items-center justify-center ${
                            filters.conditionStatus === status.id 
                              ? 'bg-primary-600 border border-primary-600' 
                              : 'border border-gray-300'
                          }`}>
                            {filters.conditionStatus === status.id && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          {status.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div>
            <button 
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.price ? 'transform rotate-180' : ''}`} 
              />
            </button>
            
            {expandedSections.price && (
              <ul className="mt-4 space-y-3">
                {priceRanges.map((range) => (
                  <li key={range.id} className="flex items-center">
                    <button
                      onClick={() => handlePriceRangeChange(range.min, range.max)}
                      className={`flex items-center text-sm ${
                        filters.priceRange?.min === range.min && filters.priceRange?.max === range.max
                          ? 'font-medium text-primary-700'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <div className={`h-4 w-4 mr-2 rounded-sm flex items-center justify-center ${
                        filters.priceRange?.min === range.min && filters.priceRange?.max === range.max
                          ? 'bg-primary-600 border border-primary-600' 
                          : 'border border-gray-300'
                      }`}>
                        {filters.priceRange?.min === range.min && filters.priceRange?.max === range.max && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      {range.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentFilters;