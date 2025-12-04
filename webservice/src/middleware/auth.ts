import type { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { createError } from './errorHandler.js';
import { logger } from '../services/logger.js';

interface JwtPayload {
    userId: string;
    email?: string;
    iat?: number;
    exp?: number;
}

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string;
                email?: string;
                iat?: number;
                exp?: number;
            };
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        logger.warn('No token provided', { ip: req.ip, url: req.url });
        throw createError('Access token required', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decoded;

        logger.debug('Token authenticated', {
            userId: decoded.userId,
            tokenExpiry: new Date((decoded.exp ?? 0) * 1000).toISOString(),
        });

        next();
    } catch (error) {
        logger.warn('Invalid token', { error: (error as Error).message, ip: req.ip });

        if (error instanceof jwt.TokenExpiredError) {
            throw createError('Token expired', 401);
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw createError('Invalid token', 401);
        } else {
            throw createError('Token verification failed', 401);
        }
    }
};

// Utility function to generate JWT tokens (for development/testing)
export const generateToken = (payload: { userId: string; email?: string }): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required');
    }

    return jwt.sign(payload, secret, {
        expiresIn: '15m', // 15 minutes
        issuer: process.env.JWT_ISSUER ?? 'lease-sentry',
        audience: process.env.JWT_AUDIENCE ?? 'lease-sentry-api',
    });
};

// Utility function to generate refresh tokens
export const generateRefreshToken = (payload: { userId: string }): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is required');
    }

    return jwt.sign(payload, secret, {
        expiresIn: '7d', // 7 days
        issuer: process.env.JWT_ISSUER ?? 'lease-sentry',
        audience: process.env.JWT_AUDIENCE ?? 'lease-sentry-api',
    });
};
