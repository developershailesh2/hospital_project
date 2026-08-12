import { Navigate, Outlet, useLocation } from "react-router-dom";

export function PasswordResetRoute() {
  const location = useLocation();
  const Email = location.state?.Email;

  if (!Email) {
    return <Navigate to="/forgot-password" replace />;
  }
  return <Outlet />;
}
