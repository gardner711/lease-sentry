import { Server } from 'http';

import createApp from './app.js';
import { config } from './config/index.js';
import { initializeAISearch } from './services/aiSearch.js';
import { initializeAppInsights } from './services/appInsights.js';
import { initializeBlobStorage } from './services/blobStorage.js';
import { initializeCosmosDb } from './services/cosmosDb.js';
import { initializeEventGrid } from './services/eventGrid.js';
import { logger } from './utils/logger.js';

let server: Server | null = null;

const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.info(`${signal} signal received: closing HTTP server`);

  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

const startServer = async (): Promise<void> => {
  try {
    // Initialize Application Insights first
    initializeAppInsights();

    // Initialize Azure services
    await initializeCosmosDb();
    initializeEventGrid();
    await initializeBlobStorage();
    initializeAISearch();

    // Create Express app
    const app = createApp();

    // Start server
    server = app.listen(config.port, config.host, () => {
      logger.info(`Server running in ${config.nodeEnv} mode`);
      logger.info(`Server listening on ${config.host}:${config.port}`);
      logger.info(`API documentation available at http://${config.host}:${config.port}/api-docs`);
      logger.info(`Health check available at http://${config.host}:${config.port}/health`);
    });

    // Graceful shutdown handlers
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Unhandled rejection handler
    process.on('unhandledRejection', (reason: Error | unknown) => {
      logger.error('Unhandled Rejection', reason as Error);
      gracefulShutdown('unhandledRejection');
    });

    // Uncaught exception handler
    process.on('uncaughtException', (error: Error) => {
      logger.fatal('Uncaught Exception', error);
      gracefulShutdown('uncaughtException');
    });
  } catch (error) {
    logger.fatal('Failed to start server', error as Error);
    process.exit(1);
  }
};

// Start the server
startServer();
