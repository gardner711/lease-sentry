import { Router } from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../services/logger.js';
import { createDocument, getDocumentById, queryDocuments, deleteDocument } from '../services/cosmosDb.js';
import { authenticateToken } from '../middleware/auth.js';
import type { ItemDefinition } from '@azure/cosmos';

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string;
                email?: string;
                iat?: number;
                exp?: number;
            };
        }
    }
}

const router = Router();

interface Contract extends ItemDefinition {
    id: string;
    userId: string;
    score?: number;
    upload: string;
    status: 'processing' | 'processed';
    storage?: string;
    thumbnail?: string;
}

// Helper function to get authenticated user ID
// const getAuthenticatedUserId = (req: Express.Request): string => {
//     return req.user.userId;
// };// POST /contract - Create a contract (authenticated)
router.post('/', authenticateToken, [
    body('score').optional().isInt({ min: 1, max: 100 }).withMessage('Score must be between 1 and 100'),
    body('upload').isISO8601().withMessage('Upload must be a valid ISO 8601 datetime'),
    body('status').isIn(['processing', 'processed']).withMessage('Status must be processing or processed'),
    body('storage').optional().isString(),
    body('thumbnail').optional().isString(),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId = (req as { user: { userId: string } }).user.userId;
    const { score, upload, status, storage, thumbnail } = req.body;

    const contract: Contract = {
        id: `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        score,
        upload,
        status,
        storage,
        thumbnail,
    };

    const result = await createDocument('contracts', contract, userId);

    logger.info('Contract created', {
        id: result.id,
        userId: result.userId,
        status: result.status,
    });

    res.status(201).json(result);
}));

// GET /contract - Get contracts with pagination/sorting/filtering (authenticated)
router.get('/', authenticateToken, [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('size').optional().isInt({ min: 1, max: 100 }).withMessage('Size must be between 1 and 100'),
    query('sort').optional().isString().withMessage('Sort must be a string'),
    query('filter').optional().isString().withMessage('Filter must be a string'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId = (req as { user: { userId: string } }).user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const sort = req.query.sort as string;
    const filter = req.query.filter as string;

    // Build query
    let sqlQuery = 'SELECT * FROM c WHERE c.userId = @userId';
    const parameters = [{ name: '@userId', value: userId }];

    // Add filter if provided
    if (filter) {
        // Simple filter implementation - in production, this would be more sophisticated
        if (filter.includes('status:')) {
            const status = filter.split('status:')[1];
            if (status) {
                sqlQuery += ' AND c.status = @status';
                parameters.push({ name: '@status', value: status });
            }
        }
    }

    // Add sorting
    if (sort) {
        const [field, order] = sort.split(':');
        sqlQuery += ` ORDER BY c.${field} ${order === 'desc' ? 'DESC' : 'ASC'}`;
    }

    // Add pagination
    const offset = (page - 1) * size;
    sqlQuery += ' OFFSET @offset LIMIT @limit';
    parameters.push({ name: '@offset', value: offset.toString() });
    parameters.push({ name: '@limit', value: size.toString() });

    const contracts = await queryDocuments<Contract>('contracts', {
        query: sqlQuery,
        parameters,
    });

    res.json(contracts);
}));

// GET /contract/recent - Get recent contracts (authenticated)
router.get('/recent', authenticateToken, asyncHandler(async (req, res) => {
    const userId = (req as { user: { userId: string } }).user.userId;

    const contracts = await queryDocuments<Contract>('contracts', {
        query: 'SELECT TOP 10 * FROM c WHERE c.userId = @userId ORDER BY c.upload DESC',
        parameters: [{ name: '@userId', value: userId }],
    });

    res.json(contracts);
}));

// GET /contract/{id} - Get a specific contract (authenticated)
router.get('/:id', authenticateToken, [
    param('id').isString().notEmpty().withMessage('Contract ID is required'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId: string = req.user.userId;
    const { id } = req.params;

    // @ts-ignore - TypeScript global interface issue
    const contract = await getDocumentById<Contract>('contracts', id, req.user.userId);
    if (!contract) {
        throw createError('Contract not found', 404);
    }

    // Ensure user can only access their own contracts
    if (contract.userId !== userId) {
        throw createError('Access denied', 403);
    }

    res.json(contract);
}));

// DELETE /contract/{id} - Delete a specific contract (authenticated)
router.delete('/:id', authenticateToken, [
    param('id').isString().notEmpty().withMessage('Contract ID is required'),
], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw createError('Validation failed', 400);
    }

    const userId: string = req.user.userId;
    const { id } = req.params;

    // @ts-ignore - TypeScript global interface issue
    const contract = await getDocumentById<Contract>('contracts', id, req.user.userId);
    if (!contract) {
        throw createError('Contract not found', 404);
    }

    // Ensure user can only delete their own contracts
    if (contract.userId !== userId) {
        throw createError('Access denied', 403);
    }

    // @ts-ignore - TypeScript global interface issue
    await deleteDocument('contracts', id, req.user.userId);

    logger.info('Contract deleted', { id, userId });

    res.status(204).send();
}));

export { router as contractRouter };
