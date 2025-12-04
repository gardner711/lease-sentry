import { Request, Response } from 'express';
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import { login, logout } from '../../src/controllers/auth.controller';
import { HttpError } from '../../src/middleware/errorHandler';

jest.mock('bcrypt');
jest.mock('../../src/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn() as jest.Mock;
    statusMock = jest.fn().mockReturnValue({ json: jsonMock }) as jest.Mock;
    mockRequest = {
      body: {},
      headers: {},
    };
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      mockRequest.body = {
        email: 'user@example.com',
        password: 'password123',
      };

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await login(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          expiresIn: '15m',
        })
      );
    });

    it('should throw error for invalid credentials', async () => {
      mockRequest.body = {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      };

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(login(mockRequest as Request, mockResponse as Response)).rejects.toThrow(HttpError);
    });
  });

  describe('logout', () => {
    it('should successfully logout user', async () => {
      mockRequest.body = {
        refreshToken: 'some-refresh-token',
      };

      await logout(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Logged out successfully',
        })
      );
    });
  });
});
