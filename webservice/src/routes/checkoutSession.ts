import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { authenticateToken } from '../middleware/auth.js';
import Stripe from 'stripe';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

const createCheckoutSession = async (userId: string, sessionId: string) => {
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Lease Sentry Pro Subscription',
                        description: 'Advanced lease analysis and management',
                    },
                    unit_amount: 999, // $9.99 in cents
                },
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL ?? 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL ?? 'http://localhost:3000'}/cancel`,
        client_reference_id: userId,
        metadata: {
            userId,
            sessionId,
        },
    });
};

// POST /checkoutsession - Create a Stripe checkout session (authenticated)
router.post('/', authenticateToken, [
    body('sessionId').isString().notEmpty().withMessage('Session ID is required'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId = (req as { user: { userId: string } }).user.userId;
    const { sessionId } = req.body;

    try {
        const session = await createCheckoutSession(userId, sessionId);

        logger.info('Checkout session created', {
            userId,
            sessionId: session.id,
            clientSecret: session.client_secret,
        });

        res.json({
            clientSecret: session.client_secret,
            sessionId: session.id,
        });
    } catch (error) {
        logger.error('Failed to create checkout session', { error, userId });
        throw createError('Failed to create checkout session', 500);
    }
}));

export { router as checkoutSessionRouter };
