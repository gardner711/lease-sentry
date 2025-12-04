import * as dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env' : `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({ path: envFile });

// Configuration schema validation using Zod
const configSchema = z.object({
  // Server
  nodeEnv: z.enum(['development', 'test', 'production']).default('development'),
  port: z.coerce.number().int().min(1).max(65535).default(4100),
  host: z.string().default('0.0.0.0'),

  // Application Insights
  appInsightsKey: z.string().optional(),

  // JWT
  jwtSecret: z.string().min(1),
  jwtExpiresIn: z.string().default('15m'),
  jwtRefreshSecret: z.string().min(1),
  jwtRefreshExpiresIn: z.string().default('7d'),

  // Azure Cosmos DB
  cosmosEndpoint: z.string().url(),
  cosmosKey: z.string().min(1),
  cosmosDatabaseId: z.string().min(1).default('lease-sentry'),
  cosmosContainerPrefix: z.string().default('dev'),

  // Azure Event Grid
  eventGridTopicEndpoint: z.string().url(),
  eventGridAccessKey: z.string().min(1),

  // Azure Blob Storage
  azureStorageConnectionString: z.string().min(1),
  azureStorageContainerName: z.string().min(1).default('lease-documents'),

  // Azure AI Search
  azureSearchEndpoint: z.string().url(),
  azureSearchApiKey: z.string().min(1),
  azureSearchIndexName: z.string().min(1).default('lease-index'),

  // Stripe
  stripeSecretKey: z.string().min(1),
  stripePublishableKey: z.string().min(1),

  // CORS
  corsOrigin: z.string().default('http://localhost:3000'),

  // Logging
  logLevel: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  logFormat: z.enum(['json', 'pretty']).default('json'),
});

export type Config = z.infer<typeof configSchema>;

// Parse and validate configuration
const parseConfig = (): Config => {
  const rawConfig = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    host: process.env.HOST,
    appInsightsKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    cosmosEndpoint: process.env.COSMOS_ENDPOINT,
    cosmosKey: process.env.COSMOS_KEY,
    cosmosDatabaseId: process.env.COSMOS_DATABASE_ID,
    cosmosContainerPrefix: process.env.COSMOS_CONTAINER_PREFIX,
    eventGridTopicEndpoint: process.env.EVENTGRID_TOPIC_ENDPOINT,
    eventGridAccessKey: process.env.EVENTGRID_ACCESS_KEY,
    azureStorageConnectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    azureStorageContainerName: process.env.AZURE_STORAGE_CONTAINER_NAME,
    azureSearchEndpoint: process.env.AZURE_SEARCH_ENDPOINT,
    azureSearchApiKey: process.env.AZURE_SEARCH_API_KEY,
    azureSearchIndexName: process.env.AZURE_SEARCH_INDEX_NAME,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    corsOrigin: process.env.CORS_ORIGIN,
    logLevel: process.env.LOG_LEVEL,
    logFormat: process.env.LOG_FORMAT,
  };

  try {
    return configSchema.parse(rawConfig);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingFields = error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Configuration validation failed:\n${missingFields.join('\n')}`);
    }
    throw error;
  }
};

export const config = parseConfig();
