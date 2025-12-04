import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';

// Import middleware and routes
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { rateLimiter } from './middleware/rateLimiter';
import { healthRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { subscriptionRouter } from './routes/subscription';
import { profileRouter } from './routes/profile';
import { supportRouter } from './routes/support';
import { reviewRouter } from './routes/review';
import { contractRouter } from './routes/contract';
import { checkoutSessionRouter } from './routes/checkoutSession';
import eventGridRouter from './routes/eventGrid';

// Import services
import { logger } from './services/logger';
import { initializeCosmosDb } from './services/cosmosDb';
import { ApplicationInsightsService } from './services/applicationInsights';

// Load environment variables
const env = process.env.NODE_ENV ?? 'development';
const envFile = `.env.${env}`;
dotenv.config({ path: envFile });

// Validate environment isolation
logger.info(`Loading environment configuration from: ${envFile}`);
logger.info(`Application running in ${env} environment`);

// Validate required environment variables
const requiredEnvVars = [
    'COSMOS_DB_ENDPOINT',
    'COSMOS_DB_KEY',
    'COSMOS_DB_DATABASE',
    'AZURE_STORAGE_CONNECTION_STRING',
    'JWT_SECRET',
    'STRIPE_SECRET_KEY',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    logger.error(`Missing required environment variables in ${env} environment:`, missingEnvVars);
    logger.error(`Please ensure ${envFile} exists and contains all required variables`);
    process.exit(1);
}

const app = express();
const server = createServer(app);

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
        },
    },
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use(requestLogger);
app.use(rateLimiter);

// Application Insights middleware
const appInsights = ApplicationInsightsService.getInstance();
app.use(appInsights.requestTrackingMiddleware());

// Routes
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/subscription', subscriptionRouter);
app.use('/profile', profileRouter);
app.use('/support', supportRouter);
app.use('/review', reviewRouter);
app.use('/contract', contractRouter);
app.use('/checkoutsession', checkoutSessionRouter);
app.use('/eventgrid', eventGridRouter);

// Swagger documentation
if (process.env.NODE_ENV !== 'production') {
    const swaggerUi = await import('swagger-ui-express');
    const swaggerJSDoc = await import('swagger-jsdoc');

    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Lease Sentry API',
            version: '1.0.0',
            description: 'API for Lease Sentry application',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT ?? 3000}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    };

    const options = {
        swaggerDefinition,
        apis: ['./src/routes/*.ts'],
    };

    const swaggerSpec = swaggerJSDoc.default(options);
    app.use('/api-docs', swaggerUi.default.serve, swaggerUi.default.setup(swaggerSpec));
}

// Error handling middleware (must be last)
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
    logger.info(`Received ${signal}, shutting down gracefully...`);

    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });

    // Force close server after 10 seconds
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM');
});
process.on('SIGINT', () => {
    gracefulShutdown('SIGINT');
});

// Initialize services and start server
const startServer = async (): Promise<void> => {
    try {
        // Initialize Cosmos DB
        await initializeCosmosDb();

        // Initialize Application Insights
        appInsights.initialize();

        const port = parseInt(process.env.PORT ?? '3000', 10);
        const host = process.env.HOST ?? 'localhost';

        server.listen(port, host, () => {
            logger.info(`🚀 Lease Sentry API server running on http://${host}:${port}`);
            if (process.env.NODE_ENV !== 'production') {
                logger.info(`📚 API documentation available at http://${host}:${port}/api-docs`);
            }
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer().catch((error) => {
    logger.error('Unhandled error during server startup:', error);
    process.exit(1);
});
