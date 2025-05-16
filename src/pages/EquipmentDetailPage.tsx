import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Tag, 
  AlertCircle, 
  Star, 
  Clock, 
  Tool, 
  Truck, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Check,
  X,
  Share2
} from 'lucide-react';
import { useEquipment } from '../context/EquipmentContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const EquipmentDetailPage: React.FC = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const navigate = useNavigate();
  const { getEquipmentById, getCategoryById, getLocationById } = useEquipment();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipment] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  });
  const [rentalDays, setRentalDays] = useState(3);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Simulated specifications
  const specifications = {
    manufacturer: 'CAT',
    model: 'XL2000',
    year: '2020',
    weight: '15,000 kg',
    dimensions: '7.5m x 2.5m x 3.2m',
    enginePower: '150 HP',
    fuelType: 'Diesel',
    operatingCapacity: '2,000 kg',
    maxReach: '9.5m'
  };

  // Simulated features
  const features = [
    'Climate controlled cabin',
    'GPS tracking system',
    'Automatic stabilizers',
    'LED work lights',
    'Backup camera',
    'Bluetooth connectivity',
    'Eco mode for fuel efficiency',
    'Advanced hydraulic system'
  ];

  // Simulated reviews
  const reviews = [
    {
      id: 1,
      author: 'John Smith',
      date: '2023-05-15',
      rating: 5,
      comment: 'Excellent equipment, worked perfectly for our construction project. Very well maintained.'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      date: '2023-04-22',
      rating: 4,
      comment: 'Good machine, but the delivery was a bit late. Otherwise, no complaints.'
    },
    {
      id: 3,
      author: 'Michael Brown',
      date: '2023-03-10',
      rating: 5,
      comment: 'Top-notch equipment and service. Will definitely rent again for our next project.'
    }
  ];

  // Simulated related equipment
  const relatedEquipment = [
    {
      id: '201',
      name: 'Bulldozer B500',
      category: 'Heavy Machinery',
      image: 'https://images.pexels.com/photos/6338803/pexels-photo-6338803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      pricePerDay: 300
    },
    {
      id: '202',
      name: 'Crane C3000',
      category: 'Lifting Equipment',
      image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      pricePerDay: 450
    },
    {
      id: '203',
      name: 'Forklift F200',
      category: 'Warehouse Equipment',
      image: 'https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      pricePerDay: 150
    }
  ];

  useEffect(() => {
    if (equipmentId) {
      // Simulate API call to fetch equipment details
      setTimeout(() => {
        const fetchedEquipment = getEquipmentById(equipmentId);
        if (fetchedEquipment) {
          setEquipment(fetchedEquipment);
        }
        setLoading(false);
      }, 800);
    }
  }, [equipmentId, getEquipmentById]);

  useEffect(() => {
    // Calculate rental days whenever selected dates change
    if (selectedDates.startDate && selectedDates.endDate) {
      const diffTime = Math.abs(selectedDates.endDate.getTime() - selectedDates.startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setRentalDays(diffDays || 1); // Minimum 1 day
    }
  }, [selectedDates]);

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!equipment) return;
    
    if (direction === 'prev') {
      setActiveImageIndex((prev) => (prev === 0 ? equipment.images.length - 1 : prev - 1));
    } else {
      setActiveImageIndex((prev) => (prev === equipment.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/equipment/${equipmentId}/book`);
    } else {
      navigate('/auth/login', { state: { from: `/equipment/${equipmentId}` } });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-success-100 text-success-800';
      case 'rented':
        return 'bg-error-100 text-error-800';
      case 'maintenance':
        return 'bg-warning-100 text-warning-800';
      case 'reserved':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return 'bg-success-100 text-success-800';
      case 'good':
        return 'bg-success-50 text-success-700';
      case 'fair':
        return 'bg-warning-100 text-warning-800';
      case 'poor':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <AlertCircle className="h-12 w-12 text-error-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Equipment Not Found</h2>
            <p className="text-gray-600 mb-6">
              The equipment with ID {equipmentId} could not be found or may have been removed.
            </p>
            <Link to="/equipment">
              <Button>Browse All Equipment</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = getCategoryById(equipment.category);
  const location = getLocationById(equipment.location);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <li>
                <span className="text-gray-400 mx-1">/</span>
                <Link to="/equipment" className="text-gray-500 hover:text-gray-700">Equipment</Link>
              </li>
              <li>
                <span className="text-gray-400 mx-1">/</span>
                <Link to={`/equipment?category=${equipment.category}`} className="text-gray-500 hover:text-gray-700">
                  {category?.name || 'Category'}
                </Link>
              </li>
              <li>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-900 font-medium">{equipment.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-4 aspect-h-3 relative">
                <img
                  src={equipment.images[activeImageIndex] || 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'}
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image navigation arrows */}
                <button
                  onClick={() => handleImageNavigation('prev')}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => handleImageNavigation('next')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(equipment.availabilityStatus)}`}>
                    {equipment.availabilityStatus.charAt(0).toUpperCase() + equipment.availabilityStatus.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="p-2 flex space-x-2 overflow-x-auto">
                {equipment.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image || 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <Info className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </p>
                      <p className="text-sm text-gray-600">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-success-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {category?.name || 'Category not found'}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{equipment.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-6">
                ${equipment.pricePerDay.toFixed(2)}<span className="text-lg text-gray-500">/day</span>
              </div>
              
              <p className="text-gray-700 mb-6">{equipment.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{location?.name || 'Location not found'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">Last Maintained: {formatDate(new Date(equipment.lastMaintenanceDate))}</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getConditionColor(equipment.conditionStatus)}`}>
                    {equipment.conditionStatus.charAt(0).toUpperCase() + equipment.conditionStatus.slice(1)} Condition
                  </span>
                </div>
              </div>
              
              {/* Booking Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Book This Equipment</h3>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-500">Rental Period</p>
                      <p className="font-medium">
                        {formatDate(selectedDates.startDate)} - {formatDate(selectedDates.endDate)}
                      </p>
                    </div>
                    <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                      Change Dates
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">${equipment.pricePerDay.toFixed(2)} x {rentalDays} days</span>
                      <span className="font-medium">${(equipment.pricePerDay * rentalDays).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="font-medium">${(equipment.pricePerDay * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance</span>
                      <span className="font-medium">${(equipment.pricePerDay * 0.05 * rentalDays).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">
                        ${(
                          equipment.pricePerDay * rentalDays + 
                          equipment.pricePerDay * 0.1 + 
                          equipment.pricePerDay * 0.05 * rentalDays
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full justify-center"
                  onClick={handleBookNow}
                  disabled={equipment.availabilityStatus !== 'available'}
                >
                  {equipment.availabilityStatus === 'available' ? 'Book Now' : 'Currently Unavailable'}
                </Button>
                
                {equipment.availabilityStatus !== 'available' && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    This equipment is currently {equipment.availabilityStatus}. Please check back later.
                  </p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>
                <span className="text-primary-600 font-medium text-sm cursor-pointer hover:text-primary-700">
                  See all reviews
                </span>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900">{review.author}</span>
                      <span className="text-sm text-gray-500">{formatDate(new Date(review.date))}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Equipment */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Equipment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedEquipment.map((item) => (
              <Link key={item.id} to={`/equipment/${item.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-primary-500">
                  <div className="aspect-w-3 aspect-h-2 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/60 text-white">
                        ${item.pricePerDay.toFixed(2)}/day
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="mt-1 text-lg font-medium text-gray-900 group-hover:text-primary-600">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-700">4.5</span>
                      </div>
                      <span className="text-sm text-primary-600 font-medium">View Details</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailPage;