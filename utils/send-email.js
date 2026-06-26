import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import { EMAIL } from "../config/env.js";
import createTransporter from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required parameters");

  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error("Invalid email type");

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
    accountSettingsLink: "https://yourapp.com/account",
    supportLink: "https://yourapp.com/support",
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: EMAIL || "noreply@subdub.com",
    to,
    subject,
    html: message,
  };

  const transporter = await createTransporter();

  const info = await transporter.sendMail(mailOptions);

  console.log("✅ Email sent:", info.messageId);
  console.log("📬 Preview URL:", nodemailer.getTestMessageUrl(info));
};
