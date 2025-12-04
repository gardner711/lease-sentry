import request from 'supertest';
import express from 'express';
import { healthRouter } from '../routes/health.js';

// Mock the cosmosDb service
jest.mock('../services/cosmosDb.ts', () => ({
    getContainer: jest.fn(() => ({
        items: {
            query: jest.fn(() => ({
                fetchAll: jest.fn(() => Promise.resolve({ resources: [] })),
            })),
        },
    })),
}));// Mock the logger
jest.mock('../services/logger.ts', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

// Mock Application Insights service
jest.mock('../services/applicationInsights.ts', () => ({
    ApplicationInsightsService: {
        getInstance: jest.fn(() => ({
            getClient: jest.fn(() => ({})),
        })),
    },
})); const app = express();
app.use(express.json());
app.use('/health', healthRouter);

describe('Health Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /health', () => {
        it('should return healthy status when all checks pass', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'healthy');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('checks');
            expect(response.body.checks).toHaveProperty('database');
            expect(response.body.checks).toHaveProperty('memory');
            expect(response.body.checks).toHaveProperty('uptime');
        });

        it('should return unhealthy status when database check fails', async () => {
            // Mock database failure
            const mockGetContainer = require('../services/cosmosDb.js').getContainer;
            mockGetContainer.mockImplementationOnce(() => {
                throw new Error('Database connection failed');
            });

            const response = await request(app)
                .get('/health')
                .expect(503);

            expect(response.body).toHaveProperty('status', 'unhealthy');
            expect(response.body.checks.database).toHaveProperty('status', 'error');
        });
    });

    describe('GET /health/live', () => {
        it('should return alive status with uptime', async () => {
            const response = await request(app)
                .get('/health/live')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'alive');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('uptime');
            expect(typeof response.body.uptime).toBe('number');
        });
    });

    describe('GET /health/ready', () => {
        it('should return ready status when all readiness checks pass', async () => {
            const response = await request(app)
                .get('/health/ready')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'ready');
            expect(response.body).toHaveProperty('checks');
            expect(response.body.checks).toHaveProperty('database');
            expect(response.body.checks).toHaveProperty('memory');
        });

        it('should return not ready status when database is unavailable', async () => {
            // Mock database failure
            const mockGetContainer = require('../services/cosmosDb.js').getContainer;
            mockGetContainer.mockImplementationOnce(() => {
                throw new Error('Database connection failed');
            });

            const response = await request(app)
                .get('/health/ready')
                .expect(503);

            expect(response.body).toHaveProperty('status', 'not ready');
            expect(response.body.checks.database).toHaveProperty('status', 'error');
        });
    });

    describe('Error handling', () => {
        it('should handle unexpected errors gracefully', async () => {
            // Mock an unexpected error
            const mockGetContainer = require('../services/cosmosDb.js').getContainer;
            mockGetContainer.mockImplementationOnce(() => {
                throw new Error('Unexpected error');
            });

            const response = await request(app)
                .get('/health')
                .expect(503);

            expect(response.body).toHaveProperty('status', 'unhealthy');
        });
    });
});
