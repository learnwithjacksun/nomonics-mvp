import envFile from "../config/env.js";
import UserModel from "../models/user.model.js";
import generateRandomNumber from "../utils/generateRandomNumbers.js";
import { onError } from "../utils/onError.js";
import { sendEmail, sendOTPEmail } from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateResetPasswordTemplate } from "../templates/resetPassword.js";

export const register = async (req, res) => {
  const { name, email, role, password, sendEmail } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      preferences: {
        sendEmail,
      },
    });
    const otp = generateRandomNumber(5);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    newUser.otp = otp;
    newUser.otpExpiresAt = otpExpiresAt;
    await newUser.save();

    // Send OTP email if user opted in
    if (sendEmail) {
      const emailSent = await sendOTPEmail(email, otp, name);
      if (!emailSent) {
        console.warn(`Failed to send OTP email to ${email}`);
        // Don't fail registration if email fails, just log it
      }
    }

    const token = jwt.sign({ id: newUser.id }, envFile.JWT_SECRET, {
      expiresIn: "30 days",
    });

    res.status(201).json({
      success: true,
      message:
        "User created successfully. Please check your email for verification code.",
      data: newUser,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Otp is required",
    });
  }
  const user = req.user;
  try {
    const isUser = UserModel.findOne({ email: user.email });
    if (!isUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user.id }, envFile.JWT_SECRET, {
      expiresIn: "30 days",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const checkAuth = async (req, res) => {
  const user = req.user;
  const token = req.token;
  res.status(200).json({
    success: true,
    message: "User authenticated",
    data: user,
    token,
  });
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new OTP
    const otp = generateRandomNumber(5);
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Update user with new OTP
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send new OTP email
    const emailSent = await sendOTPEmail(email, otp, user.name);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: "New OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    onError(res, error);
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await UserModel.findOne({ email, isAdmin: true });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: admin.id }, envFile.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: admin,
      token,
    });
  } catch (error) {
    onError(res, error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const frontendUrl = envFile.FRONTEND_URL;
    const emailSent = await sendEmail(
      email,
      "Reset Password - Nomonics",
      generateResetPasswordTemplate(
        user.name,
        `${frontendUrl}/reset-password?token=${user.id}`
      )
    );
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again.",
      });
    }
    res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    onError(res, error);
  }
};

export const resetPassword = async (req, res) => {
  const { password, userId } = req.body;
  if (!password || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: user,
    });
  } catch (error) {
    onError(res, error);
  }
};
