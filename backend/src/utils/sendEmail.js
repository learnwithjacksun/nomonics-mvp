import transporter from "../config/nodemailer.js";
import { generateOTPEmailTemplate } from "../templates/otpEmail.js";

/**
 * Send OTP verification email
 * @param {string} to - Recipient email address
 * @param {string} otp - OTP code
 * @param {string} userName - User's name (optional)
 * @returns {Promise<boolean>} - Success status
 */
export const sendOTPEmail = async (to, otp, userName = "") => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Email Verification - Nomonics",
      html: generateOTPEmailTemplate(otp, userName),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

/**
 * Generic email sending function
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 * @returns {Promise<boolean>} - Success status
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

/**
 * Test email configuration
 * @returns {Promise<boolean>} - Success status
 */
export const testEmailConfig = async () => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: "Email Configuration Test - Nomonics",
      html: `
        <h2>Email Configuration Test</h2>
        <p>If you received this email, your nodemailer configuration is working correctly!</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Test email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending test email:", error);
    return false;
  }
}; 