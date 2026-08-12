import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registrationSchema } from "../validation/authValidation";
import { registerationUser } from "../services/authservices";
import Swal from "sweetalert2";
import axios from "axios";

export function RegisterUser() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
      ConfirmPassword: "",
      Email: "",
      Mobile: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (user_data) => {
      try {
        await registerationUser(user_data);
        await Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully.",
          confirmButtonText: "Continue to Login",
        }).then(() => {
          navigate("/todo-login");
        });
      } catch (error) {
        console.log("Error in registration : ", error);
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          if (status === 400) {
            Swal.fire({
              icon: "warning",
              title: "Registration Unsuccessful",
              text: "This email address is already registered. Please use another email address.",
            });
          }
        }
      }
    },
  });

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb,#3b82f6)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-5"
        style={{
          width: "700px",
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <div className="card-body p-5">
          {/* Heading */}

          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">Create Account</h2>

            <p className="text-muted">
              Register to manage your appointments securely.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <TextField
                  fullWidth
                  label="User Name"
                  placeholder="Enter User Name"
                  name="UserName"
                  value={formik.values.UserName}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">{formik.errors.UserName}</small>
              </div>

              <div className="col-md-6 mb-4">
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  placeholder="Enter Email"
                  name="Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">{formik.errors.Email}</small>
              </div>

              <div className="col-md-6 mb-4">
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  placeholder="Password"
                  name="Password"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">{formik.errors.Password}</small>
              </div>

              <div className="col-md-6 mb-4">
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  value={formik.values.ConfirmPassword}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">
                  {formik.errors.ConfirmPassword}
                </small>
              </div>

              <div className="col-md-12 mb-4">
                <TextField
                  fullWidth
                  label="Mobile Number"
                  placeholder="Enter Mobile Number"
                  name="Mobile"
                  value={formik.values.Mobile}
                  onChange={formik.handleChange}
                />

                <small className="text-danger">{formik.errors.Mobile}</small>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Create Account
            </Button>
          </form>

          <hr className="my-4" />

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/">
              <Button variant="outlined">← Home</Button>
            </Link>

            <Link to="/todo-login" className="text-decoration-none fw-semibold">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
