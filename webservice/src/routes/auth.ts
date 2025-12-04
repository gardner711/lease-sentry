import express from 'express';
import { body, validationResult } from 'express-validator';
import { generateToken, generateRefreshToken, authenticateToken } from '../middleware/auth.js';
import { createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { ApplicationInsightsService } from '../services/applicationInsights.js';

const router = express.Router();
const appInsights = ApplicationInsightsService.getInstance();

// In-memory store for refresh tokens (in production, use Redis or database)
const refreshTokens = new Set<string>();

// POST /auth/login - User authentication and token generation
router.post('/login', [
    body('userId').isString().notEmpty().withMessage('userId is required'),
    body('email').optional().isEmail().withMessage('Invalid email format'),
], appInsights.handlerTrackingMiddleware('auth.login'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError(`Validation failed: ${errors.array().map(e => e.msg).join(', ')}`, 400);
        }

        const { userId, email } = req.body;

        // In a real implementation, validate user credentials against database
        // For now, accept any userId and generate tokens
        logger.info('User login successful', { userId, email });

        const accessToken = generateToken({ userId, email });
        const refreshToken = generateRefreshToken({ userId });

        // Store refresh token
        refreshTokens.add(refreshToken);

        res.json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                expiresIn: 15 * 60, // 15 minutes in seconds
                tokenType: 'Bearer',
                user: { userId, email },
            },
        });
    } catch (error) {
        next(error);
    }
});

// POST /auth/refresh - Token refresh using refresh tokens
router.post('/refresh', [
    body('refreshToken').isString().notEmpty().withMessage('refreshToken is required'),
], appInsights.handlerTrackingMiddleware('auth.refresh'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError(`Validation failed: ${errors.array().map(e => e.msg).join(', ')}`, 400);
        }

        const { refreshToken } = req.body;

        // Check if refresh token exists
        if (!refreshTokens.has(refreshToken)) {
            throw createError('Invalid refresh token', 401);
        }

        // Verify refresh token
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { userId: string; email?: string };

        // Generate new tokens
        const tokenPayload: { userId: string; email?: string } = { userId: decoded.userId };
        if (decoded.email) {
            tokenPayload.email = decoded.email;
        }
        const newAccessToken = generateToken(tokenPayload);
        const newRefreshToken = generateRefreshToken({ userId: decoded.userId });

        // Remove old refresh token and add new one
        refreshTokens.delete(refreshToken);
        refreshTokens.add(newRefreshToken);

        logger.info('Token refresh successful', { userId: decoded.userId });

        res.json({
            success: true,
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn: 15 * 60,
                tokenType: 'Bearer',
            },
        });
    } catch (error) {
        next(error);
    }
});

// POST /auth/logout - Token revocation
router.post('/logout', [
    body('refreshToken').isString().notEmpty().withMessage('refreshToken is required'),
], appInsights.handlerTrackingMiddleware('auth.logout'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw createError(`Validation failed: ${errors.array().map(e => e.msg).join(', ')}`, 400);
        }

        const { refreshToken } = req.body;

        // Remove refresh token
        refreshTokens.delete(refreshToken);

        logger.info('User logout successful', { refreshToken: `${refreshToken.substring(0, 10)}...` });

        res.json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
});

// POST /auth/verify - Token validation checking
router.post('/verify', authenticateToken, appInsights.handlerTrackingMiddleware('auth.verify'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // The authenticateToken middleware will validate the token
        // If we reach here, the token is valid
        const user = req.user;

        res.json({
            success: true,
            data: {
                valid: true,
                user: {
                    userId: user.userId,
                    email: user.email,
                },
                expiresAt: new Date((user.exp ?? 0) * 1000).toISOString(),
            },
        });
    } catch (error) {
        next(error);
    }
});

export { router as authRouter };
