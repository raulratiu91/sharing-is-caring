import mongoose from 'mongoose';
import logger from 'jet-logger';
import ElderProfile from '../models/ElderProfile';
import UserEnhanced from '../models/UserEnhanced';
import DatabaseConnection from '../database/connection';

/******************************************************************************
                                Sample Data
******************************************************************************/

// Sample Elder Profiles based on your UserAboutPage mock data
const sampleElders = [
  {
    name: 'Margaret Thompson',
    age: 78,
    email: 'margaret.thompson@email.com',
    phone: '+1-555-0123',
    story: 'Margaret has been living in the community for over 50 years. She was a school teacher who dedicated her life to educating children and fostering creativity in young minds.',
    background: 'A retired educator with a passion for literature and gardening. Margaret loves sharing stories about the old days and has a wealth of knowledge about local history.',
    interests: ['Reading', 'Gardening', 'Cooking', 'Local History', 'Classical Music'],
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face',
    location: {
      address: 'Downtown Community Center Area',
      coordinates: {
        type: 'Point',
        coordinates: [-122.4194, 37.7749] // San Francisco coordinates
      }
    },
    storyCards: [
      {
        image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&h=600&fit=crop',
        title: 'Teaching Days',
        description: 'Margaret in her classroom, inspiring young minds with literature and creativity.',
        date: '1985'
      },
      {
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
        title: 'Garden Paradise',
        description: 'Her beautiful garden where she grows vegetables and flowers for the community.',
        date: '2020'
      },
      {
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
        title: 'Cooking Together',
        description: 'Margaret teaching her famous apple pie recipe to neighborhood children.',
        date: '2023'
      },
      {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        title: 'Community Stories',
        description: 'Sharing local history stories at the community center.',
        date: '2024'
      }
    ],
    requests: [
      {
        title: 'Weekly Grocery Shopping',
        description: 'Need assistance with weekly grocery shopping, especially carrying heavy items',
        status: 'open' as const,
        priority: 'high' as const,
        createdAt: new Date('2024-01-15'),
        estimatedDuration: '2-3 hours'
      },
      {
        title: 'Technology Help',
        description: 'Help with video calls to family and using smartphone apps',
        status: 'closed' as const,
        priority: 'medium' as const,
        createdAt: new Date('2024-01-10'),
        completedAt: new Date('2024-01-12')
      },
      {
        title: 'Afternoon Walks',
        description: 'Looking for companionship during afternoon walks around the neighborhood',
        status: 'open' as const,
        priority: 'medium' as const,
        createdAt: new Date('2024-01-20'),
        estimatedDuration: '1 hour'
      },
      {
        title: 'Gardening Assistance',
        description: 'Need help with gardening and plant care, especially during spring season',
        status: 'open' as const,
        priority: 'low' as const,
        createdAt: new Date('2024-01-25'),
        estimatedDuration: '2-4 hours'
      }
    ],
    isActive: true,
    isVerified: true,
    familyContacts: [
      {
        name: 'Sarah Thompson',
        relationship: 'Daughter',
        phone: '+1-555-0124',
        email: 'sarah.thompson@email.com'
      }
    ],
    preferences: {
      preferredContactMethod: 'phone' as const,
      availableHours: {
        start: '09:00',
        end: '17:00'
      },
      languagesSpoken: ['English']
    }
  },
  {
    name: 'John Martinez',
    age: 82,
    email: 'john.martinez@email.com',
    phone: '+1-555-0125',
    story: 'John is a retired mechanic who worked for 45 years fixing cars and helping his neighbors. He has a workshop full of tools and loves teaching young people about craftsmanship.',
    background: 'A skilled craftsman and mentor who believes in the value of hard work and helping others. John has countless stories from his years as a mechanic.',
    interests: ['Woodworking', 'Classic Cars', 'Fishing', 'Coffee', 'Storytelling'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    location: {
      address: 'Riverside Neighborhood',
      coordinates: {
        type: 'Point',
        coordinates: [-122.4094, 37.7849]
      }
    },
    storyCards: [
      {
        image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=800&h=600&fit=crop',
        title: 'The Workshop',
        description: 'John\'s workshop where he spent decades fixing cars and teaching skills.',
        date: '1980'
      },
      {
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
        title: 'Classic Restoration',
        description: 'Restoring a vintage car with his grandson last summer.',
        date: '2023'
      },
      {
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
        title: 'Teaching Moments',
        description: 'Showing neighborhood kids how to use tools safely.',
        date: '2024'
      }
    ],
    requests: [
      {
        title: 'Medical Transportation',
        description: 'Need reliable transportation to medical appointments twice a week',
        status: 'open' as const,
        priority: 'high' as const,
        createdAt: new Date('2024-01-12'),
        estimatedDuration: '3-4 hours',
        urgencyNotes: 'Regular dialysis appointments'
      },
      {
        title: 'Home Repairs',
        description: 'Help with heavy lifting and minor home repairs around the house',
        status: 'open' as const,
        priority: 'medium' as const,
        createdAt: new Date('2024-01-18'),
        estimatedDuration: '2-3 hours'
      },
      {
        title: 'Coffee Companion',
        description: 'Looking for someone to share morning coffee and good conversation',
        status: 'closed' as const,
        priority: 'low' as const,
        createdAt: new Date('2024-01-05'),
        completedAt: new Date('2024-01-15')
      },
      {
        title: 'Workshop Organization',
        description: 'Assistance with organizing tools and workshop space',
        status: 'open' as const,
        priority: 'low' as const,
        createdAt: new Date('2024-01-22'),
        estimatedDuration: '4-6 hours'
      }
    ],
    isActive: true,
    isVerified: true,
    medicalInfo: {
      emergencyContact: 'Maria Martinez - +1-555-0126',
      mobility: 'assisted' as const
    },
    preferences: {
      preferredContactMethod: 'phone' as const,
      availableHours: {
        start: '08:00',
        end: '18:00'
      },
      languagesSpoken: ['English', 'Spanish']
    }
  },
  {
    name: 'Sarah Chen',
    age: 73,
    email: 'sarah.chen@email.com',
    phone: '+1-555-0127',
    story: 'Sarah immigrated to this country 40 years ago and built a successful small restaurant. She\'s known for her incredible cooking and warm hospitality.',
    background: 'A talented chef and businesswoman who loves bringing people together through food. Sarah has recipes passed down through generations.',
    interests: ['Cooking', 'Cultural Exchange', 'Family History', 'Traditional Medicine', 'Community Events'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    location: {
      address: 'Cultural District',
      coordinates: {
        type: 'Point',
        coordinates: [-122.4294, 37.7649]
      }
    },
    storyCards: [
      {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        title: 'Restaurant Opening',
        description: 'The grand opening of Sarah\'s restaurant 40 years ago.',
        date: '1984'
      },
      {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        title: 'Family Recipes',
        description: 'Preparing traditional dishes passed down through generations.',
        date: '2020'
      },
      {
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        title: 'Community Feast',
        description: 'Hosting a cultural dinner for the neighborhood.',
        date: '2023'
      }
    ],
    requests: [
      {
        title: 'Online Ordering Setup',
        description: 'Help with setting up online ordering and delivery system for restaurant',
        status: 'open' as const,
        priority: 'high' as const,
        createdAt: new Date('2024-01-20'),
        estimatedDuration: '4-6 hours'
      },
      {
        title: 'Cooking Companion',
        description: 'Someone to cook with and share traditional recipes',
        status: 'closed' as const,
        priority: 'medium' as const,
        createdAt: new Date('2024-01-08'),
        completedAt: new Date('2024-01-18')
      },
      {
        title: 'Paperwork Help',
        description: 'Assistance with administrative tasks and business paperwork',
        status: 'open' as const,
        priority: 'medium' as const,
        createdAt: new Date('2024-01-15'),
        estimatedDuration: '2-3 hours'
      },
      {
        title: 'English Practice',
        description: 'Looking for someone to practice English conversation with',
        status: 'open' as const,
        priority: 'low' as const,
        createdAt: new Date('2024-01-25'),
        estimatedDuration: '1-2 hours'
      }
    ],
    isActive: true,
    isVerified: true,
    preferences: {
      preferredContactMethod: 'email' as const,
      availableHours: {
        start: '10:00',
        end: '16:00'
      },
      languagesSpoken: ['English', 'Mandarin', 'Cantonese']
    }
  }
];

// Sample Volunteers
const sampleVolunteers = [
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1-555-0200',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    userType: 'volunteer' as const,
    location: {
      address: 'Downtown Area',
      coordinates: {
        type: 'Point',
        coordinates: [-122.4184, 37.7739]
      }
    },
    volunteerInfo: {
      skills: ['Technology Support', 'Transportation', 'Grocery Shopping', 'Companionship'],
      availability: {
        days: ['monday', 'wednesday', 'friday', 'saturday'] as const,
        timeSlots: [
          { start: '09:00', end: '17:00' },
          { start: '19:00', end: '21:00' }
        ]
      },
      maxDistance: 15,
      languages: ['English', 'Spanish'],
      experience: 'Volunteer with senior center for 3 years. Experience with technology training and companionship.',
      backgroundCheck: true,
      rating: 4.8,
      totalHelpCount: 24
    },
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
    isApproved: true
  },
  {
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1-555-0201',
    age: 35,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    userType: 'volunteer' as const,
    location: {
      address: 'Riverside District',
      coordinates: {
        type: 'Point',
        coordinates: [-122.4084, 37.7859]
      }
    },
    volunteerInfo: {
      skills: ['Home Repairs', 'Gardening', 'Heavy Lifting', 'Car Maintenance'],
      availability: {
        days: ['saturday', 'sunday'] as const,
        timeSlots: [
          { start: '08:00', end: '18:00' }
        ]
      },
      maxDistance: 20,
      languages: ['English', 'Korean'],
      experience: 'Handyman with 10+ years experience. Love helping elderly with home maintenance.',
      backgroundCheck: true,
      rating: 4.9,
      totalHelpCount: 18
    },
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
    isApproved: true
  },
  {
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+1-555-0202',
    age: 42,
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face',
    userType: 'volunteer' as const,
    location: {
      address: 'Cultural District',
      coordinates: {
        type: 'Point',
        coordinates: [-122.4284, 37.7659]
      }
    },
    volunteerInfo: {
      skills: ['Cooking', 'Language Teaching', 'Administrative Tasks', 'Companionship'],
      availability: {
        days: ['tuesday', 'thursday', 'sunday'] as const,
        timeSlots: [
          { start: '10:00', end: '15:00' }
        ]
      },
      maxDistance: 10,
      languages: ['English', 'French'],
      experience: 'Former teacher, now freelancer. Passionate about cross-cultural connections.',
      backgroundCheck: true,
      rating: 4.7,
      totalHelpCount: 15
    },
    isEmailVerified: true,
    isPhoneVerified: true,
    isActive: true,
    isApproved: true
  }
];

/******************************************************************************
                                Seeding Functions
******************************************************************************/

async function clearDatabase() {
  logger.info('Clearing existing data...');
  await ElderProfile.deleteMany({});
  await UserEnhanced.deleteMany({});
  logger.info('Database cleared successfully');
}

async function seedElders() {
  logger.info('Seeding elder profiles...');
  
  for (const elderData of sampleElders) {
    try {
      const elder = new ElderProfile(elderData);
      await elder.save();
      logger.info(`✓ Created elder profile: ${elder.name}`);
    } catch (error) {
      logger.err(`✗ Failed to create elder profile: ${elderData.name}`, true);
      logger.err(error as Error, true);
    }
  }
}

async function seedVolunteers() {
  logger.info('Seeding volunteer profiles...');
  
  for (const volunteerData of sampleVolunteers) {
    try {
      const volunteer = new UserEnhanced(volunteerData);
      await volunteer.save();
      logger.info(`✓ Created volunteer profile: ${volunteer.name}`);
    } catch (error) {
      logger.err(`✗ Failed to create volunteer profile: ${volunteerData.name}`, true);
      logger.err(error as Error, true);
    }
  }
}

async function assignVolunteersToRequests() {
  logger.info('Assigning volunteers to some requests...');
  
  try {
    // Get all elders and volunteers
    const elders = await ElderProfile.find({});
    const volunteers = await UserEnhanced.find({ userType: 'volunteer' });
    
    // Assign volunteers to some closed requests
    for (const elder of elders) {
      const closedRequests = elder.requests.filter(req => req.status === 'closed');
      
      for (const request of closedRequests) {
        if (volunteers.length > 0) {
          const randomVolunteer = volunteers[Math.floor(Math.random() * volunteers.length)];
          request.helperId = randomVolunteer._id;
          
          // Add elder to volunteer's helped list
          if (!randomVolunteer.helpedElders.includes(elder._id)) {
            randomVolunteer.helpedElders.push(elder._id);
            await randomVolunteer.save();
          }
        }
      }
      
      await elder.save();
    }
    
    logger.info('✓ Assigned volunteers to completed requests');
  } catch (error) {
    logger.err('✗ Failed to assign volunteers to requests', true);
    logger.err(error as Error, true);
  }
}

async function displayStats() {
  const eldersCount = await ElderProfile.countDocuments({});
  const volunteersCount = await UserEnhanced.countDocuments({ userType: 'volunteer' });
  const openRequestsCount = await ElderProfile.aggregate([
    { $unwind: '$requests' },
    { $match: { 'requests.status': 'open' } },
    { $count: 'total' }
  ]);
  
  logger.info('\n=== DATABASE SEEDING COMPLETE ===');
  logger.info(`📊 Elders created: ${eldersCount}`);
  logger.info(`🙋 Volunteers created: ${volunteersCount}`);
  logger.info(`📋 Open requests: ${openRequestsCount[0]?.total || 0}`);
  logger.info('\n=== SAMPLE DATA FOR TESTING ===');
  logger.info('Elder IDs for frontend testing:');
  
  const elders = await ElderProfile.find({}, 'name _id');
  elders.forEach(elder => {
    logger.info(`  - ${elder.name}: ${elder._id}`);
  });
  
  logger.info('\nYou can now test your UserAboutPage with these elder IDs!');
}

/******************************************************************************
                                Main Seeding Function
******************************************************************************/

export async function seedDatabase(clearFirst: boolean = true) {
  try {
    logger.info('🌱 Starting database seeding...');
    
    // Connect to database if not already connected
    await DatabaseConnection.connect();
    
    if (clearFirst) {
      await clearDatabase();
    }
    
    // Seed data
    await seedElders();
    await seedVolunteers();
    await assignVolunteersToRequests();
    
    // Display statistics
    await displayStats();
    
    logger.info('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    logger.err('❌ Database seeding failed:', true);
    logger.err(error as Error, true);
    throw error;
  }
}

// Export individual functions for flexibility
export {
  clearDatabase,
  seedElders,
  seedVolunteers,
  assignVolunteersToRequests,
  displayStats
};

// If this file is run directly
if (require.main === module) {
  seedDatabase(true)
    .then(() => {
      logger.info('Seeding completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      logger.err('Seeding failed:', true);
      logger.err(error, true);
      process.exit(1);
    });
}
