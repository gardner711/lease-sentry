import { Router } from 'express';

import { healthLiveness, healthReadiness, healthDetailed, healthStartup } from '../controllers/health.controller.js';

const router = Router();

/**
 * @swagger
 * /health/live:
 *   get:
 *     summary: Liveness probe
 *     description: Returns 200 if the service is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 */
router.get('/live', healthLiveness);

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Readiness probe
 *     description: Returns 200 if the service is ready to accept traffic
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready
 *       503:
 *         description: Service is not ready
 */
router.get('/ready', healthReadiness);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Detailed health status
 *     description: Returns detailed health status of all components
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: All components healthy
 *       503:
 *         description: One or more components unhealthy
 */
router.get('/', healthDetailed);

/**
 * @swagger
 * /health/startup:
 *   get:
 *     summary: Startup probe
 *     description: Returns 200 if the service has started
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service has started
 */
router.get('/startup', healthStartup);

export default router;
