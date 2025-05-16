import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the previous location from state or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'equipment_manager' | 'customer') => {
    try {
      let demoEmail = '';
      let demoPassword = '';
      
      if (role === 'admin') {
        demoEmail = 'admin@example.com';
        demoPassword = 'admin123';
      } else if (role === 'equipment_manager') {
        demoEmail = 'manager@example.com';
        demoPassword = 'manager123';
      } else {
        demoEmail = 'customer@example.com';
        demoPassword = 'customer123';
      }
      
      await login(demoEmail, demoPassword);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred during demo login. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Sign in to your account</h2>
      
      {(errorMessage || error) && (
        <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{errorMessage || error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          type="email"
          label="Email address"
          fullWidth
          leftAddon={<Mail className="h-5 w-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          fullWidth
          leftAddon={<Lock className="h-5 w-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>
        </div>
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="flex justify-center"
        >
          Sign in
        </Button>
      </form>
      
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-600">Or try demo accounts</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('admin')}
            disabled={isLoading}
          >
            Sign in as Admin
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('equipment_manager')}
            disabled={isLoading}
          >
            Sign in as Equipment Manager
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDemoLogin('customer')}
            disabled={isLoading}
          >
            Sign in as Customer
          </Button>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;