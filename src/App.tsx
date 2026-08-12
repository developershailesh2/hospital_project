import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { TodoIndex } from "./components/todo_index";
import "animate.css";
import { RegisterUser } from "./features/auth/pages/RegisterUser";
import { UserDashboard } from "./features/appointments/pages/UserDashboard";
import { CookiesProvider } from "react-cookie";
import { AddAppointment } from "./features/appointments/pages/AddAppointment";
import { EditDashboard } from "./features/appointments/pages/EditDashboard";
import { ForgotPassword } from "./features/auth/pages/ForgotPassword";
import { VerifyOtp } from "./features/auth/pages/VerifyOtp";
import { ResetPassword } from "./features/auth/pages/ResetPassword";
import { Login } from "./features/auth/pages/Login";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoutes";
import { PasswordResetRoute } from "./features/auth/components/PasswordResetRoute";

function App() {
  return (
    <div>
      <section>
        <BrowserRouter>
          <CookiesProvider>
            <Routes>
              <Route path="/" element={<TodoIndex />} />
              <Route path="register-user" element={<RegisterUser />} />
              <Route path="todo-login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/add-appointment" element={<AddAppointment />} />
                <Route
                  path="/edit-appointment/:id"
                  element={<EditDashboard />}
                />
              </Route>

              <Route path="/delete-appointment/:id" />

              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route element={<PasswordResetRoute />}>
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
            </Routes>
          </CookiesProvider>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;
