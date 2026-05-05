import { z } from "zod";

// ─── Sign Up ─────────────────────────────────────────────────────────────────
export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(40, "First name is too long")
      .regex(/^[a-zA-Z\s'-]+$/, "First name contains invalid characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(40, "Last name is too long")
      .regex(/^[a-zA-Z\s'-]+$/, "Last name contains invalid characters"),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    marketingOptOut: z.boolean().optional(),
  });

// ─── Sign In ─────────────────────────────────────────────────────────────────
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Forgot Password ─────────────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// ─── Verify OTP ──────────────────────────────────────────────────────────────
export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must contain only numbers"),
});

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please make sure both passwords are the same.",
    path: ["confirmPassword"],
  });
