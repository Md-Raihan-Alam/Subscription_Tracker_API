import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";
const workflowRouter = Router();

workflowRouter.post("/workflows/reminder", sendReminders);

export default workflowRouter;
