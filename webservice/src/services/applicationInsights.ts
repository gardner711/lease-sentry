import * as appInsights from 'applicationinsights';
import type { Request, Response, NextFunction } from 'express';

export class ApplicationInsightsService {
    private static instance: ApplicationInsightsService;

    private initialized = false;

    private constructor() { }

    public static getInstance(): ApplicationInsightsService {
        if (!ApplicationInsightsService.instance) {
            ApplicationInsightsService.instance = new ApplicationInsightsService();
        }
        return ApplicationInsightsService.instance;
    }

    public initialize(instrumentationKey?: string): void {
        if (this.initialized) {
            return;
        }

        const key = instrumentationKey ??
            process.env.APPLICATIONINSIGHTS_CONNECTION_STRING ??
            process.env.APPINSIGHTS_INSTRUMENTATIONKEY;

        if (!key) {
            console.warn('Application Insights instrumentation key not provided. Telemetry will not be sent.');
            return;
        }

        appInsights.setup(key)
            .setAutoDependencyCorrelation(true)
            .setAutoCollectRequests(true)
            .setAutoCollectPerformance(true, true)
            .setAutoCollectExceptions(true)
            .setAutoCollectDependencies(true)
            .setAutoCollectConsole(true)
            .setUseDiskRetryCaching(true)
            .start();

        // Verify the client was created successfully
        if (appInsights.defaultClient) {
            this.initialized = true;
            console.log('Application Insights initialized successfully');
        } else {
            console.warn('Application Insights setup failed - client not created');
        }
    }

    public getClient(): appInsights.TelemetryClient | null {
        return this.initialized ? appInsights.defaultClient : null;
    }

    public trackEvent(name: string, properties?: { [key: string]: string }, measurements?: { [key: string]: number }): void {
        const client = this.getClient();
        if (client) {
            const eventData: any = { name };
            if (properties) {
                eventData.properties = properties;
            }
            if (measurements) {
                eventData.measurements = measurements;
            }
            client.trackEvent(eventData);
        }
    }

    public trackMetric(name: string, value: number, properties?: { [key: string]: string }): void {
        const client = this.getClient();
        if (client) {
            const metricData: any = { name, value };
            if (properties) {
                metricData.properties = properties;
            }
            client.trackMetric(metricData);
        }
    }

    public trackException(error: Error, properties?: { [key: string]: string }): void {
        const client = this.getClient();
        if (client) {
            const exceptionData: any = { exception: error };
            if (properties) {
                exceptionData.properties = properties;
            }
            client.trackException(exceptionData);
        }
    }

    public trackTrace(message: string, severity: number, properties?: { [key: string]: string }): void {
        const client = this.getClient();
        if (client) {
            const traceData: any = { message, severity };
            if (properties) {
                traceData.properties = properties;
            }
            client.trackTrace(traceData);
        }
    }

    // Middleware for Express.js
    public requestTrackingMiddleware() {
        return (req: Request, res: Response, next: NextFunction) => {
            const startTime = Date.now();
            const requestId = req.headers['request-id'] as string || req.headers['x-request-id'] as string;

            // Add request ID to response headers
            if (requestId) {
                res.setHeader('request-id', requestId);
            }

            // Track request start
            this.trackEvent('RequestStarted', {
                method: req.method,
                url: req.url,
                userAgent: req.get('User-Agent') || '',
                requestId: requestId || '',
                ip: req.ip || 'unknown',
            });

            // Track response
            res.on('finish', () => {
                const duration = Date.now() - startTime;
                const statusCode = res.statusCode;

                this.trackEvent('RequestCompleted', {
                    method: req.method,
                    url: req.url,
                    statusCode: statusCode.toString(),
                    duration: duration.toString(),
                    requestId: requestId || '',
                    ip: req.ip || 'unknown',
                });

                // Track response time as metric
                this.trackMetric('RequestDuration', duration, {
                    method: req.method,
                    url: req.url,
                    statusCode: statusCode.toString(),
                });
            });

            next();
        };
    }

    // Middleware for tracking handler actions
    public handlerTrackingMiddleware(handlerName: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const requestId = req.headers['request-id'] as string || req.headers['x-request-id'] as string || 'unknown';

            this.trackEvent('HandlerAction', {
                handler: handlerName,
                method: req.method,
                url: req.url,
                requestId,
            });

            next();
        };
    }

    // Track database operations
    public trackDatabaseOperation(operation: string, collection: string, duration: number, success: boolean, properties?: { [key: string]: string }): void {
        this.trackEvent('DatabaseOperation', {
            operation,
            collection,
            success: success.toString(),
            duration: duration.toString(),
            ...properties,
        });

        this.trackMetric('DatabaseOperationDuration', duration, {
            operation,
            collection,
            success: success.toString(),
        });
    }

    // Track business metrics
    public trackBusinessMetric(name: string, value: number, properties?: { [key: string]: string }): void {
        this.trackMetric(`Business_${name}`, value, properties);
    }
}
