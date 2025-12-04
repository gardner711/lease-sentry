import { EventGridPublisherClient, AzureKeyCredential } from '@azure/eventgrid';

import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: EventGridPublisherClient<any> | null = null;

export const initializeEventGrid = (): void => {
  try {
    client = new EventGridPublisherClient(
      config.eventGridTopicEndpoint,
      'EventGrid',
      new AzureKeyCredential(config.eventGridAccessKey)
    );

    logger.info('Event Grid client initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Event Grid', error as Error);
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEventGridClient = (): EventGridPublisherClient<any> => {
  if (!client) {
    throw new Error('Event Grid client not initialized. Call initializeEventGrid first.');
  }
  return client;
};

export const publishEvent = async (
  eventType: string,
  subject: string,
  data: Record<string, unknown>
): Promise<void> => {
  const eventGridClient = getEventGridClient();

  const events = [
    {
      eventType,
      subject,
      dataVersion: '1.0',
      data,
    },
  ];

  try {
    await eventGridClient.send(events);
    logger.info(`Event published: ${eventType}`, { subject });
  } catch (error) {
    logger.error('Failed to publish event', error as Error, { eventType, subject });
    throw error;
  }
};
