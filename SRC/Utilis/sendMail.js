import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({path: "../../config.env"});

// Create a transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

export async function sendEmail(toMail, subject, body) {
  console.log(process.env.SENDER_EMAIL);
  
    try {
      const info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to:toMail,
        subject,
        text: body
      });
      return true;
    }
    catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
