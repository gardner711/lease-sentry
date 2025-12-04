import type { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.js';

const generateRequestId = (): string => {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    const requestId = req.headers['x-request-id'] as string || generateRequestId();

    // Add request ID to response headers
    res.setHeader('x-request-id', requestId);

    // Log the incoming request
    logger.info('Request received', {
        requestId,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        contentLength: req.get('Content-Length'),
        contentType: req.get('Content-Type'),
    });

    // Log the response when it's finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLevel = res.statusCode >= 400 ? 'warn' : 'info';

        logger.log(logLevel, 'Request completed', {
            requestId,
            method: req.method,
            url: req.url,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            contentLength: res.get('Content-Length'),
            contentType: res.get('Content-Type'),
        });
    });

    // Log errors
    res.on('error', (error) => {
        logger.error('Request error', {
            requestId,
            method: req.method,
            url: req.url,
            error: error.message,
            stack: error.stack,
        });
    });

    next();
};
