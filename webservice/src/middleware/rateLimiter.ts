import type { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.js';

// Simple in-memory rate limiter
// In production, consider using Redis or a more robust solution
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000', 10); // 15 minutes
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? '100', 10);

const getClientIdentifier = (req: Request): string => {
    // Use IP address as primary identifier
    // In production, you might want to use API keys, JWT tokens, or other identifiers
    return req.ip ?? req.connection.remoteAddress ?? 'unknown';
};

const cleanUpExpiredEntries = (): void => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
        if (value.resetTime < now) {
            rateLimitStore.delete(key);
        }
    }
};

const getOrCreateRateLimitEntry = (clientId: string, now: number): { count: number; resetTime: number } => {
    let rateLimitEntry = rateLimitStore.get(clientId);
    if (!rateLimitEntry || rateLimitEntry.resetTime < now) {
        rateLimitEntry = { count: 0, resetTime: now + windowMs };
        rateLimitStore.set(clientId, rateLimitEntry);
    }
    return rateLimitEntry;
};

const handleRateLimitExceeded = (
    req: Request,
    res: Response,
    rateLimitEntry: { count: number; resetTime: number },
): void => {
    const now = Date.now();
    const clientId = getClientIdentifier(req);
    const logData = {
        clientId,
        count: rateLimitEntry.count,
        limit: maxRequests,
        resetTime: new Date(rateLimitEntry.resetTime).toISOString(),
        ip: req.ip,
        url: req.url,
        method: req.method,
    };
    logger.warn('Rate limit exceeded', logData);

    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', rateLimitEntry.resetTime.toString());
    res.setHeader('Retry-After', Math.ceil((rateLimitEntry.resetTime - now) / 1000).toString());

    res.status(429).json({
        error: {
            message: 'Too many requests',
            retryAfter: Math.ceil((rateLimitEntry.resetTime - now) / 1000),
        },
    });
};

const setRateLimitHeaders = (res: Response, rateLimitEntry: { count: number; resetTime: number }): void => {
    const remaining = Math.max(0, maxRequests - rateLimitEntry.count);
    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', rateLimitEntry.resetTime.toString());
};

export const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
    const clientId = getClientIdentifier(req);
    const now = Date.now();

    cleanUpExpiredEntries();

    const rateLimitEntry = getOrCreateRateLimitEntry(clientId, now);

    if (rateLimitEntry.count >= maxRequests) {
        handleRateLimitExceeded(req, res, rateLimitEntry);
        return;
    }

    rateLimitEntry.count++;
    setRateLimitHeaders(res, rateLimitEntry);

    next();
};
