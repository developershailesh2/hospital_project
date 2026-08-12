import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import type { Appointment_Contract } from "../../../contracts/appointment_contract";
import Swal from "sweetalert2";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  deleteappointmentById,
  getAppointmentByEmail,
} from "../services/appointmentService";
import { useLoading } from "../../../hooks/useLoading";

export function UserDashboard() {
  const navigate = useNavigate();

  const [cookies, setCookies, removeCookies] = useCookies(["Email", "Token"]);
  const { loading, setLoading } = useLoading();

  const [appointments, setAppointments] = useState<Appointment_Contract[]>([]);

  // PAGINATION STATE

  const [currentPage, setCurrentPage] = useState(1);

  const appointmentsPerPage = 6;

  function handleSignOut() {
    removeCookies("Email");
    removeCookies("Token");
    Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).fire({ icon: "success", title: "Signed out" });
    navigate("/todo-login", {
      replace: true,
    });
  }

  async function handleDelete(id: string) {
    if (!id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this appointment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#368ee1",
      cancelButtonColor: "rgb(237, 58, 58)",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      const response = await deleteappointmentById(id);
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).fire({
        text: response.message,
        icon: "success",
      });
      // refresh data instead of reload
    }
    setAppointments(appointments.filter((item) => item._id !== id));
  }

  useEffect(() => {
    setLoading(true);
    try {
      getAppointmentByEmail(cookies["Email"]).then((response) => {
        console.log(response);
        if (response.success) {
          setAppointments(response.appointment_details);
        }
      });
    } catch (error: any) {
      console.log(error);
      console.log("LOGIN ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("REQUEST:", error.request);
      console.log("Error fetching appointments", error);
    } finally {
      setLoading(false);
    }
  }, [cookies]);

  // ============================
  // PAGINATION LOGIC
  // ============================

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const startIndex = (currentPage - 1) * appointmentsPerPage;

  const endIndex = startIndex + appointmentsPerPage;

  const currentAppointments = appointments.slice(startIndex, endIndex);

  return (
    <div
      className="min-vh-100"
      style={{
        background: "#f8fafc",
      }}
    >
      {/* HEADER */}

      <div
        className="p-4 shadow"
        style={{
          background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
          color: "white",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="fw-bold">👋 Welcome {cookies["Email"]}</h4>

              <p className="mb-0 opacity-75">User Appointment Dashboard</p>
            </div>

            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <Button
                onClick={handleSignOut}
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "12px",
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* TITLE */}

      <div className="container">
        <div className="text-center mt-5">
          <h2 className="fw-bold text-primary">📋 My Appointments</h2>
        </div>

        {/* ADD BUTTON */}

        <div className="text-center my-4">
          <Link to="/add-appointment">
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: "12px",
                px: 4,
              }}
            >
              + Add Appointment
            </Button>
          </Link>
        </div>

        {/* CARDS */}

        <div className="row">
          {loading ? (
            <Box sx={{ textAlign: "center", py: 5 }}>
              <CircularProgress area-label="Loading..." color="secondary" />
              <Typography sx={{ mt: 2 }}>Loading appointments...</Typography>
            </Box>
          ) : currentAppointments.length === 0 ? (
            <Typography className="text-center">
              No appointments found.
            </Typography>
          ) : (
            currentAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
              >
                <div
                  className="card shadow border-0 h-100"
                  style={{
                    borderRadius: "20px",
                  }}
                >
                  {/* CARD HEADER */}

                  <div
                    className="card-header text-white text-center"
                    style={{
                      background: "linear-gradient(135deg,#2563eb,#7c3aed)",

                      borderRadius: "20px 20px 0 0",
                    }}
                  >
                    <h5 className="mb-0">{appointment.Title}</h5>
                  </div>

                  {/* BODY */}

                  <div className="card-body p-3">
                    {/* Client & Doctor */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <small className="text-muted d-block">Client</small>
                        <h6 className="mb-0 fw-bold">
                          👤 {appointment.ClientName}
                        </h6>
                      </div>

                      <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
                        {appointment.Doctors}
                      </span>
                    </div>

                    <hr className="my-2" />

                    {/* Information */}

                    <div className="d-flex justify-content-between py-2">
                      <span className="text-muted">📧 Email</span>

                      <span
                        className="fw-semibold text-end text-truncate"
                        style={{ maxWidth: "180px" }}
                      >
                        {appointment.ClientEmail}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                      <span className="text-muted">⚧ Gender</span>

                      <span className="fw-semibold">{appointment.Gender}</span>
                    </div>

                    <div className="d-flex justify-content-between py-2">
                      <span className="text-muted">📅 Appointment</span>

                      <span className="fw-bold text-success">
                        {new Date(appointment.Date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="py-2">
                      <span className="text-muted d-block mb-1">
                        📍 Address
                      </span>

                      <div
                        className="rounded-3 p-2"
                        style={{
                          background: "#f8fafc",
                          fontSize: "14px",
                        }}
                      >
                        {appointment.ClientAddress}
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-muted d-block mb-1">
                        📝 Description
                      </span>

                      <div
                        className="rounded-3 p-3"
                        style={{
                          background: "#eef4ff",
                          borderLeft: "4px solid #2563eb",
                          fontSize: "14px",
                        }}
                      >
                        {appointment.Description}
                      </div>
                    </div>
                  </div>
                  {/* FOOTER */}

                  <div className="card-footer bg-light border-1">
                    <div className="d-flex justify-content-center gap-3">
                      <Link to={`/edit-appointment/${appointment._id}`}>
                        <Button
                          variant="outlined"
                          color="warning"
                          sx={{
                            borderRadius: "10px",
                          }}
                        >
                          <EditNoteOutlinedIcon />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleDelete(appointment._id)}
                        variant="outlined"
                        color="error"
                        sx={{
                          borderRadius: "10px",
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center my-5">
            <Pagination
              count={totalPages}
              page={currentPage}
              color="primary"
              size="large"
              shape="rounded"
              onChange={(e, value) => {
                setCurrentPage(value);

                window.scrollTo({
                  top: 0,

                  behavior: "smooth",
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
