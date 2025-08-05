import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

interface LoginButtonProps {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ 
  email, 
  password, 
  onSuccess, 
  onError,
  className,
  children = "Sign In"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      onError?.('Email and password are required');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', { email, password: '***' });
      await login(email, password);
      console.log('Login successful!');
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      console.error('Login error:', errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading || !email || !password}
      className={className}
    >
      {isLoading ? 'Signing in...' : children}
    </Button>
  );
};