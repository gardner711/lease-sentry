import { SearchClient, SearchIndexClient, AzureKeyCredential } from '@azure/search-documents';
import { logger } from './logger';

export interface SearchConfig {
    endpoint?: string;
    apiKey?: string;
    indexName: string;
}

export interface SearchDocument {
    id: string;
    [key: string]: any;
}

export class AzureSearchService {
    private searchClient: SearchClient<SearchDocument> | null = null;

    private indexClient: SearchIndexClient | null = null;

    private readonly indexName: string;

    constructor(config?: SearchConfig) {
        this.indexName = config?.indexName || 'default-index';
        this.initialize(config);
    }

    private initialize(config?: SearchConfig): void {
        try {
            const endpoint = config?.endpoint || process.env.AZURE_SEARCH_ENDPOINT;
            const apiKey = config?.apiKey || process.env.AZURE_SEARCH_API_KEY;

            if (!endpoint || !apiKey) {
                logger.warn('Azure Search endpoint or API key not provided. Search operations will not be available.');
                return;
            }

            const credential = new AzureKeyCredential(apiKey);
            this.searchClient = new SearchClient<SearchDocument>(endpoint, this.indexName, credential);
            this.indexClient = new SearchIndexClient(endpoint, credential);

            logger.info(`Azure AI Search service initialized for index '${this.indexName}'`);
        } catch (error) {
            logger.error('Failed to initialize Azure AI Search service:', error);
            throw error;
        }
    }

    /**
     * Ensure search index exists
     */
    public async ensureIndex(fields: any[]): Promise<boolean> {
        if (!this.indexClient) {
            logger.error('Search index client not initialized');
            return false;
        }

        try {
            const indexDefinition = {
                name: this.indexName,
                fields: [
                    {
                        name: 'id',
                        type: 'Edm.String',
                        key: true,
                        searchable: false,
                        filterable: true,
                        sortable: true,
                    },
                    ...fields,
                ],
            };

            await this.indexClient.createIndex(indexDefinition);
            logger.info(`Search index '${this.indexName}' created or already exists`);
            return true;
        } catch (error: any) {
            if (error.statusCode === 409) {
                // Index already exists
                logger.info(`Search index '${this.indexName}' already exists`);
                return true;
            }
            logger.error(`Failed to create search index '${this.indexName}':`, error);
            return false;
        }
    }

    /**
     * Upload documents to the search index
     */
    public async uploadDocuments(documents: SearchDocument[]): Promise<boolean> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return false;
        }

        try {
            const result = await this.searchClient.uploadDocuments(documents);
            const succeeded = result.results.filter(r => r.succeeded).length;
            const failed = result.results.filter(r => !r.succeeded).length;

            logger.info(`Uploaded ${succeeded} documents to search index '${this.indexName}', ${failed} failed`);
            return failed === 0;
        } catch (error) {
            logger.error(`Failed to upload documents to search index '${this.indexName}':`, error);
            return false;
        }
    }

    /**
     * Merge or upload documents (upsert)
     */
    public async mergeOrUploadDocuments(documents: SearchDocument[]): Promise<boolean> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return false;
        }

        try {
            const result = await this.searchClient.mergeOrUploadDocuments(documents);
            const succeeded = result.results.filter(r => r.succeeded).length;
            const failed = result.results.filter(r => !r.succeeded).length;

            logger.info(`Merged/uploaded ${succeeded} documents to search index '${this.indexName}', ${failed} failed`);
            return failed === 0;
        } catch (error) {
            logger.error(`Failed to merge/upload documents to search index '${this.indexName}':`, error);
            return false;
        }
    }

    /**
     * Delete documents from the search index
     */
    public async deleteDocuments(documentIds: string[]): Promise<boolean> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return false;
        }

        try {
            const documents = documentIds.map(id => ({ id }));
            const result = await this.searchClient.deleteDocuments(documents);
            const succeeded = result.results.filter(r => r.succeeded).length;
            const failed = result.results.filter(r => !r.succeeded).length;

            logger.info(`Deleted ${succeeded} documents from search index '${this.indexName}', ${failed} failed`);
            return failed === 0;
        } catch (error) {
            logger.error(`Failed to delete documents from search index '${this.indexName}':`, error);
            return false;
        }
    }

    /**
     * Search documents
     */
    public async search(
        searchText: string,
        options?: {
            filter?: string;
            orderBy?: string;
            select?: string[];
            top?: number;
            skip?: number;
            facets?: string[];
            searchMode?: 'any' | 'all';
            scoringProfile?: string;
        },
    ): Promise<{ results: SearchDocument[]; count: number; facets?: any }> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return { results: [], count: 0 };
        }

        try {
            const searchOptions: any = {
                filter: options?.filter,
                orderBy: options?.orderBy,
                select: options?.select,
                top: options?.top || 50,
                skip: options?.skip || 0,
                facets: options?.facets,
                queryType: 'simple',
                searchMode: options?.searchMode || 'any',
                includeTotalCount: true,
            };

            if (options?.scoringProfile) {
                searchOptions.scoringProfile = options.scoringProfile;
            }

            const searchResponse = await this.searchClient.search(searchText, searchOptions);

            const results: SearchDocument[] = [];
            for await (const result of searchResponse.results) {
                results.push(result.document);
            }

            const count = searchResponse.count || 0;

            logger.info(`Search completed: ${count} results for query '${searchText}'`);
            return {
                results,
                count,
                facets: (searchResponse as any).facets,
            };
        } catch (error) {
            logger.error(`Failed to search documents in index '${this.indexName}':`, error);
            return { results: [], count: 0 };
        }
    }

    /**
     * Get document by ID
     */
    public async getDocument(documentId: string, selectedFields?: string[]): Promise<SearchDocument | null> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return null;
        }

        try {
            const getOptions: any = {};
            if (selectedFields) {
                getOptions.selectedFields = selectedFields;
            }

            const result = await this.searchClient.getDocument(documentId, getOptions);

            logger.info(`Retrieved document '${documentId}' from search index '${this.indexName}'`);
            return result;
        } catch (error: any) {
            if (error.statusCode === 404) {
                logger.info(`Document '${documentId}' not found in search index '${this.indexName}'`);
                return null;
            }
            logger.error(`Failed to get document '${documentId}' from search index '${this.indexName}':`, error);
            return null;
        }
    }

    /**
     * Suggest search terms
     */
    public async suggest(
        searchText: string,
        suggesterName: string,
        options?: {
            filter?: string;
            top?: number;
            select?: string[];
            searchMode?: 'analyzingInfixMatching';
        },
    ): Promise<string[]> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return [];
        }

        try {
            const suggestOptions: any = {
                filter: options?.filter,
                top: options?.top || 5,
                select: options?.select,
                searchMode: options?.searchMode,
            };

            const suggestResponse = await this.searchClient.suggest(searchText, suggesterName, suggestOptions);

            const suggestions = suggestResponse.results.map(r => r.text);
            logger.info(`Generated ${suggestions.length} suggestions for '${searchText}'`);
            return suggestions;
        } catch (error) {
            logger.error(`Failed to generate suggestions for '${searchText}':`, error);
            return [];
        }
    }

    /**
     * Get search index statistics
     */
    public async getIndexStatistics(): Promise<any | null> {
        if (!this.indexClient) {
            logger.error('Search index client not initialized');
            return null;
        }

        try {
            const stats = await this.indexClient.getIndexStatistics(this.indexName);
            logger.info(`Retrieved statistics for search index '${this.indexName}'`);
            return stats;
        } catch (error) {
            logger.error(`Failed to get statistics for search index '${this.indexName}':`, error);
            return null;
        }
    }

    /**
     * Delete search index
     */
    public async deleteIndex(): Promise<boolean> {
        if (!this.indexClient) {
            logger.error('Search index client not initialized');
            return false;
        }

        try {
            await this.indexClient.deleteIndex(this.indexName);
            logger.info(`Deleted search index '${this.indexName}'`);
            return true;
        } catch (error) {
            logger.error(`Failed to delete search index '${this.indexName}':`, error);
            return false;
        }
    }

    /**
     * Vector search (if supported)
     */
    public async vectorSearch(
        vector: number[],
        vectorField: string,
        options?: {
            filter?: string;
            select?: string[];
            top?: number;
        },
    ): Promise<{ results: SearchDocument[]; count: number }> {
        if (!this.searchClient) {
            logger.error('Search client not initialized');
            return { results: [], count: 0 };
        }

        try {
            const searchOptions: any = {
                filter: options?.filter,
                select: options?.select,
                top: options?.top || 10,
                vectors: [{
                    value: vector,
                    fields: vectorField,
                    k: options?.top || 10,
                }],
                queryType: 'semantic',
            };

            const searchResponse = await this.searchClient.search('*', searchOptions);

            const results: SearchDocument[] = [];
            for await (const result of searchResponse.results) {
                results.push(result.document);
            }

            const count = searchResponse.count || 0;

            logger.info(`Vector search completed: ${count} results`);
            return { results, count };
        } catch (error) {
            logger.error('Failed to perform vector search:', error);
            return { results: [], count: 0 };
        }
    }
}

// Export singleton instance
export const azureSearchService = new AzureSearchService();
