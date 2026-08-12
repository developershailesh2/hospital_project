import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Appointment_Contract } from "../../../contracts/appointment_contract";
import { useCookies } from "react-cookie";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import {
  editAppointmentById,
  getAppointmntbyId,
} from "../services/appointmentService";
import { editAppointmentSchema } from "../validation/appointmentValidation";

export function EditDashboard() {
  let params = useParams();
  let navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["Email"]);
  const [appointment, setAppointment] = useState<Appointment_Contract>({
    _id: "",
    Email: "",
    Title: "",
    ClientName: "",
    ClientAddress: "",
    Doctors: "",
    Gender: "",
    Description: "",
    ClientEmail: "",
    Date: new Date(),
  });

  const formik = useFormik({
    initialValues: {
      id: appointment._id || "User Id",
      Email: cookies["Email"],
      Title: appointment.Title,
      ClientName: appointment.ClientName,
      ClientAddress: appointment.ClientAddress,
      Doctors: appointment.Doctors,
      Gender: appointment.Gender,
      Description: appointment.Description,
      ClientEmail: appointment.ClientEmail,
      Date: appointment.Date,
    },
    validationSchema: editAppointmentSchema,
    onSubmit: async (appointment) => {
      if (!params.id) return;

      if (
        cookies.Email?.toLowerCase().trim() ===
        appointment.ClientEmail?.toLowerCase().trim()
      ) {
        await Swal.fire({
          title: "Invalid Client Email",
          text: "You cannot use your own email as the client email.",
          icon: "warning",
        });
        return;
      }

      try {
       const response = await editAppointmentById(params.id, appointment);
        await Swal.fire({
          title: "Update Successful",
          text: response.message,
          icon: "success",
          confirmButtonText: "View Dashboard",
        }).then(() => {
          navigate("/user-dashboard");
        });
      } catch (error:any) {
        console.log(error);
        Swal.fire({
          title: "Update Failed",
          text: error.response?.data?.message ||"Unable to update appointment.",
          icon: "error",
        });
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (!params.id) return;
    async function loadAppointment() {
      try {
        const response = await getAppointmntbyId(params.id!);
        setAppointment(response.result);
      } catch (error) {
        console.log("Error fetching appointment : ", error);
      }
    }
    loadAppointment();
  }, [params.id]);

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        {/* BACK BUTTON & HEADER YIELD */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link to={"/user-dashboard"} className="text-decoration-none">
            <Button variant="outlined" color="primary" className="fw-bold">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow border-0 rounded-4">
              {/* CARD HEADER */}
              <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
                <h3 className="text-uppercase fw-bold mb-0 tracking-wide">
                  ✏️ Edit Your Appointment
                </h3>
                <small className="text-white-50">
                  Update the details below to modify your scheduled appointment
                </small>
              </div>

              {/* CARD BODY / FORM */}
              <div className="card-body p-4 p-md-5">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row g-4">
                    {/* READ-ONLY ID (Always good to show but disable for safety) */}
                    <div className="col-12">
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Appointment ID"
                        disabled
                        value={formik.values.id}
                      />
                    </div>

                    {/* COLUMN 1 */}
                    <div className="col-md-6 d-flex flex-column gap-4">
                      <TextField
                        name="Title"
                        onChange={formik.handleChange}
                        value={formik.values.Title}
                        fullWidth
                        variant="outlined"
                        label="Title"
                        placeholder="e.g., General Checkup"
                        error={
                          formik.touched.Title && Boolean(formik.errors.Title)
                        }
                        helperText={formik.touched.Title && formik.errors.Title}
                      />

                      <TextField
                        name="ClientName"
                        fullWidth
                        variant="outlined"
                        label="Client Name"
                        onChange={formik.handleChange}
                        value={formik.values.ClientName}
                        error={
                          formik.touched.ClientName &&
                          Boolean(formik.errors.ClientName)
                        }
                        helperText={
                          formik.touched.ClientName && formik.errors.ClientName
                        }
                      />
                      <TextField
                        name="Doctors"
                        onChange={formik.handleChange}
                        value={formik.values.Doctors}
                        fullWidth
                        variant="outlined"
                        label="Doctor Assigned"
                        disabled
                      />
                      <TextField
                        name="Gender"
                        onChange={formik.handleChange}
                        value={formik.values.Gender}
                        fullWidth
                        variant="outlined"
                        label="Gender"
                        disabled
                      />
                    </div>

                    {/* COLUMN 2 */}
                    <div className="col-md-6 d-flex flex-column gap-4">
                      <TextField
                        name="ClientEmail"
                        fullWidth
                        variant="outlined"
                        label="Client Email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.ClientEmail}
                        error={
                          formik.touched.ClientEmail &&
                          Boolean(formik.errors.ClientEmail)
                        }
                        helperText={
                          formik.touched.ClientEmail &&
                          formik.errors.ClientEmail
                        }
                      />
                      <TextField
                        name="ClientAddress"
                        fullWidth
                        variant="outlined"
                        label="Client Address"
                        onChange={formik.handleChange}
                        value={formik.values.ClientAddress}
                        error={
                          formik.touched.ClientAddress &&
                          Boolean(formik.errors.ClientAddress)
                        }
                        helperText={
                          formik.touched.ClientAddress &&
                          formik.errors.ClientAddress
                        }
                      />
                      {/* You can change this to a proper date input later if needed */}
                      <TextField
                        fullWidth
                        type="date"
                        label="Appointment Date"
                        name="Date"
                        value={
                          formik.values.Date
                            ? new Date(formik.values.Date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={formik.handleChange}
                        error={
                          formik.touched.Date && Boolean(formik.errors.Date)
                        }
                        helperText={formik.touched.Date && formik.errors.Date}
                      />
                    </div>

                    {/* FULL WIDTH DESCRIPTION */}
                    <div className="col-12 mt-4">
                      <TextField
                        name="Description"
                        onChange={formik.handleChange}
                        value={formik.values.Description}
                        fullWidth
                        variant="outlined"
                        label="Appointment Description"
                        multiline
                        rows={4}
                        error={
                          formik.touched.Date &&
                          Boolean(formik.errors.Description)
                        }
                        helperText={
                          formik.touched.Date && formik.errors.Description
                        }
                      />
                    </div>

                    {/* FORM ACTION BUTTONS */}
                    <div className="col-12 d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                      <Link
                        to={"/user-dashboard"}
                        className="text-decoration-none"
                      >
                        <Button
                          variant="text"
                          color="inherit"
                          size="large"
                          startIcon={<CloseIcon />}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 3,
                            py: 1.2,
                            color: "text.secondary",
                            "&:hover": {
                              backgroundColor: "action.hover",
                              color: "text.primary",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<SaveIcon />}
                        className="px-4 fw-bold shadow-sm"
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: 2,
                          px: 4,
                          py: 1.2,
                          boxShadow: 3,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            boxShadow: 6,
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
