import { Equipment, Category, Location, Booking, User, MaintenanceRecord } from '../types';

// Generate random date in the past (up to maxDaysAgo days ago)
const getRandomPastDate = (maxDaysAgo = 365) => {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * maxDaysAgo);
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysAgo);
  return pastDate.toISOString();
};

// Generate random date in the future (up to maxDaysAhead days)
const getRandomFutureDate = (minDaysAhead = 1, maxDaysAhead = 60) => {
  const today = new Date();
  const daysAhead = Math.floor(Math.random() * (maxDaysAhead - minDaysAhead + 1)) + minDaysAhead;
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysAhead);
  return futureDate.toISOString();
};

// Generate a range of dates (start date to end date)
const getDateRange = (minDaysAhead = 1, maxDaysAhead = 14, durationDays = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + Math.floor(Math.random() * (maxDaysAhead - minDaysAhead + 1)) + minDaysAhead);
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + durationDays);
  
  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
};

export const generateMockCategories = (): Category[] => {
  return [
    {
      id: '1',
      name: 'Construction Equipment',
      description: 'Heavy machinery used for construction projects',
      imageUrl: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      equipmentCount: 8
    },
    {
      id: '2',
      name: 'Landscaping Tools',
      description: 'Equipment for garden and landscape maintenance',
      imageUrl: 'https://images.pexels.com/photos/589/garden-gardening-grass-lawn.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      equipmentCount: 6
    },
    {
      id: '3',
      name: 'Power Tools',
      description: 'Electric and pneumatic tools for various tasks',
      imageUrl: 'https://images.pexels.com/photos/514395/pexels-photo-514395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      equipmentCount: 10
    },
    {
      id: '4',
      name: 'Event Equipment',
      description: 'Equipment for parties, weddings, and corporate events',
      imageUrl: 'https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      equipmentCount: 5
    },
    {
      id: '5',
      name: 'Painting Equipment',
      description: 'Tools and machinery for painting projects',
      imageUrl: 'https://images.pexels.com/photos/8092362/pexels-photo-8092362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      equipmentCount: 4
    }
  ];
};

export const generateMockLocations = (): Location[] => {
  return [
    {
      id: '1',
      name: 'Downtown Depot',
      address: '123 Main Street',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      contactPhone: '(212) 555-1234',
      contactEmail: 'downtown@rentalco.com'
    },
    {
      id: '2',
      name: 'Westside Warehouse',
      address: '456 West Avenue',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10002',
      contactPhone: '(212) 555-5678',
      contactEmail: 'westside@rentalco.com'
    },
    {
      id: '3',
      name: 'Suburban Storage',
      address: '789 Maple Road',
      city: 'Springfield',
      state: 'NY',
      zipCode: '10101',
      contactPhone: '(212) 555-9012',
      contactEmail: 'suburban@rentalco.com'
    }
  ];
};

export const generateMockEquipment = (categories: Category[], locations: Location[]): Equipment[] => {
  const conditionStatuses: ('excellent' | 'good' | 'fair' | 'poor')[] = ['excellent', 'good', 'fair', 'poor'];
  const availabilityStatuses: ('available' | 'rented' | 'maintenance' | 'reserved')[] = ['available', 'rented', 'maintenance', 'reserved'];
  
  const mockEquipment: Equipment[] = [
    {
      id: '1',
      name: 'Excavator X2000',
      description: 'Heavy-duty excavator perfect for large construction projects',
      category: '1', // Construction
      location: '1', // Downtown
      pricePerDay: 350,
      availabilityStatus: 'available',
      conditionStatus: 'excellent',
      lastMaintenanceDate: getRandomPastDate(30),
      images: [
        'https://images.pexels.com/photos/2058911/pexels-photo-2058911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2465877/pexels-photo-2465877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Hydraulic arm', 'Climate-controlled cabin', 'GPS tracking'],
      specifications: {
        'Weight': '15 tons',
        'Digging Depth': '20 feet',
        'Engine': '250 HP Diesel',
        'Bucket Capacity': '1.5 cubic yards'
      },
      createdAt: getRandomPastDate(90),
      updatedAt: getRandomPastDate(15)
    },
    {
      id: '2',
      name: 'Commercial Lawn Mower',
      description: 'Professional-grade lawn mower for large areas',
      category: '2', // Landscaping
      location: '3', // Suburban
      pricePerDay: 85,
      availabilityStatus: 'available',
      conditionStatus: 'good',
      lastMaintenanceDate: getRandomPastDate(45),
      images: [
        'https://images.pexels.com/photos/589/garden-gardening-grass-lawn.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Self-propelled', '42-inch cutting deck', 'Mulching capability'],
      specifications: {
        'Engine': '24 HP Kawasaki',
        'Cutting Width': '42 inches',
        'Fuel Capacity': '5 gallons',
        'Max Speed': '8 mph'
      },
      createdAt: getRandomPastDate(120),
      updatedAt: getRandomPastDate(20)
    },
    {
      id: '3',
      name: 'Professional Table Saw',
      description: 'High-precision table saw for woodworking projects',
      category: '3', // Power Tools
      location: '2', // Westside
      pricePerDay: 65,
      availabilityStatus: 'rented',
      conditionStatus: 'excellent',
      lastMaintenanceDate: getRandomPastDate(15),
      images: [
        'https://images.pexels.com/photos/3680309/pexels-photo-3680309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['10-inch blade', 'Dust collection system', 'Precision fence'],
      specifications: {
        'Motor': '3 HP',
        'Table Size': '27 x 40 inches',
        'Max Cutting Depth': '3.5 inches',
        'Weight': '275 lbs'
      },
      createdAt: getRandomPastDate(75),
      updatedAt: getRandomPastDate(5)
    },
    {
      id: '4',
      name: 'Party Tent (20x30)',
      description: 'Large event tent perfect for outdoor gatherings',
      category: '4', // Event Equipment
      location: '1', // Downtown
      pricePerDay: 150,
      availabilityStatus: 'available',
      conditionStatus: 'good',
      lastMaintenanceDate: getRandomPastDate(60),
      images: [
        'https://images.pexels.com/photos/1619488/pexels-photo-1619488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/242005/pexels-photo-242005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Waterproof material', 'Side walls included', 'Easy setup'],
      specifications: {
        'Size': '20 x 30 feet',
        'Capacity': 'Up to 60 people',
        'Material': 'Heavy-duty vinyl',
        'Stakes': 'Included'
      },
      createdAt: getRandomPastDate(100),
      updatedAt: getRandomPastDate(30)
    },
    {
      id: '5',
      name: 'Commercial Paint Sprayer',
      description: 'High-volume paint sprayer for large interior and exterior projects',
      category: '5', // Painting Equipment
      location: '2', // Westside
      pricePerDay: 95,
      availabilityStatus: 'maintenance',
      conditionStatus: 'fair',
      lastMaintenanceDate: getRandomPastDate(10),
      images: [
        'https://images.pexels.com/photos/8092362/pexels-photo-8092362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Adjustable pressure', 'Multiple nozzle sizes', 'Long hose'],
      specifications: {
        'Flow Rate': '0.24 gallons per minute',
        'Hose Length': '50 feet',
        'Max Pressure': '3000 PSI',
        'Weight': '28 lbs'
      },
      createdAt: getRandomPastDate(85),
      updatedAt: getRandomPastDate(1)
    },
    {
      id: '6',
      name: 'Concrete Mixer',
      description: 'Electric concrete mixer for small to medium projects',
      category: '1', // Construction
      location: '3', // Suburban
      pricePerDay: 75,
      availabilityStatus: 'available',
      conditionStatus: 'good',
      lastMaintenanceDate: getRandomPastDate(40),
      images: [
        'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Electric powered', 'Portable design', 'Easy to clean'],
      specifications: {
        'Drum Capacity': '3.5 cubic feet',
        'Motor': '0.5 HP Electric',
        'Voltage': '110V',
        'Weight': '175 lbs'
      },
      createdAt: getRandomPastDate(95),
      updatedAt: getRandomPastDate(25)
    },
    {
      id: '7',
      name: 'Chainsaw (20")',
      description: 'Professional-grade chainsaw for cutting trees and large branches',
      category: '3', // Power Tools
      location: '1', // Downtown
      pricePerDay: 45,
      availabilityStatus: 'available',
      conditionStatus: 'excellent',
      lastMaintenanceDate: getRandomPastDate(20),
      images: [
        'https://images.pexels.com/photos/694587/pexels-photo-694587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Anti-vibration system', 'Automatic chain oiler', 'Safety brake'],
      specifications: {
        'Bar Length': '20 inches',
        'Engine': '60.3cc',
        'Power Output': '3.9 HP',
        'Weight': '13.2 lbs'
      },
      createdAt: getRandomPastDate(110),
      updatedAt: getRandomPastDate(15)
    },
    {
      id: '8',
      name: 'Portable Generator (5000W)',
      description: 'Reliable generator for power needs at remote locations',
      category: '3', // Power Tools
      location: '2', // Westside
      pricePerDay: 85,
      availabilityStatus: 'rented',
      conditionStatus: 'good',
      lastMaintenanceDate: getRandomPastDate(35),
      images: [
        'https://images.pexels.com/photos/257889/pexels-photo-257889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Electric start', 'Multiple outlets', 'Fuel gauge'],
      specifications: {
        'Power Output': '5000 watts',
        'Fuel Type': 'Gasoline',
        'Runtime': '10 hours at 50% load',
        'Noise Level': '72 dB'
      },
      createdAt: getRandomPastDate(105),
      updatedAt: getRandomPastDate(10)
    },
    {
      id: '9',
      name: 'Folding Banquet Tables (Set of 5)',
      description: 'Sturdy 6-foot tables perfect for events and gatherings',
      category: '4', // Event Equipment
      location: '3', // Suburban
      pricePerDay: 60,
      availabilityStatus: 'available',
      conditionStatus: 'good',
      lastMaintenanceDate: getRandomPastDate(50),
      images: [
        'https://images.pexels.com/photos/3217156/pexels-photo-3217156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Lightweight', 'Easy to transport', 'Stain-resistant surface'],
      specifications: {
        'Size': '6 feet x 30 inches',
        'Height': '29 inches',
        'Capacity': 'Up to 300 lbs',
        'Material': 'Plastic with steel frame'
      },
      createdAt: getRandomPastDate(80),
      updatedAt: getRandomPastDate(20)
    },
    {
      id: '10',
      name: 'Scaffolding System',
      description: 'Modular scaffolding for construction and maintenance projects',
      category: '1', // Construction
      location: '1', // Downtown
      pricePerDay: 120,
      availabilityStatus: 'available',
      conditionStatus: 'good',
      lastMaintenanceDate: getRandomPastDate(25),
      images: [
        'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      features: ['Easy assembly', 'Adjustable height', 'Includes safety rails'],
      specifications: {
        'Maximum Height': '24 feet',
        'Platform Size': '5 x 7 feet',
        'Weight Capacity': '1000 lbs',
        'Material': 'Steel'
      },
      createdAt: getRandomPastDate(115),
      updatedAt: getRandomPastDate(5)
    }
  ];

  // Add some random equipment for variety
  for (let i = 11; i <= 20; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const locationIndex = Math.floor(Math.random() * locations.length);
    const conditionIndex = Math.floor(Math.random() * conditionStatuses.length);
    const availabilityIndex = Math.floor(Math.random() * availabilityStatuses.length);
    
    const equipment: Equipment = {
      id: i.toString(),
      name: `Equipment Item #${i}`,
      description: `This is a randomly generated equipment item #${i} for demo purposes`,
      category: categories[categoryIndex].id,
      location: locations[locationIndex].id,
      pricePerDay: Math.floor(Math.random() * 200) + 50,
      availabilityStatus: availabilityStatuses[availabilityIndex],
      conditionStatus: conditionStatuses[conditionIndex],
      lastMaintenanceDate: getRandomPastDate(60),
      images: [
        'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      createdAt: getRandomPastDate(120),
      updatedAt: getRandomPastDate(30)
    };
    
    mockEquipment.push(equipment);
  }

  return mockEquipment;
};

export const generateMockBookings = (equipmentList: Equipment[]): Booking[] => {
  const bookingStatuses: ('pending' | 'confirmed' | 'active' | 'completed' | 'cancelled')[] = 
    ['pending', 'confirmed', 'active', 'completed', 'cancelled'];
  const paymentStatuses: ('pending' | 'paid' | 'refunded')[] = ['pending', 'paid', 'refunded'];
  
  const mockBookings: Booking[] = [];
  
  // Create some completed bookings in the past
  for (let i = 1; i <= 15; i++) {
    const equipmentIndex = Math.floor(Math.random() * equipmentList.length);
    const equipment = equipmentList[equipmentIndex];
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 60) - 30); // 30-90 days ago
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1); // 1-7 days rental
    
    const booking: Booking = {
      id: `past-${i}`,
      equipmentId: equipment.id,
      customerId: Math.floor(Math.random() * 3) + 1 + '', // Random customer ID 1-3
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'completed',
      totalPrice: equipment.pricePerDay * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
      paymentStatus: 'paid',
      createdAt: new Date(startDate.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days before start
      updatedAt: new Date(endDate.getTime() + 1000 * 60 * 60 * 24).toISOString(), // 1 day after end
    };
    
    mockBookings.push(booking);
  }
  
  // Create some current and upcoming bookings
  for (let i = 1; i <= 10; i++) {
    const equipmentIndex = Math.floor(Math.random() * equipmentList.length);
    const equipment = equipmentList[equipmentIndex];
    const statusIndex = Math.floor(Math.random() * (bookingStatuses.length - 1)); // Exclude 'completed'
    const status = statusIndex === 3 ? 'pending' : bookingStatuses[statusIndex]; // Replace 'completed' with 'pending'
    
    // Determine dates based on status
    let startDate, endDate;
    
    if (status === 'active') {
      // Active bookings start in the past and end in the future
      startDate = new Date();
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 5) - 1); // 1-5 days ago
      
      endDate = new Date();
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1); // 1-5 days from now
    } else {
      // Future bookings
      const dateRange = getDateRange(1, 30, Math.floor(Math.random() * 7) + 1);
      startDate = new Date(dateRange.startDate);
      endDate = new Date(dateRange.endDate);
    }
    
    const paymentStatusIndex = status === 'active' || status === 'confirmed' ? 1 : 0; // 'paid' for active/confirmed, 'pending' otherwise
    
    const booking: Booking = {
      id: `current-${i}`,
      equipmentId: equipment.id,
      customerId: Math.floor(Math.random() * 3) + 1 + '', // Random customer ID 1-3
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status,
      totalPrice: equipment.pricePerDay * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
      paymentStatus: paymentStatuses[paymentStatusIndex],
      createdAt: new Date(startDate.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days before start
      updatedAt: new Date().toISOString(),
    };
    
    mockBookings.push(booking);
    
    // Update equipment status based on booking
    if (status === 'active') {
      equipment.availabilityStatus = 'rented';
    } else if (status === 'confirmed' || status === 'pending') {
      equipment.availabilityStatus = 'reserved';
    }
  }
  
  return mockBookings;
};

export const generateMockMaintenanceRecords = (equipment: Equipment[]): MaintenanceRecord[] => {
  const maintenanceTypes: ('routine' | 'repair' | 'inspection')[] = ['routine', 'repair', 'inspection'];
  const mockRecords: MaintenanceRecord[] = [];
  
  // Create past maintenance records
  equipment.forEach(item => {
    // Number of records per equipment (1-5)
    const recordCount = Math.floor(Math.random() * 5) + 1;
    
    for (let i = 0; i < recordCount; i++) {
      const typeIndex = Math.floor(Math.random() * maintenanceTypes.length);
      const date = getRandomPastDate(365);
      
      const record: MaintenanceRecord = {
        id: `${item.id}-maint-${i}`,
        equipmentId: item.id,
        maintenanceType: maintenanceTypes[typeIndex],
        description: `${maintenanceTypes[typeIndex].charAt(0).toUpperCase() + maintenanceTypes[typeIndex].slice(1)} maintenance for ${item.name}`,
        performedBy: `Technician ${Math.floor(Math.random() * 5) + 1}`,
        cost: Math.floor(Math.random() * 500) + 50,
        date,
        createdAt: date,
      };
      
      // Add next scheduled date for routine maintenance
      if (maintenanceTypes[typeIndex] === 'routine') {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 90); // Schedule next in 90 days
        record.nextScheduledDate = nextDate.toISOString();
      }
      
      mockRecords.push(record);
    }
  });
  
  return mockRecords;
};