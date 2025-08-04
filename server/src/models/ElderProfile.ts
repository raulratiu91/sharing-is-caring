import mongoose, { Schema, Document, Types } from 'mongoose';

// Interfaces based on your frontend types
export interface IStoryCard {
  image: string;
  title: string;
  description: string;
  date?: string;
}

export interface IRequestItem {
  title: string;
  description: string;
  status: 'open' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt?: Date;
  // Optional fields for future features
  helperId?: Types.ObjectId; // Reference to User who offers help
  completedAt?: Date;
  estimatedDuration?: string;
  urgencyNotes?: string;
}

export interface IElderProfile extends Document {
  _id: Types.ObjectId;
  // Basic Info
  name: string;
  age: number;
  email?: string;
  phone?: string;
  
  // Profile Content
  story: string;
  background: string;
  interests: string[];
  avatar?: string;
  
  // Location
  location: {
    address: string;
    coordinates?: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  
  // Story Cards & Media
  storyCards: IStoryCard[];
  
  // Help Requests
  requests: IRequestItem[];
  
  // Account Management
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  
  // Optional Future Features
  familyContacts?: Array<{
    name: string;
    relationship: string;
    phone?: string;
    email?: string;
  }>;
  medicalInfo?: {
    emergencyContact?: string;
    allergies?: string[];
    medications?: string[];
    mobility?: 'independent' | 'assisted' | 'wheelchair';
  };
  preferences?: {
    preferredContactMethod: 'phone' | 'email' | 'inApp';
    availableHours?: {
      start: string;
      end: string;
    };
    languagesSpoken?: string[];
  };
}

// Story Card Schema
const StoryCardSchema = new Schema<IStoryCard>({
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        // More flexible validation for image URLs including Unsplash and other services
        return /^https?:\/\/.+/i.test(v) && (
          /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(v) || // Traditional image URLs
          /unsplash\.com/i.test(v) || // Unsplash URLs
          /images\./i.test(v) || // Generic image services
          /avatar/i.test(v) || // Avatar services
          /gravatar/i.test(v) // Gravatar URLs
        );
      },
      message: 'Image must be a valid URL'
    }
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  date: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^\d{4}$/.test(v); // Year format or empty
      },
      message: 'Date should be in YYYY format'
    }
  }
}, { _id: false }); // Don't create _id for subdocuments

// Request Item Schema
const RequestItemSchema = new Schema<IRequestItem>({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  helperId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  completedAt: {
    type: Date,
    required: false
  },
  estimatedDuration: {
    type: String,
    maxlength: 50
  },
  urgencyNotes: {
    type: String,
    maxlength: 200
  }
});

// Elder Profile Schema
const ElderProfileSchema = new Schema<IElderProfile>({
  // Basic Info
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
    index: true
  },
  age: {
    type: Number,
    required: true,
    min: 50,
    max: 120
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  phone: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^\+?[\d\s\-\(\)]+$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },

  // Profile Content
  story: {
    type: String,
    required: true,
    maxlength: 2000,
    trim: true
  },
  background: {
    type: String,
    required: true,
    maxlength: 2000,
    trim: true
  },
  interests: [{
    type: String,
    maxlength: 50,
    trim: true
  }],
  avatar: {
    type: String,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Allow empty/null values
        // More flexible validation for image URLs including Unsplash and other services
        return /^https?:\/\/.+/i.test(v) && (
          /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(v) || // Traditional image URLs
          /unsplash\.com/i.test(v) || // Unsplash URLs
          /images\./i.test(v) || // Generic image services
          /avatar/i.test(v) || // Avatar services
          /gravatar/i.test(v) // Gravatar URLs
        );
      },
      message: 'Avatar must be a valid image URL'
    }
  },

  // Location
  location: {
    address: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
      index: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        validate: {
          validator: function(v: number[]) {
            return v.length === 2 && 
                   v[0] >= -180 && v[0] <= 180 && // longitude
                   v[1] >= -90 && v[1] <= 90;     // latitude
          },
          message: 'Coordinates must be [longitude, latitude] within valid ranges'
        }
      }
    }
  },

  // Story Cards & Media
  storyCards: [StoryCardSchema],

  // Help Requests
  requests: [RequestItemSchema],

  // Account Management
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },

  // Optional Future Features
  familyContacts: [{
    name: { type: String, maxlength: 100, trim: true },
    relationship: { type: String, maxlength: 50, trim: true },
    phone: { type: String, maxlength: 20 },
    email: { type: String, lowercase: true }
  }],

  medicalInfo: {
    emergencyContact: { type: String, maxlength: 100 },
    allergies: [{ type: String, maxlength: 100 }],
    medications: [{ type: String, maxlength: 100 }],
    mobility: {
      type: String,
      enum: ['independent', 'assisted', 'wheelchair'],
      default: 'independent'
    }
  },

  preferences: {
    preferredContactMethod: {
      type: String,
      enum: ['phone', 'email', 'inApp'],
      default: 'inApp'
    },
    availableHours: {
      start: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
      end: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }
    },
    languagesSpoken: [{ type: String, maxlength: 30 }]
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
ElderProfileSchema.index({ 'location.coordinates': '2dsphere' }); // Geospatial queries
ElderProfileSchema.index({ 'requests.status': 1, 'requests.priority': 1 }); // Request filtering
ElderProfileSchema.index({ interests: 1 }); // Interest-based matching
ElderProfileSchema.index({ isActive: 1, isVerified: 1 }); // Active profiles

// Virtual fields
ElderProfileSchema.virtual('openRequestsCount').get(function() {
  return this.requests.filter(req => req.status === 'open').length;
});

ElderProfileSchema.virtual('urgentRequestsCount').get(function() {
  return this.requests.filter(req => req.status === 'open' && req.priority === 'high').length;
});

// Middleware to update request updatedAt
RequestItemSchema.pre('save', function() {
  this.updatedAt = new Date();
});

// Export the model
export const ElderProfile = mongoose.model<IElderProfile>('ElderProfile', ElderProfileSchema);
export default ElderProfile;
