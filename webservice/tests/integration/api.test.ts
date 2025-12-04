import supertest from 'supertest';
import createApp from '../../src/app';

const app = createApp();
const request = supertest(app);

describe('API Integration Tests', () => {
  describe('Health Endpoints', () => {
    it('GET /health/live should return 200', async () => {
      const response = await request.get('/health/live');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });

    it('GET /health/startup should return 200', async () => {
      const response = await request.get('/health/startup');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'started');
    });
  });

  describe('Authentication Endpoints', () => {
    it('POST /auth/login should return 401 for invalid credentials', async () => {
      const response = await request.post('/auth/login').send({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body).toHaveProperty('message');
    });

    it('POST /auth/login should validate email format', async () => {
      const response = await request.post('/auth/login').send({
        email: 'invalid-email',
        password: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('POST /auth/login should require password minimum length', async () => {
      const response = await request.post('/auth/login').send({
        email: 'user@example.com',
        password: '12345',
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Swagger Documentation', () => {
    it('GET /api-docs/openapi.json should return OpenAPI spec', async () => {
      const response = await request.get('/api-docs/openapi.json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('openapi', '3.0.0');
      expect(response.body).toHaveProperty('info');
      expect(response.body).toHaveProperty('paths');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request.get('/non-existent-route');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'NotFound');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('statusCode', 404);
    });
  });

  describe('Security Headers', () => {
    it('should include security headers', async () => {
      const response = await request.get('/health/live');

      expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
      expect(response.headers).toHaveProperty('x-frame-options');
    });
  });
});
