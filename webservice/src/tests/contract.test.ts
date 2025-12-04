import request from 'supertest';
import express from 'express';
import { contractRouter } from '../routes/contract.js';
import { createDocument, getDocumentById, queryDocuments, deleteDocument } from '../services/cosmosDb.js';

const mockCreateDocument = createDocument as jest.MockedFunction<typeof createDocument>;
const mockGetDocumentById = getDocumentById as jest.MockedFunction<typeof getDocumentById>;
const mockQueryDocuments = queryDocuments as jest.MockedFunction<typeof queryDocuments>;
const mockDeleteDocument = deleteDocument as jest.MockedFunction<typeof deleteDocument>;

// Mock the cosmosDb service
jest.mock('../services/cosmosDb.ts', () => ({
    createDocument: jest.fn(),
    getDocumentById: jest.fn(),
    queryDocuments: jest.fn(),
    deleteDocument: jest.fn(),
}));

// Mock the auth middleware
jest.mock('../middleware/auth.ts', () => ({
    authenticateToken: jest.fn((req, res, next) => {
        req.user = { userId: 'test-user-123', email: 'test@example.com' };
        next();
    }),
}));

// Mock the logger
jest.mock('../services/logger.ts', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use('/contracts', contractRouter);

describe('Contract Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /contracts', () => {
        it('should create contract successfully with valid data', async () => {
            mockCreateDocument.mockResolvedValue({
                id: 'contract-123',
                userId: 'test-user-123',
                score: 85,
                upload: '2024-01-01T10:00:00.000Z',
                status: 'processing',
            });

            const response = await request(app)
                .post('/contracts')
                .set('Authorization', 'Bearer valid-token')
                .send({
                    score: 85,
                    upload: '2024-01-01T10:00:00.000Z',
                    status: 'processing',
                })
                .expect(201);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('userId', 'test-user-123');
        });

        it('should fail with invalid score', async () => {
            const response = await request(app)
                .post('/contracts')
                .set('Authorization', 'Bearer valid-token')
                .send({
                    score: 150, // Invalid score > 100
                    upload: '2024-01-01T10:00:00.000Z',
                    status: 'processing',
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail with missing required fields', async () => {
            const response = await request(app)
                .post('/contracts')
                .set('Authorization', 'Bearer valid-token')
                .send({
                    score: 85,
                    // Missing upload and status
                })
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail without authentication', async () => {
            const response = await request(app)
                .post('/contracts')
                .send({
                    score: 85,
                    upload: '2024-01-01T10:00:00.000Z',
                    status: 'processing',
                })
                .expect(401);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /contracts', () => {
        it('should get contracts successfully', async () => {
            mockQueryDocuments.mockResolvedValue([
                {
                    id: 'contract-1',
                    userId: 'test-user-123',
                    score: 85,
                    upload: '2024-01-01T10:00:00.000Z',
                    status: 'processed',
                },
            ]);

            const response = await request(app)
                .get('/contracts')
                .set('Authorization', 'Bearer valid-token')
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter contracts by status', async () => {
            mockQueryDocuments.mockResolvedValue([
                {
                    id: 'contract-1',
                    userId: 'test-user-123',
                    status: 'processed',
                },
            ]);

            const response = await request(app)
                .get('/contracts?status=processed')
                .set('Authorization', 'Bearer valid-token')
                .expect(200);

            expect(response.body.success).toBe(true);
        });
    });

    describe('GET /contracts/:id', () => {
        it('should get contract by id successfully', async () => {
            mockGetDocumentById.mockResolvedValue({
                id: 'contract-123',
                userId: 'test-user-123',
                score: 85,
                upload: '2024-01-01T10:00:00.000Z',
                status: 'processed',
            });

            const response = await request(app)
                .get('/contracts/contract-123')
                .set('Authorization', 'Bearer valid-token')
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body.data).toHaveProperty('id', 'contract-123');
        });

        it('should return 404 for non-existent contract', async () => {
            mockGetDocumentById.mockResolvedValue(null);

            const response = await request(app)
                .get('/contracts/non-existent')
                .set('Authorization', 'Bearer valid-token')
                .expect(404);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('not found');
        });
    });

    describe('PUT /contracts/:id', () => {
        it('should update contract successfully', async () => {
            mockGetDocumentById.mockResolvedValue({
                id: 'contract-123',
                userId: 'test-user-123',
                score: 85,
                status: 'processing',
            });

            mockCreateDocument.mockResolvedValue({
                id: 'contract-123',
                userId: 'test-user-123',
                score: 90,
                status: 'processed',
            });

            const response = await request(app)
                .put('/contracts/contract-123')
                .set('Authorization', 'Bearer valid-token')
                .send({
                    score: 90,
                    status: 'processed',
                })
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body.data).toHaveProperty('score', 90);
            expect(response.body.data).toHaveProperty('status', 'processed');
        });

        it('should return 404 when updating non-existent contract', async () => {
            mockGetDocumentById.mockResolvedValue(null);

            const response = await request(app)
                .put('/contracts/non-existent')
                .set('Authorization', 'Bearer valid-token')
                .send({ score: 90 })
                .expect(404);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('DELETE /contracts/:id', () => {
        it('should delete contract successfully', async () => {
            mockGetDocumentById.mockResolvedValue({
                id: 'contract-123',
                userId: 'test-user-123',
            });

            mockDeleteDocument.mockResolvedValue(undefined);

            const response = await request(app)
                .delete('/contracts/contract-123')
                .set('Authorization', 'Bearer valid-token')
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('message', 'Contract deleted successfully');
        });

        it('should return 404 when deleting non-existent contract', async () => {
            mockGetDocumentById.mockResolvedValue(null);

            const response = await request(app)
                .delete('/contracts/non-existent')
                .set('Authorization', 'Bearer valid-token')
                .expect(404);

            expect(response.body).toHaveProperty('error');
        });
    });
});
