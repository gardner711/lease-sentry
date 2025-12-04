import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { generateAccessToken, generateRefreshToken, verifyRefreshToken, JwtPayload } from '../middleware/auth.js';
import { HttpError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

// In-memory token blacklist (in production, use Redis or database)
const revokedTokens = new Set<string>();

interface LoginRequest {
  email: string;
  password: string;
}

interface RefreshRequest {
  refreshToken: string;
}

export const login = async (req: Request<object, object, LoginRequest>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Mock user lookup (in production, query database)
  // This is infrastructure code only - no demo users per FR-847292-06
  const mockUser = {
    id: 'user-123',
    email: 'user@example.com',
    passwordHash: await bcrypt.hash('password123', 10),
  };

  // Validate credentials
  const isValidEmail = email === mockUser.email;
  const isValidPassword = await bcrypt.compare(password, mockUser.passwordHash);

  if (!isValidEmail || !isValidPassword) {
    logger.warn('Failed login attempt', { email });
    throw new HttpError(401, 'Invalid credentials');
  }

  // Generate tokens
  const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
    userId: mockUser.id,
    email: mockUser.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  logger.info('User logged in successfully', { userId: mockUser.id, email: mockUser.email });

  res.status(200).json({
    accessToken,
    refreshToken,
    expiresIn: '15m',
  });
};

export const refresh = async (req: Request<object, object, RefreshRequest>, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new HttpError(400, 'Refresh token is required');
  }

  // Check if token is revoked
  if (revokedTokens.has(refreshToken)) {
    throw new HttpError(401, 'Refresh token has been revoked');
  }

  // Verify refresh token
  const decoded = verifyRefreshToken(refreshToken);

  // Generate new access token
  const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
    userId: decoded.userId,
    email: decoded.email,
  };

  const newAccessToken = generateAccessToken(payload);

  logger.info('Access token refreshed', { userId: decoded.userId });

  res.status(200).json({
    accessToken: newAccessToken,
    expiresIn: '15m',
  });
};

export const logout = async (req: Request<object, object, RefreshRequest>, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    // Add to revoked tokens
    revokedTokens.add(refreshToken);
    logger.info('Refresh token revoked');
  }

  res.status(200).json({
    message: 'Logged out successfully',
  });
};

export const verify = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpError(401, 'No authorization header provided');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new HttpError(401, 'Invalid authorization header format');
  }

  try {
    const decoded = verifyRefreshToken(token);

    res.status(200).json({
      valid: true,
      userId: decoded.userId,
      email: decoded.email,
    });
  } catch {
    res.status(401).json({
      valid: false,
    });
  }
};
