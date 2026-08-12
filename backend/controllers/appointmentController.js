import { match } from "node:assert";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";
import { Send_Appointment_Email } from "../utils/emailService.js";

export async function addAppointment(req, res) {
  try {
    const database = getDB();

    const appointment_details = {
      Email: req.body.Email,
      Title: req.body.Title,
      ClientName: req.body.ClientName,
      ClientAddress: req.body.ClientAddress,
      Doctors: req.body.Doctors,
      Gender: req.body.Gender,
      Description: req.body.Description,
      ClientEmail: req.body.ClientEmail,
      Date: new Date(req.body.Date),
      Timestamp: new Date(),
    };

    if (appointment_details.Email === appointment_details.ClientEmail) {
      return res.status(400).json({
        success: false,
        message: "Client and user emails must be different.",
      });
    }

    const result = await database
      .collection("tbl_add_appointments")
      .insertOne(appointment_details);

    console.log("Appointment Added : ", result);

    Send_Appointment_Email(appointment_details);

    return res
      .status(201)
      .json({ success: true, message: "Appointment details added" });
  } catch (error) {
    console.log("Add Appointment Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Error while adding appointment details",
    });
  }
}

export async function getAppointmentByUsername(req, res) {
  try {
    const database = getDB();

    const result = await database
      .collection("tbl_add_appointments")
      .find({ Email: req.params.username })
      .toArray();

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this email",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointments fetched.",
      appointment_details: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching appointments.",
    });
  }
}

export async function getAppointmentById(req, res) {
  try {
    const database = getDB();
    const result = await database
      .collection("tbl_add_appointments")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment fetched by id",
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching appointment by id",
    });
  }
}

export async function editAppointmentById(req, res) {
  try {
    const database = getDB();
    const result = await database.collection("tbl_add_appointments").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          Title: req.body.Title,
          ClientName: req.body.ClientName,
          ClientAddress: req.body.ClientAddress,
          Doctors: req.body.Doctors,
          Gender: req.body.Gender,
          Description: req.body.Description,
          ClientEmail: req.body.ClientEmail,
          Date: req.body.Date,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment updated",
    });
  } catch (error) {
    console.log("Error in editing appointment : ", error);
    return res.status(500).json({
      success: false,
      message: "Error in editing appointment by id",
    });
  }
}

export async function deletAppointment(req, res) {
  try {
    const database = getDB();
    const result = await database
      .collection("tbl_add_appointments")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment id not available" });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment deleted",
    });
  } catch (error) {
    console.log("Error in deleting appointment : ", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting appointment",
    });
  }
}
