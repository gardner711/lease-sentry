import type { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.js';
import { ApplicationInsightsService } from '../services/applicationInsights.js';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const buildAppInsightsProperties = (
    req: Request,
    statusCode: number,
    isOperational: boolean,
): Record<string, string> => ({
    statusCode: statusCode.toString(),
    isOperational: isOperational.toString(),
    url: req.url,
    method: req.method,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ip: req.ip ?? 'unknown',
    userAgent: req.get('User-Agent') ?? 'unknown',
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    requestId: (req.headers['request-id'] as string) ?? (req.headers['x-request-id'] as string) ?? 'unknown',
});

const buildLogData = (
    error: AppError,
    req: Request,
    statusCode: number,
    isOperational: boolean,
): Record<string, unknown> => ({
    message: error.message,
    stack: error.stack,
    statusCode,
    isOperational,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
});

const logErrorByStatus = (statusCode: number, logData: Record<string, unknown>): void => {
    if (statusCode >= 500) {
        logger.error('Server Error:', logData);
    } else if (statusCode >= 400) {
        logger.warn('Client Error:', logData);
    } else {
        logger.info('Application Error:', logData);
    }
};

const buildErrorResponse = (error: AppError, isDevelopment: boolean): Record<string, unknown> => ({
    error: {
        message: isDevelopment ? error.message : 'An error occurred',
        ...(isDevelopment && { stack: error.stack }),
    },
});

export const errorHandler = (
    error: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _next: NextFunction,
): void => {
    const statusCode = error.statusCode ?? 500;
    const isOperational = error.isOperational ?? false;

    // Track error with Application Insights
    const appInsights = ApplicationInsightsService.getInstance();
    const insightsProps = buildAppInsightsProperties(req, statusCode, isOperational);
    appInsights.trackException(error, insightsProps);

    // Log the error
    const logData = buildLogData(error, req, statusCode, isOperational);
    logErrorByStatus(statusCode, logData);

    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorResponse = buildErrorResponse(error, isDevelopment);

    res.status(statusCode).json(errorResponse);
};

export const createError = (message: string, statusCode: number = 500, isOperational: boolean = true): AppError => {
    const error: AppError = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = isOperational;
    return error;
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
