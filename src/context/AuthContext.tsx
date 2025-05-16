import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Equipment Manager',
    email: 'manager@example.com',
    password: 'manager123',
    role: 'equipment_manager',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Customer User',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching credentials in our mock data
      const matchedUser = MOCK_USERS.find(
        user => user.email === email && user.password === password
      );
      
      if (!matchedUser) {
        throw new Error('Invalid email or password');
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = matchedUser;
      const authenticatedUser = userWithoutPassword as User;
      
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user with email already exists
      if (MOCK_USERS.some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      // In a real app, we'd create a new user in the database
      // For demo purposes, we'll just simulate creating a user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: 'customer', // Default role for new registrations
        createdAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};