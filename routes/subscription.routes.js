import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "Get all subscriptions" })
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get subscription detilas" })
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create subscriptions" })
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscriptions" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "delte a subscriptions" })
);

subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "get all users  subscriptions" })
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "cancel subscriptions" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);
export default subscriptionRouter;
