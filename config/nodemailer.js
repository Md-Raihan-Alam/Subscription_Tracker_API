import nodemailer from "nodemailer";
import { EMAIL, PASS } from "./env";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

export default transporter;
