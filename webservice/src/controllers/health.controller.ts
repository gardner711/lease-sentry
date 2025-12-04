import { Request, Response } from 'express';

import { getCosmosDatabase } from '../services/cosmosDb.js';
import { logger } from '../utils/logger.js';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  checks?: Record<string, { status: string; message?: string }>;
}

export const healthLiveness = (_req: Request, res: Response): void => {
  const health: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  res.status(200).json(health);
};

export const healthReadiness = async (_req: Request, res: Response): Promise<void> => {
  const checks: Record<string, { status: string; message?: string }> = {};

  // Check Cosmos DB
  try {
    const database = getCosmosDatabase();
    await database.read();
    checks.cosmosDb = { status: 'healthy' };
  } catch (error) {
    checks.cosmosDb = { status: 'unhealthy', message: (error as Error).message };
  }

  const allHealthy = Object.values(checks).every((check) => check.status === 'healthy');

  const health: HealthStatus = {
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks,
  };

  res.status(allHealthy ? 200 : 503).json(health);
};

export const healthDetailed = async (_req: Request, res: Response): Promise<void> => {
  const checks: Record<string, { status: string; message?: string; responseTime?: number }> = {};

  // Check Cosmos DB
  try {
    const start = Date.now();
    const database = getCosmosDatabase();
    await database.read();
    const duration = Date.now() - start;
    checks.cosmosDb = { status: 'healthy', responseTime: duration };
  } catch (error) {
    checks.cosmosDb = { status: 'unhealthy', message: (error as Error).message };
    logger.error('Cosmos DB health check failed', error as Error);
  }

  const allHealthy = Object.values(checks).every((check) => check.status === 'healthy');

  const health: HealthStatus = {
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks,
  };

  res.status(allHealthy ? 200 : 503).json(health);
};

export const healthStartup = (_req: Request, res: Response): void => {
  // Simple startup check - if we can respond, we're started
  res.status(200).json({
    status: 'started',
    timestamp: new Date().toISOString(),
  });
};
