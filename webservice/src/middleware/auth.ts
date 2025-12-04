import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config/index.js';

import { HttpError } from './errorHandler.js';

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpError(401, 'No authorization header provided');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new HttpError(401, 'Invalid authorization header format. Expected: Bearer <token>');
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new HttpError(401, 'Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new HttpError(401, 'Invalid token');
    }
    throw new HttpError(401, 'Authentication failed');
  }
};

export const generateAccessToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn as any });

export const generateRefreshToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: config.jwtRefreshExpiresIn as any });

export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret) as JwtPayload;
  } catch (error) {
    throw new HttpError(401, 'Invalid refresh token');
  }
};
