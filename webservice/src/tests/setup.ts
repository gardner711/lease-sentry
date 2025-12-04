import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';

// Mock external services for testing
jest.mock('../services/cosmosDb.ts', () => ({
    getContainer: jest.fn(),
    initializeCosmosDb: jest.fn(),
    createDocument: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
    queryDocuments: jest.fn(),
    upsertDocument: jest.fn(),
    getDocumentCount: jest.fn(),
}));

jest.mock('../services/logger.ts', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

// Global test setup
beforeAll(async () => {
    // Any global setup can go here
});

afterAll(async () => {
    // Any global cleanup can go here
});
