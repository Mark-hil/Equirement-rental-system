import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RequireCustomerProps {
  children: ReactNode;
}

const RequireCustomer: React.FC<RequireCustomerProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page but save the current location for redirecting back
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user.role !== 'user') {
    // If the user is not a regular customer, redirect to the home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireCustomer;