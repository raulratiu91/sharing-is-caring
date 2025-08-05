import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { LoginButton } from './LoginButton';

export const QuickLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  // If already logged in, show user info
  if (user) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Welcome back!</h3>
          <p className="text-gray-600 mb-2">Logged in as: {user.name}</p>
          <p className="text-sm text-gray-500">Email: {user.email}</p>
          <p className="text-sm text-gray-500">Type: {user.userType}</p>
          {user.userType === 'volunteer' && !user.isApproved && (
            <p className="text-sm text-yellow-600 mt-2">Account pending approval</p>
          )}
        </div>
      </Card>
    );
  }

  const handleSuccess = () => {
    setSuccess('Login successful! Welcome back.');
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess('');
  };

  // Demo credentials for testing
  const fillDemoCredentials = (type: 'elder' | 'volunteer') => {
    if (type === 'elder') {
      setEmail('elder@example.com');
      setPassword('password123');
    } else {
      setEmail('volunteer@example.com');
      setPassword('password123');
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Quick Login Test</h3>
          <p className="text-sm text-gray-600">Test the authentication with the backend</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Demo credentials buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials('elder')}
            className="flex-1"
          >
            Demo Elder
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials('volunteer')}
            className="flex-1"
          >
            Demo Volunteer
          </Button>
        </div>

        <LoginButton
          email={email}
          password={password}
          onSuccess={handleSuccess}
          onError={handleError}
          className="w-full"
        />

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded border">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded border">
            <strong>Success:</strong> {success}
          </div>
        )}

        <div className="text-xs text-gray-500 text-center mt-4">
          <p>🔧 <strong>Backend Status:</strong></p>
          <p>Make sure the server is running on <code>http://localhost:3000</code></p>
          <p>And that the JWT_SECRET environment variable is set</p>
        </div>
      </div>
    </Card>
  );
};