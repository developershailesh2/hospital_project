import express from "express";
import {
  addAppointment,
  deletAppointment,
  editAppointmentById,
  getAppointmentById,
  getAppointmentByUsername,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/add-appointment", addAppointment);
router.get("/appointment/:username", getAppointmentByUsername);
router.get("/get-appointment/:id", getAppointmentById);
router.put("/edit-appointment/:id", editAppointmentById);
router.delete("/delete-appointment/:id", deletAppointment);

export default router;
