import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { serve } from "@upstash/workflow/express";

const REMINDERS = [7, 5, 3, 1];

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") {
    console.log(
      `Subscription with id ${subscriptionId} not found or not active`
    );
    return;
  }
  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(`Subscription with id ${subscriptionId} is already expired`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(
        context,
        `Reminder ${daysBefore} days before`,
        reminderDate
      );
    }
    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(
    `Scheduling reminder ${label} for subscription ${
      context.requestPayload.subscriptionId
    } at ${date.toISOString()}`
  );
  await context.sleepUntil(date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(
      `Triggering reminder ${label} for subscription ${context.requestPayload.subscriptionId}`
    );
    // Send email, SMS, push notification...
  });
};
