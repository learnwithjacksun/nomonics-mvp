import nodemailer from "nodemailer";
import process from "process";

if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
  console.error("❌ Email configuration error:");
  console.error("EMAIL_USER:", process.env.EMAIL_USER ? "Set" : "Missing");
  console.error("EMAIL_APP_PASSWORD:", process.env.EMAIL_APP_PASSWORD ? "Set" : "Missing");
  console.error("Please add these variables to your .env file");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Verify transporter configuration
transporter.verify(function (error) {
  if (error) {
    console.error("❌ Nodemailer verification failed:", error);
  } else {
    console.log("✅ Nodemailer server is ready to send emails");
  }
});

export default transporter; 