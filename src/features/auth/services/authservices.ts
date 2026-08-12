import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

//login

export interface LoginData {
  Email: string;
  Password: string;
}

export const loginUser = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/user-login`, loginData);
  return response.data;
};

//registration data
export interface IRegistrationData {
  UserName: string;
  Password: string;
  ConfirmPassword: string;
  Email: string;
  Mobile: string;
}

export const registerationUser = async (
  registrationData: IRegistrationData,
) => {
  const response = await axios.post(
    `${API_URL}/register-user`,
    registrationData,
  );
  return response.data;
};

//forgot-password

export interface IEmail {
  Email: string;
}

export async function ForgotEmailPassword(forgotPassword: IEmail) {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    forgotPassword,
  );
  return response.data;
}

//verify-otp

interface IOtp {
  Email: string;
  otp: string;
}

export async function VerifyEmailOtp(sendOtp: IOtp) {
  const response = await axios.post(`${API_URL}/verify-otp`, sendOtp);
  return response.data;
}

//reset-password (New Password)

export interface INewPassword {
  Email: string;
  Password: string;
}

export async function UpdatePassword(updatePassword: INewPassword) {
  const response = await axios.post(
    `${API_URL}/reset-password`,
    updatePassword,
  );
  return response.data;
}
