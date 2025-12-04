import * as appInsights from 'applicationinsights';

import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

let client: appInsights.TelemetryClient | null = null;

export const initializeAppInsights = (): void => {
  if (!config.appInsightsKey) {
    logger.warn('Application Insights instrumentation key not found. Telemetry disabled.');
    return;
  }

  try {
    appInsights
      .setup(config.appInsightsKey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(false) // We use pino
      .setUseDiskRetryCaching(true)
      .setSendLiveMetrics(false)
      .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
      .start();

    client = appInsights.defaultClient;
    client.context.tags[client.context.keys.cloudRole] = 'lease-sentry-webservice';

    logger.info('Application Insights initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize Application Insights', error as Error);
  }
};

export const getAppInsightsClient = (): appInsights.TelemetryClient | null => client;

export const trackEvent = (name: string, properties?: Record<string, string>): void => {
  client?.trackEvent({ name, properties });
};

export const trackMetric = (name: string, value: number, properties?: Record<string, string>): void => {
  client?.trackMetric({ name, value, properties });
};

export const trackException = (exception: Error, properties?: Record<string, string>): void => {
  client?.trackException({ exception, properties });
};

export const trackTrace = (message: string, severity?: appInsights.Contracts.SeverityLevel): void => {
  client?.trackTrace({ message, severity });
};

export const trackDependency = (
  name: string,
  data: string,
  duration: number,
  success: boolean,
  dependencyTypeName?: string
): void => {
  client?.trackDependency({
    name,
    data,
    duration,
    success,
    resultCode: success ? 200 : 500,
    dependencyTypeName: dependencyTypeName || 'HTTP',
  });
};
