import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { createDocument, getDocumentById, updateDocument, deleteDocument } from '../services/cosmosDb.js';
import { authenticateToken } from '../middleware/auth.js';
import type { ItemDefinition } from '@azure/cosmos';

const router = Router();

interface Subscription extends ItemDefinition {
    id: string;
    userId: string;
    subscription: 'free' | 'starter' | 'pro';
}

// POST /subscription - Create subscription (unauthenticated)
router.post('/', [
    body('subscription').isIn(['free', 'starter', 'pro']).withMessage('Subscription must be free, starter, or pro'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const { subscription } = req.body as { subscription: 'free' | 'starter' | 'pro' };

    // For unauthenticated requests, we might generate a temporary userId
    // In a real implementation, this would be handled by authentication middleware
    const userId = req.body.userId ?? `temp_${Date.now()}`;

    const subscriptionDoc: Subscription = {
        id: userId,
        userId,
        subscription,
    };

    const result = await createDocument('accounts', subscriptionDoc, userId);

    logger.info('Subscription created', { userId, subscription: result.subscription });

    res.status(201).json({
        userId: result.userId,
        subscription: result.subscription,
    });
}));

// GET /subscription - Get current user subscription (authenticated)
router.get('/', authenticateToken, asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const subscription = await getDocumentById<Subscription>('accounts', userId, userId);

    if (!subscription) {
        throw createError('Subscription not found', 404);
    }

    res.json({
        userId: subscription.userId,
        subscription: subscription.subscription,
    });
}));

// PUT /subscription - Update subscription (authenticated)
router.put('/', authenticateToken, [
    body('subscription').isIn(['free', 'starter', 'pro']).withMessage('Subscription must be free, starter, or pro'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId = req.user.userId;
    const { subscription } = req.body as { subscription: 'free' | 'starter' | 'pro' };

    // First check if subscription exists
    const existing = await getDocumentById<Subscription>('accounts', userId, userId);
    if (!existing) {
        throw createError('Subscription not found', 404);
    }

    const updated = await updateDocument<Subscription>('accounts', userId, { subscription }, userId);

    logger.info('Subscription updated', { userId, subscription: updated.subscription });

    res.json({
        userId: updated.userId,
        subscription: updated.subscription,
    });
}));

// DELETE /subscription - Delete subscription (authenticated)
router.delete('/', authenticateToken, asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const existing = await getDocumentById<Subscription>('accounts', userId, userId);
    if (!existing) {
        throw createError('Subscription not found', 404);
    }

    await deleteDocument('accounts', userId, userId);

    logger.info('Subscription deleted', { userId });

    res.status(204).send();
}));

export { router as subscriptionRouter };
