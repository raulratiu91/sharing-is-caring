import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserEnhanced extends Document {
  _id: Types.ObjectId;

  // Basic Info
  name: string;
  email: string;
  phone?: string;
  age?: number;
  avatar?: string;

  // User Type
  userType: 'volunteer' | 'elder' | 'admin';

  // Location
  location: {
    address: string;
    coordinates?: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  };

  // Volunteer-specific fields
  volunteerInfo?: {
    skills: string[];
    availability: {
      days: (
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
      )[];
      timeSlots: {
        start: string;
        end: string;
      }[];
    };
    maxDistance: number; // in kilometers
    languages: string[];
    experience?: string;
    backgroundCheck: boolean;
    rating?: number;
    totalHelpCount?: number;
  };

  // Authentication
  passwordHash?: string; // Optional if using OAuth
  isEmailVerified: boolean;
  isPhoneVerified: boolean;

  // Account Status
  isActive: boolean;
  isApproved: boolean; // For volunteer approval process

  // Connections
  helpedElders: Types.ObjectId[]; // References to ElderProfile
  currentRequests: Types.ObjectId[]; // Active help requests

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

const UserEnhancedSchema = new Schema<IUserEnhanced>(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please enter a valid email',
      },
      index: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v: string) {
          return !v || /^\+?[\d\s\-\(\)]+$/.test(v);
        },
        message: 'Please enter a valid phone number',
      },
    },
    age: {
      type: Number,
      min: 16,
      max: 100,
    },
    avatar: {
      type: String,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Allow empty/null values
          // More flexible validation for image URLs including Unsplash and other services
          return (
            /^https?:\/\/.+/i.test(v) &&
            (/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(v) || // Traditional image URLs
              /unsplash\.com/i.test(v) || // Unsplash URLs
              /images\./i.test(v) || // Generic image services
              /avatar/i.test(v) || // Avatar services
              /gravatar/i.test(v)) // Gravatar URLs
          );
        },
        message: 'Avatar must be a valid image URL',
      },
    },

    // User Type
    userType: {
      type: String,
      enum: ['volunteer', 'elder', 'admin'],
      required: true,
      default: 'volunteer',
      index: true,
    },

    // Location
    location: {
      address: {
        type: String,
        required: true,
        maxlength: 200,
        trim: true,
        index: true,
      },
      coordinates: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          validate: {
            validator: function (v: number[]) {
              return (
                v.length === 2 &&
                v[0] >= -180 &&
                v[0] <= 180 && // longitude
                v[1] >= -90 &&
                v[1] <= 90
              ); // latitude
            },
            message:
              'Coordinates must be [longitude, latitude] within valid ranges',
          },
        },
      },
    },

    // Volunteer-specific fields
    volunteerInfo: {
      skills: [
        {
          type: String,
          maxlength: 50,
          trim: true,
        },
      ],
      availability: {
        days: [
          {
            type: String,
            enum: [
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
            ],
          },
        ],
        timeSlots: [
          {
            start: {
              type: String,
              match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            },
            end: {
              type: String,
              match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            },
          },
        ],
      },
      maxDistance: {
        type: Number,
        min: 1,
        max: 100,
        default: 10,
      },
      languages: [
        {
          type: String,
          maxlength: 30,
          trim: true,
        },
      ],
      experience: {
        type: String,
        maxlength: 1000,
        trim: true,
      },
      backgroundCheck: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
          validator: function (v: number) {
            return v === Math.round(v * 10) / 10; // Allow one decimal place
          },
          message: 'Rating must be between 1-5 with max one decimal place',
        },
      },
      totalHelpCount: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    // Authentication
    passwordHash: {
      type: String,
      select: false, // Don't include in queries by default
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Connections
    helpedElders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ElderProfile',
      },
    ],
    currentRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ElderProfile',
      },
    ],

    // Timestamps
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.passwordHash; // Never send password hash to client
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
UserEnhancedSchema.index({ 'location.coordinates': '2dsphere' }); // Geospatial queries
UserEnhancedSchema.index({ userType: 1, isActive: 1, isApproved: 1 }); // User filtering
UserEnhancedSchema.index({ 'volunteerInfo.skills': 1 }); // Skill-based matching
UserEnhancedSchema.index({ 'volunteerInfo.maxDistance': 1 }); // Distance filtering

// Virtual fields
UserEnhancedSchema.virtual('isVerified').get(function () {
  return (
    this.isEmailVerified && (this.userType !== 'volunteer' || this.isApproved)
  );
});

UserEnhancedSchema.virtual('canHelp').get(function () {
  return (
    this.userType === 'volunteer' &&
    this.isActive &&
    this.isApproved &&
    this.isEmailVerified
  );
});

// Methods
UserEnhancedSchema.methods.updateLastLogin = function () {
  this.lastLoginAt = new Date();
  return this.save();
};

UserEnhancedSchema.methods.addHelpedElder = function (elderId: Types.ObjectId) {
  if (!this.helpedElders.includes(elderId)) {
    this.helpedElders.push(elderId);
    if (this.volunteerInfo) {
      this.volunteerInfo.totalHelpCount =
        (this.volunteerInfo.totalHelpCount || 0) + 1;
    }
  }
  return this.save();
};

// Static methods for common queries
UserEnhancedSchema.statics.findVolunteersNearby = function (
  coordinates: [number, number],
  maxDistance: number
) {
  return this.find({
    userType: 'volunteer',
    isActive: true,
    isApproved: true,
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
        $maxDistance: maxDistance * 1000, // Convert km to meters
      },
    },
  });
};

UserEnhancedSchema.statics.findBySkills = function (skills: string[]) {
  return this.find({
    userType: 'volunteer',
    isActive: true,
    isApproved: true,
    'volunteerInfo.skills': { $in: skills },
  });
};

export const UserEnhanced = mongoose.model<IUserEnhanced>(
  'UserEnhanced',
  UserEnhancedSchema
);
export default UserEnhanced;
