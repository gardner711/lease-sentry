import { Request, Response, NextFunction } from 'express';

import { trackException } from '../services/appInsights.js';
import { logger } from '../utils/logger.js';

export interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

export class HttpError extends Error implements ApiError {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Log error
  logger.error(`Error handling request: ${req.method} ${req.path}`, error, {
    statusCode,
    path: req.path,
    method: req.method,
    requestId: req.headers['x-request-id'] as string,
  });

  // Track exception in Application Insights
  trackException(error, {
    path: req.path,
    method: req.method,
    statusCode: statusCode.toString(),
  });

  // Send error response
  const response: Record<string, unknown> = {
    error: error.name || 'Error',
    message,
    statusCode,
  };

  if (error.details) {
    response.details = error.details;
  }

  res.status(statusCode).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'NotFound',
    message: `Route ${req.method} ${req.path} not found`,
    statusCode: 404,
  });
};
