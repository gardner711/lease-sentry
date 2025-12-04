import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { createDocument } from '../services/cosmosDb.js';

const router = Router();

interface SupportRequest {
    id: string;
    userId?: string;
    email: string;
    subject: string;
    comment: string;
    timestamp: string;
}

// POST /support - Submit support request (unauthenticated)
router.post('/', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').isString().isLength({ min: 1, max: 200 }).withMessage('Subject is required and must be less than 200 characters'),
    body('comment').isString().isLength({ min: 1, max: 1000 }).withMessage('Comment is required and must be less than 1000 characters'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const { email, subject, comment } = req.body;
    const userId = req.user?.userId; // eslint-disable-line @typescript-eslint/no-unnecessary-condition

    const supportRequest: SupportRequest = {
        id: `support_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        email,
        subject,
        comment,
        timestamp: new Date().toISOString(),
    };

    const result = await createDocument('support', supportRequest, email);

    logger.info('Support request submitted', {
        id: result.id,
        email: result.email,
        subject: result.subject,
        hasUserId: !!result.userId,
    });

    res.status(201).json({
        id: result.id,
        message: 'Support request submitted successfully',
        timestamp: result.timestamp,
    });
}));

export { router as supportRouter };
