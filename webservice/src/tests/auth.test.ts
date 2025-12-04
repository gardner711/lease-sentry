import request from 'supertest';
import express from 'express';
import { authRouter } from '../routes/auth.js';

// Mock the auth middleware
jest.mock('../middleware/auth.ts', () => ({
    generateToken: jest.fn(() => 'mock-access-token'),
    generateRefreshToken: jest.fn(() => 'mock-refresh-token'),
    authenticateToken: jest.fn(),
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
app.use('/auth', authRouter);

describe('Auth Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /auth/login', () => {
        it('should login successfully with valid userId', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ userId: 'test-user-123' })
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body.data).toHaveProperty('accessToken', 'mock-access-token');
            expect(response.body.data).toHaveProperty('refreshToken', 'mock-refresh-token');
            expect(response.body.data).toHaveProperty('expiresIn', 900);
            expect(response.body.data).toHaveProperty('tokenType', 'Bearer');
            expect(response.body.data.user).toHaveProperty('userId', 'test-user-123');
        });

        it('should login successfully with userId and email', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ userId: 'test-user-123', email: 'test@example.com' })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.user).toHaveProperty('email', 'test@example.com');
        });

        it('should fail with missing userId', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('userId is required');
        });

        it('should fail with invalid email format', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ userId: 'test-user', email: 'invalid-email' })
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('Invalid email format');
        });

        it('should fail with empty userId', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({ userId: '' })
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('userId is required');
        });
    });

    describe('POST /auth/refresh', () => {
        it('should refresh token successfully with valid refresh token', async () => {
            // First login to get a refresh token
            await request(app)
                .post('/auth/login')
                .send({ userId: 'test-user-123' });

            const response = await request(app)
                .post('/auth/refresh')
                .send({ refreshToken: 'mock-refresh-token' })
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body.data).toHaveProperty('accessToken', 'mock-access-token');
            expect(response.body.data).toHaveProperty('expiresIn', 900);
        });

        it('should fail with missing refresh token', async () => {
            const response = await request(app)
                .post('/auth/refresh')
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('Refresh token is required');
        });

        it('should fail with invalid refresh token', async () => {
            const response = await request(app)
                .post('/auth/refresh')
                .send({ refreshToken: 'invalid-token' })
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('Invalid refresh token');
        });
    });

    describe('POST /auth/logout', () => {
        it('should logout successfully and invalidate refresh token', async () => {
            // First login to get a refresh token
            await request(app)
                .post('/auth/login')
                .send({ userId: 'test-user-123' });

            const response = await request(app)
                .post('/auth/logout')
                .send({ refreshToken: 'mock-refresh-token' })
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('message', 'Logged out successfully');
        });

        it('should fail logout with missing refresh token', async () => {
            const response = await request(app)
                .post('/auth/logout')
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('Refresh token is required');
        });
    });

    describe('GET /auth/verify', () => {
        it('should verify valid token', async () => {
            const response = await request(app)
                .get('/auth/verify')
                .set('Authorization', 'Bearer mock-access-token')
                .expect(200);

            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('user');
        });

        it('should fail verification without authorization header', async () => {
            const response = await request(app)
                .get('/auth/verify')
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('Access token is required');
        });

        it('should fail verification with invalid token', async () => {
            const response = await request(app)
                .get('/auth/verify')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401);

            expect(response.body).toHaveProperty('error');
            expect(response.body.error.message).toContain('Invalid access token');
        });
    });
});
