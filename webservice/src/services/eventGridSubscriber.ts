import type { Request, Response } from 'express';
import { logger } from './logger.js';

export interface EventGridEvent {
    id: string;
    eventType: string;
    subject: string;
    eventTime: string;
    dataVersion: string;
    data: any;
    topic?: string;
    metadataVersion?: string;
}

export interface EventSubscriptionValidationRequest {
    validationCode: string;
}

export interface EventSubscriptionValidationResponse {
    validationResponse: string;
}

export class EventGridSubscriber {
    private readonly eventHandlers: Map<string, (event: EventGridEvent) => Promise<void>> = new Map();

    registerHandler(eventType: string, handler: (event: EventGridEvent) => Promise<void>): void {
        this.eventHandlers.set(eventType, handler);
        logger.info('Event handler registered', { eventType });
    }

    unregisterHandler(eventType: string): void {
        this.eventHandlers.delete(eventType);
        logger.info('Event handler unregistered', { eventType });
    }

    async handleEvents(req: Request, res: Response): Promise<void> {
        try {
            const events: EventGridEvent[] = req.body;

            if (!Array.isArray(events)) {
                logger.warn('Invalid Event Grid request: expected array of events');
                res.status(400).json({ error: 'Invalid request format' });
                return;
            }

            // Handle Event Grid subscription validation
            if (events.length === 1 && events[0]?.eventType === 'Microsoft.EventGrid.SubscriptionValidationEvent') {
                const validationEvent = events[0] as any;
                const validationResponse: EventSubscriptionValidationResponse = {
                    validationResponse: validationEvent.data.validationCode,
                };
                res.status(200).json(validationResponse);
                logger.info('Event Grid subscription validated');
                return;
            }

            // Process each event
            const results = await Promise.allSettled(
                events.map(event => this.processEvent(event)),
            );

            // Check for failures
            const failures = results.filter(result => result.status === 'rejected');
            if (failures.length > 0) {
                logger.error('Some events failed to process', {
                    totalEvents: events.length,
                    failedEvents: failures.length,
                });
                res.status(500).json({ error: 'Some events failed to process' });
                return;
            }

            res.status(200).json({ message: 'Events processed successfully' });
        } catch (error) {
            logger.error('Error handling Event Grid events', {
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    private async processEvent(event: EventGridEvent): Promise<void> {
        logger.info('Processing Event Grid event', {
            eventId: event.id,
            eventType: event.eventType,
            subject: event.subject,
        });

        const handler = this.eventHandlers.get(event.eventType);
        if (!handler) {
            logger.warn('No handler registered for event type', {
                eventType: event.eventType,
                eventId: event.id,
            });
            return;
        }

        try {
            await handler(event);
            logger.info('Event processed successfully', {
                eventId: event.id,
                eventType: event.eventType,
            });
        } catch (error) {
            logger.error('Event handler failed', {
                eventId: event.id,
                eventType: event.eventType,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            throw error;
        }
    }

    validateEvent(event: EventGridEvent): boolean {
        // Basic validation
        if (!event.id || !event.eventType || !event.subject || !event.eventTime || !event.dataVersion) {
            return false;
        }

        // Validate event type format
        const eventTypeRegex = /^[A-Za-z][A-Za-z0-9]*(\.[A-Za-z][A-Za-z0-9]*)+$/;
        if (!eventTypeRegex.test(event.eventType)) {
            return false;
        }

        // Validate subject format
        if (!event.subject.startsWith('/')) {
            return false;
        }

        return true;
    }
}

// Singleton instance
let eventGridSubscriber: EventGridSubscriber | null = null;

export function getEventGridSubscriber(): EventGridSubscriber {
    if (!eventGridSubscriber) {
        eventGridSubscriber = new EventGridSubscriber();
    }
    return eventGridSubscriber;
}

// Express middleware for Event Grid webhook
export function eventGridWebhook() {
    const subscriber = getEventGridSubscriber();
    return (req: Request, res: Response) => subscriber.handleEvents(req, res);
}
