import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

import { HttpError } from './errorHandler.js';

export const validate =
  (validations: ValidationChain[]) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((error) => ({
        field: 'type' in error && error.type === 'field' ? error.path : 'unknown',
        message: error.msg,
        value: 'value' in error ? error.value : undefined,
      }));

      throw new HttpError(400, 'Validation failed', formattedErrors);
    }

    next();
  };
