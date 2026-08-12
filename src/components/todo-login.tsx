import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

export function TodoLogin() {
  let navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["Email"]);
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: yup.object({
      Email: yup.string().required("Email required"),
      Password: yup.string().required("Password required"),
    }),
    onSubmit: (login_user) => {
      axios
        .post(`${import.meta.env.VITE_API_URL}/login-user`, login_user)
        .then((response) => {
          if (response.data.success) {
            setCookies("Email", login_user.Email);
            navigate("/user-dashboard");
          } else {
            // alert("Invalid Id or Password");
            Swal.fire({
              title: "Invalid Id or Password",
              icon: "error",
              showCloseButton: true,
            });
          }
        });
    },
  });

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb,#60a5fa)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-5 overflow-hidden"
        style={{
          width: "1050px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.96)",
        }}
      >
        <div className="row g-0">
          {/* LEFT SIDE */}

          <div className="col-lg-6 p-5">
            <div className="text-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                width="90"
              />

              <h2 className="fw-bold text-primary mt-3">Welcome Back 👋</h2>

              <p className="text-muted">
                Login to continue managing your appointments.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  type="email"
                  name="Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">{formik.errors.Email}</small>
              </div>

              <div className="mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="Password"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">{formik.errors.Password}</small>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />

                  <label className="form-check-label">Remember Me</label>
                </div>

                <Link to={"/forgot-password"} className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Sign In
              </Button>
            </form>

            <hr className="my-4" />

            <div className="text-center">
              <p className="text-muted mb-3">New here?</p>

              <Link to="/register-user" className="text-decoration-none">
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  Create New Account
                </Button>
              </Link>

              <Link to="/" className="text-decoration-none">
                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    mt: 2,
                  }}
                >
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div
            className="col-lg-6 text-white d-flex flex-column justify-content-center p-5"
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8,#0f172a)",
            }}
          >
            <h2 className="fw-bold mb-4">Appointment Management System</h2>

            <p
              className="mb-5"
              style={{
                lineHeight: "30px",
              }}
            >
              Organize your daily appointments, manage patient information, edit
              schedules, receive email notifications, and securely access your
              dashboard from anywhere.
            </p>

            <div className="fs-5">
              <p>✔ Secure Authentication</p>

              <p>✔ Manage Appointments</p>

              <p>✔ Email Notifications</p>

              <p>✔ Responsive Dashboard</p>

              <p>✔ Edit & Delete Records</p>

              <p>✔ Built with MERN Stack</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
