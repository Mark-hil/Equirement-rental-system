import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import HomePage from '../pages/HomePage';
import EquipmentListPage from '../pages/EquipmentListPage';
import EquipmentDetailPage from '../pages/EquipmentDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import BookingsPage from '../pages/BookingsPage';
import BookingDetailPage from '../pages/BookingDetailPage';
import CreateBookingPage from '../pages/CreateBookingPage';
import NotFoundPage from '../pages/NotFoundPage';

// Admin pages
import AdminDashboardPage from '../pages/admin/DashboardPage';
import AdminEquipmentListPage from '../pages/admin/EquipmentListPage';
import AdminEquipmentDetailPage from '../pages/admin/EquipmentDetailPage';
import AdminEquipmentFormPage from '../pages/admin/EquipmentFormPage';
import AdminBookingsPage from '../pages/admin/BookingsPage';
import AdminUsersPage from '../pages/admin/UsersPage';
import AdminReportsPage from '../pages/admin/ReportsPage';

// Auth guard component
import RequireAuth from '../components/auth/RequireAuth';
import RequireAdmin from '../components/auth/RequireAdmin';
import RequireManager from '../components/auth/RequireManager';
import RequireCustomer from '../components/auth/RequireCustomer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'equipment', element: <EquipmentListPage /> },
      { path: 'equipment/:equipmentId', element: <EquipmentDetailPage /> },
      {
        path: 'profile',
        element: <RequireAuth><ProfilePage /></RequireAuth>
      },
      {
        path: 'bookings',
        element: <RequireCustomer><BookingsPage /></RequireCustomer>
      },
      {
        path: 'bookings/:bookingId',
        element: <RequireCustomer><BookingDetailPage /></RequireCustomer>
      },
      {
        path: 'equipment/:equipmentId/book',
        element: <RequireAuth><CreateBookingPage /></RequireAuth>
      },
      { path: '404', element: <NotFoundPage /> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ]
  },
  {
    path: '/admin',
    element: <RequireAdmin><DashboardLayout /></RequireAdmin>,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'equipment', element: <AdminEquipmentListPage /> },
      { path: 'equipment/new', element: <AdminEquipmentFormPage /> },
      { path: 'equipment/:equipmentId', element: <AdminEquipmentDetailPage /> },
      { path: 'equipment/:equipmentId/edit', element: <AdminEquipmentFormPage /> },
      { path: 'bookings', element: <AdminBookingsPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'reports', element: <AdminReportsPage /> },
    ]
  },
  {
    path: '/manager',
    element: <RequireManager><DashboardLayout /></RequireManager>,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'equipment', element: <AdminEquipmentListPage /> },
      { path: 'equipment/new', element: <AdminEquipmentFormPage /> },
      { path: 'equipment/:equipmentId', element: <AdminEquipmentDetailPage /> },
      { path: 'equipment/:equipmentId/edit', element: <AdminEquipmentFormPage /> },
      { path: 'bookings', element: <AdminBookingsPage /> },
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;