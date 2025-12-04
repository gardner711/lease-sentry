import type { ContainerClient} from '@azure/storage-blob';
import { BlobServiceClient } from '@azure/storage-blob';
import { logger } from './logger';

export interface BlobStorageConfig {
    connectionString?: string;
    accountName?: string;
    accountKey?: string;
    containerName: string;
}

export class BlobStorageService {
    private blobServiceClient: BlobServiceClient | null = null;

    private readonly containers: Map<string, ContainerClient> = new Map();

    constructor(config?: BlobStorageConfig) {
        this.initialize(config);
    }

    private initialize(config?: BlobStorageConfig): void {
        try {
            const connectionString = config?.connectionString ||
                process.env.AZURE_STORAGE_CONNECTION_STRING;

            if (!connectionString) {
                logger.warn('Azure Storage connection string not provided. Blob storage operations will not be available.');
                return;
            }

            this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
            logger.info('Azure Blob Storage service initialized successfully');
        } catch (error) {
            logger.error('Failed to initialize Azure Blob Storage service:', error);
            throw error;
        }
    }

    /**
     * Get or create a container client
     */
    private getContainerClient(containerName: string): ContainerClient | null {
        if (!this.blobServiceClient) {
            logger.error('Blob storage service not initialized');
            return null;
        }

        if (!this.containers.has(containerName)) {
            const containerClient = this.blobServiceClient.getContainerClient(containerName);
            this.containers.set(containerName, containerClient);
        }

        return this.containers.get(containerName)!;
    }

    /**
     * Ensure a container exists
     */
    public async ensureContainer(containerName: string): Promise<boolean> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return false;
        }

        try {
            await containerClient.createIfNotExists({
                access: 'blob', // Public read access for blobs
            });
            logger.info(`Container '${containerName}' ensured`);
            return true;
        } catch (error) {
            logger.error(`Failed to create container '${containerName}':`, error);
            return false;
        }
    }

    /**
     * Upload a blob from buffer
     */
    public async uploadBlob(
        containerName: string,
        blobName: string,
        data: Buffer | string,
        options?: {
            contentType?: string;
            metadata?: { [key: string]: string };
            tags?: { [key: string]: string };
        },
    ): Promise<string | null> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return null;
        }

        try {
            // Ensure container exists
            await this.ensureContainer(containerName);

            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            const uploadOptions: any = {
                blobHTTPHeaders: {
                    blobContentType: options?.contentType || 'application/octet-stream',
                },
                metadata: options?.metadata,
                tags: options?.tags,
            };

            await blockBlobClient.upload(data, data.length, uploadOptions);

            const blobUrl = blockBlobClient.url;
            logger.info(`Blob '${blobName}' uploaded to container '${containerName}'`);
            return blobUrl;
        } catch (error) {
            logger.error(`Failed to upload blob '${blobName}' to container '${containerName}':`, error);
            return null;
        }
    }

    /**
     * Download a blob
     */
    public async downloadBlob(
        containerName: string,
        blobName: string,
    ): Promise<{ data: Buffer; properties: any } | null> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return null;
        }

        try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            const downloadResponse = await blockBlobClient.download();
            const data = await this.streamToBuffer(downloadResponse.readableStreamBody!);
            const properties = downloadResponse;

            logger.info(`Blob '${blobName}' downloaded from container '${containerName}'`);
            return { data, properties };
        } catch (error) {
            logger.error(`Failed to download blob '${blobName}' from container '${containerName}':`, error);
            return null;
        }
    }

    /**
     * Delete a blob
     */
    public async deleteBlob(containerName: string, blobName: string): Promise<boolean> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return false;
        }

        try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.deleteIfExists();

            logger.info(`Blob '${blobName}' deleted from container '${containerName}'`);
            return true;
        } catch (error) {
            logger.error(`Failed to delete blob '${blobName}' from container '${containerName}':`, error);
            return false;
        }
    }

    /**
     * List blobs in a container
     */
    public async listBlobs(
        containerName: string,
        options?: {
            prefix?: string;
            maxResults?: number;
        },
    ): Promise<string[]> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return [];
        }

        try {
            const blobs: string[] = [];
            const listOptions: any = {};
            if (options?.prefix) {
                listOptions.prefix = options.prefix;
            }

            const iter = containerClient.listBlobsFlat(listOptions);

            for await (const blob of iter) {
                blobs.push(blob.name);
            }

            logger.info(`Listed ${blobs.length} blobs in container '${containerName}'`);
            return blobs;
        } catch (error) {
            logger.error(`Failed to list blobs in container '${containerName}':`, error);
            return [];
        }
    }

    /**
     * Get blob properties
     */
    public async getBlobProperties(
        containerName: string,
        blobName: string,
    ): Promise<any | null> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return null;
        }

        try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            const properties = await blockBlobClient.getProperties();

            logger.info(`Retrieved properties for blob '${blobName}' in container '${containerName}'`);
            return properties;
        } catch (error) {
            logger.error(`Failed to get properties for blob '${blobName}' in container '${containerName}':`, error);
            return null;
        }
    }

    /**
     * Generate SAS token for blob access
     */
    public async generateBlobSasToken(
        containerName: string,
        blobName: string,
        permissions: string = 'r', // read
        expiresInMinutes: number = 60,
    ): Promise<string | null> {
        const containerClient = this.getContainerClient(containerName);
        if (!containerClient) {
            return null;
        }

        try {
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            const expiresOn = new Date();
            expiresOn.setMinutes(expiresOn.getMinutes() + expiresInMinutes);

            const sasOptions: any = {
                permissions: {
                    read: permissions.includes('r'),
                    write: permissions.includes('w'),
                    delete: permissions.includes('d'),
                    add: permissions.includes('a'),
                    create: permissions.includes('c'),
                    list: permissions.includes('l'),
                    deleteVersion: false,
                    permanentDelete: false,
                    move: false,
                    execute: false,
                    setImmutabilityPolicy: false,
                    tags: false,
                    ownership: false,
                    permissions: false,
                },
                expiresOn,
            };

            const sasToken = await blockBlobClient.generateSasUrl(sasOptions);

            logger.info(`Generated SAS token for blob '${blobName}' in container '${containerName}'`);
            return sasToken;
        } catch (error) {
            logger.error(`Failed to generate SAS token for blob '${blobName}' in container '${containerName}':`, error);
            return null;
        }
    }

    /**
     * Copy blob within the same storage account
     */
    public async copyBlob(
        sourceContainer: string,
        sourceBlob: string,
        destinationContainer: string,
        destinationBlob: string,
    ): Promise<boolean> {
        const sourceContainerClient = this.getContainerClient(sourceContainer);
        const destContainerClient = this.getContainerClient(destinationContainer);

        if (!sourceContainerClient || !destContainerClient) {
            return false;
        }

        try {
            await this.ensureContainer(destinationContainer);

            const sourceBlobClient = sourceContainerClient.getBlockBlobClient(sourceBlob);
            const destBlobClient = destContainerClient.getBlockBlobClient(destinationBlob);

            await destBlobClient.syncCopyFromURL(sourceBlobClient.url);

            logger.info(`Blob '${sourceBlob}' copied from '${sourceContainer}' to '${destinationBlob}' in '${destinationContainer}'`);
            return true;
        } catch (error) {
            logger.error(`Failed to copy blob '${sourceBlob}' from '${sourceContainer}' to '${destinationBlob}' in '${destinationContainer}':`, error);
            return false;
        }
    }

    /**
     * Helper method to convert stream to buffer
     */
    private async streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            readableStream.on('data', (data) => {
                chunks.push(data instanceof Buffer ? data : Buffer.from(data));
            });
            readableStream.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on('error', reject);
        });
    }
}

// Export singleton instance
// export const blobStorageService = new BlobStorageService();
