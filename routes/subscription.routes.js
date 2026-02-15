import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription } from "../controllers/subscription.controller.js";
import { getUser } from "../controllers/user.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "Get all subscriptions" })
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get subscription detilas" })
);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscriptions" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "delte a subscriptions" })
);

subscriptionRouter.get("/user/:id", authorize, getUser);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "cancel subscriptions" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);
export default subscriptionRouter;
