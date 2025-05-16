import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Equipment, Category, Location } from '../types';
import { generateMockEquipment, generateMockCategories, generateMockLocations } from '../data/mockData';

interface EquipmentContextType {
  equipment: Equipment[];
  categories: Category[];
  locations: Location[];
  isLoading: boolean;
  error: string | null;
  getEquipmentById: (id: string) => Equipment | undefined;
  getEquipmentByCategory: (categoryId: string) => Equipment[];
  getEquipmentByLocation: (locationId: string) => Equipment[];
  getCategoryById: (id: string) => Category | undefined;
  getLocationById: (id: string) => Location | undefined;
  addEquipment: (equipment: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEquipment: (id: string, updates: Partial<Equipment>) => void;
  deleteEquipment: (id: string) => void;
  filterEquipment: (filters: EquipmentFilters) => Equipment[];
}

export interface EquipmentFilters {
  category?: string;
  location?: string;
  availabilityStatus?: string;
  conditionStatus?: string;
  priceRange?: { min: number; max: number };
  searchTerm?: string;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock data
        const mockCategories = generateMockCategories();
        const mockLocations = generateMockLocations();
        const mockEquipment = generateMockEquipment(mockCategories, mockLocations);
        
        setCategories(mockCategories);
        setLocations(mockLocations);
        setEquipment(mockEquipment);
      } catch (err) {
        setError('Failed to fetch equipment data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getEquipmentById = (id: string) => {
    return equipment.find(item => item.id === id);
  };

  const getEquipmentByCategory = (categoryId: string) => {
    return equipment.filter(item => item.category === categoryId);
  };

  const getEquipmentByLocation = (locationId: string) => {
    return equipment.filter(item => item.location === locationId);
  };

  const getCategoryById = (id: string) => {
    return categories.find(category => category.id === id);
  };

  const getLocationById = (id: string) => {
    return locations.find(location => location.id === id);
  };

  const addEquipment = (newEquipment: Omit<Equipment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const equipmentWithId: Equipment = {
      ...newEquipment,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    
    setEquipment(prev => [...prev, equipmentWithId]);
  };

  const updateEquipment = (id: string, updates: Partial<Equipment>) => {
    setEquipment(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date().toISOString() } 
          : item
      )
    );
  };

  const deleteEquipment = (id: string) => {
    setEquipment(prev => prev.filter(item => item.id !== id));
  };

  const filterEquipment = (filters: EquipmentFilters) => {
    return equipment.filter(item => {
      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      
      // Location filter
      if (filters.location && item.location !== filters.location) {
        return false;
      }
      
      // Availability status filter
      if (filters.availabilityStatus && item.availabilityStatus !== filters.availabilityStatus) {
        return false;
      }
      
      // Condition status filter
      if (filters.conditionStatus && item.conditionStatus !== filters.conditionStatus) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (item.pricePerDay < min || item.pricePerDay > max) {
          return false;
        }
      }
      
      // Search term filter (search across name and description)
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(searchTermLower);
        const descriptionMatch = item.description.toLowerCase().includes(searchTermLower);
        if (!nameMatch && !descriptionMatch) {
          return false;
        }
      }
      
      return true;
    });
  };

  const value = {
    equipment,
    categories,
    locations,
    isLoading,
    error,
    getEquipmentById,
    getEquipmentByCategory,
    getEquipmentByLocation,
    getCategoryById,
    getLocationById,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    filterEquipment,
  };

  return <EquipmentContext.Provider value={value}>{children}</EquipmentContext.Provider>;
};

export const useEquipment = (): EquipmentContextType => {
  const context = useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error('useEquipment must be used within an EquipmentProvider');
  }
  return context;
};