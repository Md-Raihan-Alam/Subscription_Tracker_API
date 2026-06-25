import nodemailer from "nodemailer";

let transporter;

const createTransporter = async () => {
  if (transporter) return transporter;

  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("📧 Ethereal test account created:");
  console.log("   User:", testAccount.user);
  console.log("   Pass:", testAccount.pass);
  console.log("   Preview emails at: https://ethereal.email");

  return transporter;
};

export default createTransporter;
