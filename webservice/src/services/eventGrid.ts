import { EventGridPublisherClient, AzureKeyCredential } from '@azure/eventgrid';
import { DefaultAzureCredential } from '@azure/identity';
import { logger } from './logger.js';

export interface EventGridConfig {
    endpoint: string;
    accessKey?: string;
    topicName: string;
    useManagedIdentity?: boolean;
    retryPolicy?: {
        maxDeliveryAttempts: number;
        eventTimeToLiveInMinutes: number;
    };
    deadLetterDestination?: {
        endpointType: 'StorageBlob';
        blobContainerUrl: string;
    };
}

export interface EventData {
    id: string;
    eventType: string;
    subject: string;
    eventTime: Date;
    dataVersion: string;
    data: any;
    correlationId?: string;
    traceparent?: string;
    tracestate?: string;
}

export interface EventTrace {
    eventId: string;
    correlationId: string;
    eventType: string;
    subject: string;
    status: 'published' | 'delivered' | 'failed' | 'deadlettered';
    timestamp: Date;
    topicName: string;
    endpoint?: string;
    errorMessage?: string;
    retryCount?: number;
}

export class EventGridService {
    private readonly client: EventGridPublisherClient<any>;

    private readonly config: EventGridConfig;

    private readonly eventTraces: Map<string, EventTrace[]> = new Map();

    constructor(config: EventGridConfig) {
        this.config = config;

        if (config.useManagedIdentity) {
            const credential = new DefaultAzureCredential();
            this.client = new EventGridPublisherClient(config.endpoint, 'CloudEvent', credential);
        } else if (config.accessKey) {
            const credential = new AzureKeyCredential(config.accessKey);
            this.client = new EventGridPublisherClient(config.endpoint, 'CloudEvent', credential);
        } else {
            throw new Error('Either accessKey or useManagedIdentity must be provided');
        }
    }

    async publishEvent(event: EventData): Promise<void> {
        try {
            // Add tracing headers
            const tracedEvent = this.addTracingHeaders(event);
            const correlationId = this.getCorrelationId(tracedEvent);

            await this.client.send([tracedEvent]);

            // Track successful publication
            this.trackEventDelivery(tracedEvent.id, correlationId, 'published');

            logger.info('Event published successfully', {
                eventId: tracedEvent.id,
                eventType: tracedEvent.eventType,
                subject: tracedEvent.subject,
                correlationId,
            });
        } catch (error) {
            const correlationId = this.getCorrelationId(event);

            // Track failed publication
            this.trackEventDelivery(
                event.id,
                correlationId,
                'failed',
                undefined,
                error instanceof Error ? error.message : 'Unknown error',
            );

            logger.error('Failed to publish event', {
                eventId: event.id,
                eventType: event.eventType,
                correlationId,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            throw error;
        }
    }

    async publishEvents(events: EventData[]): Promise<void> {
        try {
            await this.client.send(events);
            logger.info('Events published successfully', {
                eventCount: events.length,
                eventTypes: events.map(e => e.eventType),
            });
        } catch (error) {
            logger.error('Failed to publish events', {
                eventCount: events.length,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            throw error;
        }
    }

    validateEvent(event: EventData): boolean {
        // Basic validation
        if (!event.id || !event.eventType || !event.subject || !event.eventTime || !event.dataVersion) {
            return false;
        }

        // Validate event type format (should be namespaced)
        const eventTypeRegex = /^[A-Za-z][A-Za-z0-9]*(\.[A-Za-z][A-Za-z0-9]*)+$/;
        if (!eventTypeRegex.test(event.eventType)) {
            return false;
        }

        // Validate subject format (should start with /)
        if (!event.subject.startsWith('/')) {
            return false;
        }

        return true;
    }

    /**
     * Track event delivery status for distributed tracing
     */
    public trackEventDelivery(
        eventId: string,
        correlationId: string,
        status: 'published' | 'delivered' | 'failed' | 'deadlettered',
        endpoint?: string,
        errorMessage?: string,
        retryCount?: number,
    ): void {
        const trace = {
            eventId,
            correlationId,
            eventType: 'EventGrid.EventDelivery',
            subject: `/events/${eventId}`,
            status,
            timestamp: new Date(),
            topicName: this.config.topicName,
            endpoint,
            errorMessage,
            retryCount,
        };

        logger.info('Event delivery tracked', trace);

        // In a real implementation, you might store this in a database or send to a tracing system
        // For now, we'll just log it
    }

    /**
     * Get correlation ID from event or generate one
     */
    public getCorrelationId(event: EventData): string {
        return event.correlationId || event.id;
    }

    /**
     * Add distributed tracing headers to event
     */
    public addTracingHeaders(event: EventData): EventData {
        const correlationId = this.getCorrelationId(event);

        return {
            ...event,
            correlationId,
            // Add W3C trace context headers
            traceparent: event.traceparent || `00-${correlationId}-${Date.now().toString(16)}-01`,
            ...(event.tracestate && { tracestate: event.tracestate }),
        };
    }
}

// Environment-specific configurations
export const eventGridConfigs: Record<string, EventGridConfig> = {
    development: {
        endpoint: process.env.EVENTGRID_ENDPOINT_DEV ?? '',
        ...(process.env.EVENTGRID_KEY_DEV && { accessKey: process.env.EVENTGRID_KEY_DEV }),
        topicName: 'lease-sentry-dev',
        useManagedIdentity: false,
        retryPolicy: {
            maxDeliveryAttempts: 5,
            eventTimeToLiveInMinutes: 1440,
        },
        deadLetterDestination: {
            endpointType: 'StorageBlob',
            blobContainerUrl: process.env.DEADLETTER_BLOB_DEV ?? '',
        },
    },
    test: {
        endpoint: process.env.EVENTGRID_ENDPOINT_TEST ?? '',
        ...(process.env.EVENTGRID_KEY_TEST && { accessKey: process.env.EVENTGRID_KEY_TEST }),
        topicName: 'lease-sentry-test',
        useManagedIdentity: false,
        retryPolicy: {
            maxDeliveryAttempts: 3,
            eventTimeToLiveInMinutes: 60,
        },
        deadLetterDestination: {
            endpointType: 'StorageBlob',
            blobContainerUrl: process.env.DEADLETTER_BLOB_TEST ?? '',
        },
    },
    production: {
        endpoint: process.env.EVENTGRID_ENDPOINT_PROD ?? '',
        ...(process.env.EVENTGRID_KEY_PROD && { accessKey: process.env.EVENTGRID_KEY_PROD }),
        topicName: 'lease-sentry-prod',
        useManagedIdentity: true,
        retryPolicy: {
            maxDeliveryAttempts: 10,
            eventTimeToLiveInMinutes: 2880,
        },
        deadLetterDestination: {
            endpointType: 'StorageBlob',
            blobContainerUrl: process.env.DEADLETTER_BLOB_PROD ?? '',
        },
    },
};

// Factory function to create EventGrid service for current environment
export function createEventGridService(): EventGridService | null {
    const env = process.env.NODE_ENV ?? 'development';
    const config = eventGridConfigs[env];

    if (!config?.endpoint) {
        logger.warn(`Event Grid not configured for environment: ${env}`);
        return null;
    }

    try {
        return new EventGridService(config);
    } catch (error) {
        logger.error('Failed to create Event Grid service', {
            environment: env,
            error: error instanceof Error ? error.message : 'Unknown error',
        });
        return null;
    }
}

// Singleton instance
let eventGridService: EventGridService | null = null;

export function getEventGridService(): EventGridService | null {
    if (!eventGridService) {
        eventGridService = createEventGridService();
    }
    return eventGridService;
}
