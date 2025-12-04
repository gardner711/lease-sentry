import type { Database, Container, FeedOptions, SqlQuerySpec, ItemDefinition } from '@azure/cosmos';
import { CosmosClient } from '@azure/cosmos';
import { logger } from './logger.js';
import { ApplicationInsightsService } from './applicationInsights.js';

let client: CosmosClient;
let database: Database;
const appInsights = ApplicationInsightsService.getInstance();

export interface CosmosConfig {
    endpoint: string;
    key: string;
    databaseName: string;
}

export const initializeCosmosDb = async (): Promise<void> => {
    try {
        const config: CosmosConfig = {
            endpoint: process.env.COSMOS_DB_ENDPOINT!,
            key: process.env.COSMOS_DB_KEY!,
            databaseName: process.env.COSMOS_DB_DATABASE!,
        };

        client = new CosmosClient({
            endpoint: config.endpoint,
            key: config.key,
        });

        database = client.database(config.databaseName);

        // Test connection by reading database
        await database.read();

        logger.info('Cosmos DB initialized successfully', {
            endpoint: config.endpoint,
            database: config.databaseName,
        });
    } catch (error) {
        logger.error('Failed to initialize Cosmos DB', { error });
        throw error;
    }
};

export const getContainer = (containerName: string): Container => {
    if (!database) {
        throw new Error('Cosmos DB not initialized. Call initializeCosmosDb first.');
    }
    return database.container(containerName);
};

export const createDocument = async <T extends ItemDefinition>(
    containerName: string,
    document: T,
    partitionKey?: string,
): Promise<T & { id: string }> => {
    const startTime = Date.now();
    try {
        const container = getContainer(containerName);
        const { resource } = await container.items.create(document);
        const duration = Date.now() - startTime;

        appInsights.trackDatabaseOperation('create', containerName, duration, true, {
            documentId: resource!.id,
            ...(partitionKey && { partitionKey }),
        });

        logger.debug('Document created', { containerName, id: resource!.id });
        return resource as T & { id: string };
    } catch (error) {
        const duration = Date.now() - startTime;
        appInsights.trackDatabaseOperation('create', containerName, duration, false, {
            error: error instanceof Error ? error.message : 'Unknown error',
        });

        logger.error('Failed to create document', { containerName, error });
        throw error;
    }
}; export const getDocumentById = async <T extends ItemDefinition>(
    containerName: string,
    id: string,
    partitionKey?: string,
): Promise<T | null> => {
    try {
        const container = getContainer(containerName);
        const { resource } = await container.item(id, partitionKey).read<T>();
        return resource || null;
    } catch (error) {
        logger.error('Failed to get document', { containerName, id, error });
        throw error;
    }
};

export const updateDocument = async <T>(
    containerName: string,
    id: string,
    document: Partial<T>,
    partitionKey?: string,
): Promise<T> => {
    try {
        const container = getContainer(containerName);
        const { resource } = await container.item(id, partitionKey).replace(document);
        logger.debug('Document updated', { containerName, id });
        return resource as T;
    } catch (error) {
        logger.error('Failed to update document', { containerName, id, error });
        throw error;
    }
};

export const deleteDocument = async (
    containerName: string,
    id: string,
    partitionKey?: string,
): Promise<void> => {
    try {
        const container = getContainer(containerName);
        await container.item(id, partitionKey).delete();
        logger.debug('Document deleted', { containerName, id });
    } catch (error) {
        logger.error('Failed to delete document', { containerName, id, error });
        throw error;
    }
};

export const queryDocuments = async <T>(
    containerName: string,
    query: string | SqlQuerySpec,
    options?: FeedOptions,
): Promise<T[]> => {
    try {
        const container = getContainer(containerName);
        const querySpec = typeof query === 'string' ? { query } : query;
        const { resources } = await container.items.query(querySpec, options).fetchAll();
        logger.debug('Documents queried', { containerName, query: querySpec.query, count: resources.length });
        return resources as T[];
    } catch (error) {
        logger.error('Failed to query documents', { containerName, query, error });
        throw error;
    }
};

export const upsertDocument = async <T extends ItemDefinition>(
    containerName: string,
    document: T & { id: string },
    partitionKey?: string, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<T> => {
    try {
        const container = getContainer(containerName);
        const { resource } = await container.items.upsert(document);
        logger.debug('Document upserted', { containerName, id: resource!.id });
        return resource as unknown as T;
    } catch (error) {
        logger.error('Failed to upsert document', { containerName, error });
        throw error;
    }
}; export const getDocumentCount = async (
    containerName: string,
    query?: string | SqlQuerySpec,
): Promise<number> => {
    try {
        const container = getContainer(containerName);
        const querySpec = query
            ? (typeof query === 'string' ? { query } : query)
            : { query: 'SELECT VALUE COUNT(1) FROM c' };

        const { resources } = await container.items.query(querySpec).fetchAll();
        return resources[0] as number;
    } catch (error) {
        logger.error('Failed to get document count', { containerName, error });
        throw error;
    }
};
