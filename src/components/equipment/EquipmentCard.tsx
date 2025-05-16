import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Tag, AlertCircle, Star, Calendar, ChevronRight } from 'lucide-react';
import { Equipment } from '../../types';
import { useEquipment } from '../../context/EquipmentContext';
import Card from '../ui/Card';

interface EquipmentCardProps {
  equipment: Equipment;
  className?: string;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, className = '' }) => {
  const { getCategoryById, getLocationById } = useEquipment();
  
  const category = getCategoryById(equipment.category);
  const location = getLocationById(equipment.location);
  
  const statusColors = {
    available: 'bg-success-100 text-success-800',
    rented: 'bg-error-100 text-error-800',
    maintenance: 'bg-warning-100 text-warning-800',
    reserved: 'bg-primary-100 text-primary-800',
  };
  
  const conditionColors = {
    excellent: 'bg-success-100 text-success-800',
    good: 'bg-success-50 text-success-700',
    fair: 'bg-warning-100 text-warning-800',
    poor: 'bg-error-100 text-error-800',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Generate random rating for demo purposes
  const rating = (Math.floor(Math.random() * 10) + 40) / 10; // Random between 4.0 and 5.0
  const reviewCount = Math.floor(Math.random() * 50) + 5; // Random between 5 and 55

  // Check if this is a list view (className contains flex-row)
  const isListView = className.includes('flex-row');

  return (
    <Card withHover className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-primary-500 ${className}`}>
      <Link to={`/equipment/${equipment.id}`} className={`${isListView ? 'flex' : 'flex-1 flex flex-col'}`}>
        <div className={`${isListView ? 'w-1/3 flex-shrink-0' : 'h-48'} relative`}>
          <img
            src={equipment.images[0] || 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'}
            alt={equipment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[equipment.availabilityStatus]}`}>
              {equipment.availabilityStatus.charAt(0).toUpperCase() + equipment.availabilityStatus.slice(1)}
            </span>
          </div>
          {!isListView && (
            <div className="absolute bottom-2 left-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                ${equipment.pricePerDay.toFixed(2)}/day
              </span>
            </div>
          )}
        </div>
        <Card.Content className={`flex-1 flex flex-col ${isListView ? 'p-4' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{category?.name || 'Category not found'}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-700">{rating}</span>
              <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>
          
          <h3 className="mt-2 text-lg font-medium text-gray-900 group-hover:text-primary-600">
            {equipment.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{equipment.description}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
              <span>{location?.name || 'Location not found'}</span>
            </div>
            
            {isListView && (
              <div className="flex items-center text-sm text-gray-600">
                <Tag className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                <span>{category?.name || 'Category not found'}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
              <span>Available: {equipment.availabilityStatus === 'available' ? 'Now' : 'Check dates'}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <AlertCircle className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${conditionColors[equipment.conditionStatus]}`}>
                {equipment.conditionStatus.charAt(0).toUpperCase() + equipment.conditionStatus.slice(1)} Condition
              </span>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between">
              {isListView ? (
                <>
                  <div className="font-medium text-gray-900">
                    ${equipment.pricePerDay.toFixed(2)}<span className="text-sm text-gray-500">/day</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary-600">
                    <span>View Details</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </>
              ) : (
                <div className="flex items-center text-sm font-medium text-primary-600">
                  <span>View Details</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </Card.Content>
      </Link>
    </Card>
  );
};

export default EquipmentCard;