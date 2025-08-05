import { Request, Response } from 'express';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import AuthService, { RegisterData, LoginData } from '@src/services/AuthService';
import { authenticateToken, AuthRequest } from '@src/middleware/auth';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Register a new user
 */
async function register(req: Request, res: Response): Promise<void> {
  try {
    const registerData: RegisterData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      userType: req.body.userType || 'volunteer',
      phone: req.body.phone,
      avatar: req.body.avatar,
    };

    // Basic validation
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.address) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: 'Name, email, password, and address are required'
      });
      return;
    }

    if (registerData.password.length < 6) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: 'Password must be at least 6 characters long'
      });
      return;
    }

    const result = await AuthService.register(registerData);
    
    res.status(HttpStatusCodes.CREATED).json({
      message: 'User registered successfully',
      user: result.user,
      token: result.token
    });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Registration failed'
      });
    }
  }
}

/**
 * Login user
 */
async function login(req: Request, res: Response): Promise<void> {
  try {
    const loginData: LoginData = {
      email: req.body.email,
      password: req.body.password,
    };

    // Basic validation
    if (!loginData.email || !loginData.password) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: 'Email and password are required'
      });
      return;
    }

    const result = await AuthService.login(loginData);
    
    res.status(HttpStatusCodes.OK).json({
      message: 'Login successful',
      user: result.user,
      token: result.token
    });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Login failed'
      });
    }
  }
}

/**
 * Get current user profile
 */
async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        error: 'Authentication required'
      });
      return;
    }

    res.status(HttpStatusCodes.OK).json({
      user: req.user
    });
  } catch (error: any) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to get user profile'
    });
  }
}

/**
 * Update current user profile
 */
async function updateMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        error: 'Authentication required'
      });
      return;
    }

    const updateData = {
      name: req.body.name,
      phone: req.body.phone,
      avatar: req.body.avatar,
      location: req.body.location ? {
        address: req.body.location.address,
        coordinates: req.body.location.coordinates
      } : undefined
    };

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof typeof updateData] === undefined) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    const updatedUser = await AuthService.updateProfile(req.user._id.toString(), updateData);
    
    res.status(HttpStatusCodes.OK).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Profile update failed'
      });
    }
  }
}

/**
 * Logout user (client-side will remove token)
 */
async function logout(req: AuthRequest, res: Response): Promise<void> {
  res.status(HttpStatusCodes.OK).json({
    message: 'Logout successful'
  });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  register,
  login,
  getMe: [authenticateToken, getMe],
  updateMe: [authenticateToken, updateMe],
  logout: [authenticateToken, logout],
} as const;