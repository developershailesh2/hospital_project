import { getDB } from "../config/db.js";
import bcrypt from "bcryptjs";
import { Send_Email, Send_Otp } from "../utils/emailService.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export async function getUsers(req, res) {
  try {
    const database = getDB();

    const users = await database.collection("tbl_users").find({}).toArray();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Users error fetched", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function registerUser(req, res) {
  try {
    const database = getDB();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt);

    const user_register = {
      UserName: req.body.UserName,
      Password: hashPassword,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
      Date: new Date(),
      resetotp: "456789",
      otpExpiry: new Date(),
    };

    const existing_email = await database
      .collection("tbl_users")
      .findOne({ Email: user_register.Email });

    if (existing_email) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const result = await database
      .collection("tbl_users")
      .insertOne(user_register);

    Send_Email(user_register);

    console.log(`User Registered Successfully : ${result.insertedId}`);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      userId: result.insertedId,
    });
  } catch (error) {
    console.log("Register user error : ", error);
    res.send(500).json({
      success: false,
      message: "Error while registering user",
    });
  }
}

export async function userLogin(req, res) {
  try {
    const database = getDB();
    const user_login = await database
      .collection("tbl_users")
      .findOne({ Email: req.body.Email });

    if (!user_login) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const password_match = await bcrypt.compare(
      req.body.Password,
      user_login.Password,
    );

    if (!password_match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = generateToken(user_login);

    console.log("User Login Successful : ", user_login.Email);
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    console.log("Login Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Login error",
    });
  }
}

export async function forgotPassword(req, res) {
  try {
    const database = getDB();

    const user = await database
      .collection("tbl_users")
      .findOne({ Email: req.body.Email });

    //finding registered email id
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email address not registered" });
    }

    //generating otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await database.collection("tbl_users").updateOne(
      { Email: req.body.Email },
      {
        $set: {
          resetotp: otp,
          otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
        },
      },
    );

    //sending otp on email
    if (result) {
      Send_Otp(user, otp);
      return res.status(200).json({
        success: true,
        message: "OTP send successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Email address not registered.",
    });
  }
}

export async function verifyOtp(req, res) {
  try {
    const database = getDB();
    const result = await database
      .collection("tbl_users")
      .findOne({ Email: req.body.Email });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Email address not found.",
      });
    }

    if (String(result.resetotp) !== String(req.body.otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    return res.status(200).json({ success: true, message: "OTP Verified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify otp",
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const database = getDB();

    const salt = await bcrypt.genSalt(10);
    const new_password = await bcrypt.hash(req.body.Password, salt);

    const result = await database
      .collection("tbl_users")
      .updateOne(
        { Email: req.body.Email },
        { $set: { Password: new_password, resetotp: "", otpExpiry: "" } },
      );

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "New Password Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in reset password" });
  }
}
