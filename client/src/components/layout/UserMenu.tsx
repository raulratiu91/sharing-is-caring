import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
      >
        {user.avatar || user.profilePicture ? (
          <img
            src={user.avatar || user.profilePicture}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-500 border-b">
              {user.email}
            </div>
            <div className="px-4 py-2 text-xs text-gray-400">
              {user.userType === 'volunteer' ? 'Volunteer' : 'Elder'}
              {user.userType === 'volunteer' && !user.isApproved && (
                <span className="text-yellow-600 ml-1">(Pending)</span>
              )}
            </div>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};