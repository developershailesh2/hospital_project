import { Button } from "@mui/material";
import { FaUserPlus, FaSignInAlt, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export function TodoIndex() {
  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-lg-6 text-white">
            <h1 className="display-3 fw-bold mb-3">
              Appointment
              <br />
              Management System
            </h1>

            <p className="lead mb-4">
              A modern platform to schedule, manage and organize patient
              appointments securely with a professional dashboard.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <Link to="/register-user">
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<FaUserPlus />}
                >
                  Register
                </Button>
              </Link>

              <Link to="/todo-login">
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<FaSignInAlt />}
                  sx={{
                    borderColor: "white",
                    color: "white",
                  }}
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Section */}

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div
              className="card shadow-lg border-0 rounded-5 p-5 text-center"
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              <FaCalendarCheck
                size={90}
                className="text-primary mx-auto mb-4"
              />

              <h3 className="fw-bold mb-3">Welcome</h3>

              <p className="text-secondary">
                Manage appointments, edit schedules, update patient information
                and stay organized with one powerful dashboard.
              </p>

              <hr />

              <div className="row mt-4">
                <div className="col">
                  <h3 className="text-primary fw-bold">100%</h3>

                  <small>Secure</small>
                </div>

                <div className="col">
                  <h3 className="text-success fw-bold">24/7</h3>

                  <small>Available</small>
                </div>

                <div className="col">
                  <h3 className="text-danger fw-bold">Easy</h3>

                  <small>Management</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
