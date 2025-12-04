import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { createDocument } from '../services/cosmosDb.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

interface Review {
    id: string;
    userId?: string;
    email: string;
    rating: number;
    comment?: string;
    timestamp: string;
}

// POST /review - Submit a review (authenticated)
router.post('/', authenticateToken, [
    body('email').isEmail().withMessage('Valid email is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().isLength({ max: 1000 }).withMessage('Comment must be less than 1000 characters'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const { email, rating, comment } = req.body;
    const userId = req.user.userId; // From authenticated request

    const review: Review = {
        id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        email,
        rating,
        comment,
        timestamp: new Date().toISOString(),
    };

    const result = await createDocument('reviews', review, email);

    logger.info('Review submitted', {
        id: result.id,
        email: result.email,
        rating: result.rating,
        hasUserId: !!result.userId,
    });

    res.status(201).json({
        id: result.id,
        message: 'Review submitted successfully',
        timestamp: result.timestamp,
    });
}));

export { router as reviewRouter };
