import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import { authenticateJWT } from '../../src/middleware/auth';
import { HttpError } from '../../src/middleware/errorHandler';

jest.mock('../../src/config', () => ({
  config: {
    jwtSecret: 'test-secret',
    jwtRefreshSecret: 'test-refresh-secret',
    jwtExpiresIn: '15m',
    jwtRefreshExpiresIn: '7d',
  },
}));

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextMock: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {};
    nextMock = jest.fn();
  });

  describe('authenticateJWT', () => {
    it('should throw error if no authorization header', () => {
      expect(() => {
        authenticateJWT(mockRequest as Request, mockResponse as Response, nextMock);
      }).toThrow(HttpError);
    });

    it('should throw error if invalid authorization format', () => {
      mockRequest.headers = {
        authorization: 'InvalidFormat',
      };

      expect(() => {
        authenticateJWT(mockRequest as Request, mockResponse as Response, nextMock);
      }).toThrow(HttpError);
    });

    it('should throw error if token is invalid', () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };

      expect(() => {
        authenticateJWT(mockRequest as Request, mockResponse as Response, nextMock);
      }).toThrow(HttpError);
    });
  });
});
