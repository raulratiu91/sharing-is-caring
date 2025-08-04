import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/useTheme';
import { Heart, Settings, Sun, Moon, Home, User } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header
      className={`border-b backdrop-blur fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-900/95 supports-[backdrop-filter]:bg-gray-900/60'
          : 'border-gray-200 bg-white/95 supports-[backdrop-filter]:bg-white/60'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Heart
            className={`h-8 w-8 ${
              theme === 'dark' ? 'text-pink-400' : 'text-pink-500'
            }`}
          />
          <h1
            className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            iCare
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className={`transition-all duration-200 ${
              theme === 'dark'
                ? 'border-gray-600 hover:bg-gray-800 text-gray-300'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
            }`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </Button>

          {/* Links to real MongoDB elder profiles */}
          <div className="flex items-center gap-2">
            <Link to="/user/68905c41d199380fa939c757/about">
              <Button
                variant="outline"
                size="sm"
                className={`transition-colors ${
                  theme === 'dark'
                    ? 'border-green-400 text-green-400 hover:bg-green-400/10'
                    : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
              >
                <User className="h-4 w-4 mr-1" />
                Margaret
              </Button>
            </Link>
            {/* Add more elder profile links as they become available */}
            <Link to="/user/68905c41d199380fa939c760/about">
              <Button
                variant="outline"
                size="sm"
                className={`transition-colors ${
                  theme === 'dark'
                    ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <User className="h-4 w-4 mr-1" />
                John
              </Button>
            </Link>
            <Link to="/user/68905c41d199380fa939c767/about">
              <Button
                variant="outline"
                size="sm"
                className={`transition-colors ${
                  theme === 'dark'
                    ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10'
                    : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                }`}
              >
                <User className="h-4 w-4 mr-1" />
                Sarah
              </Button>
            </Link>
          </div>

          {location.pathname === '/profile' ? (
            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className={`min-w-[200px] transition-colors ${
                  theme === 'dark'
                    ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          ) : (
            <Link to="/profile">
              <Button
                variant="outline"
                size="lg"
                className={`min-w-[200px] transition-colors ${
                  theme === 'dark'
                    ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Settings className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
