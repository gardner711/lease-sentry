import { SearchClient, AzureKeyCredential } from '@azure/search-documents';

import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

let searchClient: SearchClient<Record<string, unknown>> | null = null;

export const initializeAISearch = (): void => {
  try {
    searchClient = new SearchClient(
      config.azureSearchEndpoint,
      config.azureSearchIndexName,
      new AzureKeyCredential(config.azureSearchApiKey)
    );

    logger.info('AI Search client initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize AI Search', error as Error);
    throw error;
  }
};

export const getSearchClient = (): SearchClient<Record<string, unknown>> => {
  if (!searchClient) {
    throw new Error('Search client not initialized. Call initializeAISearch first.');
  }
  return searchClient;
};
