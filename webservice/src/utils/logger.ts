import pino from 'pino';

import { config } from '../config/index.js';

const pinoConfig: pino.LoggerOptions = {
  level: config.logLevel,
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(config.logFormat === 'pretty' && config.nodeEnv === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }
    : {}),
};

export const logger = pino(pinoConfig);

// Wrapper functions for different log levels
export const logDebug = (message: string, context?: Record<string, unknown>): void => {
  logger.debug(context, message);
};

export const logInfo = (message: string, context?: Record<string, unknown>): void => {
  logger.info(context, message);
};

export const logWarn = (message: string, context?: Record<string, unknown>): void => {
  logger.warn(context, message);
};

export const logError = (message: string, error?: Error, context?: Record<string, unknown>): void => {
  logger.error({ ...context, error }, message);
};

export const logFatal = (message: string, error?: Error, context?: Record<string, unknown>): void => {
  logger.fatal({ ...context, error }, message);
};
