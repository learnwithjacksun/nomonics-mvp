import dotenv from "dotenv";
import { testEmailConfig, sendOTPEmail } from "./src/utils/sendEmail.js";

// Load environment variables
dotenv.config();

const testEmailSetup = async () => {
  console.log("🔧 Testing email configuration...");
  console.log("📧 Email User:", process.env.EMAIL_USER || "❌ Not set");
  console.log("🔑 Email App Password:", process.env.EMAIL_APP_PASSWORD ? "✅ Set" : "❌ Not set");
  
  // Check if environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error("\n❌ Email configuration is incomplete!");
    console.error("Please add the following to your .env file:");
    console.error("EMAIL_USER=your-email@gmail.com");
    console.error("EMAIL_APP_PASSWORD=your-gmail-app-password");
    console.error("\n📝 To get a Gmail App Password:");
    console.error("1. Go to your Google Account settings");
    console.error("2. Enable 2-factor authentication");
    console.error("3. Generate an App Password for 'Mail'");
    console.error("4. Use that password in EMAIL_APP_PASSWORD");
    return;
  }
  
  try {
    // Test basic email configuration
    console.log("\n🧪 Testing basic email configuration...");
    const testResult = await testEmailConfig();
    if (testResult) {
      console.log("✅ Email configuration test passed!");
      
      // Test OTP email
      console.log("\n📨 Testing OTP email...");
      const otpResult = await sendOTPEmail(
        process.env.EMAIL_USER, // Send to yourself for testing
        "12345",
        "Test User"
      );
      
      if (otpResult) {
        console.log("✅ OTP email test passed!");
        console.log("📬 Check your email inbox for the test emails.");
      } else {
        console.log("❌ OTP email test failed!");
      }
    } else {
      console.log("❌ Email configuration test failed!");
    }
  } catch (error) {
    console.error("💥 Error during email testing:", error.message);
    if (error.message.includes("Invalid login")) {
      console.error("\n🔐 Authentication failed. Please check:");
      console.error("1. Your Gmail address is correct");
      console.error("2. Your App Password is correct");
      console.error("3. 2-factor authentication is enabled");
    }
  }
};

testEmailSetup(); 