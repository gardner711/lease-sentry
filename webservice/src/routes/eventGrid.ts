import { Router } from 'express';
import { eventGridWebhook } from '../services/eventGridSubscriber.js';
import { logger } from '../services/logger.js';

const router = Router();

// Event Grid webhook endpoint
router.post('/events', eventGridWebhook());

// Health check for Event Grid subscription
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'event-grid-webhook',
        timestamp: new Date().toISOString(),
    });
});

// Register event handlers
import { getEventGridSubscriber } from '../services/eventGridSubscriber.js';

const subscriber = getEventGridSubscriber();

// Example event handlers - these would be registered based on business logic
subscriber.registerHandler('LeaseSentry.Lease.Created', async (event) => { // eslint-disable-line @typescript-eslint/require-await
    logger.info('Lease created event received', {
        leaseId: event.data.leaseId,
        subject: event.subject,
    });
    // Business logic for lease creation events
});

subscriber.registerHandler('LeaseSentry.Lease.Updated', async (event) => { // eslint-disable-line @typescript-eslint/require-await
    logger.info('Lease updated event received', {
        leaseId: event.data.leaseId,
        subject: event.subject,
    });
    // Business logic for lease update events
});

subscriber.registerHandler('LeaseSentry.Contract.Signed', async (event) => { // eslint-disable-line @typescript-eslint/require-await
    logger.info('Contract signed event received', {
        contractId: event.data.contractId,
        subject: event.subject,
    });
    // Business logic for contract signing events
});

export default router;
