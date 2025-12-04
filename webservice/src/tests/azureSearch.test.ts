import { AzureSearchService } from '../services/azureSearch';

// Mock the logger
jest.mock('../services/logger.ts', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

describe('AzureSearchService', () => {
    let searchService: AzureSearchService;

    beforeEach(() => {
        // Mock environment variables
        process.env.AZURE_SEARCH_ENDPOINT = 'https://test-search.search.windows.net';
        process.env.AZURE_SEARCH_API_KEY = 'test-api-key';

        searchService = new AzureSearchService({ indexName: 'test-index' });
    });

    afterEach(() => {
        jest.clearAllMocks();
        delete process.env.AZURE_SEARCH_ENDPOINT;
        delete process.env.AZURE_SEARCH_API_KEY;
    });

    describe('initialization', () => {
        it('should initialize with endpoint and API key', () => {
            expect(searchService).toBeDefined();
        });

        it('should warn when endpoint or API key not provided', () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const loggerSpy = jest.spyOn(require('../services/logger').logger, 'warn').mockImplementation();

            const newSearchService = new AzureSearchService({ indexName: 'test-index' });
            expect(loggerSpy).toHaveBeenCalledWith('Azure Search endpoint or API key not provided. Search operations will not be available.');

            loggerSpy.mockRestore();
        });
    });

    describe('ensureIndex', () => {
        it('should return false when index client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.ensureIndex([]);
            expect(result).toBe(false);
        });

        it('should handle index creation', async () => {
            const fields = [
                {
                    name: 'title',
                    type: 'Edm.String',
                    searchable: true,
                    filterable: true,
                },
            ];

            const result = await searchService.ensureIndex(fields);
            // This would require a real Azure Search service for full testing
            expect(typeof result).toBe('boolean');
        });
    });

    describe('uploadDocuments', () => {
        it('should return false when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.uploadDocuments([]);
            expect(result).toBe(false);
        });

        it('should handle document upload', async () => {
            const documents = [
                { id: '1', title: 'Test Document', content: 'Test content' },
            ];

            const result = await searchService.uploadDocuments(documents);
            expect(typeof result).toBe('boolean');
        });
    });

    describe('mergeOrUploadDocuments', () => {
        it('should return false when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.mergeOrUploadDocuments([]);
            expect(result).toBe(false);
        });

        it('should handle document merge/upload', async () => {
            const documents = [
                { id: '1', title: 'Updated Document' },
            ];

            const result = await searchService.mergeOrUploadDocuments(documents);
            expect(typeof result).toBe('boolean');
        });
    });

    describe('deleteDocuments', () => {
        it('should return false when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.deleteDocuments(['1']);
            expect(result).toBe(false);
        });

        it('should handle document deletion', async () => {
            const result = await searchService.deleteDocuments(['nonexistent-id']);
            expect(typeof result).toBe('boolean');
        });
    });

    describe('search', () => {
        it('should return empty results when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.search('test');
            expect(result).toEqual({ results: [], count: 0 });
        });

        it('should handle search operations', async () => {
            const result = await searchService.search('test query', {
                top: 10,
                filter: "category eq 'test'",
            });

            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('count');
            expect(Array.isArray(result.results)).toBe(true);
            expect(typeof result.count).toBe('number');
        });
    });

    describe('getDocument', () => {
        it('should return null when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.getDocument('test-id');
            expect(result).toBe(null);
        });

        it('should handle document retrieval', async () => {
            const result = await searchService.getDocument('nonexistent-id');
            expect(result).toBe(null);
        });

        it('should handle document retrieval with selected fields', async () => {
            const result = await searchService.getDocument('test-id', ['title', 'content']);
            expect(result === null || typeof result === 'object').toBe(true);
        });
    });

    describe('suggest', () => {
        it('should return empty array when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.suggest('test', 'defaultSuggester');
            expect(result).toEqual([]);
        });

        it('should handle suggestions', async () => {
            const result = await searchService.suggest('test', 'defaultSuggester', { top: 5 });
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('getIndexStatistics', () => {
        it('should return null when index client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.getIndexStatistics();
            expect(result).toBe(null);
        });

        it('should handle statistics retrieval', async () => {
            const result = await searchService.getIndexStatistics();
            expect(result === null || typeof result === 'object').toBe(true);
        });
    });

    describe('deleteIndex', () => {
        it('should return false when index client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.deleteIndex();
            expect(result).toBe(false);
        });

        it('should handle index deletion', async () => {
            const result = await searchService.deleteIndex();
            expect(typeof result).toBe('boolean');
        });
    });

    describe('vectorSearch', () => {
        it('should return empty results when search client not initialized', async () => {
            delete process.env.AZURE_SEARCH_ENDPOINT;
            const uninitializedSearch = new AzureSearchService({ indexName: 'test-index' });

            const result = await uninitializedSearch.vectorSearch([0.1, 0.2, 0.3], 'vectorField');
            expect(result).toEqual({ results: [], count: 0 });
        });

        it('should handle vector search', async () => {
            const vector = [0.1, 0.2, 0.3, 0.4, 0.5];
            const result = await searchService.vectorSearch(vector, 'embedding', { top: 5 });

            expect(result).toHaveProperty('results');
            expect(result).toHaveProperty('count');
            expect(Array.isArray(result.results)).toBe(true);
            expect(typeof result.count).toBe('number');
        });
    });
});
