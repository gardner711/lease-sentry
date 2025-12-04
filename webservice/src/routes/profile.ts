import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { createDocument, getDocumentById, updateDocument } from '../services/cosmosDb.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

interface Profile {
    id: string;
    userId: string;
    firstName?: string;
    lastName?: string;
    state?: string;
    email: string;
}

// GET /profile - Get user profile (authenticated)
router.get('/', authenticateToken, asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const profile = await getDocumentById<Profile>('profiles', userId, userId);

    if (!profile) {
        throw createError('Profile not found', 404);
    }

    res.json(profile);
}));

// PUT /profile - Update user profile (authenticated)
router.put('/', authenticateToken, [
    body('email').isEmail().withMessage('Valid email is required'),
    body('firstName').optional().isString().isLength({ min: 1, max: 100 }),
    body('lastName').optional().isString().isLength({ min: 1, max: 100 }),
    body('state').optional().isString().isLength({ min: 2, max: 2 }),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId = req.user.userId;
    const { email, firstName, lastName, state } = req.body;

    // Check if profile exists
    let profile = await getDocumentById<Profile>('profiles', userId, userId);

    if (!profile) {
        // Create new profile
        const newProfile: Profile = {
            id: userId,
            userId,
            email,
            firstName,
            lastName,
            state,
        };

        profile = await createDocument('profiles', newProfile, userId);
        logger.info('Profile created', { userId, email });
    } else {
        // Update existing profile
        const updatedProfile = {
            ...profile,
            email,
            firstName,
            lastName,
            state,
        };

        profile = await updateDocument<Profile>('profiles', userId, updatedProfile, userId);
        logger.info('Profile updated', { userId, email });
    }

    res.json(profile);
}));

export { router as profileRouter };
