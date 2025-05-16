import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, LogOut, Settings, ChevronDown, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const MainLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeUserMenu();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? 'text-primary-700 font-medium'
      : 'text-gray-600 hover:text-primary-700';
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'equipment_manager') return '/manager';
    return '/profile';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <Package className="h-8 w-8 text-primary-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">RentEquip</span>
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                <Link to="/" className={`inline-flex items-center px-1 pt-1 ${isActive('/')}`}>
                  Home
                </Link>
                <Link
                  to="/equipment"
                  className={`inline-flex items-center px-1 pt-1 ${isActive('/equipment')}`}
                >
                  Equipment
                </Link>
                {user && (
                  <Link
                    to="/bookings"
                    className={`inline-flex items-center px-1 pt-1 ${isActive('/bookings')}`}
                  >
                    My Rentals
                  </Link>
                )}
              </nav>
            </div>

            {/* User Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={toggleUserMenu}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <span className="ml-2 text-gray-700">{user.name}</span>
                      <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={closeUserMenu}
                      ></div>
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                          <div className="px-4 py-2 text-xs text-gray-500">
                            Signed in as <span className="font-medium">{user.email}</span>
                          </div>
                          <div className="border-t border-gray-100"></div>
                          <Link
                            to={getDashboardLink()}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeUserMenu}
                          >
                            {user.role === 'admin' || user.role === 'equipment_manager' ? (
                              <>
                                <Settings className="mr-2 h-4 w-4" />
                                Dashboard
                              </>
                            ) : (
                              <>
                                <User className="mr-2 h-4 w-4" />
                                Profile
                              </>
                            )}
                          </Link>
                          <Link
                            to="/bookings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeUserMenu}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            My Rentals
                          </Link>
                          <button
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={handleLogout}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/auth/login">
                    <Button variant="outline" size="sm">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={`sm:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                location.pathname === '/'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/equipment"
              className={`block pl-3 pr-4 py-2 border-l-4 ${
                location.pathname === '/equipment'
                  ? 'border-primary-500 text-primary-700 bg-primary-50'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={closeMenu}
            >
              Equipment
            </Link>
            {user && (
              <Link
                to="/bookings"
                className={`block pl-3 pr-4 py-2 border-l-4 ${
                  location.pathname === '/bookings'
                    ? 'border-primary-500 text-primary-700 bg-primary-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={closeMenu}
              >
                My Rentals
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to={getDashboardLink()}
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    {user.role === 'admin' || user.role === 'equipment_manager'
                      ? 'Dashboard'
                      : 'Your Profile'}
                  </Link>
                  <Link
                    to="/bookings"
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    My Rentals
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 space-y-2">
                <Link to="/auth/login" onClick={closeMenu}>
                  <Button variant="outline" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={closeMenu}>
                  <Button fullWidth>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Services</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    All Equipment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Machine Maintenance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Delivery & Pickup
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Equipment Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} RentEquip. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;