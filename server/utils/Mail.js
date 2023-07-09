import nodemailer from "nodemailer";
import { MAIL_TRAP_USER, MAIL_TRAP_PASS } from "../config/index.js";

export const generateMailTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAIL_TRAP_USER,
      pass: MAIL_TRAP_PASS,
    },
  });
