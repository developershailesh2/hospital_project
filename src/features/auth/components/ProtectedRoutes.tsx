import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const [cookies] = useCookies(["Token"]);

  if (!cookies.Token) {
    return <Navigate to="/todo-login" replace />;
  }
  return <Outlet />;
}
