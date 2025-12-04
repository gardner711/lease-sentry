import request from 'supertest';
import express from 'express';
import eventGridRouter from '../routes/eventGrid.js';

const app = express();
app.use(express.json());
app.use('/eventgrid', eventGridRouter);

describe('Event Grid Routes', () => {
    describe('GET /eventgrid/health', () => {
        it('should return health status', async () => {
            const response = await request(app)
                .get('/eventgrid/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'healthy');
            expect(response.body).toHaveProperty('service', 'event-grid-webhook');
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    describe('POST /eventgrid/events', () => {
        it('should handle Event Grid subscription validation', async () => {
            const validationEvent = {
                id: 'test-validation-id',
                eventType: 'Microsoft.EventGrid.SubscriptionValidationEvent',
                subject: '/subscriptions/validation',
                eventTime: new Date().toISOString(),
                dataVersion: '1.0',
                data: {
                    validationCode: 'test-validation-code',
                },
            };

            const response = await request(app)
                .post('/eventgrid/events')
                .send([validationEvent])
                .expect(200);

            expect(response.body).toHaveProperty('validationResponse', 'test-validation-code');
        });

        it('should handle valid events', async () => {
            const events = [
                {
                    id: 'test-event-1',
                    eventType: 'LeaseSentry.Lease.Created',
                    subject: '/leases/12345',
                    eventTime: new Date().toISOString(),
                    dataVersion: '1.0',
                    data: {
                        leaseId: '12345',
                        propertyId: 'PROP-789',
                        tenantId: 'TENANT-456',
                    },
                },
            ];

            const response = await request(app)
                .post('/eventgrid/events')
                .send(events)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Events processed successfully');
        });

        it('should reject invalid request format', async () => {
            const response = await request(app)
                .post('/eventgrid/events')
                .send({ invalid: 'format' })
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Invalid request format');
        });
    });
});
