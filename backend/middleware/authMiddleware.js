import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  try {
    const authheader = req.headers.authorization;
    if (!authheader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    const token = authheader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    console.log("Authenticate Token Error : ", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
