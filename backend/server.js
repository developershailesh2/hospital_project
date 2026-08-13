import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();

//MongoDB connection
await connectDB();
const app = express();
const PORT = process.env.PORT || 5050;

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hospital Management API");
});

app.use("/api/users", userRoutes);
app.use("/api/sam", appointmentRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started or port ${PORT}`);
});
