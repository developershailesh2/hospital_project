import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);
export const editAppointmentSchema = yup.object({
  Title: yup
    .string()
    .trim()
    .required("Please enter the appointment title.")
    .min(3, "Appointment title must be at least 3 characters long.")
    .max(100, "Appointment title cannot exceed 100 characters."),

  ClientName: yup
    .string()
    .trim()
    .required("Please enter the client's name.")
    .min(2, "Client name must be at least 2 characters long.")
    .max(50, "Client name cannot exceed 50 characters."),

  ClientAddress: yup
    .string()
    .trim()
    .required("Please enter the client's address.")
    .min(5, "Please enter a valid address.")
    .max(200, "Client address cannot exceed 200 characters."),

  ClientEmail: yup
    .string()
    .trim()
    .required("Please enter the client's email address.")
    .email("Please enter a valid email address."),

  Description: yup
    .string()
    .trim()
    .required("Please enter an appointment description.")
    .max(500, "Description cannot exceed 500 characters."),

  Date: yup
    .date()
    .required("Please select an appointment date.")
    .min(
      today,
      "Appointment date cannot be earlier than today.",
    ),
    
});


//add-appointment schema

export const addAppointmentSchema = yup.object({
  Title: yup
    .string()
    .trim()
    .required("Please enter the appointment title.")
    .min(2, "Appointment title must be at least 2 characters long.")
    .max(100, "Appointment title cannot exceed 100 characters."),

  ClientName: yup
    .string()
    .trim()
    .required("Please enter the client's name.")
    .min(2, "Client name must be at least 2 characters long.")
    .max(50, "Client name cannot exceed 50 characters."),

  ClientAddress: yup
    .string()
    .trim()
    .required("Please enter the client's address.")
    .min(5, "Please enter a valid client address.")
    .max(200, "Client address cannot exceed 200 characters."),

  Doctors: yup
    .string()
    .required("Please select a doctor."),

  Gender: yup
    .string()
    .required("Please select the client's gender."),

  Description: yup
    .string()
    .trim()
    .required("Please enter an appointment description.")
    .min(5, "Description must be at least 5 characters long.")
    .max(500, "Description cannot exceed 500 characters."),

  ClientEmail: yup
    .string()
    .trim()
    .required("Please enter the client's email address.")
    .email("Please enter a valid email address."),

  Date: yup
    .date()
    .required("Please select an appointment date.")
    .min(
      today,
      "Appointment date cannot be earlier than today."
    ),
});
