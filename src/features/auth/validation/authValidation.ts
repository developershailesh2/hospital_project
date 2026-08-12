import * as yup from "yup";

//login schema
export const loginValidationSchema = yup.object({
  Email: yup.string().required("Email required"),
  Password: yup.string().required("Password required"),
});

//registration schema

export const registrationSchema = yup.object({
  UserName: yup
    .string()
    .trim()
    .required("Please enter your name.")
    .min(2, "Name must contain at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "Name can contain only letters and spaces."),

  Password: yup
    .string()
    .required("Please enter a password.")
    .min(8, "Password must contain at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character.",
    ),

  ConfirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("Password")], "Passwords do not match."),

  Email: yup
    .string()
    .trim()
    .required("Please enter your email address.")
    .email("Please enter a valid email address."),

  Mobile: yup
    .string()
    .trim()
    .required("Please enter your mobile number.")
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number."),
});

//reset-password validation

export const resetPasswordSchema = yup.object({
  Password: yup
    .string()
    .required("Please enter your new password.")
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password cannot exceed 20 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character.",
    ),

  ConfirmPassword: yup
    .string()
    .required("Please confirm your new password.")
    .oneOf([yup.ref("Password")], "Passwords do not match. Please try again."),
});

//otp-validation schema

export const otpVerificationSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d+$/, "OTP must contain only numbers")
    .length(6, "OTP must be exactly 6 digits"),
});
