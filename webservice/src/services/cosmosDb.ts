import { CosmosClient, Container, Database } from '@azure/cosmos';

import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

let client: CosmosClient | null = null;
let database: Database | null = null;

export const initializeCosmosDb = async (): Promise<void> => {
  try {
    client = new CosmosClient({
      endpoint: config.cosmosEndpoint,
      key: config.cosmosKey,
    });

    // Ensure database exists
    const { database: db } = await client.databases.createIfNotExists({
      id: config.cosmosDatabaseId,
    });
    database = db;

    logger.info('Cosmos DB client initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Cosmos DB', error as Error);
    throw error;
  }
};

export const getCosmosDatabase = (): Database => {
  if (!database) {
    throw new Error('Cosmos DB not initialized. Call initializeCosmosDb first.');
  }
  return database;
};

export const getCosmosContainer = async (containerId: string): Promise<Container> => {
  const db = getCosmosDatabase();
  const { container } = await db.containers.createIfNotExists({ id: containerId });
  return container;
};

export const getCosmosClient = (): CosmosClient => {
  if (!client) {
    throw new Error('Cosmos DB client not initialized. Call initializeCosmosDb first.');
  }
  return client;
};
