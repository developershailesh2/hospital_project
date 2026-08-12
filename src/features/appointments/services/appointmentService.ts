import axios from "axios";

const APPOINTMENT_API_URL = import.meta.env.VITE_APPOINTMENT_API_URL;

export async function getAppointmentByEmail(email: string) {
  const response = await axios.get(
    `${APPOINTMENT_API_URL}/appointment/${email}`,
  );
  return response.data;
}

export async function deleteappointmentById(id: string) {
  const response = await axios.delete(
    `${APPOINTMENT_API_URL}/delete-appointment/${id}`,
  );
  return response.data;
}

export interface IAppointmentData {
  Title: string;
  ClientName: string;
  ClientAddress: string;
  Doctors: string;
  Gender: string;
  Description: string;
  ClientEmail: string;
  Date: Date | string;
}

export async function getAppointmntbyId(id: string) {
  const response = await axios.get(
    `${APPOINTMENT_API_URL}/get-appointment/${id}`,
  );
  return response.data;
}

export async function editAppointmentById(
  id: string,
  appointmentData: IAppointmentData,
) {
  const response = await axios.put(
    `${APPOINTMENT_API_URL}/edit-appointment/${id}`,
    appointmentData,
  );
  return response.data;
}

//add-appointment service

export interface IAddAppointment {
  Email: string;
  Title: string;
  ClientName: string;
  ClientAddress: string;
  Doctors: string;
  Gender: string;
  Description: string;
  ClientEmail: string;
  Date: string;
}

export async function addAppointment(appointmentData: IAddAppointment) {
  const response = await axios.post(
    `${APPOINTMENT_API_URL}/add-appointment`,
    appointmentData,
  );
  return response.data;
}
