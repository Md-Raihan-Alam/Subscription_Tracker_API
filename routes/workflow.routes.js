import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Workflows
 *   description: Upstash QStash workflow endpoints
 */

/**
 * @swagger
 * /api/v1/workflows/reminder:
 *   post:
 *     summary: Trigger subscription renewal reminder workflow
 *     tags: [Workflows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [subscriptionId]
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Workflow triggered successfully
 *       400:
 *         description: Invalid request
 */
workflowRouter.post("/reminder", sendReminders);

export default workflowRouter;
