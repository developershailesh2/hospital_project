import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ForgotEmailPassword } from "../services/authservices";

export function ForgotPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Email: "",
    },
    onSubmit: async (email) => {
      try {
        const response = await ForgotEmailPassword(email);

        await Swal.mixin({
          toast: true,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          position: "top-end",
        })
          .fire({
            text: response.message,
            icon: "success",
          })
          .then(() => {
            navigate("/verify-otp", { state: { Email: email.Email } });
          });
      } catch (error: any) {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        }).fire({
          icon: "error",
          text:
            error.response?.data?.message || "Email address not registered.",
        });
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
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          maxWidth: "950px",
          width: "100%",
          borderRadius: "24px",
        }}
      >
        <div className="row g-0">
          {/* LEFT SIDE */}
          <div className="col-lg-6 p-5 bg-white d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#e0f2fe",
                  fontSize: "36px",
                }}
              >
                🔒
              </div>

              <h2 className="fw-bold text-primary">Forgot Password?</h2>

              <p className="text-muted mb-0">
                Enter your registered email address.
              </p>

              <small className="text-muted">
                We'll send a 6-digit OTP to reset your password.
              </small>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                name="Email"
                type="email"
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  py: 1.6,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                📩 Send OTP
              </Button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="col-lg-6 text-white d-flex flex-column justify-content-center p-5"
            style={{
              background: "linear-gradient(135deg,#2563eb,#1d4ed8,#0f172a)",
            }}
          >
            <h2 className="fw-bold mb-4">Password Recovery</h2>

            <p style={{ lineHeight: "30px" }}>
              Forgot your password? Don't worry. We will send a secure One-Time
              Password (OTP) to your registered email address. Verify the OTP,
              create a new password, and continue using your Appointment
              Management System securely.
            </p>

            <div className="mt-4 fs-6">
              <p>✅ 6 Digit Secure OTP</p>
              <p>✅ Email Verification</p>
              <p>✅ Password Encryption</p>
              <p>✅ Fast Password Reset</p>
              <p>✅ Secure Account Recovery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
