import { describe, it, expect } from '@jest/globals';

describe('Config Validation', () => {
  it('should validate port as number', () => {
    const port = process.env.PORT || '4100';
    const portNumber = Number(port);

    expect(portNumber).toBeGreaterThan(0);
    expect(portNumber).toBeLessThanOrEqual(65535);
  });

  it('should have valid log levels', () => {
    const validLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];
    const logLevel = process.env.LOG_LEVEL || 'info';

    expect(validLevels).toContain(logLevel);
  });

  it('should validate environment values', () => {
    const validEnvs = ['development', 'test', 'production'];
    const nodeEnv = process.env.NODE_ENV || 'development';

    expect(validEnvs).toContain(nodeEnv);
  });
});
