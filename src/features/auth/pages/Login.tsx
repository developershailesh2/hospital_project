import { Button, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginValidationSchema } from "../validation/authValidation";
import { loginUser } from "../services/authservices";
import axios from "axios";
import { useLoading } from "../../../hooks/useLoading";

export function Login() {
  let navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["Email", "Token"]);
  const { loading, setLoading } = useLoading();
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (login_user) => {
      setLoading(true);
      try {
        const response = await loginUser(login_user);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).fire({ icon: "success", title: "Signed in successfully" });

        setCookies("Email", login_user.Email);
        setCookies("Token", response.token);
        console.log(cookies.Email);
        console.log(cookies.Token);
        navigate("/user-dashboard");
      } catch (error) {
        console.log("Error fetching in login : ", error);
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 401) {
            Swal.fire({
              icon: "warning",
              title: "Login Failed",
              text: "Invalid email or password.",
            });
          }
        }
      } finally {
        setLoading(false);
      }
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
                disabled={loading}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      size={22}
                      color="inherit"
                      sx={{ mr: 1 }}
                    />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
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
