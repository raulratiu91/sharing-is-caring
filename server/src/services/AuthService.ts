import jwt from 'jsonwebtoken';
import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ENV from '@src/common/constants/ENV';
import { User, IUser } from '@src/models/User';
import { JwtPayload } from '@src/middleware/auth';

/******************************************************************************
                                Constants
******************************************************************************/

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  ACCOUNT_INACTIVE: 'Account is inactive',
} as const;

const JWT_EXPIRES_IN = '7d';

/******************************************************************************
                                Types
******************************************************************************/

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  address: string;
  userType: 'volunteer' | 'elder';
  phone?: string;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Generate JWT token for user
 */
function generateToken(user: IUser): string {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email,
    userType: user.userType,
  };

  return jwt.sign(payload, ENV.JwtSecret, { 
    expiresIn: JWT_EXPIRES_IN 
  });
}

/**
 * Register a new user
 */
async function register(userData: RegisterData): Promise<AuthResponse> {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
  if (existingUser) {
    throw new RouteError(
      HttpStatusCodes.CONFLICT,
      AUTH_ERRORS.EMAIL_EXISTS
    );
  }

  // Create new user
  const user = new User({
    name: userData.name.trim(),
    email: userData.email.toLowerCase(),
    passwordHash: userData.password, // Will be hashed by pre-save middleware
    location: {
      address: userData.address.trim()
    },
    userType: userData.userType,
    phone: userData.phone?.trim(),
    avatar: userData.avatar?.trim(),
    isEmailVerified: false,
    isApproved: userData.userType === 'elder' ? true : false, // Elders are auto-approved
  });

  await user.save();

  // Generate token
  const token = generateToken(user);

  return {
    user,
    token
  };
}

/**
 * Login user
 */
async function login(loginData: LoginData): Promise<AuthResponse> {
  // Find user by email (include password for comparison)
  const user = await User.findOne({ 
    email: loginData.email.toLowerCase() 
  }).select('+passwordHash');

  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      AUTH_ERRORS.INVALID_CREDENTIALS
    );
  }

  // Check password
  const isPasswordValid = await user.comparePassword(loginData.password);
  if (!isPasswordValid) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      AUTH_ERRORS.INVALID_CREDENTIALS
    );
  }

  // Check if account is active
  if (!user.isActive) {
    throw new RouteError(
      HttpStatusCodes.FORBIDDEN,
      AUTH_ERRORS.ACCOUNT_INACTIVE
    );
  }

  // Update last login
  await user.updateLastLogin();

  // Remove password from response
  user.passwordHash = undefined as any;

  // Generate token
  const token = generateToken(user);

  return {
    user,
    token
  };
}

/**
 * Get user profile by ID
 */
async function getProfile(userId: string): Promise<IUser> {
  const user = await User.findById(userId);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      AUTH_ERRORS.USER_NOT_FOUND
    );
  }

  return user;
}

/**
 * Update user profile
 */
async function updateProfile(
  userId: string, 
  updateData: Partial<Pick<IUser, 'name' | 'phone' | 'avatar' | 'location'>>
): Promise<IUser> {
  const user = await User.findById(userId);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      AUTH_ERRORS.USER_NOT_FOUND
    );
  }

  // Update allowed fields
  if (updateData.name) user.name = updateData.name.trim();
  if (updateData.phone !== undefined) user.phone = updateData.phone?.trim();
  if (updateData.avatar !== undefined) user.avatar = updateData.avatar?.trim();
  if (updateData.location) {
    user.location = {
      ...user.location,
      ...updateData.location
    };
  }

  await user.save();
  return user;
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  register,
  login,
  getProfile,
  updateProfile,
  generateToken,
} as const;