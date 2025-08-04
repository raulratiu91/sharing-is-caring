import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ENV from '@src/common/constants/ENV';
import { User, IUser } from '@src/models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface JwtPayload {
  userId: string;
  email: string;
  userType: string;
  iat?: number;
  exp?: number;
}

/**
 * Middleware to authenticate JWT tokens
 */
export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        error: 'Access token required'
      });
      return;
    }

    const decoded = jwt.verify(token, ENV.JwtSecret) as JwtPayload;
    
    // Find user in database
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        error: 'Invalid or expired token'
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        error: 'Invalid token'
      });
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Authentication error'
      });
    }
  }
};

/**
 * Middleware to check if user is approved (for volunteer actions)
 */
export const requireApproved = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({
      error: 'Authentication required'
    });
    return;
  }

  if (req.user.userType === 'volunteer' && !req.user.isApproved) {
    res.status(HttpStatusCodes.FORBIDDEN).json({
      error: 'Account approval required'
    });
    return;
  }

  next();
};

/**
 * Middleware to check user type
 */
export const requireUserType = (allowedTypes: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(HttpStatusCodes.UNAUTHORIZED).json({
        error: 'Authentication required'
      });
      return;
    }

    if (!allowedTypes.includes(req.user.userType)) {
      res.status(HttpStatusCodes.FORBIDDEN).json({
        error: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};