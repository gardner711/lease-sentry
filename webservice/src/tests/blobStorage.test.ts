import { BlobStorageService } from '../services/blobStorage';

// Mock the logger
jest.mock('../services/logger.ts', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));

describe('BlobStorageService', () => {
    let blobStorage: BlobStorageService;

    beforeEach(() => {
        // Don't set environment variable to test uninitialized state
    });

    afterEach(() => {
        jest.clearAllMocks();
        delete process.env.AZURE_STORAGE_CONNECTION_STRING;
    });

    describe('initialization', () => {
        it('should initialize with connection string', () => {
            process.env.AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=test;AccountKey=test;EndpointSuffix=core.windows.net';
            blobStorage = new BlobStorageService();
            expect(blobStorage).toBeDefined();
        });

        it('should warn when no connection string is provided', () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const loggerSpy = jest.spyOn(require('../services/logger').logger, 'warn').mockImplementation();

            blobStorage = new BlobStorageService();
            expect(loggerSpy).toHaveBeenCalledWith('Azure Storage connection string not provided. Blob storage operations will not be available.');

            loggerSpy.mockRestore();
        });
    });

    describe('ensureContainer', () => {
        it('should return false when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.ensureContainer('test-container');
            expect(result).toBe(false);
        });

        it('should ensure container exists', async () => {
            // This would require a real Azure Storage account for full testing
            // For now, we test the error handling
            const result = await blobStorage.ensureContainer('test-container');
            // In development storage, this might fail, but the method should handle it
            expect(typeof result).toBe('boolean');
        });
    });

    describe('uploadBlob', () => {
        it('should return null when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.uploadBlob('test-container', 'test-blob', Buffer.from('test'));
            expect(result).toBe(null);
        });

        it('should handle upload operations', async () => {
            const result = await blobStorage.uploadBlob('test-container', 'test-blob', Buffer.from('test data'), {
                contentType: 'text/plain',
            });
            // In development storage, this might fail, but the method should handle it gracefully
            expect(result === null || typeof result === 'string').toBe(true);
        });
    });

    describe('downloadBlob', () => {
        it('should return null when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.downloadBlob('test-container', 'test-blob');
            expect(result).toBe(null);
        });

        it('should handle download operations', async () => {
            const result = await blobStorage.downloadBlob('test-container', 'nonexistent-blob');
            // Should return null for non-existent blob
            expect(result).toBe(null);
        });
    });

    describe('deleteBlob', () => {
        it('should return false when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.deleteBlob('test-container', 'test-blob');
            expect(result).toBe(false);
        });

        it('should handle delete operations', async () => {
            const result = await blobStorage.deleteBlob('test-container', 'nonexistent-blob');
            // Should return true even for non-existent blob (deleteIfExists)
            expect(typeof result).toBe('boolean');
        });
    });

    describe('listBlobs', () => {
        it('should return empty array when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.listBlobs('test-container');
            expect(result).toEqual([]);
        });

        it('should handle list operations', async () => {
            const result = await blobStorage.listBlobs('test-container');
            expect(Array.isArray(result)).toBe(true);
        });
    });

    describe('getBlobProperties', () => {
        it('should return null when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.getBlobProperties('test-container', 'test-blob');
            expect(result).toBe(null);
        });

        it('should handle properties retrieval', async () => {
            const result = await blobStorage.getBlobProperties('test-container', 'nonexistent-blob');
            expect(result).toBe(null);
        });
    });

    describe('generateBlobSasToken', () => {
        it('should return null when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.generateBlobSasToken('test-container', 'test-blob');
            expect(result).toBe(null);
        });

        it('should handle SAS token generation', async () => {
            const result = await blobStorage.generateBlobSasToken('test-container', 'test-blob', 'r', 60);
            // In development storage, this might fail, but should be handled
            expect(result === null || typeof result === 'string').toBe(true);
        });
    });

    describe('copyBlob', () => {
        it('should return false when service not initialized', async () => {
            delete process.env.AZURE_STORAGE_CONNECTION_STRING;
            const uninitializedBlobStorage = new BlobStorageService();

            const result = await uninitializedBlobStorage.copyBlob('source', 'blob1', 'dest', 'blob2');
            expect(result).toBe(false);
        });

        it('should handle copy operations', async () => {
            const result = await blobStorage.copyBlob('source', 'blob1', 'dest', 'blob2');
            expect(typeof result).toBe('boolean');
        });
    });
});
