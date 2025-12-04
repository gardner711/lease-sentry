import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

let blobServiceClient: BlobServiceClient | null = null;
let containerClient: ContainerClient | null = null;

export const initializeBlobStorage = async (): Promise<void> => {
  try {
    blobServiceClient = BlobServiceClient.fromConnectionString(config.azureStorageConnectionString);

    containerClient = blobServiceClient.getContainerClient(config.azureStorageContainerName);
    await containerClient.createIfNotExists();

    logger.info('Blob Storage client initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Blob Storage', error as Error);
    throw error;
  }
};

export const getBlobServiceClient = (): BlobServiceClient => {
  if (!blobServiceClient) {
    throw new Error('Blob Service Client not initialized. Call initializeBlobStorage first.');
  }
  return blobServiceClient;
};

export const getContainerClient = (): ContainerClient => {
  if (!containerClient) {
    throw new Error('Container Client not initialized. Call initializeBlobStorage first.');
  }
  return containerClient;
};
