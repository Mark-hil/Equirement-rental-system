import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { EquipmentProvider } from './context/EquipmentContext';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <AuthProvider>
      <EquipmentProvider>
        <BookingProvider>
          <AppRoutes />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#FFFFFF',
                color: '#1E293B',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </BookingProvider>
      </EquipmentProvider>
    </AuthProvider>
  );
}

export default App;