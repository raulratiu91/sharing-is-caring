import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  
  // Basic Info (required for login feature)
  name: string;
  email: string;
  phone?: string;
  avatar?: string; // profile picture URL
  
  // User Type
  userType: 'volunteer' | 'elder' | 'admin';
  
  // Location (required for the app functionality)
  location: {
    address: string;
    coordinates?: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
  
  // Authentication
  passwordHash: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  
  // Account Status
  isActive: boolean;
  isApproved: boolean; // For volunteer approval process
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  updateLastLogin(): Promise<IUser>;
}

const UserSchema = new Schema<IUser>({
  // Basic Info
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email'
    },
    index: true
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
  avatar: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: 'Avatar must be a valid image URL'
    }
  },

  // User Type
  userType: {
    type: String,
    enum: ['volunteer', 'elder', 'admin'],
    required: true,
    default: 'volunteer',
    index: true
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

  // Authentication
  passwordHash: {
    type: String,
    required: true,
    select: false // Don't include in queries by default
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },

  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false,
    index: true
  },

  // Timestamps
  lastLoginAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.passwordHash; // Never send password hash to client
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Indexes for better performance
UserSchema.index({ 'location.coordinates': '2dsphere' }); // Geospatial queries
UserSchema.index({ userType: 1, isActive: 1, isApproved: 1 }); // User filtering

// Virtual fields
UserSchema.virtual('isVerified').get(function() {
  return this.isEmailVerified && (this.userType !== 'volunteer' || this.isApproved);
});

// Methods
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

UserSchema.methods.updateLastLogin = function() {
  this.lastLoginAt = new Date();
  return this.save();
};

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;