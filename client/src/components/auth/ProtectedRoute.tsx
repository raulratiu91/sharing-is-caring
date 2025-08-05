import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthPage } from './AuthPage';

interface ProtectedRouteProps {
  children: ReactNode;
  requireApproval?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireApproval = false 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (requireApproval && user.userType === 'volunteer' && !user.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Account Pending Approval</h2>
          <p className="text-gray-600 mb-4">
            Your volunteer account is currently being reviewed. You'll receive an email 
            once your account has been approved and you can start helping others!
          </p>
          <p className="text-sm text-gray-500">
            This usually takes 1-2 business days.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};