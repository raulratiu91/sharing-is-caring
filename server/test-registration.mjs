import fetch from 'node-fetch';

async function testRegistration() {
  try {
    console.log('Testing registration...');
    
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "Mugur Rus",
        "email": "mugurel.rus@cognizant.com",
        "password": "test1234",
        "address": "123 Main Street, Anytown, State 12345",
        "userType": "volunteer"
      })
    });

    console.log('Response status:', response.status);
    console.log('Response statusText:', response.statusText);
    
    const text = await response.text();
    console.log('Response body:', text);

    if (!response.ok) {
      console.error('Registration failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error during registration test:', error.message);
  }
}

testRegistration();