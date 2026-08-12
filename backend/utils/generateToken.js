import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateToken(user) {
  return jwt.sign(
    {
      userId: user.userId,
      Email: user.Email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
}
