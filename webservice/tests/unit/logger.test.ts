import { describe, it, expect } from '@jest/globals';

describe('Logger', () => {
  it('should have log level functions', async () => {
    const { logDebug, logInfo, logWarn, logError, logFatal, logger } = await import('../../src/utils/logger');

    expect(typeof logDebug).toBe('function');
    expect(typeof logInfo).toBe('function');
    expect(typeof logWarn).toBe('function');
    expect(typeof logError).toBe('function');
    expect(typeof logFatal).toBe('function');
    expect(logger).toBeDefined();
  });
});
