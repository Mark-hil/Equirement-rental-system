import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ShieldCheck, Truck, Clock, PenTool as Tool, Star, Award, ThumbsUp } from 'lucide-react';
import { useEquipment } from '../context/EquipmentContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

// Featured equipment data (mock)
const featuredEquipment = [
  {
    id: '1',
    name: 'Excavator XL2000',
    category: 'Heavy Machinery',
    rating: 4.9,
    reviewCount: 28,
    dailyRate: 250,
    imageUrl: 'https://images.pexels.com/photos/2058911/pexels-photo-2058911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '2',
    name: 'Bulldozer B500',
    category: 'Earth Moving',
    rating: 4.8,
    reviewCount: 32,
    dailyRate: 300,
    imageUrl: 'https://images.pexels.com/photos/6338803/pexels-photo-6338803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: '3',
    name: 'Crane C3000',
    category: 'Lifting Equipment',
    rating: 4.7,
    reviewCount: 24,
    dailyRate: 450,
    imageUrl: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Testimonials data (mock)
const testimonials = [
  {
    id: 1,
    content: "The equipment was in excellent condition and the rental process was seamless. Will definitely use this service again for our construction projects.",
    author: "John Smith",
    role: "Project Manager, BuildRight Construction",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    content: "Exceptional service and top-quality equipment. The delivery was on time and the staff was very helpful with setup instructions.",
    author: "Sarah Johnson",
    role: "Site Supervisor, Urban Developers",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    content: "We've been renting equipment for our events for years, and this platform offers the best selection and prices we've found.",
    author: "Michael Chen",
    role: "Event Director, Citywide Events",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const HomePage: React.FC = () => {
  const { categories, isLoading } = useEquipment();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - Enhanced with animated gradient overlay and better typography */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Construction equipment"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-primary-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-28 px-4 sm:py-36 sm:px-6 lg:px-8">
          <div className="md:w-3/4 lg:w-2/3">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block text-primary-400">Professional Equipment</span>
              <span className="block">For Every Project</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Rent top-quality machinery and tools for construction, landscaping, events, and more. 
              Get the right equipment when you need it, where you need it.
            </p>
            <div className="mt-10">
              <div className="max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden p-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <label htmlFor="search" className="sr-only">
                      Search for equipment
                    </label>
                    <input
                      id="search"
                      name="search"
                      className="block w-full py-3 pl-4 pr-3 border-0 focus:ring-0 focus:outline-none text-lg"
                      placeholder="What equipment do you need?"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <Link to={`/equipment${searchTerm ? `?search=${searchTerm}` : ''}`}>
                      <Button
                        type="button"
                        size="lg"
                        className="inline-flex items-center"
                        rightIcon={<Search className="h-5 w-5" />}
                      >
                        Search
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/equipment?category=construction">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all">
                  Construction
                </span>
              </Link>
              <Link to="/equipment?category=landscaping">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all">
                  Landscaping
                </span>
              </Link>
              <Link to="/equipment?category=events">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all">
                  Events
                </span>
              </Link>
              <Link to="/equipment?category=tools">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all">
                  Power Tools
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - New addition */}
      <div className="bg-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6">
            <div className="flex flex-col items-center p-4 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary-600">500+</span>
              <span className="mt-2 text-sm text-gray-600">Equipment Items</span>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary-600">15k+</span>
              <span className="mt-2 text-sm text-gray-600">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary-600">98%</span>
              <span className="mt-2 text-sm text-gray-600">Satisfaction Rate</span>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <span className="text-3xl sm:text-4xl font-bold text-primary-600">24/7</span>
              <span className="mt-2 text-sm text-gray-600">Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Equipment - New section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Equipment
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Our most popular rental items, ready for your next project
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredEquipment.map((item) => (
              <Link key={item.id} to={`/equipment/${item.id}`}>
                <Card withHover className="h-full flex flex-col overflow-hidden transform transition-all hover:scale-105">
                  <div className="relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${item.dailyRate}/day
                    </div>
                  </div>
                  <Card.Content className="flex-1 flex flex-col">
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.category}</span>
                      <div className="ml-auto flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-700">{item.rating}</span>
                        <span className="ml-1 text-xs text-gray-500">({item.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">{item.name}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600">View Details</span>
                      <ChevronRight className="h-4 w-4 text-primary-600" />
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/equipment">
              <Button size="lg">
                View All Equipment
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section - Improved layout */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-3xl font-extrabold text-gray-900">Browse by Category</h2>
          <Link
            to="/equipment"
            className="hidden sm:flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            Browse all categories
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {isLoading ? (
            // Loading skeleton
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="w-full aspect-w-4 aspect-h-3 bg-gray-300 rounded-lg overflow-hidden"></div>
                  <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))
          ) : (
            // Categories list
            categories.map((category) => (
              <Link key={category.id} to={`/equipment?category=${category.id}`}>
                <Card withHover className="h-full flex flex-col overflow-hidden border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all">
                  <div className="aspect-w-3 aspect-h-2 relative">
                    <img
                      src={category.imageUrl || 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg'}
                      alt={category.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800">
                        {category.equipmentCount} items
                      </span>
                    </div>
                  </div>
                  <Card.Content className="flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{category.description}</p>
                    <div className="mt-auto pt-4">
                      <div className="flex items-center text-sm font-medium text-primary-600">
                        <span>Browse category</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link to="/equipment">
            <Button variant="outline">Browse all categories</Button>
          </Link>
        </div>
      </div>

      {/* Testimonials Section - New addition */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
              Trusted by thousands of businesses and contractors
            </p>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative bg-white px-6 py-8 shadow-xl rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary-600"></div>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img 
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary-100"
                    src={testimonials[activeTestimonial].imageUrl} 
                    alt={testimonials[activeTestimonial].author}
                  />
                </div>
                <div className="sm:ml-6 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote>
                    <p className="text-lg font-medium text-gray-900">"{testimonials[activeTestimonial].content}"</p>
                  </blockquote>
                  <div className="mt-3">
                    <p className="text-base font-semibold text-gray-900">{testimonials[activeTestimonial].author}</p>
                    <p className="text-sm text-gray-500">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeTestimonial === idx ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features section - Enhanced with better visuals */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose RentEquip?</h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide high-quality equipment with exceptional service to help you complete your projects efficiently.
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full border border-gray-100 hover:border-primary-500 transition-all">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-600 rounded-md shadow-lg">
                        <Tool className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900">Quality Equipment</h3>
                    <p className="mt-5 text-base text-gray-600">
                      All our machinery and tools are professionally maintained and meet industry standards for safety and performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full border border-gray-100 hover:border-primary-500 transition-all">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-secondary-600 rounded-md shadow-lg">
                        <Truck className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900">Delivery & Pickup</h3>
                    <p className="mt-5 text-base text-gray-600">
                      We offer convenient delivery and pickup options for all equipment to save you time and hassle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full border border-gray-100 hover:border-primary-500 transition-all">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-accent-500 rounded-md shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900">Flexible Rental Periods</h3>
                    <p className="mt-5 text-base text-gray-600">
                      Rent for as short as one day or as long as you need with competitive daily, weekly, and monthly rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow-lg h-full border border-gray-100 hover:border-primary-500 transition-all">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-success-600 rounded-md shadow-lg">
                        <ShieldCheck className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900">Expert Support</h3>
                    <p className="mt-5 text-base text-gray-600">
                      Our knowledgeable team provides guidance on equipment selection and offers technical support throughout your rental.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - New addition */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Renting equipment has never been easier
            </p>
          </div>
          
          <div className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg mb-4 z-10">
                    1
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Browse & Select</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Search our extensive catalog and find the perfect equipment for your project needs.
                  </p>
                </div>
                
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg mb-4 z-10">
                    2
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Book & Pay</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Reserve your equipment for your desired dates and complete the secure payment process.
                  </p>
                </div>
                
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg mb-4 z-10">
                    3
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Receive & Return</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get your equipment delivered or pick it up, use it for your project, and return when done.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/equipment">
                <Button size="lg">
                  Start Renting Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced with better visuals */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to start your project?</span>
                <span className="block mt-1">Get the equipment you need today.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-primary-100">
                Find the right equipment for your needs and book online in minutes. Our team is ready to help you succeed.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/equipment"
                  className="bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-primary-700 hover:bg-primary-50"
                >
                  Browse Equipment
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-transparent border border-white rounded-md px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-primary-600"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
          <div className="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;