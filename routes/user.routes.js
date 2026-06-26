import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 */
userRouter.get("/", getUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
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
 *         description: User found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.get("/:id", authorize, getUser);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user (placeholder)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Placeholder response
 */
userRouter.post("/", (req, res) => res.send({ title: "Create a new user" }));

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user (placeholder)
 *     tags: [Users]
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
userRouter.put("/:id", (req, res) => res.send({ title: "Update user" }));

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user (placeholder)
 *     tags: [Users]
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
userRouter.delete("/:id", (req, res) => res.send({ title: "Delete user" }));

export default userRouter;
