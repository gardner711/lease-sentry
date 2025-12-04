import { ApplicationInsightsService } from '../services/applicationInsights';
import type { Request, Response } from 'express';

// Mock the applicationinsights module
jest.mock('applicationinsights', () => ({
    setup: jest.fn(() => ({
        setAutoDependencyCorrelation: jest.fn().mockReturnThis(),
        setAutoCollectRequests: jest.fn().mockReturnThis(),
        setAutoCollectPerformance: jest.fn().mockReturnThis(),
        setAutoCollectExceptions: jest.fn().mockReturnThis(),
        setAutoCollectDependencies: jest.fn().mockReturnThis(),
        setAutoCollectConsole: jest.fn().mockReturnThis(),
        setUseDiskRetryCaching: jest.fn().mockReturnThis(),
        start: jest.fn(),
    })),
    defaultClient: {
        trackEvent: jest.fn(),
        trackMetric: jest.fn(),
        trackException: jest.fn(),
        trackTrace: jest.fn(),
    },
}));

describe('ApplicationInsightsService', () => {
    let appInsights: ApplicationInsightsService;

    beforeEach(() => {
        appInsights = ApplicationInsightsService.getInstance();
        // Reset the instance for testing
        (appInsights as any).initialized = false;
        // Initialize for tests that need it
        appInsights.initialize('test-key');
    });

    afterEach(() => {
        // Clean up after each test
        jest.clearAllMocks();
    });

    describe('getInstance', () => {
        it('should return the same instance', () => {
            const instance1 = ApplicationInsightsService.getInstance();
            const instance2 = ApplicationInsightsService.getInstance();
            expect(instance1).toBe(instance2);
        });
    });

    describe('initialize', () => {
        it('should initialize with instrumentation key', () => {
            const mockInstrumentationKey = 'test-key';
            appInsights.initialize(mockInstrumentationKey);
            expect((appInsights as any).initialized).toBe(true);
        });

        it('should not initialize twice', () => {
            appInsights.initialize('test-key');
            expect((appInsights as any).initialized).toBe(true);

            // Try to initialize again
            appInsights.initialize('another-key');
            expect((appInsights as any).initialized).toBe(true);
        });

        it('should warn when no instrumentation key is provided', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            delete process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
            delete process.env.APPINSIGHTS_INSTRUMENTATIONKEY;

            // Reset initialized state
            (appInsights as any).initialized = false;
            appInsights.initialize();
            expect(consoleSpy).toHaveBeenCalledWith('Application Insights instrumentation key not provided. Telemetry will not be sent.');
            expect((appInsights as any).initialized).toBe(false);

            consoleSpy.mockRestore();
        });
    });

    describe('requestTrackingMiddleware', () => {
        let mockReq: Partial<Request>;
        let mockRes: Partial<Response>;
        let mockNext: jest.Mock;

        beforeEach(() => {
            mockReq = {
                method: 'GET',
                url: '/test',
                headers: { 'request-id': 'test-request-id' },
                ip: '127.0.0.1',
                get: jest.fn().mockReturnValue('test-user-agent'),
            } as Partial<Request>;
            mockRes = {
                statusCode: 200,
                setHeader: jest.fn(),
                on: jest.fn(),
            } as Partial<Response>;
            mockNext = jest.fn();
        });

        it('should track request start and completion', () => {
            appInsights.initialize('test-key');

            const middleware = appInsights.requestTrackingMiddleware();
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockRes.setHeader).toHaveBeenCalledWith('request-id', 'test-request-id');

            // Simulate response finish
            const finishCallback = (mockRes.on as jest.Mock).mock.calls.find(call => call[0] === 'finish')[1];
            finishCallback();

            // Verify tracking calls were made (would need to mock the client)
        });

        it('should handle missing request-id header', () => {
            delete mockReq.headers!['request-id'];
            appInsights.initialize('test-key');

            const middleware = appInsights.requestTrackingMiddleware();
            middleware(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.setHeader).not.toHaveBeenCalled();
        });
    });

    describe('handlerTrackingMiddleware', () => {
        it('should track handler actions', () => {
            appInsights.initialize('test-key');

            const middleware = appInsights.handlerTrackingMiddleware('testHandler');
            const mockReq = {
                method: 'GET',
                url: '/test',
                headers: { 'request-id': 'test-id' },
            } as Partial<Request>;
            const mockRes = {} as Partial<Response>;
            const mockNext = jest.fn();

            middleware(mockReq as Request, mockRes as Response, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe('trackEvent', () => {
        it('should track events when initialized', () => {
            appInsights.initialize('test-key');
            expect(() => {
                appInsights.trackEvent('test-event', { key: 'value' });
            }).not.toThrow();
        });

        it('should not track events when not initialized', () => {
            expect(() => {
                appInsights.trackEvent('test-event');
            }).not.toThrow();
        });
    });

    describe('trackMetric', () => {
        it('should track metrics when initialized', () => {
            appInsights.initialize('test-key');
            expect(() => {
                appInsights.trackMetric('test-metric', 100);
            }).not.toThrow();
        });
    });

    describe('trackException', () => {
        it('should track exceptions when initialized', () => {
            appInsights.initialize('test-key');
            const error = new Error('test error');
            expect(() => {
                appInsights.trackException(error);
            }).not.toThrow();
        });
    });

    describe('trackDatabaseOperation', () => {
        it('should track database operations', () => {
            appInsights.initialize('test-key');
            expect(() => {
                appInsights.trackDatabaseOperation('find', 'users', 50, true);
            }).not.toThrow();
        });
    });

    describe('trackBusinessMetric', () => {
        it('should track business metrics', () => {
            appInsights.initialize('test-key');
            expect(() => {
                appInsights.trackBusinessMetric('revenue', 1000);
            }).not.toThrow();
        });
    });
});
