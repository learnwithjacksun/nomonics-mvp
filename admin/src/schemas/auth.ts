import { z } from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .trim(),
    email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .trim(),
});

const verifyOtpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters long" }).trim(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim().toLowerCase(),
});

type RegisterSchema = z.infer<typeof registerSchema>;
type LoginSchema = z.infer<typeof loginSchema>;
type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  type RegisterSchema,
  type LoginSchema,
  type VerifyOtpSchema,
  type ForgotPasswordSchema,
};
