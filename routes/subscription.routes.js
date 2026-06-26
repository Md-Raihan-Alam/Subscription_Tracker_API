import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscription,
  exportUserSubscriptionsCSV,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Subscription management endpoints
 */

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get all subscriptions (placeholder)
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Placeholder response
 */
subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "Get all subscriptions" })
);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, currency, frequency, paymentMethod, startDate]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Netflix
 *               price:
 *                 type: number
 *                 example: 15.99
 *               currency:
 *                 type: string
 *                 example: USD
 *               frequency:
 *                 type: string
 *                 example: monthly
 *               category:
 *                 type: string
 *                 example: entertainment
 *               paymentMethod:
 *                 type: string
 *                 example: Credit Card
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-01
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       401:
 *         description: Unauthorized
 */
subscriptionRouter.post("/", authorize, createSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/user/{id}:
 *   get:
 *     summary: Get all subscriptions for a user
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user subscriptions
 *       401:
 *         description: Unauthorized
 */
subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

/**
 * @swagger
 * /api/v1/subscriptions/user/{id}/export:
 *   get:
 *     summary: Export user subscriptions as CSV
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: CSV file download
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No subscriptions found
 */
subscriptionRouter.get(
  "/user/:id/export",
  authorize,
  exportUserSubscriptionsCSV
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     summary: Get subscription details (placeholder)
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Placeholder response
 */
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get subscription details" })
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription (placeholder)
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Placeholder response
 */
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscription" })
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription (placeholder)
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Placeholder response
 */
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete subscription" })
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}/cancel:
 *   put:
 *     summary: Cancel a subscription (placeholder)
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Placeholder response
 */
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "Cancel subscription" })
);

/**
 * @swagger
 * /api/v1/subscriptions/upcoming-renewals:
 *   get:
 *     summary: Get upcoming renewals (placeholder)
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: Placeholder response
 */
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);

export default subscriptionRouter;
