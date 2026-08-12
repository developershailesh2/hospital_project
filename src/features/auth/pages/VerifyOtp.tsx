import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { VerifyEmailOtp } from "../services/authservices";
import { otpVerificationSchema } from "../validation/authValidation";

export function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const Email = location.state?.Email;

  const formik = useFormik({
    initialValues: {
      Email: Email || "",
      otp: "",
    },validationSchema:otpVerificationSchema,
    onSubmit: async (send_otp) => {
      try {
        const response = await VerifyEmailOtp(send_otp);
        await Swal.mixin({
          toast: true,
          timer: 1200,
          timerProgressBar: true,
          position: "top-end",
          showConfirmButton: false,
        })
          .fire({
            text: response.message,
            icon: "success",
          })
          .then(() => {
            navigate("/reset-password", { state: { Email: send_otp.Email } });
          });
      } catch (error: any) {
        console.log(error);
        Swal.mixin({
          toast: true,
          timer: 2000,
          timerProgressBar: true,
          position: "top-end",
          showConfirmButton: false,
        }).fire({
          text: error.response?.data?.message,
          icon: "error",
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
          <div className="col-lg-6 bg-white p-5 d-flex flex-column justify-content-center">
            <div className="text-center mb-4">
              <div
                className="mx-auto mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#dbeafe",
                  fontSize: "40px",
                }}
              >
                🔐
              </div>

              <h2 className="fw-bold text-primary">Verify OTP</h2>

              <p className="text-muted mb-0">
                Enter the 6-digit OTP sent to your registered email.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="6 Digit OTP"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
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
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                ✅ Verify OTP
              </Button>

              <Button
                fullWidth
                variant="text"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Resend OTP
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
            <h2 className="fw-bold mb-4">Email Verification</h2>

            <p style={{ lineHeight: "30px" }}>
              We've sent a secure 6-digit One-Time Password (OTP) to your
              registered email address. Enter the code to verify your identity
              before creating a new password.
            </p>

            <div className="mt-4">
              <p>📧 OTP sent to your registered email</p>
              <p>⏱️ Valid for 5 minutes</p>
              <p>🔒 Secure verification process</p>
              <p>🔄 Resend OTP if you didn't receive it</p>
              <p>✅ Quick and secure password recovery</p>
            </div>

            <div
              className="mt-4 p-3 rounded-3"
              style={{
                background: "rgba(255,255,255,0.1)",
              }}
            >
              <small>
                <strong>Tip:</strong> Check your Inbox, Spam, or Promotions
                folder if you don't see the email within a minute.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
