import { Request, Response } from 'express';
import { jest } from '@jest/globals';
import { healthLiveness, healthStartup } from '../../src/controllers/health.controller';

describe('Health Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn() as jest.Mock;
    statusMock = jest.fn().mockReturnValue({ json: jsonMock }) as jest.Mock;
    mockRequest = {};
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('healthLiveness', () => {
    it('should return 200 with healthy status', () => {
      healthLiveness(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'healthy',
          timestamp: expect.any(String),
          uptime: expect.any(Number),
        })
      );
    });
  });

  describe('healthStartup', () => {
    it('should return 200 with started status', () => {
      healthStartup(mockRequest as Request, mockResponse as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'started',
          timestamp: expect.any(String),
        })
      );
    });
  });
});
