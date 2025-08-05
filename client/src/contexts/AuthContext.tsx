import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
  userType: 'volunteer' | 'elder';
  phone?: string;
  profilePicture?: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3001/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  // API helper function
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const data: AuthResponse = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setUser(data.user);
      setToken(data.token);
      
      // Store in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      const data: AuthResponse = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...userData,
          avatar: userData.profilePicture, // Map profilePicture to avatar for backend
        }),
      });

      setUser(data.user);
      setToken(data.token);
      
      // Store in localStorage
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Optionally call logout endpoint
    if (token) {
      apiCall('/auth/logout', { method: 'POST' }).catch(console.error);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!token) {
      throw new Error('Not authenticated');
    }

    try {
      const data = await apiCall('/auth/me', {
        method: 'PUT',
        body: JSON.stringify({
          name: userData.name,
          phone: userData.phone,
          avatar: userData.profilePicture,
          location: userData.address ? { address: userData.address } : undefined,
        }),
      });

      setUser(data.user);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};