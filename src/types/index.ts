export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'equipment_manager';
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  pricePerDay: number;
  availabilityStatus: 'available' | 'rented' | 'maintenance' | 'reserved';
  conditionStatus: 'excellent' | 'good' | 'fair' | 'poor';
  lastMaintenanceDate: string;
  images: string[];
  features?: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  equipmentId: string;
  customerId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  maintenanceType: 'routine' | 'repair' | 'inspection';
  description: string;
  performedBy: string;
  cost: number;
  date: string;
  nextScheduledDate?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  equipmentCount: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface DashboardStats {
  totalEquipment: number;
  availableEquipment: number;
  activeRentals: number;
  pendingReturns: number;
  totalCustomers: number;
  monthlyRevenue: number;
  popularCategories: Array<{ category: string; count: number }>;
  maintenanceDue: number;
}