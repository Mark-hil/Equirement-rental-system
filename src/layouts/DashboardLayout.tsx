import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  Package,
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Calendar,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'equipment_manager';
  const basePath = isAdmin ? '/admin' : '/manager';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeUserMenu = () => {
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      path: basePath,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Equipment',
      path: `${basePath}/equipment`,
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: 'Bookings',
      path: `${basePath}/bookings`,
      icon: <Calendar className="h-5 w-5" />,
    },
  ];

  // Add admin-only navigation items
  if (isAdmin) {
    navigationItems.push(
      {
        name: 'Users',
        path: '/admin/users',
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: 'Reports',
        path: '/admin/reports',
        icon: <FileText className="h-5 w-5" />,
      }
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white transform transition ease-in-out duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={closeSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 flex items-center px-4">
            <Link to="/" className="flex items-center">
              <Package className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RentEquip</span>
            </Link>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeSidebar}
              >
                <span
                  className={`mr-4 flex-shrink-0 ${
                    isActive(item.path) ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600'
                  }`}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                  {user?.name.charAt(0)}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-700">{user?.name}</p>
                <p className="text-sm font-medium text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b">
              <Link to="/" className="flex items-center">
                <Package className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">RentEquip</span>
              </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span
                      className={`mr-3 flex-shrink-0 ${
                        isActive(item.path) ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                    {isActive(item.path) && (
                      <ChevronRight className="ml-auto h-4 w-4 text-primary-600" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <h1 className="text-2xl font-semibold text-gray-900 self-center">
                {navigationItems.find(item => isActive(item.path))?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                View Site
              </Link>
              
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={toggleUserMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-800 font-medium">
                      {user?.name.charAt(0)}
                    </div>
                    <span className="ml-2 text-gray-700 hidden md:inline-block">{user?.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                  </button>
                </div>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={closeUserMenu}
                    ></div>
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                      <div className="px-4 py-2 text-xs text-gray-500">
                        {user?.role === 'admin' ? 'Administrator' : 'Equipment Manager'}
                      </div>
                      <div className="border-t border-gray-100"></div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeUserMenu}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to={`${basePath}/settings`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeUserMenu}
                      >
                        Settings
                      </Link>
                      <button
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;