import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/reminder`,
      body: { subscriptionId: subscription._id },
      headers: {
        "Content-Type": "application/json",
      },
      retries: 0,
    });

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (e) {
    next(e);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};

export const exportUserSubscriptionsCSV = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    if (!subscriptions.length) {
      return res.status(404).json({
        success: false,
        message: "No subscriptions found for this user",
      });
    }

    const headers = [
      "Name",
      "Price",
      "Currency",
      "Frequency",
      "Category",
      "Payment Method",
      "Status",
      "Start Date",
      "Renewal Date",
    ];

    const rows = subscriptions.map((s) => [
      s.name,
      s.price,
      s.currency,
      s.frequency,
      s.category || "N/A",
      s.paymentMethod,
      s.status,
      s.startDate ? s.startDate.toISOString().split("T")[0] : "N/A",
      s.renewalDate ? s.renewalDate.toISOString().split("T")[0] : "N/A",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="subscriptions-${req.params.id}.csv"`
    );

    res.status(200).send(csv);
  } catch (e) {
    next(e);
  }
};
