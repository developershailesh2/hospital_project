import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPasswordSchema } from "../validation/authValidation";
import { UpdatePassword } from "../services/authservices";

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const Email = location.state?.Email;

  const formik = useFormik({
    initialValues: {
      Email: Email || "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (update_password) => {
      try {
        const response = await UpdatePassword({
          Email: update_password.Email,
          Password: update_password.Password,
        });
        await Swal.mixin({
          toast: true,
          timer: 1200,
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
        })
          .fire({
            text: response.message,
            icon: "success",
          })
          .then(() => {
            navigate("/todo-login");
          });
      } catch (error: any) {
        console.log(error);
        Swal.mixin({
          toast: true,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).fire({
          text: error.response?.data?.message,
          icon: "error",
        });
      }

      // axios
      //   .post(`${import.meta.env.VITE_API_URL}/reset-password`, {
      //     Email: Email,
      //     Password: values.Password,
      //   })
      //   .then(() => {
      //     Swal.fire({
      //       icon: "success",
      //       title: "Password Updated",
      //       text: "Login With New Password",
      //     }).then(() => {
      //       navigate("/todo-login");
      //     });
      //   });
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
                  background: "#DCFCE7",
                  fontSize: "38px",
                }}
              >
                🔑
              </div>

              <h2 className="fw-bold text-success">Create New Password</h2>

              <p className="text-muted">
                Your new password must be different from your previous password.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                name="Password"
                type="password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.Password && Boolean(formik.errors.Password)
                }
                helperText={formik.touched.Password && formik.errors.Password}
              />

              <TextField
                fullWidth
                sx={{ mt: 3 }}
                label="Confirm Password"
                name="ConfirmPassword"
                type="password"
                value={formik.values.ConfirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ConfirmPassword &&
                  Boolean(formik.errors.ConfirmPassword)
                }
                helperText={
                  formik.touched.ConfirmPassword &&
                  formik.errors.ConfirmPassword
                }
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
                  background: "linear-gradient(135deg,#16a34a,#22c55e)",
                }}
              >
                🔒 Update Password
              </Button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="col-lg-6 text-white d-flex flex-column justify-content-center p-5"
            style={{
              background: "linear-gradient(135deg,#16a34a,#15803d,#14532d)",
            }}
          >
            <h2 className="fw-bold mb-4">Password Security</h2>

            <p
              className="mb-4"
              style={{
                lineHeight: "30px",
              }}
            >
              Create a strong password to keep your account secure. Avoid using
              common words or personal information. A secure password helps
              protect your appointments and personal details.
            </p>

            <div className="fs-6">
              <p>🔒 Minimum 6 Characters</p>
              <p>🔑 Use Uppercase & Lowercase Letters</p>
              <p>🔢 Include Numbers</p>
              <p>✨ Add Special Characters</p>
              <p>🛡️ Never Share Your Password</p>
            </div>

            <div
              className="mt-4 p-3 rounded-3"
              style={{
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <small>
                <strong>Example:</strong> <br />
                <span className="text-warning fw-bold">Pass@123</span> or{" "}
                <span className="text-warning fw-bold">MySecure#2026</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
