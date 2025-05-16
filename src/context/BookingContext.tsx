import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Booking } from '../types';
import { useAuth } from './AuthContext';
import { useEquipment } from './EquipmentContext';
import { generateMockBookings } from '../data/mockData';

interface BookingContextType {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  getBookingById: (id: string) => Booking | undefined;
  getBookingsByCustomerId: (customerId: string) => Booking[];
  getBookingsByEquipmentId: (equipmentId: string) => Booking[];
  createBooking: (booking: CreateBookingInput) => Promise<Booking>;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  cancelBooking: (id: string) => void;
  isEquipmentAvailable: (equipmentId: string, startDate: string, endDate: string, excludeBookingId?: string) => boolean;
}

interface CreateBookingInput {
  equipmentId: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { equipment, updateEquipment } = useEquipment();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock bookings
        const mockBookings = generateMockBookings(equipment);
        setBookings(mockBookings);
      } catch (err) {
        setError('Failed to fetch booking data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [equipment]);

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  const getBookingsByCustomerId = (customerId: string) => {
    return bookings.filter(booking => booking.customerId === customerId);
  };

  const getBookingsByEquipmentId = (equipmentId: string) => {
    return bookings.filter(booking => booking.equipmentId === equipmentId);
  };

  const isEquipmentAvailable = (
    equipmentId: string, 
    startDate: string, 
    endDate: string,
    excludeBookingId?: string
  ) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    
    // Get all bookings for this equipment that are not cancelled
    const equipmentBookings = bookings.filter(
      booking => 
        booking.equipmentId === equipmentId && 
        booking.status !== 'cancelled' &&
        (excludeBookingId ? booking.id !== excludeBookingId : true)
    );

    // Check if any booking overlaps with the requested dates
    return !equipmentBookings.some(booking => {
      const bookingStart = new Date(booking.startDate).getTime();
      const bookingEnd = new Date(booking.endDate).getTime();
      
      // Check for any overlap
      return (
        (start <= bookingEnd && start >= bookingStart) ||
        (end >= bookingStart && end <= bookingEnd) ||
        (start <= bookingStart && end >= bookingEnd)
      );
    });
  };

  const createBooking = async (input: CreateBookingInput): Promise<Booking> => {
    // Check if user exists and has an id
    if (!user || !user.id) {
      throw new Error('You must be logged in to create a booking');
    }
    
    const { equipmentId, startDate, endDate, notes } = input;
    
    // Check if equipment exists
    const equipmentItem = equipment.find(item => item.id === equipmentId);
    if (!equipmentItem) {
      throw new Error('Equipment not found');
    }
    
    // Check if dates are valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Invalid dates');
    }
    
    if (start >= end) {
      throw new Error('Start date must be before end date');
    }
    
    // Check if equipment is available for these dates
    if (!isEquipmentAvailable(equipmentId, startDate, endDate)) {
      throw new Error('Equipment is not available for the selected dates');
    }
    
    // Calculate number of days
    const daysCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate total price
    const totalPrice = daysCount * equipmentItem.pricePerDay;
    
    // Create new booking
    const now = new Date().toISOString();
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9),
      equipmentId,
      customerId: user.id,
      startDate,
      endDate,
      status: 'pending',
      totalPrice,
      paymentStatus: 'pending',
      notes: notes || '',
      createdAt: now,
      updatedAt: now,
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update bookings state
    setBookings(prev => [...prev, newBooking]);
    
    // Update equipment availability status
    updateEquipment(equipmentId, { 
      availabilityStatus: 'reserved',
      updatedAt: now
    });
    
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const booking = getBookingById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    setBookings(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status, updatedAt: new Date().toISOString() } 
          : item
      )
    );
    
    // Update equipment availability based on booking status
    const equipmentId = booking.equipmentId;
    let newAvailabilityStatus: 'available' | 'rented' | 'reserved' = 'available';
    
    if (status === 'active') {
      newAvailabilityStatus = 'rented';
    } else if (status === 'pending' || status === 'confirmed') {
      newAvailabilityStatus = 'reserved';
    } else if (status === 'completed' || status === 'cancelled') {
      // Check if there are other active bookings for this equipment
      const activeBookings = getBookingsByEquipmentId(equipmentId).filter(
        b => b.id !== id && (b.status === 'active' || b.status === 'confirmed' || b.status === 'pending')
      );
      
      newAvailabilityStatus = activeBookings.length > 0 
        ? activeBookings.some(b => b.status === 'active') ? 'rented' : 'reserved'
        : 'available';
    }
    
    updateEquipment(equipmentId, { 
      availabilityStatus: newAvailabilityStatus,
      updatedAt: new Date().toISOString()
    });
  };

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, 'cancelled');
  };

  const value = {
    bookings,
    isLoading,
    error,
    getBookingById,
    getBookingsByCustomerId,
    getBookingsByEquipmentId,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    isEquipmentAvailable,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBookings = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};