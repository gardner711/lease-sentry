import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { getContainer } from '../services/cosmosDb.js';
import { ApplicationInsightsService } from '../services/applicationInsights.js';

const router = Router();
const appInsights = ApplicationInsightsService.getInstance();

const checkDatabaseConnectivity = async (): Promise<{ status: 'ok' | 'error'; message?: string; responseTime?: number }> => {
    try {
        const start = Date.now();
        const container = getContainer('accounts');
        await container.read();
        return {
            status: 'ok',
            responseTime: Date.now() - start,
        };
    } catch (error) {
        logger.error('Database health check failed', { error });
        return {
            status: 'error',
            message: 'Database connection failed',
        };
    }
};

const checkApplicationInsights = (): { status: 'ok' | 'error'; message?: string } => {
    try {
        const client = appInsights.getClient();
        return {
            status: client ? 'ok' : 'error',
            message: client ? 'Application Insights initialized' : 'Application Insights not initialized',
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'Application Insights check failed',
        };
    }
};

const checkMemoryUsage = (): { status: 'ok' | 'error'; message: string } => {
    const memUsage = process.memoryUsage();
    const memUsageMB = memUsage.heapUsed / 1024 / 1024;
    return {
        status: memUsageMB < 512 ? 'ok' : 'error',
        message: `Heap usage: ${memUsageMB.toFixed(2)}MB`,
    };
};

const checkEnvironmentConfiguration = (): { status: 'ok' | 'error'; message: string } => {
    const requiredEnvVars = [
        'COSMOS_DB_ENDPOINT',
        'COSMOS_DB_KEY',
        'COSMOS_DB_DATABASE',
        'JWT_SECRET',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    return {
        status: missingVars.length === 0 ? 'ok' : 'error',
        message: missingVars.length > 0 ? `Missing env vars: ${missingVars.join(', ')}` : 'All required env vars present',
    };
};

const performReadinessChecks = async (): Promise<Record<string, { status: 'ok' | 'error'; message?: string; responseTime?: number }>> => {
    const checks: Record<string, { status: 'ok' | 'error'; message?: string; responseTime?: number }> = {};

    checks.database = await checkDatabaseConnectivity();
    checks.applicationInsights = checkApplicationInsights();
    checks.memory = checkMemoryUsage();
    checks.configuration = checkEnvironmentConfiguration();

    return checks;
};

const performHealthCheck = async () => {
    const checks = await performReadinessChecks();
    const isHealthy = Object.values(checks).every(check => check.status === 'ok');

    // Track health status with Application Insights
    appInsights.trackBusinessMetric('service_health', isHealthy ? 1 : 0, {
        status: isHealthy ? 'healthy' : 'unhealthy',
        uptime: process.uptime().toString(),
    });

    return {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version ?? '1.0.0',
        components: checks,
    };
};

// Comprehensive health check
router.get('/', asyncHandler(async (req, res) => {
    const healthStatus = await performHealthCheck();
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;

    res.status(statusCode).json(healthStatus);
}));

// Liveness probe - indicates if the service is running
router.get('/live', (req, res) => {
    res.json({
        status: 'alive',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// Readiness probe - indicates if the service can accept traffic
router.get('/ready', asyncHandler(async (req, res) => {
    const checks = await performReadinessChecks();
    const isReady = Object.values(checks).every(check => check.status === 'ok');
    const statusCode = isReady ? 200 : 503;

    res.status(statusCode).json({
        status: isReady ? 'ready' : 'not-ready',
        timestamp: new Date().toISOString(),
        checks,
    });
}));

// Startup probe - indicates if the service has started successfully
router.get('/startup', (req, res) => {
    res.json({
        status: 'started',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version ?? '1.0.0',
    });
});

export { router as healthRouter };
