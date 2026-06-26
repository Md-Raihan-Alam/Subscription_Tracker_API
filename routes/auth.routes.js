import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 */
authRouter.post("/sign-up", signUp);

/**
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       401:
 *         description: Invalid email or password
 */
authRouter.post("/sign-in", signIn);

/**
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     summary: Sign out the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User signed out successfully
 */
authRouter.post("/sign-out", signOut);

export default authRouter;
