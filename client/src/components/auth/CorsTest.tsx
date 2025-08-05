import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export const CorsTest: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState('');

  const testCors = async () => {
    setStatus('testing');
    setMessage('Testing CORS connection...');
    setDetails('');

    try {
      // Test a simple API call to check CORS
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        }),
      });

      if (response.ok || response.status === 401) {
        // 401 is expected for invalid credentials, but means CORS is working
        setStatus('success');
        setMessage('✅ CORS is working! Backend connection successful.');
        setDetails(`Status: ${response.status} - ${response.status === 401 ? 'Authentication failed (expected)' : 'Request processed'}`);
      } else {
        setStatus('error');
        setMessage('❌ Backend responded with error');
        setDetails(`Status: ${response.status} - ${response.statusText}`);
      }
    } catch (error: any) {
      setStatus('error');
      if (error.message.includes('CORS')) {
        setMessage('❌ CORS Error: Backend is not allowing requests from frontend');
        setDetails('Make sure the backend server is running with CORS configured');
      } else if (error.message.includes('fetch')) {
        setMessage('❌ Connection Error: Cannot reach backend server');
        setDetails('Make sure the backend server is running on http://localhost:3000');
      } else {
        setMessage('❌ Unknown Error');
        setDetails(error.message);
      }
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'testing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'testing': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">🔗 CORS Connection Test</h3>
        
        <Button 
          onClick={testCors} 
          disabled={status === 'testing'}
          className="w-full"
        >
          {status === 'testing' ? 'Testing...' : 'Test Backend Connection'}
        </Button>

        {message && (
          <div className={`p-4 rounded-lg border ${getStatusBg()}`}>
            <p className={`font-medium ${getStatusColor()}`}>
              {message}
            </p>
            {details && (
              <p className="text-sm text-gray-600 mt-2">
                {details}
              </p>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Frontend:</strong> http://localhost:5173</p>
          <p><strong>Backend:</strong> http://localhost:3000</p>
          <p><strong>Endpoint:</strong> POST /api/auth/login</p>
        </div>
      </div>
    </Card>
  );
};