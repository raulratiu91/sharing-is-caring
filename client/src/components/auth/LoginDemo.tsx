import React from 'react';
import { QuickLogin } from './QuickLogin';
import { CorsTest } from './CorsTest';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export const LoginDemo: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔐 Authentication Demo</h2>
        <p className="text-lg text-gray-600 mb-8">
          Test the JWT authentication system with the backend
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* CORS Test Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Connection Test</h3>
          <CorsTest />
        </div>
        
        {/* Login Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Login Test</h3>
          <QuickLogin />
        </div>

        {/* Authentication Status */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Auth Status</h3>
          <Card className="p-6">
            {user ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h4 className="text-lg font-semibold text-green-600 mb-2">
                    Authenticated!
                  </h4>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Type:</strong> {user.userType}</p>
                  <p><strong>User ID:</strong> {user._id}</p>
                  <p><strong>Verified:</strong> {user.isEmailVerified ? '✅' : '❌'}</p>
                  <p><strong>Approved:</strong> {user.isApproved ? '✅' : '❌'}</p>
                  <p><strong>Active:</strong> {user.isActive ? '✅' : '❌'}</p>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={logout}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">
                  Not Authenticated
                </h4>
                <p className="text-sm text-gray-500">
                  Please login to test the authentication system
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Backend Connection Info */}
      <Card className="p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">🔧 Backend Connection</h3>
        <div className="space-y-2 text-sm">
          <p><strong>Backend URL:</strong> <code>http://localhost:3000</code></p>
          <p><strong>Login Endpoint:</strong> <code>POST /api/auth/login</code></p>
          <p><strong>Register Endpoint:</strong> <code>POST /api/auth/register</code></p>
          <p><strong>Profile Endpoint:</strong> <code>GET /api/auth/me</code></p>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p><strong>💡 Tip:</strong> Make sure your server is running with:</p>
          <code className="block mt-1 p-2 bg-white rounded">cd server && npm run dev</code>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm">
          <p><strong>⚠️ Note:</strong> You may need to register a user first or create demo accounts in your database for testing.</p>
        </div>
      </Card>
    </div>
  );
};