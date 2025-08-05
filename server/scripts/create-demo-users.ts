import { User } from '../src/models/User';
import DatabaseConnection from '../src/database/connection';

async function createDemoUsers() {
  try {
    // Connect to database
    await DatabaseConnection.connect();
    console.log('Connected to database');

    // Check if demo users already exist
    const existingElder = await User.findOne({ email: 'elder@example.com' });
    const existingVolunteer = await User.findOne({ email: 'volunteer@example.com' });

    if (!existingElder) {
      // Create demo elder user
      const elderUser = new User({
        name: 'Maria Santos',
        email: 'elder@example.com',
        passwordHash: 'password123', // Will be hashed by pre-save middleware
        userType: 'elder',
        location: {
          address: '123 Main Street, Anytown, State 12345',
          coordinates: {
            type: 'Point',
            coordinates: [-74.0059, 40.7128] // New York City coordinates
          }
        },
        phone: '+1 (555) 123-4567',
        avatar: 'https://via.placeholder.com/150.jpg',
        isEmailVerified: true,
        isApproved: true, // Elders are auto-approved
        isActive: true
      });

      await elderUser.save();
      console.log('✅ Created demo elder user: elder@example.com / password123');
    } else {
      console.log('ℹ️  Demo elder user already exists');
    }

    if (!existingVolunteer) {
      // Create demo volunteer user
      const volunteerUser = new User({
        name: 'John Smith',
        email: 'volunteer@example.com',
        passwordHash: 'password123', // Will be hashed by pre-save middleware
        userType: 'volunteer',
        location: {
          address: '456 Oak Avenue, Volunteer City, State 67890',
          coordinates: {
            type: 'Point',
            coordinates: [-74.0059, 40.7589] // Slightly different NYC coordinates
          }
        },
        phone: '+1 (555) 987-6543',
        avatar: 'https://via.placeholder.com/150.png',
        isEmailVerified: true,
        isApproved: true, // Approve this demo volunteer
        isActive: true
      });

      await volunteerUser.save();
      console.log('✅ Created demo volunteer user: volunteer@example.com / password123');
    } else {
      console.log('ℹ️  Demo volunteer user already exists');
    }

    console.log('\n🎉 Demo users ready for testing!');
    console.log('Elder: elder@example.com / password123');
    console.log('Volunteer: volunteer@example.com / password123');
    
  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  } finally {
    process.exit(0);
  }
}

createDemoUsers();